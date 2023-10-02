(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Hexashades = {}));
})(this, (function (exports) { 'use strict';

    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
        var e = new Error(message);
        return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
    };

    /**
     * Hexashades - create an array of shades & tints for a given color.
     *  @link https://github.com/arjunkdot/hexashades/
     * @license MIT
     */
    var _Colors_instances, _Colors_hex2Rgb, _Colors_rgb2hex, _Colors_hex2Groups, _Colors_getShade, _Colors_padHex, _Colors_generateShades, _Colors_getTint, _Colors_generateTints;
    class Colors {
        constructor() {
            _Colors_instances.add(this);
            this.result = [];
            this.limit = 0;
        }
        createColors(color, percentage) {
            // Check if HEX is valid
            if (color.length !== 3 && color.length !== 6) {
                throw new Error("Not a valid length");
            }
            // Pad the HEX string if it has only 3 characters
            if (color.length === 3) {
                color = __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_padHex).call(this, color);
            }
            const rgb = __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_hex2Rgb).call(this, color);
            // Generate Tints
            __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_generateTints).call(this, rgb, percentage);
            // Reset Limit
            this.limit = 0;
            // Generate Shades
            __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_generateShades).call(this, rgb, percentage);
            // Arrange colors in ascending order
            const tints = this.result.slice(0, this.result.length / 2).reverse();
            const shades = this.result.slice(this.result.length / 2, this.result.length).reverse();
            shades.unshift(color);
            return tints.concat(shades);
        }
    }
    _Colors_instances = new WeakSet(), _Colors_hex2Rgb = function _Colors_hex2Rgb(hex) {
        const sections = __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_hex2Groups).call(this, hex);
        const rgb = { red: 0, green: 0, blue: 0 };
        if (sections === null)
            throw new Error('Invalid input. Please make sure the HEX code given is valid.');
        rgb["red"] = parseInt(sections[0], 16);
        rgb["green"] = parseInt(sections[1], 16);
        rgb["blue"] = parseInt(sections[2], 16);
        // Check for invalid output
        if (Object.values(rgb).includes(NaN)) {
            throw new Error('Invalid input. Please make sure the HEX code given is valid.');
        }
        return rgb;
    }, _Colors_rgb2hex = function _Colors_rgb2hex(rgb) {
        return ((1 << 24) + (rgb.red << 16) + (rgb.green << 8) + rgb.blue)
            .toString(16)
            .slice(1);
    }, _Colors_hex2Groups = function _Colors_hex2Groups(input) {
        if (!input.match(/^[0-9A-F]{6}$/i)) {
            throw new Error('Invalid input. Please make sure the HEX code given is valid.');
        }
        return input.match(/.{1,2}/g);
    }, _Colors_getShade = function _Colors_getShade(color, percentage) {
        return Math.round(color * (percentage / 100));
    }, _Colors_padHex = function _Colors_padHex(color) {
        return `${color[0].padStart(2, color[0])}${color[1].padStart(2, color[1])}${color[2].padStart(2, color[2])}`;
    }, _Colors_generateShades = function _Colors_generateShades(rgb, percentage) {
        const rgbShade = {
            red: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getShade).call(this, rgb.red, this.limit),
            green: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getShade).call(this, rgb.green, this.limit),
            blue: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getShade).call(this, rgb.blue, this.limit),
        };
        this.result.push(__classPrivateFieldGet(this, _Colors_instances, "m", _Colors_rgb2hex).call(this, rgbShade));
        this.limit += percentage;
        if (this.limit === 100) {
            return;
        }
        __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_generateShades).call(this, rgb, percentage);
    }, _Colors_getTint = function _Colors_getTint(color, percentage) {
        return Math.round(color + (255 - color) * (percentage / 100));
    }, _Colors_generateTints = function _Colors_generateTints(rgb, percentage) {
        this.limit += percentage;
        const rgbTint = {
            red: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getTint).call(this, rgb.red, this.limit),
            green: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getTint).call(this, rgb.green, this.limit),
            blue: __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_getTint).call(this, rgb.blue, this.limit),
        };
        this.result.push(__classPrivateFieldGet(this, _Colors_instances, "m", _Colors_rgb2hex).call(this, rgbTint));
        if (this.limit === 100) {
            return;
        }
        __classPrivateFieldGet(this, _Colors_instances, "m", _Colors_generateTints).call(this, rgb, percentage);
    };

    exports.Colors = Colors;

}));
