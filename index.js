"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var color_string_1 = __importDefault(require("color-string"));
function rgbaOf(customColors) {
    return function (strings) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var _a = joinWithValues(strings.raw, keys).split(","), colorPart = _a[0], opacityPart = _a[1];
        var customColor = customColors[colorPart];
        var color = color_string_1.default.get(customColor || colorPart);
        if (color) {
            var _b = color.value, r = _b[0], g = _b[1], b = _b[2];
            var result = opacityPart.match(/([\d.]+(%)?)/);
            if (result) {
                var _ = result[0], alphaString = result[1], isPercentile = result[2];
                var alpha = isPercentile ? parseFloat(alphaString) / 100 : parseFloat(alphaString);
                return "rgba(" + r + "," + g + "," + b + "," + alpha + ")";
            }
        }
        return null;
    };
}
exports.rgbaOf = rgbaOf;
var joinWithValues = function (a, keys) { return a.reduce(function (a, b, i) {
    var v = keys[i - 1];
    return a + (v !== undefined ? v : '') + b;
}); };
var rgba = rgbaOf({});
exports.default = rgba;
