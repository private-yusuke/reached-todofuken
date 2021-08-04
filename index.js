"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __values = (this && this.__values) || function(o) {
    var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
    if (m) return m.call(o);
    if (o && typeof o.length === "number") return {
        next: function () {
            if (o && i >= o.length) o = void 0;
            return { value: o && o[i++], done: !o };
        }
    };
    throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var openReverseGeocoder = require('@geolonia/open-reverse-geocoder').openReverseGeocoder;
var fs = __importStar(require("fs"));
var process_1 = require("process");
var set_1 = __importDefault(require("./set"));
function locationConversion(location) {
    var latitude = location.latitudeE7 / 1e7;
    var longitude = location.longitudeE7 / 1e7;
    return openReverseGeocoder([longitude, latitude]);
}
var LocationHistoryHolder = /** @class */ (function () {
    function LocationHistoryHolder() {
        this.codeHistory = new Set();
        this.prefectureHistory = new Set();
        this.cityHistory = new Set();
    }
    LocationHistoryHolder.prototype.addLocationHistory = function (geocodingResult) {
        console.log(geocodingResult);
        this.codeHistory.add(geocodingResult.code);
        this.prefectureHistory.add(geocodingResult.prefecture);
        this.cityHistory.add(geocodingResult.city);
    };
    LocationHistoryHolder.prototype.union = function (rhs) {
        var res = new LocationHistoryHolder();
        res.codeHistory = set_1.default(this.codeHistory, rhs.codeHistory);
        res.prefectureHistory = set_1.default(this.prefectureHistory, rhs.prefectureHistory);
        res.cityHistory = set_1.default(this.cityHistory, rhs.cityHistory);
        return res;
    };
    return LocationHistoryHolder;
}());
function semanticLocationHistoryToLocationHistoryHolder(slh) {
    return __awaiter(this, void 0, void 0, function () {
        var historyHolder, _a, _b, timelineObject, _c, startLocation, endLocation, _d, _e, _f, _g, e_1, location_1, _h, _j, e_2, e_3_1;
        var e_3, _k;
        return __generator(this, function (_l) {
            switch (_l.label) {
                case 0:
                    historyHolder = new LocationHistoryHolder();
                    _l.label = 1;
                case 1:
                    _l.trys.push([1, 14, 15, 16]);
                    _a = __values(slh.timelineObjects), _b = _a.next();
                    _l.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 13];
                    timelineObject = _b.value;
                    if (!timelineObject.activitySegment) return [3 /*break*/, 8];
                    _c = timelineObject.activitySegment, startLocation = _c.startLocation, endLocation = _c.endLocation;
                    _l.label = 3;
                case 3:
                    _l.trys.push([3, 6, , 7]);
                    _e = (_d = historyHolder).addLocationHistory;
                    return [4 /*yield*/, locationConversion(startLocation)];
                case 4:
                    _e.apply(_d, [_l.sent()]);
                    _g = (_f = historyHolder).addLocationHistory;
                    return [4 /*yield*/, locationConversion(endLocation)];
                case 5:
                    _g.apply(_f, [_l.sent()]);
                    return [3 /*break*/, 7];
                case 6:
                    e_1 = _l.sent();
                    console.error(e_1);
                    return [3 /*break*/, 7];
                case 7: return [3 /*break*/, 12];
                case 8:
                    if (!timelineObject.placeVisit) return [3 /*break*/, 12];
                    location_1 = timelineObject.placeVisit.location;
                    _l.label = 9;
                case 9:
                    _l.trys.push([9, 11, , 12]);
                    _j = (_h = historyHolder).addLocationHistory;
                    return [4 /*yield*/, locationConversion(location_1)];
                case 10:
                    _j.apply(_h, [_l.sent()]);
                    return [3 /*break*/, 12];
                case 11:
                    e_2 = _l.sent();
                    console.error(e_2);
                    return [3 /*break*/, 12];
                case 12:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 13: return [3 /*break*/, 16];
                case 14:
                    e_3_1 = _l.sent();
                    e_3 = { error: e_3_1 };
                    return [3 /*break*/, 16];
                case 15:
                    try {
                        if (_b && !_b.done && (_k = _a.return)) _k.call(_a);
                    }
                    finally { if (e_3) throw e_3.error; }
                    return [7 /*endfinally*/];
                case 16: return [2 /*return*/, historyHolder];
            }
        });
    });
}
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var historyHolder, _a, _b, filepath, content, slh, _c, _d, e_4_1;
        var e_4, _e;
        return __generator(this, function (_f) {
            switch (_f.label) {
                case 0:
                    if (process.argv.length < 3) {
                        console.error('not enough arguments');
                        process_1.exit(1);
                    }
                    historyHolder = new LocationHistoryHolder();
                    _f.label = 1;
                case 1:
                    _f.trys.push([1, 6, 7, 8]);
                    _a = __values(process.argv.slice(2, -1)), _b = _a.next();
                    _f.label = 2;
                case 2:
                    if (!!_b.done) return [3 /*break*/, 5];
                    filepath = _b.value;
                    content = fs.readFileSync(filepath, 'utf-8');
                    slh = JSON.parse(content);
                    _d = (_c = historyHolder).union;
                    return [4 /*yield*/, semanticLocationHistoryToLocationHistoryHolder(slh)];
                case 3:
                    historyHolder = _d.apply(_c, [_f.sent()]);
                    _f.label = 4;
                case 4:
                    _b = _a.next();
                    return [3 /*break*/, 2];
                case 5: return [3 /*break*/, 8];
                case 6:
                    e_4_1 = _f.sent();
                    e_4 = { error: e_4_1 };
                    return [3 /*break*/, 8];
                case 7:
                    try {
                        if (_b && !_b.done && (_e = _a.return)) _e.call(_a);
                    }
                    finally { if (e_4) throw e_4.error; }
                    return [7 /*endfinally*/];
                case 8:
                    console.log(historyHolder);
                    return [2 /*return*/];
            }
        });
    });
}
main();
