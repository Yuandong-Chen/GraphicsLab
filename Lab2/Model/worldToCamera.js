// we need to add normal vector for every polygons here.

let worldToCamera = (model) => {
  let T = [[1, 0, 0, -window.camera.C[0]],
           [0, 1, 0, -window.camera.C[1]],
           [0, 0, 1, -window.camera.C[2]],
           [0, 0, 0, 1]];
  let R = [[window.camera.U[0], window.camera.U[1], window.camera.U[2]],
           [window.camera.V[0], window.camera.V[1], window.camera.V[2]],
           [window.camera.N[0], window.camera.N[1], window.camera.N[2]],
           [0, 0, 0, 1]
         ];
  let RT = matMul(R, T);
   return {
    points: model.points.map(x => matMulVec(RT, vecUp(x))),
    polygons: model.polygons,
  };
}
