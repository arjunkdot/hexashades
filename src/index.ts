/**
 * Hexashades - create an array of shades & tints for a given color.
 * @version 1.0.1
 * @link https://github.com/arjunkdot/hexashades/
 * @license MIT
 */

type RgbType = {
    red: number,
    green: number,
    blue: number,
};

export class Colors {
    result: string[];
    limit: number;
    prefix: boolean;

    constructor() {
        this.result = [];
        this.limit = 0;
        this.prefix = false;
    }

    #hex2Rgb(hex: string) {
        const sections = this.#hex2Groups(hex);
        const rgb = { red: 0, green: 0, blue: 0 };

        if (sections === null) throw new Error('Invalid input. Please make sure the HEX code given is valid.');

        rgb["red"] = parseInt(sections[0], 16);
        rgb["green"] = parseInt(sections[1], 16);
        rgb["blue"] = parseInt(sections[2], 16);
        // Check for invalid output
        if (Object.values(rgb).includes(NaN)) {
            throw new Error('Invalid input. Please make sure the HEX code given is valid.')
        }

        return rgb;

    }

    #rgb2hex(rgb: RgbType) {
        return ((1 << 24) + (rgb.red << 16) + (rgb.green << 8) + rgb.blue)
            .toString(16)
            .slice(1);
    }

    #hex2Groups(input: string) {
        if (!input.match(/^[0-9A-F]{6}$/i)) {
            throw new Error('Invalid input. Please make sure the HEX code given is valid.');
        }
        return input.match(/.{1,2}/g);
    }

    #getShade(color: number, percentage: number) {
        return Math.round(color * (percentage / 100));
    }

    #padHex(color: string) {
        return `${color[0].padStart(2, color[0])}${color[1].padStart(2, color[1])}${color[2].padStart(2, color[2])}`;
    }

    #generateShades(rgb: RgbType, percentage: number) {
        const rgbShade = {
            red: this.#getShade(rgb.red, this.limit),
            green: this.#getShade(rgb.green, this.limit),
            blue: this.#getShade(rgb.blue, this.limit),
        };
        const hex = this.#rgb2hex(rgbShade);
        this.result.push(`${this.prefix ? '#' + hex : hex}`);
        this.limit += percentage;
        if (this.limit >= 100) {
            return;
        }

        this.#generateShades(rgb, percentage);
    }

    #getTint(color: number, percentage: number) {
        const tint = Math.round(color + (255 - color) * (percentage / 100));
        // Return the max value 255 in case the calculation yields a number larger than the actual possible output.
        return (tint > 255) ? 255 : tint;
    }

    #generateTints(rgb: RgbType, percentage: number) {
        this.limit += percentage;
        const rgbTint = {
            red: this.#getTint(rgb.red, this.limit),
            green: this.#getTint(rgb.green, this.limit),
            blue: this.#getTint(rgb.blue, this.limit),
        };
        const hex = this.#rgb2hex(rgbTint);
        this.result.push(`${this.prefix ? '#' + hex : hex}`);
        if (this.limit >= 100) {
            return;
        }
        this.#generateTints(rgb, percentage);
    }

    createColors(color: string, percentage: number, prefix: boolean = false) {
        // Check if the input exists
        if (!color || !percentage) {
            throw new Error('No input provided');
        }
        // Check for input types
        if (typeof color !== 'string' || typeof percentage !== 'number' || typeof prefix !== 'boolean') {
            throw new Error('Invalid input. Wrong input types are given.');
        }
        // Check if the percentage is valid
        if (percentage < 0 || percentage > 100) {
            throw new Error('Invalid input. Invalid percentage value is given.')
        }
        // Check if HEX is valid
        if (color.length !== 3 && color.length !== 6) {
            throw new Error("Invalid input. Not a valid length.");
        }
        // Pad the HEX string if it has only 3 characters
        if (color.length === 3) {
            color = this.#padHex(color);
        }

        // Check if the prefix should be added.
        if (prefix) this.prefix = true;

        const rgb = this.#hex2Rgb(color);
        // Generate Tints
        this.#generateTints(rgb, percentage);
        // Reset Limit
        this.limit = 0;
        // Generate Shades
        this.#generateShades(rgb, percentage);

        // Arrange colors in ascending order
        const tints = this.result.slice(0, this.result.length / 2).reverse();
        const shades = this.result.slice(this.result.length / 2, this.result.length).reverse();
        shades.unshift(`${this.prefix ? '#' + color : color}`); // REMOVE THIS COMMENT: Could possibley add the item to the end of the array and then reverse it to make it more fast.

        // Reset global variables
        this.limit = 0;
        this.result = [];
        this.prefix = false;

        return tints.concat(shades);
    }
}
