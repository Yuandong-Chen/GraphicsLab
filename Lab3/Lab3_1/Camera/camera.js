// camera state
// d f h Cx Cy Cz Px Py Pz V'x V'y V'z
// put all in global window
let cameraInit = (c, p_ref) => {
  window.camera = {
    d: 0,
    f: 0,
    h: 0,
    C: c,
    N: [0, 0, 0],
    U: [0, 0, 0],
    V: [0, 0, 0]
  };
  const v_p = [0, 1, 0];
  // caculate N, U, V
  let vd = vecDiff(p_ref, c);
  window.camera.N = vecConst(vd, 1/vecAbs(vd));
  let vm = vec3Mul(window.camera.N, v_p);
  window.camera.U = vecConst(vm, 1/vecAbs(vm));
  window.camera.V = vec3Mul(window.camera.U, window.camera.N);

  var slider = document.getElementById("C_d");
  var output = document.getElementById("V_C_d");
  output.innerHTML = slider.value;
  slider.oninput = function() {
    output.innerHTML = this.value;
    window.camera.d = parseFloat(this.value);
  }
  var slider2 = document.getElementById("C_h");
  var output2 = document.getElementById("V_C_h");
  output2.innerHTML = slider2.value;
  slider2.oninput = function() {
    output2.innerHTML = this.value;
    window.camera.h =  parseFloat(this.value);
  }
  var slider3 = document.getElementById("C_f");
  var output3 = document.getElementById("V_C_f");
  output3.innerHTML = slider3.value;
  slider3.oninput = function() {
    output3.innerHTML = this.value;
    window.camera.f =  parseFloat(this.value);
  }
  window.camera.d = parseFloat(slider.value);
  window.camera.h = parseFloat(slider2.value);
  window.camera.f = parseFloat(slider3.value);
}
