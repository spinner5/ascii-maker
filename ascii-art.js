import { read, write } from "image-js";
import readline from "node:readline";

async function loadImage() {
  try {
    const imagePath = "./car.jpg";
    const parsedImage = await read(imagePath);
    const height = parsedImage.height;
    const width = parsedImage.width;
    console.log("Successfully loaded image!");
    console.log(`Image file: ${imagePath.slice(2)}`);
    console.log(`Image size: ${height} x ${width}`);

    const pixelValues = [];
    for (let row = 0; row < parsedImage.height; row++) {
      for (let column = 0; column < parsedImage.width; column++) {
        pixelValues.push(parsedImage.getPixel(column, row));
      }
    }
    // console.log("Converted to pixels");
    // console.log(pixelValues.join(""));

    const brightnessValues = [];
    for (const pixel of pixelValues) {
      const brightness = parseInt(
        pixel.slice(0, 3).reduce((sum, v) => sum + v) / 3,
      );
      brightnessValues.push(brightness);
    }
    // console.log("Converted to brightness");
    // console.log(brightnessValues);

    // left darkest
    const symbols =
      '`^",:;Il!i~+_-?][}{1)(|\\/tfjrxnuvczXYUJCLQ0OZmwqpdbkhao*#MW&8%B@$';
    const asciiChars = [];
    for (const brightness of brightnessValues) {
      const symbolIndex = Math.round((brightness / 255) * (symbols.length - 1));
      asciiChars.push(symbols[symbolIndex]);
    }
    console.log("Converted to symbols");

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout,
    });

    let print = false;
    rl.question("Print image? (y/yes)", (answer) => {
      if (answer === "y" || answer === "yes") {
        printAscii();
      } else {
        console.log("Operation canceled.");
      }

      rl.close();
    });

    function printAscii() {
      for (let i = 0; i < height; i++) {
        const row = asciiChars
          .slice(i * width, (i + 1) * width)
          .map((c) => c.repeat(2))
          .join("");
        console.log(row);
      }
    }
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
