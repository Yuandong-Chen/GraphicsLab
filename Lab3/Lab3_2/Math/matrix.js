let vecAbs = (vec) => {
  let ans = 0;
  for (var i = 0; i < vec.length; i++) {
    ans += vec[i] * vec[i]
  }
  return Math.sqrt(ans);
}

let matMulVec = (mat, vec) => {
  let v = new Array(mat.length);
  for (let i = 0; i < mat.length; i++) {
    v[i] = 0
    for (let j = 0; j < vec.length; j++) {
      v[i] += mat[i][j] * vec[j]
    }
  }
  return v;
}

let vecConst = (vec, c) => {
  let v = new Array(vec.length);
  for (var i = 0; i < vec.length; i++) {
    v[i] = vec[i] * c;
  }
  return v;
}

let vecUp = (vec) => {
  let v = new Array(vec.length + 1)
  for (var i = 0; i < vec.length; i++) {
    v[i] = vec[i]
  }
  v[vec.length] = 1;
  return v;
}

let vecDown = (vec) => {
  let v = new Array(vec.length - 1)
  for (var i = 0; i < v.length; i++) {
    v[i] = vec[i]/vec[vec.length - 1];
  }
  return v;
}

let vecDiff = (vec1, vec2) => {
  let vec = new Array(vec1.length);
  for (var i = 0; i < vec1.length; i++) {
    vec[i] = vec1[i] - vec2[i];
  }
  return vec;
}

let vecAdd = (vec1, vec2) => {
  let vec = new Array(vec1.length);
  for (var i = 0; i < vec1.length; i++) {
    vec[i] = vec1[i] + vec2[i];
  }
  return vec;
}

let vecDotMul = (vec1, vec2) => {
  let ans = 0;
  for (var i = 0; i < vec1.length; i++) {
    ans += vec1[i] * vec2[i];
  }
  return ans;
}

let vec3Mul = (vec1, vec2) => {
  let vec = new Array(3);
  vec[0] = vec1[1] * vec2[2] - vec2[1] * vec1[2];
  vec[1] = -(vec1[0] * vec2[2] - vec2[0] * vec1[2]);
  vec[2] = vec1[0] * vec2[1] - vec2[0] * vec1[1];
  return vec;
}

let matMul = (m1, m2) => {
  let m = new Array(m1.length);
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(m2[0].length);
  }
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      m[i][j] = 0;
      for (let k = 0; k < m1[i].length; k++) {
        m[i][j] += m1[i][k] * m2[k][j]
      }
    }
  }
  return m;
}

let matAdd = (m1, m2) => {
  let m = new Array(m1.length);
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(m1[0].length);
  }
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      m[i][j] = m1[i][j] + m2[i][j];
    }
  }
  return m;
}

let matDiff = (m1, m2) => {
  let m = new Array(m1.length);
  for (let i = 0; i < m.length; i++) {
    m[i] = new Array(m1[0].length);
  }
  for (let i = 0; i < m.length; i++) {
    for (let j = 0; j < m[0].length; j++) {
      m[i][j] = m1[i][j] - m2[i][j];
    }
  }
  return m;
}

let zeroOfDim = (n, m) => {
  let mat = new Array(n);
  for (let i = 0; i < m; i++) {
    mat[i] = new Array(m);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      mat[i][j] = 0
    }
  }
  return mat;
}

let identityOfDim = (n, m) => {
  let mat = new Array(n);
  for (let i = 0; i < m; i++) {
    mat[i] = new Array(m);
  }
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < m; j++) {
      mat[i][j] = 0;
      if(i == j) {
        mat[i][j] = 1;
      }
    }
  }
  return mat;
}
