// combinator for functions in viewModel
let pureModel = (m) => {
  return backFaceCulling(perspectiveTrans(worldToCamera(modelToWorld(m))));
}
