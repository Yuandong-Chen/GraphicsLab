let backFaceCulling = (models) => {
   return models.map(model => ({
    "points": model.points,
    "polygons": model.polygons.filter(x => vec3Mul(
      vecDiff(model.points[x[2]], model.points[x[1]]),
      vecDiff(model.points[x[3]], model.points[x[2]]))[2] <= 0)
  }));
}
// we essentially filter out those plate with N_plate facing backwards
