// this is for combinator of all viewModel functions
let viewModel = (height, width, ticks, ctx, models) => {
  deviceRender(height, width, ticks, ctx, normarlizeToDevice(height, width, models));
}
