window.AFRAME.registerGeometry('gateway', {
  schema: {
    position: {
      default: '0 0'
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const pos = new THREE.Vector2(parseFloat(data.position.split(' ')[0]), parseFloat(data.position.split(' ')[1]));
    const width = parseFloat(data.width);
    const height = parseFloat(data.height);

    geometry.vertices = [
      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 + window.sequenceFlowWidth),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 - window.sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 - window.sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 + window.sequenceFlowWidth),
    ];

    geometry.faces = [
      new THREE.Face3(0,2,1),
      new THREE.Face3(0,3,2),
      new THREE.Face3(0,4,3),
      new THREE.Face3(0,5,4),
      new THREE.Face3(0,6,5),
      new THREE.Face3(0,7,6)
    ];

    window.addSpace(geometry.vertices[0], geometry.vertices[2], geometry.vertices[1]);
    window.addSpace(geometry.vertices[0], geometry.vertices[3], geometry.vertices[2]);
    window.addSpace(geometry.vertices[0], geometry.vertices[4], geometry.vertices[3]);
    window.addSpace(geometry.vertices[0], geometry.vertices[5], geometry.vertices[4]);
    window.addSpace(geometry.vertices[0], geometry.vertices[6], geometry.vertices[5]);
    window.addSpace(geometry.vertices[0], geometry.vertices[7], geometry.vertices[6]);


    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});

window.AFRAME.registerGeometry('gatewayLine', {
  schema: {
    position: {
      default: '0 0'
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const pos = new THREE.Vector2(parseFloat(data.position.split(' ')[0]), parseFloat(data.position.split(' ')[1]));

    const width = parseFloat(data.width);
    const height = parseFloat(data.height);

    geometry.vertices = [
      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth, window.layer1, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth, window.layer1, -pos.x),
      new THREE.Vector3(pos.y, window.layer1, -pos.x - width / 2 + window.sequenceFlowWidth),
      new THREE.Vector3(pos.y, window.layer1, -pos.x - width / 2 - window.sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth, window.layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth, window.layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height, window.layer1, -pos.x - width / 2 - window.sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, window.layer1, -pos.x - width / 2 + window.sequenceFlowWidth),

      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth * window.flowOutlineWidthFactor, window.layer1, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth * window.flowOutlineWidthFactor, window.layer1, -pos.x),
      new THREE.Vector3(pos.y, window.layer1, -pos.x - width / 2 + window.sequenceFlowWidth * window.flowOutlineWidthFactor),
      new THREE.Vector3(pos.y, window.layer1, -pos.x - width / 2 - window.sequenceFlowWidth * window.flowOutlineWidthFactor),
      new THREE.Vector3(pos.y + height / 2 - window.sequenceFlowWidth * window.flowOutlineWidthFactor, window.layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + window.sequenceFlowWidth * window.flowOutlineWidthFactor, window.layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height, window.layer1, -pos.x - width / 2 - window.sequenceFlowWidth * window.flowOutlineWidthFactor),
      new THREE.Vector3(pos.y + height, window.layer1, -pos.x - width / 2 + window.sequenceFlowWidth * window.flowOutlineWidthFactor),

    ];

    geometry.faces = [
      new THREE.Face3(1, 9, 2),
      new THREE.Face3(9, 10, 2),
      new THREE.Face3(3, 11, 4),
      new THREE.Face3(11, 12, 4),
      new THREE.Face3(5, 13, 6),
      new THREE.Face3(13, 14, 6),
      new THREE.Face3(7, 15, 0),
      new THREE.Face3(15, 8, 0)
    ];

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});
