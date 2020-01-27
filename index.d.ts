export declare function rgbaOf(customColors: {
    [colorName: string]: string;
}, fallbackColor?: string): (strings: TemplateStringsArray, ...keys: any[]) => string;
export declare function darkenOf(customColors: {
    [colorName: string]: string;
}, fallbackColor?: string): (strings: TemplateStringsArray, ...keys: any[]) => string;
export declare function toRgba(s: string): {
    r: number;
    g: number;
    b: number;
    a: number;
    rgba: string;
} | undefined;
export declare const darkenColor: (color: string, p: number) => string;
declare const rgba: (strings: TemplateStringsArray, ...keys: any[]) => string;
export declare const darken: (strings: TemplateStringsArray, ...keys: any[]) => string;
export default rgba;
