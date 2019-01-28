let modelToWorld = (m) => {
  let deepClone = {
    points: new Array(m.points.length),
    polygons: new Array(m.polygons.length)
  };
  for (var i = 0; i < m.points.length; i++) {
    deepClone.points[i] = _.clone(m.points[i])
  }
  for (var i = 0; i < m.polygons.length; i++) {
    deepClone.polygons[i] = _.clone(m.polygons[i])
  }
  return deepClone;
}
