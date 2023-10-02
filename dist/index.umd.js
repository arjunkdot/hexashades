(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Hexashades = {}));
})(this, (function (exports) { 'use strict';

    /**
     * Create an array of shades & tints for a given color
     * @license MIT
     */
    class Colors {
        result;
        limit;
        constructor() {
            this.result = [];
            this.limit = 0;
        }
        #hex2Rgb(hex) {
            const sections = this.#hexToGroups(hex);
            const rgb = { red: 0, green: 0, blue: 0 };
            if (sections === null)
                return rgb;
            rgb["red"] = parseInt(sections[0], 16);
            rgb["green"] = parseInt(sections[1], 16);
            rgb["blue"] = parseInt(sections[2], 16);
            // Check for invalid output
            if (Object.values(rgb).includes(NaN)) {
                return rgb;
            }
            return rgb;
        }
        #rgb2hex(rgb) {
            return ((1 << 24) + (rgb.red << 16) + (rgb.green << 8) + rgb.blue)
                .toString(16)
                .slice(1);
        }
        #hexToGroups(input) {
            return input.match(/.{1,2}/g);
        }
        #getShade(color, percentage) {
            return Math.round(color * (percentage / 100));
        }
        #generateShades(rgb, percentage) {
            const rgbShade = {
                red: this.#getShade(rgb.red, this.limit),
                green: this.#getShade(rgb.green, this.limit),
                blue: this.#getShade(rgb.blue, this.limit),
            };
            this.result.push(this.#rgb2hex(rgbShade));
            this.limit += percentage;
            if (this.limit === 100) {
                return;
            }
            this.#generateShades(rgb, percentage);
        }
        #getTint(color, percentage) {
            return Math.round(color + (255 - color) * (percentage / 100));
        }
        #generateTints(rgb, percentage) {
            this.limit += percentage;
            const rgbTint = {
                red: this.#getTint(rgb.red, this.limit),
                green: this.#getTint(rgb.green, this.limit),
                blue: this.#getTint(rgb.blue, this.limit),
            };
            this.result.push(this.#rgb2hex(rgbTint));
            if (this.limit === 100) {
                return;
            }
            this.#generateTints(rgb, percentage);
        }
        createColors(color, percentage) {
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
            shades.unshift(color);
            return tints.concat(shades);
        }
    }

    exports.Colors = Colors;

}));
