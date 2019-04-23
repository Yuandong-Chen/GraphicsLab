let parseFile = (s) => {
  let model = {
    points: new Array(),
    polygons: new Array()
  }
  let arrLines = s.match(/[^\r\n]+/g);
  let [a, b, c] = arrLines[0].trim().split(/\s+/);
  if(c == undefined) {
    c = b;
    b = a;
  }
  for (let i = 1; i <= parseInt(b); i++) {
    let [v0, v1, v2] = arrLines[i].trim().split(/\s+/);
    model.points.push([parseFloat(v0), parseFloat(v1), parseFloat(v2)]);
  }
  for (let j = parseInt(b)+ 1; j <= parseInt(b) + parseInt(c); j++) {
    let [num, ...res] = arrLines[j].trim().split(/\s+/);
    if(res.length > 2) {
      model.polygons.push(res.map(x => parseInt(x) - 1));
    }
  }
  window.models.push(model)
}

let initModel = (callback) => {
  window.models = new Array();
  const inputElement = document.getElementById("input");
  inputElement.addEventListener("change", handleFiles, false);
  function handleFiles() {
    const file = this.files.item(0); /* now you can work with the file list */
    var reader = new FileReader();
    reader.onload = function() {
      parseFile(reader.result);
      callback();
    }
    reader.readAsText(file);
  }
}
