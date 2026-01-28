import { read, write } from "image-js";

async function loadImage() {
  try {
    const parsedImage = await read("./pepe.jpg");
    const height = parsedImage.height;
    const width = parsedImage.width;
    console.log("Successfully loaded image!");
    console.log(`Image size: ${height} x ${width}`);

    const pixelValues = [];
    for (let row = 0; row < parsedImage.height; row++) {
      for (let column = 0; column < parsedImage.width; column++) {
        pixelValues.push(parsedImage.getPixel(column, row));
      }
    }
    console.log("Converted to pixels");
    console.log(pixelValues.join(""));

    const brightnessValues = [];
    for (const pixel of pixelValues) {
      const brightness = parseInt(
        pixel.slice(0, 3).reduce((sum, v) => sum + v) / 3,
      );
      brightnessValues.push(brightness);
    }
    console.log("Converted to brightness");
    console.log(brightnessValues);

    // left darkest
    const symbols =
      '`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
    const asciiImage = [];
    for (const brightness of brightnessValues) {
      const symbolIndex = Math.round((brightness / 255) * (symbols.length - 1));
      asciiImage.push(symbols[symbolIndex]);
    }
    console.log("Converted to symbols");

    const asciiRows = [];
    for (let i = 0; i < brightnessValues.length; i += width) {
      const row = asciiImage.slice(i, i + width);
      asciiRows.push(row.map((c) => c.repeat(3)).join(""));
    }
    console.log(asciiRows.join("\n"));
  } catch (err) {
    console.error(err);
  }
}

loadImage();

// TODO:
// print in matrix green
// implement min/max and luminosity brightness mappings
// option to invert all brightness
// print pictures from webcam
// print ascii in glorious color
