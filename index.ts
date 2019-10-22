import colorString from "color-string";

export function rgbaOf(customColors: { [colorName: string]: string }): (strings: TemplateStringsArray, ...keys: any[]) => string | null {
    return (strings: TemplateStringsArray, ...keys: any[]) => {
        const [colorPart, opacityPart] = joinWithValues(strings.raw, keys).split(",");
        const customColor = customColors[colorPart];
        const color = colorString.get(customColor || colorPart);
        if (color) {
            const [r, g, b] = color.value;
            const result = opacityPart.match(/([\d.]+(%)?)/);
            if (result) {
                const [_, alphaString, isPercentile] = result;
                const alpha = isPercentile ? parseFloat(alphaString) / 100 : parseFloat(alphaString);
                return `rgba(${r},${g},${b},${alpha})`;
            }
        }
        return null;
    }
}

const joinWithValues = (a: readonly string[], keys: any[]) => a.reduce((a, b, i) => {
    const v = keys[i - 1];
    return a + (v !== undefined ? v : '') + b
});

const rgba = rgbaOf({});
export default rgba;
