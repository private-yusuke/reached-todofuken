"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
function union(lhs, rhs) {
    var e_1, _a;
    var res = new Set(lhs);
    try {
        for (var rhs_1 = __values(rhs), rhs_1_1 = rhs_1.next(); !rhs_1_1.done; rhs_1_1 = rhs_1.next()) {
            var elem = rhs_1_1.value;
            res.add(elem);
        }
    }
    catch (e_1_1) { e_1 = { error: e_1_1 }; }
    finally {
        try {
            if (rhs_1_1 && !rhs_1_1.done && (_a = rhs_1.return)) _a.call(rhs_1);
        }
        finally { if (e_1) throw e_1.error; }
    }
    return res;
}
exports.default = union;
