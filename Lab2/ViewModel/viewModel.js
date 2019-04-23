// this is for combinator of all viewModel functions
let viewModel = (height, width, ticks, ctx, model) => {
  deviceRender(height, width, ticks, ctx, normarlizeToDevice(height, width, model));
}
