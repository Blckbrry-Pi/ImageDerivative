let rawImage;
let imageDerivative;
let derivativeOfDerivative;

function preload() {
  rawImage = loadImage('ImageIn.png');
  imageDerivative = loadImage('ImageIn.png');
  derivativeOfDerivative = loadImage('ImageIn.png');
}

function setup() {
  createCanvas(2724, 1080);
  
  image(rawImage, 0, 0);
  getDerivative(imageDerivative);
  image(imageDerivative, 908, 0);
  getDerivative(derivativeOfDerivative);
  getDerivative(derivativeOfDerivative);
  image(derivativeOfDerivative, 1816, 0);
  // Apply gray filter to the whole canvas
}

function imageIndex(img, x, y) {
  return 4 * (x + y * img.width);
}

function getColorAtindex(img, x, y) {
  let idx = imageIndex(img, x, y);
  let pix = img.pixels;
  let red = pix[idx];
  let green = pix[idx + 1];
  let blue = pix[idx + 2];
  let alpha = pix[idx + 3];
  return color(red, green, blue, alpha);
}

function setColorAtIndex(img, x, y, clr) {
  let idx = imageIndex(img, x, y);

  let pix = img.pixels;
  pix[idx] = red(clr);
  pix[idx + 1] = green(clr);
  pix[idx + 2] = blue(clr);
  pix[idx + 3] = alpha(clr);
}

function getDerivative(img, steps) {
  img.loadPixels();

  for (let y = 0; y < img.height; y++) {
    for (let x = 0; x < img.width; x++) {
      let clr = getColorAtindex(img, x, y);
      let clrx = getColorAtindex(img, x + 1, y);
      let clry = getColorAtindex(img, x, y + 1);
      let clrxy = getColorAtindex(img, x + 1, y + 1);
      let rchange = red(clr) * 3 - red(clrx) - red(clry) - red(clrxy);
      let gchange = green(clr) * 3 - green(clrx) - green(clry) - green(clrxy);
      let bchange = blue(clr) * 3 - blue(clrx) - blue(clry) - blue(clrxy);
      
      
      setColorAtIndex(img, x, y, color(Math.abs(rchange), Math.abs(gchange), Math.abs(bchange)));
    }
  }

  img.updatePixels();
}
