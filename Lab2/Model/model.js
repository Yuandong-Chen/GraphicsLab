// combinator for functions in viewModel
let pureModel = (models) => {
  return backFaceCulling(perspectiveTrans(worldToCamera(modelToWorld(models))));
}
