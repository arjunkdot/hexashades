# Hexashades

![NPM Version](https://img.shields.io/npm/v/hexashades?logo=npm&color=%23CB0001)
![NPM Bundle Size](https://img.shields.io/bundlephobia/min/hexashades)
![License](https://img.shields.io/github/license/arjunkdot/hexashades)

Hexashades helps you generate a range of shades and tints for any specified RGB Hex color code.

> Currently, it only supports RGB Hex codes. More input formats will be allowed in the future.

## Installation

**NPM**

```sh
npm install hexashades --save
```

Or load using a `<script>` tag from a CDN

```html
<script src="https://cdn.jsdelivr.net/npm/hexashades/"></script>
```

## Usage

```js
// Import Hexashades & initialize.
import { Colors } from "hexashades";
const color = new Colors();

// Generate tints & shades.
const tintsAndShades = color.createColors("663399", 10, false);
```

## API

### createColors(color, percentage, prefix)

Returns an array of tints & shades for the given color with a given percentage of increments.

Throws an error if no/invalid inputs are given.

- `@param {string} color` - a valid RGB hex code without #
- `@param {number} percentage` - a valid percentage value between 0 and 100
- `@param {boolean} prefix` - (Optional) true/false. Whether the output should include #
- `@return {Array<string>}` - array with hex codes

## License

MIT © arjunkdot
