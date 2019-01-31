let rgbaToUint32 = (r, g, b, a) => {
  return (a << 24) | (b << 16) | (g << 8) | (r);
}

let mapToDevice = (width, height, arr) => {
  let [x, y, z] = arr;
  return [Math.floor((x + 1.0) * width / 2), Math.floor((y + 1.0) * height / 2), z]
}

let inPoly = (x, y, poly, points, dataset) => {
  // on the right side of every vec
  // just this directed distance, if all non-negative, in poly, try to render it, or else do not render
  // rander x, y pixel based on its distance to the closest line of poly.
  let i = 0
  let minDis = Infinity;
  for (; i < poly.length; i++) {
    let v1 = vecDiff(
      [points[poly[(i + 1) % poly.length]][0], points[poly[(i + 1) % poly.length]][1], 0],
      [points[poly[i]][0], points[poly[i]][1], 0]
    )
    v1 = vecConst(v1, 1/vecAbs(v1));
    let dis = vec3Mul([points[poly[(i + 1) % poly.length]][0] - x, points[poly[(i + 1) % poly.length]][1] - y, 0], v1)[2]
    if(dis > 0) {
      return;
    }
    else if(minDis > -dis) {
      minDis = -dis;
    }
  }
  let v1 = vecDiff(points[poly[1]], points[poly[0]])
  let v2 = vecDiff(points[poly[2]], points[poly[0]])
  let a = v1[0]
  let b = v2[0]
  let e = x - points[poly[0]][0]
  let c = v1[1]
  let d = v2[1]
  let f = y - points[poly[0]][1]
  let c1 = (d * e - b * f + 0.0) / (a * d - b * c);
  let c2 = (a * f - c * e + 0.0) / (a * d - b * c);
  let z = c1 * v1[2] + c2 * v2[2] + points[poly[0]][2];
  if(z > 0 && z <= dataset[x][y][0]) {
    dataset[x][y][0] = z
    let strength = Math.floor(255/(minDis + 1))
    if(minDis <= 1) {
      dataset[x][y][1] = rgbaToUint32(strength, strength, strength, 255);
    }
    else {
      dataset[x][y][1] = rgbaToUint32(0, 0, 0, 255);
    }
  }
}

let tryFillPoly = (height, width, poly, dataset, points) => {
  let arr = poly.map(x => points[x])
  let arrX = arr.map(x => x[0])
  let arrY = arr.map(x => x[1])
  let arrZ = arr.map(x => x[2])
  let minX = Math.min(...arrX)
  let maxX = Math.max(...arrX)
  let minY = Math.min(...arrY)
  let maxY = Math.max(...arrY)
  let minZ = Math.min(...arrZ)
  let maxZ = Math.max(...arrZ)
  if(maxZ <= 0 || minZ >= 1 || maxX <= 0 || minX >= width || maxY <= 0 || minY >= height) {
    return;
  }
  for (let i = Math.max(0, minX); i < Math.min(width, maxX + 1); i++) {
    for (let j = Math.max(0, minY); j < Math.min(height, maxY + 1); j++) {
      inPoly(i, j, poly, points, dataset);
    }
  }
  return 0;
}

let normarlizeToDevice = (height, width, normalized) => {
  let dataset = new Array(width);
  for (let i = 0; i < width; i++) {
    dataset[i] = new Array(height)
    for (let j = 0; j < height; j++) {
      dataset[i][j] = [1, rgbaToUint32(0, 0, 0, 255)]; // set default to black
    }
  }
  for (var i = 0; i < normalized.points.length; i++) {
    normalized.points[i] = mapToDevice(width, height, normalized.points[i]);
  }

  for (var i = 0; i < normalized.polygons.length; i++) {
    tryFillPoly(height, width, normalized.polygons[i], dataset, normalized.points);
  }
  return dataset;
}
// set pixel data here
// for every polygons we need to compute every pixel in it
// this may
