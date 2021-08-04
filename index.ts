const { openReverseGeocoder } = require('@geolonia/open-reverse-geocoder');
import * as fs from 'fs';
import { exit } from 'process';
import union from './set';

type SemanticLocationHistory = {
    timelineObjects: TimelineObject[];
};
type TimelineObject = {
    activitySegment?: ActivitySegment;
    placeVisit?: PlaceVisit;
};
type PlaceVisit = {
    location: Location;
};
type ActivitySegment = {
    startLocation: Location;
    endLocation: Location;
};
type Location = {
    latitudeE7: number;
    longitudeE7: number;
};

type ReverseGeocodingResult = {
    code: string;
    prefecture: string;
    city: string;
};

function locationConversion(location: Location): ReverseGeocodingResult {
    const latitude = location.latitudeE7 / 1e7;
    const longitude = location.longitudeE7 / 1e7;
    return openReverseGeocoder([longitude, latitude]);
}

class LocationHistoryHolder {
    codeHistory: Set<string>;
    prefectureHistory: Set<string>;
    cityHistory: Set<string>;

    constructor() {
        this.codeHistory = new Set<string>();
        this.prefectureHistory = new Set<string>();
        this.cityHistory = new Set<string>();
    }

    addLocationHistory(geocodingResult: ReverseGeocodingResult) {
        console.log(geocodingResult);
        this.codeHistory.add(geocodingResult.code);
        this.prefectureHistory.add(geocodingResult.prefecture);
        this.cityHistory.add(geocodingResult.city);
    }

    union(rhs: LocationHistoryHolder): LocationHistoryHolder {
        const res = new LocationHistoryHolder();
        res.codeHistory = union(this.codeHistory, rhs.codeHistory);
        res.prefectureHistory = union(
            this.prefectureHistory,
            rhs.prefectureHistory
        );
        res.cityHistory = union(this.cityHistory, rhs.cityHistory);
        return res;
    }
}

async function semanticLocationHistoryToLocationHistoryHolder(
    slh: SemanticLocationHistory
): Promise<LocationHistoryHolder> {
    const historyHolder: LocationHistoryHolder = new LocationHistoryHolder();

    for (const timelineObject of slh.timelineObjects) {
        if (timelineObject.activitySegment) {
            const { startLocation, endLocation } =
                timelineObject.activitySegment;
            try {
                historyHolder.addLocationHistory(
                    await locationConversion(startLocation)
                );
                historyHolder.addLocationHistory(
                    await locationConversion(endLocation)
                );
            } catch (e) {
                console.error(e);
            }
        } else if (timelineObject.placeVisit) {
            const { location } = timelineObject.placeVisit;
            try {
                historyHolder.addLocationHistory(
                    await locationConversion(location)
                );
            } catch (e) {
                console.error(e);
            }
        }
    }

    return historyHolder;
}

async function main() {
    if (process.argv.length < 3) {
        console.error('not enough arguments');
        exit(1);
    }

    let historyHolder: LocationHistoryHolder = new LocationHistoryHolder();
    for (const filepath of process.argv.slice(2, -1)) {
        const content = fs.readFileSync(filepath, 'utf-8');
        const slh = JSON.parse(content) as SemanticLocationHistory;
        historyHolder = historyHolder.union(
            await semanticLocationHistoryToLocationHistoryHolder(slh)
        );
    }

    console.log(historyHolder);
}
main();
