import rgba, {rgbaOf} from "./index";

it('rgba', function () {
    expect(rgba`#102030,0.2`).toEqual("rgba(16,32,48,0.2)");
    expect(rgba`#123456,0.3`).toEqual("rgba(18,52,86,0.3)");

    expect(rgba`#123456,20%`).toEqual("rgba(18,52,86,0.2)");
    expect(rgba`#123456,30%`).toEqual("rgba(18,52,86,0.3)");
    expect(rgba`#123456,30.5%`).toEqual("rgba(18,52,86,0.305)");

    expect(rgba`red,0.3`).toEqual("rgba(255,0,0,0.3)");
    expect(rgba`red,30%`).toEqual("rgba(255,0,0,0.3)");

    expect(rgba`#f00,30%`).toEqual("rgba(255,0,0,0.3)");
    expect(rgba`#fff,30%`).toEqual("rgba(255,255,255,0.3)");
    expect(rgba`#fff,.3`).toEqual("rgba(255,255,255,0.3)");
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

it('unsupported formats', function () {
    expect(rgba`#f0,30%`).toEqual(null);
    expect(rgba`,30%`).toEqual(null);
    expect(rgba`30%`).toEqual(null);
    expect(rgba`asd`).toEqual(null);
    expect(rgba``).toEqual(null);
    expect(rgba`#f00,,`).toEqual(null);
    expect(rgba`#f00,asd%`).toEqual(null);
});
