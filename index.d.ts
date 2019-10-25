export declare function rgbaOf(customColors: {
    [colorName: string]: string;
}, fallbackColor?: string): (strings: TemplateStringsArray, ...keys: any[]) => string;
export declare function toRgba(s: string): {
    r: number;
    g: number;
    b: number;
    a: number;
    rgba: string;
} | undefined;
declare const rgba: (strings: TemplateStringsArray, ...keys: any[]) => string;
export default rgba;
