const parseCSSColor = require("csscolorparser")
const Color = class {
    /**
     * An RGBA color value. Create instances from color strings using the static
     * method `Color.parse`. The constructor accepts RGB channel values in the range
     * `[0, 1]`, premultiplied by A.
     *
     * @param {number} r The red channel.
     * @param {number} g The green channel.
     * @param {number} b The blue channel.
     * @param {number} a The alpha channel.
     * @private
     */
    constructor(r, g, b, a) {
        this.r = r || 0;
        this.g = g || 0;
        this.b = b || 0;
        this.a = a || 1;
    }
    
    static black(){return new Color(0,0,0,1)}
    static white(){return new Color(1,1,1,1)}
    static transparent(){return new Color(0,0,0,0)}
    static red(){return new Color(1,0,0,1)}

    /**
     * Parses valid CSS color strings and returns a `Color` instance.
     * @returns A `Color` instance, or `undefined` if the input is not a valid color string.
     */
    static parse(input) {
        if (!input)return undefined;
        if (typeof input !== 'string')return undefined;
        if (input instanceof Color)return input;
        
        const rgba = parseCSSColor(input);
        if (!rgba)return undefined;

        return new Color(
            rgba[0] / 255 * rgba[3],
            rgba[1] / 255 * rgba[3],
            rgba[2] / 255 * rgba[3],
            rgba[3]
        );
    }

    /**
     * Returns an RGBA string representing the color value.
     *
     * @returns An RGBA string.
     * @example
     * var purple = new Color.parse('purple');
     * purple.toString; // = "rgba(128,0,128,1)"
     * var translucentGreen = new Color.parse('rgba(26, 207, 26, .73)');
     * translucentGreen.toString(); // = "rgba(26,207,26,0.73)"
     */
    toString() {
        const [r, g, b, a] = this.toArray();
        return `rgba(${Math.round(r)},${Math.round(g)},${Math.round(b)},${a})`;
    }

    toArray() {
        const {r, g, b, a} = this;
        return a === 0 ? [0, 0, 0, 0] : [
            r * 255 / a,
            g * 255 / a,
            b * 255 / a,
            a
        ];
    }
}
// export default Color;
module.exports.Color=Color;