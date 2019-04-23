let perspectiveTrans = (model) => {
  let a = window.camera.f/(window.camera.f - window.camera.d)
  let b = window.camera.d/window.camera.h;
  let M_pers = [
    [b, 0, 0, 0],
    [0, b, 0, 0],
    [0, 0, a, -a * window.camera.d],
    [0, 0, 1, 0]
  ]

  return {
    points: model.points.map(x => vecDown(matMulVec(M_pers, x))),
    polygons: model.polygons,
  };
}
// some points x, y is out of [-1, 1], or z is out of [0, 1], that is ok, we do not add clipping here.
