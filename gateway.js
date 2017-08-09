const sequenceFlowWidth = window.sequenceFlowWidth;
const sequenceFlowHeight = window.sequenceFlowHeight;
const taskOutlineWidth = window.taskOutlineWidth;
const gatewayOutlineWidth = window.gatewayOutlineWidth;
const eventOulineWidth = window.eventOulineWidth;
const globalScaleFactor = window.globalScaleFactor;
const layer0 = window.layer0;
const layer1 = window.layer1;
const layer2 = window.layer2;
const flowOutlineWidthFactor = window.flowOutlineWidthFactor;

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
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 + sequenceFlowWidth),
    ];

    geometry.faces = [
      new THREE.Face3(0,2,1),
      new THREE.Face3(0,3,2),
      new THREE.Face3(0,4,3),
      new THREE.Face3(0,5,4),
      new THREE.Face3(0,6,5),
      new THREE.Face3(0,7,6)
    ];

    addSpace(geometry.vertices[0], geometry.vertices[2], geometry.vertices[1]);
    addSpace(geometry.vertices[0], geometry.vertices[3], geometry.vertices[2]);
    addSpace(geometry.vertices[0], geometry.vertices[4], geometry.vertices[3]);
    addSpace(geometry.vertices[0], geometry.vertices[5], geometry.vertices[4]);
    addSpace(geometry.vertices[0], geometry.vertices[6], geometry.vertices[5]);
    addSpace(geometry.vertices[0], geometry.vertices[7], geometry.vertices[6]);


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
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, layer1, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, layer1, -pos.x),
      new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 + sequenceFlowWidth),

      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x),
      new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor),
      new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x - width),
      new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor),
      new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor),

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
