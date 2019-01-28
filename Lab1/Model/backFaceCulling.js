let backFaceCulling = (model) => {
  return {
    points: model.points,
    polygons: model.polygons.filter(x => vec3Mul(
      vecDiff(model.points[x[1]], model.points[x[0]]),
      vecDiff(model.points[x[2]], model.points[x[1]]))[2] <= 0)
  }
}
// we essentially filter out those plate with N_plate facing backwards
