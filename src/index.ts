type RgbType = {
    red: number,
    green: number,
    blue: number,
};

export class Colors {
    result: string[] = [];
    limit: number = 0;
    prefix: boolean = false;

    constructor() { }

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
        return `${color.padStart(6, color[0])}`
    }

    #generate(rgb: RgbType, percentage: number, type: 'shades' | 'tints') {
        const color: RgbType = { red: 0, green: 0, blue: 0 };

        if (type === 'shades') {
            color.red = this.#getShade(rgb.red, this.limit);
            color.green = this.#getShade(rgb.green, this.limit);
            color.blue = this.#getShade(rgb.blue, this.limit);
        } else {
            color.red = this.#getTint(rgb.red, this.limit);
            color.green = this.#getTint(rgb.green, this.limit);
            color.blue = this.#getTint(rgb.blue, this.limit);
        }

        while (this.limit < 100) {
            const hex = this.#rgb2hex(color);
            this.result.push(`${this.prefix ? '#' + hex : hex}`);
            this.limit += percentage;
        }

    }

    #getTint(color: number, percentage: number) {
        const tint = Math.round(color + (255 - color) * (percentage / 100));
        // Return the max value 255 in case the calculation yields a number larger than the actual possible output.
        return (tint > 255) ? 255 : tint;
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
        if (color.length !== 3 && color.length !== 6 || percentage < 0 || percentage > 100) {
            throw new Error('Invalid input. Wrong input values are given.');
        }

        // Pad the HEX string if it has only 3 characters
        if (color.length === 3) {
            color = this.#padHex(color);
        }

        // Check if the prefix should be added.
        if (prefix) this.prefix = true;

        const rgb = this.#hex2Rgb(color);
        // Generate Tints
        this.#generate(rgb, percentage, 'tints');
        // Reset Limit
        this.limit = 0;
        // Generate Shades
        this.#generate(rgb, percentage, 'shades');

        // Arrange colors in ascending order
        const mid = this.result.length / 2
        const tints = this.result.slice(0, mid).reverse();
        const shades = this.result.slice(mid).reverse();
        shades.unshift(`${this.prefix ? '#' + color : color}`);

        // Reset global variables
        this.limit = 0;
        this.result = [];
        this.prefix = false;

        return tints.concat(shades);
    }
}
