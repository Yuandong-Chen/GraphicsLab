let rgbaToUint32 = (r, g, b, a) => {
  return (a << 24) | (b << 16) | (g << 8) | (r);
}

let mapToDevice = (width, height, arr) => {
  let [x, y, z] = arr;
  return [Math.floor((x + 1.0) * width / 2), Math.floor((y + 1.0) * height / 2), z]
}


// edge table, ET
// ET, list of [Ymax, Xmin, deltaX/deltaY]
let tryFillPoly = (height, width, poly, dataset, points) => {
  let color = (Math.random() * 155 + 100);
  let arr = poly.map(x => points[x])
  let arrY = arr.map(x => x[1])
  let YMIN = Math.floor(Math.min(...arrY))
  let YMAX = Math.ceil(Math.max(...arrY))

  let ET = new Array(YMAX - YMIN + 1);
  let AET = new Array();

  for (let i = 0; i < YMAX - YMIN + 1; i++) {
    ET[i] = new Array();
  }

  let minY = 0;
  let maxY = 0;
  // calc the normal vector first

  let N = vec3Mul(vecDiff(points[poly[1]], points[poly[0]]), vecDiff(points[poly[2]], points[poly[1]]));
  if(N[0] * N[0] + N[1] * N[1] + N[2] * N[2] <= 0 || N[2] == 0) {
    return;
  }

  for (let i = 0; i < poly.length; i++) {
    let fstPt = points[poly[i % poly.length]];
    let sndPt = points[poly[(i + 1) % poly.length]];
    minY = Math.floor(Math.min(fstPt[1], sndPt[1]));
    maxY = Math.floor(Math.max(fstPt[1], sndPt[1]) - 0.5); // we need to floor the max Y value

    if(fstPt[1] > sndPt[1]) {
      [fstPt, sndPt] = [sndPt, fstPt]
    }
    let k = (fstPt[1] - sndPt[1])/(fstPt[0] - sndPt[0])
    if(k == 0) {
      ET[minY - YMIN].push([minY, Math.min(fstPt[0], sndPt[0]), Infinity, Math.max(fstPt[0], sndPt[0])])
    }
    else {
      ET[minY - YMIN].push([maxY, fstPt[0], 1/k])
    }
  }
  // sort according to their position
  for (let i = 0; i < ET.length; i++) {
    ET[i].sort(function(a, b) {
      let A = a[1] + a[2];
      if(a[2] == Infinity) {
        A = a[1]
      }
      let B = b[1] + b[2];
      if(b[2] == Infinity) {
        B = b[1]
      }
      if(a[1] != b[1]) {
        return (a[1] - b[1]);
      }
      return (A - B);
    })
  }

  // initialize AET
  let beginY = 0;
  for (; beginY < ET.length; beginY++) {
    if(ET[beginY].length > 0) {
      for (let j = 0; j < ET[beginY].length; j++) {
        AET.push(ET[beginY][j]);
      }
      break;
    }
  }

  // we have to check the boundary first when assign number to dataset
  while(AET.length > 0 && beginY + YMIN < height) {
    // 3.2 paint according to AET within the boundary
    for (let i = 0; i + 1 < AET.length; i+=2) {
      // from AET[i] to AET[i + 1],
      let [Ymax1, Xmin1, DeltaK1, ...res1] = AET[i];
      let [Ymax2, Xmin2, DeltaK2, ...res2] = AET[(i + 1)];
      if(res2.length > 0) {
        Xmin2 = Math.max(res2[0], Xmin2);
      }

      for (let j = Math.floor(Xmin1); j <= Math.floor(Xmin2); j++) {
        // at beginY
        //let curZ = ((j - X) * deltaX_Z + (beginY - Y) * deltaY_Z) + Z;
        //console.log("beginY "+ beginY + " "+height + " " + j + " " + width + " " + poly[0]);
        if(beginY + YMIN >= 0 && beginY + YMIN < height && j >= 0 && j < width) {
          let curZ = (vecDotMul(N, points[poly[0]])-(N[0] * j + N[1] * (beginY + YMIN)))/N[2];
          if(curZ < dataset[j][beginY + YMIN][0]) {
            dataset[j][beginY + YMIN][1] = rgbaToUint32(color, color, color, 255);
            dataset[j][beginY + YMIN][0] = curZ;
          }
        }
      }
    }

    // 3.3 remove Edge from AET
    // 3.4 x => x + increment
    // 3.5 resort AET
    AET = AET.filter(x => x[0] > beginY + YMIN).map(x => [x[0], x[1] + x[2], x[2]]);
    //3.6 y++
    beginY++;
    if(beginY < ET.length && ET[beginY].length > 0) {
      for (let j = 0; j < ET[beginY].length; j++) {
        AET.push(ET[beginY][j]);
      }
    }

    AET.sort(function(a, b) {
        let A = a[1] + a[2];
        if(a[2] == Infinity) {
          A = a[1]
        }
        let B = b[1] + b[2];
        if(b[2] == Infinity) {
          B = b[1]
        }
        if(a[1] != b[1]) {
          return (a[1] - b[1]);
        }
        return (A - B);
      })
  }
}

let normarlizeToDevice = (height, width, normalized) => {
  let dataset = new Array(width);
  for (let i = 0; i < width; i++) {
    dataset[i] = new Array(height)
    for (let j = 0; j < height; j++) {
      dataset[i][j] = [Infinity, rgbaToUint32(0, 0, 0, 255)]; // set default to black
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
