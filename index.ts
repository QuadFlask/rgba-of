import * as colorName from "color-name";

export function rgbaOf(customColors: { [colorName: string]: string }, fallbackColor?: string): (strings: TemplateStringsArray, ...keys: any[]) => string {
    return (strings: TemplateStringsArray, ...keys: any[]) => {
        const rawString = joinWithValues(strings.raw, keys);
        const i = rawString.lastIndexOf(",");
        const colorPart = rawString.substr(0, i === -1 ? rawString.length : i);
        const opacityPart = i > 0 ? rawString.substr(i + 1) : '';
        const colorValue = customColors[colorPart] || colorPart;
        const color = toRgba(colorValue);
        if (color) {
            let {r, g, b, a} = color;
            const result = opacityPart.match(/([+-]?)([\d.]+)(%?)/);
            if (result) {
                const [_, sign, alphaString, isPercentile] = result;
                const alpha = isPercentile ? p(alphaString) / 100 : p(alphaString);
                if (sign) {
                    if (sign === "+") a += alpha;
                    else if (sign === "-") a -= alpha;
                } else {
                    a = alpha;
                }
                return `rgba(${r},${g},${b},${p(Math.max(0, Math.min(a, 1)))})`;
            } else {
                return colorValue;
            }
        }
        return fallbackColor ?? rawString;
    }
}

export function darkenOf(customColors: { [colorName: string]: string }, fallbackColor?: string): (strings: TemplateStringsArray, ...keys: any[]) => string {
    return (strings: TemplateStringsArray, ...keys: any[]) => {
        const rawString = joinWithValues(strings.raw, keys);
        const i = rawString.lastIndexOf(",");
        const colorPart = rawString.substr(0, i === -1 ? rawString.length : i);
        const percentPart = i > 0 ? rawString.substr(i + 1) : '';
        const result = percentPart.match(/([+-]?)([\d.]+)(%?)/);
        if (result) {
            const [_, sign, alphaString, isPercentile] = result;
            const percent = isPercentile ? p(alphaString) / 100 : p(alphaString);
            return darkenColor(colorPart, percent);
        }
        return fallbackColor ?? rawString;
    }
}

export function toRgba(s: string): { r: number, g: number, b: number, a: number, rgba: string } | undefined {
    let r, g, b, a = 1;
    if (s.startsWith("#")) {
        const hex = parseInt(s.substr(1), 16);
        if (s.length === 4) {
            r = (hex >> 8 & 0xf) * 0x11;
            g = (hex >> 4 & 0xf) * 0x11;
            b = (hex & 0xf) * 0x11;
        } else if (s.length === 5) {
            a = (hex >> 12 & 0xf) * 0x11 / 255.0;
            r = (hex >> 8 & 0xf) * 0x11;
            g = (hex >> 4 & 0xf) * 0x11;
            b = (hex & 0xf) * 0x11;
        } else if (s.length === 7) {
            r = hex >> 16 & 0xff;
            g = hex >> 8 & 0xff;
            b = hex & 0xff;
        } else if (s.length === 9) {
            a = (hex >> 24 & 0xff) / 255.0;
            r = hex >> 16 & 0xff;
            g = hex >> 8 & 0xff;
            b = hex & 0xff;
        } else {
            return undefined;
        }
    } else if (s.toLowerCase().startsWith("rgba")) {
        [r, g, b, a] = s.substring(5, s.length - 1).split(',').map(s => parseFloat(s.trim()));
    } else if (s.toLowerCase().startsWith("rgb")) {
        [r, g, b] = s.substring(4, s.length - 1).split(',').map(s => parseFloat(s.trim()));
    } else {
        // @ts-ignore
        const color = colorName[s];
        if (color) {
            [r, g, b] = color;
        } else {
            return undefined;
        }
    }
    if (r < 0 || g < 0 || b < 0 || a < 0) return undefined;
    if (isNaN(r) || isNaN(g) || isNaN(b) || isNaN(a)) return undefined;
    return {
        r, g, b, a: p(a),
        rgba: `rgba(${r},${g},${b},${p(a)})`
    };
}

function p(n: any) {
    if (!n) return 0;
    return Math.floor(parseFloat(n) * 1000) / 1000;
}

const joinWithValues = (a: readonly string[], keys: any[]) => a.reduce((a, b, i) => {
    const v = keys[i - 1];
    return a + (v !== undefined ? v : '') + b
});

export const darkenColor = (color: string, p: number) => {
    const rgba = toRgba(color);
    if (rgba) {
        const {r, g, b, a} = rgba;
        const np = Math.max(0, Math.min(1 - p, 1));
        return `rgba(${Math.round(r * np)},${Math.round(g * np)},${Math.round(b * np)},${a})`;
    }
    return color;
};

const rgba = rgbaOf({});
export const darken = darkenOf({});
export default rgba;
