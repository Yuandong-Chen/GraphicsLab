let perspectiveTrans = (models) => {
  let a = window.camera.f/(window.camera.f - window.camera.d)
  let b = window.camera.d/window.camera.h;
  let M_pers = [
    [b, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, a, -a * window.camera.d],
    [0, 0, 1, 0]
  ]

  let res = models.map(model => ({
    "points": model.points.map(x => [[0,0,0]].concat(vecDown(matMulVec(M_pers, x)))),
    "polygons": model.polygons.map(x => normOfPoly(x, model))
  }));

  for (var i = 0; i < res.length; i++) {
    for (var j = 0; j < res[i].polygons.length; j++) {
      for (var k = 1; k < res[i].polygons[j].length; k++) {
        res[i].points[res[i].polygons[j][k]][0] = vecAdd(res[i].points[res[i].polygons[j][k]][0], res[i].polygons[j][0])
      }
    }
  }

  return res.map(model => ({
    "points": model.points.map(x => [vecConst(x[0], 1/vecAbs(x[0]))].concat(x.slice(1))),
    "polygons": model.polygons.map(x => x.slice(1))
  }));
}
// some points x, y is out of [-1, 1], or z is out of [0, 1], that is ok, we do not add clipping here.

let normOfPoly = (x, model) => {
  let v = vec3Mul(vecDiff(model.points[x[1]], model.points[x[0]]), vecDiff(model.points[x[2]], model.points[x[1]]))
  return [vecConst(v, -1/vecAbs(v))].concat(x)
}
