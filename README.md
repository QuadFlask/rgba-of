rgba-of
=======

Simple alpha channel modifier using template literals syntax.


## Install

```sh
$ npm install rgba-of --save
```


## Usage

```js
import rgba from "rgba-of";

const color1 = rgba`#102030,0.3`; // => "rgba(16,32,48,0.3)"
const color2 = rgba`#102030,40%`; // => "rgba(16,32,48,0.4)"
const color3 = rgba`red,.4`; // => "rgba(255,0,0,0.4)"
const color4 = rgba`${'red'},.4`; // => "rgba(255,0,0,0.4)"

// or define custom colors
import {rgbaOf} from "rgba-of";

const rgba2 = rgbaOf({
    "primary": "red",
    "secondary": "#00ff00",
});

const color5 = rgba2`primary,0.2`; // => "rgba(255,0,0,0.2)"
const color6 = rgba2`secondary,25%`; // => "rgba(0,255,0,0.25)"
const color7 = rgba2`${'secondary'},25%`; // => "rgba(0,255,0,0.25)"
```
