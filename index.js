"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var colorName = __importStar(require("color-name"));
function rgbaOf(customColors, fallbackColor) {
    return function (strings) {
        var keys = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            keys[_i - 1] = arguments[_i];
        }
        var rawString = joinWithValues(strings.raw, keys);
        var i = rawString.lastIndexOf(",");
        var colorPart = rawString.substr(0, i);
        var opacityPart = rawString.substr(i + 1);
        var colorValue = customColors[colorPart] || colorPart;
        var color = toRgba(colorValue);
        if (color) {
            var r = color.r, g = color.g, b = color.b, a = color.a;
            var result = opacityPart.match(/([+-]?)([\d.]+)(%?)/);
            if (result) {
                var _ = result[0], sign = result[1], alphaString = result[2], isPercentile = result[3];
                var alpha = isPercentile ? p(alphaString) / 100 : p(alphaString);
                if (sign) {
                    if (sign === "+")
                        a += alpha;
                    else if (sign === "-")
                        a -= alpha;
                }
                else {
                    a = alpha;
                }
                return "rgba(" + r + "," + g + "," + b + "," + p(Math.max(0, Math.min(a, 1))) + ")";
            }
            else {
                return colorPart;
            }
        }
        else if (fallbackColor) {
            return fallbackColor;
        }
        return rawString;
    };
}
exports.rgbaOf = rgbaOf;
function toRgba(s) {
    var _a, _b;
    var r, g, b, a = 1;
    if (s.startsWith("#")) {
        var hex = parseInt(s.substr(1), 16);
        if (s.length === 4) {
            r = (hex >> 8 & 0xf) * 0x11;
            g = (hex >> 4 & 0xf) * 0x11;
            b = (hex & 0xf) * 0x11;
        }
        else if (s.length === 5) {
            a = (hex >> 12 & 0xf) * 0x11 / 255.0;
            r = (hex >> 8 & 0xf) * 0x11;
            g = (hex >> 4 & 0xf) * 0x11;
            b = (hex & 0xf) * 0x11;
        }
        else if (s.length === 7) {
            r = hex >> 16 & 0xff;
            g = hex >> 8 & 0xff;
            b = hex & 0xff;
        }
        else if (s.length === 9) {
            a = (hex >> 24 & 0xff) / 255.0;
            r = hex >> 16 & 0xff;
            g = hex >> 8 & 0xff;
            b = hex & 0xff;
        }
        else {
            return undefined;
        }
    }
    else if (s.toLowerCase().startsWith("rgba")) {
        _a = s.substring(5, s.length - 1).split(',').map(function (s) { return parseFloat(s.trim()); }), r = _a[0], g = _a[1], b = _a[2], a = _a[3];
    }
    else if (s.toLowerCase().startsWith("rgb")) {
        _b = s.substring(4, s.length - 1).split(',').map(function (s) { return parseFloat(s.trim()); }), r = _b[0], g = _b[1], b = _b[2];
    }
    else {
        // @ts-ignore
        var color = colorName[s];
        if (color) {
            r = color[0], g = color[1], b = color[2];
        }
        else {
            return undefined;
        }
    }
    if (r < 0 || g < 0 || b < 0 || a < 0)
        return undefined;
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a))
        return undefined;
    return {
        r: r, g: g, b: b, a: p(a),
        rgba: "rgba(" + r + "," + g + "," + b + "," + p(a) + ")"
    };
}
exports.toRgba = toRgba;
function p(n) {
    if (!n)
        return 0;
    return Math.floor(parseFloat(n) * 1000) / 1000;
}
var joinWithValues = function (a, keys) { return a.reduce(function (a, b, i) {
    var v = keys[i - 1];
    return a + (v !== undefined ? v : '') + b;
}); };
var rgba = rgbaOf({});
exports.default = rgba;
