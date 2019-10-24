import rgba, {rgbaOf, toRgba} from "./index";

it('rgba', function () {
    expect(rgba`#102030,0.2`).toEqual("rgba(16,32,48,0.2)");
    expect(rgba`#123456,0.3`).toEqual("rgba(18,52,86,0.3)");

    expect(rgba`#123456,20%`).toEqual("rgba(18,52,86,0.2)");
    expect(rgba`#123456,30%`).toEqual("rgba(18,52,86,0.3)");
    expect(rgba`#123456,30.5%`).toEqual("rgba(18,52,86,0.305)");

    expect(rgba`red,0.3`).toEqual("rgba(255,0,0,0.3)");
    expect(rgba`red,30%`).toEqual("rgba(255,0,0,0.3)");

    expect(rgba`#f00,30%`).toEqual("rgba(255,0,0,0.3)");
    expect(rgba`#800,30%`).toEqual("rgba(136,0,0,0.3)");
    expect(rgba`#109,30%`).toEqual("rgba(17,0,153,0.3)");
    expect(rgba`#fff,30%`).toEqual("rgba(255,255,255,0.3)");
    expect(rgba`#fff,.3`).toEqual("rgba(255,255,255,0.3)");

    expect(rgba`${'#ff0'},.3`).toEqual("rgba(255,255,0,0.3)");
    expect(rgba`#ff0,${0.3}`).toEqual("rgba(255,255,0,0.3)");
    expect(rgba`${'#ff0'},${0.3}`).toEqual("rgba(255,255,0,0.3)");
});

it('rgbaOf', function () {
    const rgba2 = rgbaOf({
        "primary": "red",
        "secondary": "#00ff00",
    });

    expect(rgba2`primary,0.2`).toEqual("rgba(255,0,0,0.2)");
    expect(rgba2`primary,25%`).toEqual("rgba(255,0,0,0.25)");
    expect(rgba2`secondary,100%`).toEqual("rgba(0,255,0,1)");
    expect(rgba2`secondary,25%`).toEqual("rgba(0,255,0,0.25)");
});

it('rgba alpha add/sub', function () {
    expect(rgba`rgba(1,2,3,0.1),+0.2`).toEqual("rgba(1,2,3,0.3)");
    expect(rgba`rgba(1,2,3,0.1),-0.1`).toEqual("rgba(1,2,3,0)");
    expect(rgba`rgba(1,2,3,0.1),-0.2`).toEqual("rgba(1,2,3,0)");
    expect(rgba`rgba(1,2,3,1),-0.1`).toEqual("rgba(1,2,3,0.9)");
    expect(rgba`rgba(1,2,3,1),+0.1`).toEqual("rgba(1,2,3,1)");
    expect(rgba`rgba(1,2,3,0.5),+10%`).toEqual("rgba(1,2,3,0.6)");
});

it('unsupported formats', function () {
    expect(rgba`#f0,30%`).toBeUndefined();
    expect(rgba`,30%`).toBeUndefined();
    expect(rgba`30%`).toBeUndefined();
    expect(rgba`asd`).toBeUndefined();
    expect(rgba``).toBeUndefined();
    expect(rgba`#f00,,`).toBeUndefined();
    expect(rgba`#f00,asd%`).toBeUndefined();
});

it('toRgba', function () {
    // #RRGGBB
    expect(toRgba("#ff0000")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("#ffff00")!.rgba).toEqual("rgba(255,255,0,1)");
    expect(toRgba("#ffffff")!.rgba).toEqual("rgba(255,255,255,1)");
    expect(toRgba("#FFFFFF")!.rgba).toEqual("rgba(255,255,255,1)");

    // #AARRGGBB
    expect(toRgba("#ffff0000")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("#00ff0000")!.rgba).toEqual("rgba(255,0,0,0)");
    expect(toRgba("#20ffff00")!.rgba).toEqual("rgba(255,255,0,0.125)");

    // #RGB
    expect(toRgba("#f00")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("#f00")!.rgba).toEqual("rgba(255,0,0,1)");

    // #ARGB
    expect(toRgba("#3f00")!.rgba).toEqual("rgba(255,0,0,0.2)");
    expect(toRgba("#4f00")!.rgba).toEqual("rgba(255,0,0,0.266)");

    // rgb(r,g,b)
    expect(toRgba("rgb(255,0,0)")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("RGB(255,0,0)")!.rgba).toEqual("rgba(255,0,0,1)");

    // rgba(r,g,b,a)
    expect(toRgba("rgba(255,0,0,1)")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("rgba(255,0,0,0.5)")!.rgba).toEqual("rgba(255,0,0,0.5)");
    expect(toRgba("rgba(255,0,0,0.11)")!.rgba).toEqual("rgba(255,0,0,0.11)");
    expect(toRgba("rgba(255,0,0,0)")!.rgba).toEqual("rgba(255,0,0,0)");
    expect(toRgba("rgba( 255, 0, 0, 0)")!.rgba).toEqual("rgba(255,0,0,0)");
    expect(toRgba("RGBA( 255, 0, 0, 0)")!.rgba).toEqual("rgba(255,0,0,0)");

    // color names
    expect(toRgba("red")!.rgba).toEqual("rgba(255,0,0,1)");
    expect(toRgba("blue")!.rgba).toEqual("rgba(0,0,255,1)");
});
