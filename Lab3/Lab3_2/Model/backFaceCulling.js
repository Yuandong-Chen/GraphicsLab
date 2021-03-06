let backFaceCulling = (models) => {
   return models.map(model => ({
    "points": model.points,
    "polygons": model.polygons.filter(x => vec3Mul(
      vecDiff(model.points[x[1]].slice(1), model.points[x[0]].slice(1)),
      vecDiff(model.points[x[2]].slice(1), model.points[x[1]].slice(1)))[2] <= 0)
  }));
}
// we essentially filter out those plate with N_plate facing backwards
