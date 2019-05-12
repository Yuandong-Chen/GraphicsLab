let Rx = (alpha) => {
  return [[1, 0, 0],
   [0, Math.cos(alpha), -Math.sin(alpha)],
   [0, Math.sin(alpha), Math.cos(alpha)]
  ];
}

let Ry = (beta) => {
  return [[Math.cos(beta), 0, Math.sin(beta)],
   [0, 1, 0],
   [-Math.sin(beta), 0, Math.cos(beta)]
  ];
}

let stepLen = 1;
let degreeStepLen = Math.PI*2/180;
let bindListen = () => {
  $(document).on("keypress", function (e) {
      if(e.which == 'w'.charCodeAt(0)) {
        window.camera.C = vecAdd(window.camera.C, vecConst(window.camera.N, stepLen));
      }
      else if(e.which == 'a'.charCodeAt(0)) {
        window.camera.C = vecAdd(window.camera.C, vecConst(window.camera.U, -stepLen));
      }
      else if(e.which == 's'.charCodeAt(0)) {
        window.camera.C = vecAdd(window.camera.C, vecConst(window.camera.N, -stepLen));
      }
      else if(e.which == 'd'.charCodeAt(0)) {
        window.camera.C = vecAdd(window.camera.C, vecConst(window.camera.U, stepLen));
      }
  });
  $(document).on("keypress", function (e) {
    if(e.which == 'i'.charCodeAt(0)) {
      window.camera.V = matMulVec(Rx(degreeStepLen), window.camera.V);
      window.camera.V = vecConst(window.camera.V, 1/vecAbs(window.camera.V))
      window.camera.N = vec3Mul(window.camera.V, window.camera.U);
      window.camera.N = vecConst(window.camera.N, 1/vecAbs(window.camera.N))
      window.camera.U = vec3Mul(window.camera.N, window.camera.V);
      window.camera.U = vecConst(window.camera.U, 1/vecAbs(window.camera.U))
    }
    else if(e.which == 'j'.charCodeAt(0)) {
      window.camera.N = matMulVec(Ry(degreeStepLen), window.camera.N);
      window.camera.N = vecConst(window.camera.N, 1/vecAbs(window.camera.N))
      window.camera.U = vec3Mul(window.camera.N, window.camera.V);
      window.camera.U = vecConst(window.camera.U, 1/vecAbs(window.camera.U))
      window.camera.V = vec3Mul(window.camera.U, window.camera.N)
      window.camera.V = vecConst(window.camera.V, 1/vecAbs(window.camera.V))
    }
    else if(e.which == 'k'.charCodeAt(0)) {
      window.camera.V = matMulVec(Rx(-degreeStepLen), window.camera.V);
      window.camera.V = vecConst(window.camera.V, 1/vecAbs(window.camera.V))
      window.camera.N = vec3Mul(window.camera.V, window.camera.U);
      window.camera.N = vecConst(window.camera.N, 1/vecAbs(window.camera.N))
      window.camera.U = vec3Mul(window.camera.N, window.camera.V);
      window.camera.U = vecConst(window.camera.U, 1/vecAbs(window.camera.U))
    }
    else if(e.which == 'l'.charCodeAt(0)) {
      window.camera.N = matMulVec(Ry(-degreeStepLen), window.camera.N);
      window.camera.N = vecConst(window.camera.N, 1/vecAbs(window.camera.N))
      window.camera.U = vec3Mul(window.camera.N, window.camera.V);
      window.camera.U = vecConst(window.camera.U, 1/vecAbs(window.camera.U))
      window.camera.V = vec3Mul(window.camera.U, window.camera.N)
      window.camera.V = vecConst(window.camera.V, 1/vecAbs(window.camera.V))
    }
  });
}
