export declare function rgbaOf(customColors: {
    [colorName: string]: string;
}): (strings: TemplateStringsArray, ...keys: any[]) => string | null;
declare const rgba: (strings: TemplateStringsArray, ...keys: any[]) => string | null;
export default rgba;
