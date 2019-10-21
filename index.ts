export default function rgba(strings: TemplateStringsArray, ...keys: any[]) {
    const result = joinWithValues(strings.raw, keys).match(/#([0-9a-fA-F]{6}),\s?([\d.]+(%)?)/i);
    if (result) {
        const [_, hexString, alphaString, isPercentile] = result;
        const hex = parseInt(hexString, 16);
        const r = hex >> 16 & 0xff;
        const g = hex >> 8 & 0xff;
        const b = hex & 0xff;
        const alpha = isPercentile ? parseFloat(alphaString) / 100 : parseFloat(alphaString);

        return `rgba(${r},${g},${b},${alpha})`;
    }
    return null;
}

const joinWithValues = (a: readonly string[], keys: any[]) => a.reduce((a, b, i) => {
    const v = keys[i - 1];
    return a + (v !== undefined ? v : '') + b
});
