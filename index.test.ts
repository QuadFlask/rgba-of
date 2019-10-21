import rgba from "./index";

it('test', function () {
    expect(rgba`#102030,0.2`).toEqual("rgba(16,32,48,0.2)");
    expect(rgba`#123456,0.3`).toEqual("rgba(18,52,86,0.3)");

    expect(rgba`#123456,20%`).toEqual("rgba(18,52,86,0.2)");
    expect(rgba`#123456,30%`).toEqual("rgba(18,52,86,0.3)");
});
