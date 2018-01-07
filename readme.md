<h1 align="center">
<img src="/media/logo.png" width="30%"><br/>Candyland Dependency
</h1>

<h4 align="center">
  📷 Image watermarking dependency for the Candyland web app<br/><br/>
</h4>

<div align="center">
<img src="/media/demo.gif" width="60%"><br/><br/><br/>
</div>

[![Heroku Deployed](https://img.shields.io/badge/heroku-deployed-brightgreen.svg)](https://candyland-dep.herokuapp.com/) [![Build Status](https://travis-ci.com/klauscfhq/candyland-dependency.svg?token=rXPPxPTH1doiuVrFnjqh&branch=master)](https://travis-ci.com/klauscfhq/candyland-dependency) [![Dependency Status](https://dependencyci.com/github/klauscfhq/candyland-dependency/badge)](https://dependencyci.com/github/klauscfhq/candyland-dependency) [![XO code style](https://img.shields.io/badge/code_style-XO-5ed9c7.svg)](https://github.com/klauscfhq/candyland-dependency)

## Related

- [App](https://github.com/klauscfhq/candyland-app)
- [Docs](https://github.com/klauscfhq/candyland-docs)

## Contents

- [Related](#related)
- [Description](#description)
- [Usage](#usage)
- [API](#api)
- [Development](#development)
- [Team](#team)
- [License](#license)

## Description

Building the image watermarking dependency for the Candyland webapp.

You can view a live app demo [here](https://candyland-dep.herokuapp.com/).

## Usage

```js
const watermak = require('./index');

const inputImage = 'dogo.png';  // Input image path
const color = 'rgb(255, 0, 0)'; // Watermark text color
const text = 'Super Awesome Dogo!'; // Watermark text
const outputImage = 'dogoWatermarked.png';  // Output image path

watermark.addWatermark(inputImage, outputImage, text, color);
```

## API

### addWatermak`(input, output, text, color)`

Example: `addWatermak.('Hello.png', 'world.png', 'Hello World', 'rgb(0, 255, 0)');`

#### `input`

- Type: `String`

- Optional: `False`

- Default Value: `None`

Path of input `png`, `jpg`, `gif` image file.

#### `output`

- Type: `String`

- Optional: `True`

- Default Value: `Input file path`

Path of output `png`, `jpg`, `gif` image file.<br/>
If not provided the output file will be saved at the home directory under the name `~/candyland-watermark.png`.

#### `text`

- Type: `String`

- Optional: `True`

- Default Value: `'Candyland Watermark'`

Text to be user as watermark on input image file.<br/>
If not provided the `default text` value will be used.

#### `color`

- Type: `String`

- Optional: `True`

- Default Value: `rgb(255, 0, 0)`

Color to be used for the watermark text.<br/>
Any  `rgb` color value is valid to be used.<br/>
If not provided the `default color` red `rgb(255, 0, 0)` will be used.

## Development

The only **external** app dependency is [`imagemagick`](https://github.com/ImageMagick/ImageMagick).

You can get it straight from your system's official software repositories or by manually downloading the binaries from the [official imagemagick homepage](https://www.imagemagick.org/script/download.php).

- [Clone](https://help.github.com/articles/cloning-a-repository/) this repository to your local machine
- Navigate to your clone `cd candyland-dependency`
- Install the dependencies `npm install`
- Build the development server `npm start`
- Run the API `npm run dist`
- Cleanup assets & compiled files `npm run clean`

## Team

- Leonidas Avdelas ([@LoniasGR](https://github.com/LoniasGR)) **`AM: 3113182`**
- George Baxopoulos ([@georgebax](https://github.com/georgebax)) **`AM: 3113021`**
- Konstantinos Mitropoulos ([@tsikos7](https://github.com/tsikos7)) **`AM: 3113169`**
- Philippos Orphanoudakis ([@PhilOrfan](https://github.com/PhilOrfan)) **`AM: 3113140`**
- Klaus Sinani ([@klauscfhq](https://github.com/klauscfhq)) **`AM: 3113623`**
- Christos Stilianidis ([@Jezulas](https://github.com/Jezulas)) **`AM: 3113130`**

## License

MIT © [Candyland team](https://github.com/klauscfhq/candyland-dependency/blob/master/license.md)
