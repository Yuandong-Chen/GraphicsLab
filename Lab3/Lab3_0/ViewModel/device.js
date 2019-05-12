let prev = performance.now();
let deviceRender = (height, width, ticks, ctx, dataset) => {
  const lastTime = 1000/ticks
  ctx.clearRect(0, 0, height, width); // clear canvas
  let imageData = ctx.getImageData(0, 0, width, height);
  let buf = new ArrayBuffer(imageData.data.length);
  let buf8 = new Uint8ClampedArray(buf);
  let data = new Uint32Array(buf);
  for (let y = 0; y < height; ++y) {
    for (let x = 0; x < width; ++x) {
      data[y * width + x] = dataset[x][y][1];
    }
  }
  imageData.data.set(buf8);
  do {
    cur = performance.now();
  } while (cur - prev < lastTime);
  prev = cur;
  ctx.putImageData(imageData, 0, 0);
};
