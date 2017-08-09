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

window.AFRAME.registerGeometry('task', {
  schema: {
    position: {
      default: '0 0'
    },
    width: {
      default: '10'
    },
    height: {
      default: '10'
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const pos = new THREE.Vector2(parseFloat(data.position.split(' ')[0]), parseFloat(data.position.split(' ')[1]));
    const width = parseFloat(data.width);
    const height = parseFloat(data.height);

    geometry.vertices = [
      new THREE.Vector3(pos.y, 0, -pos.x),
      new THREE.Vector3(pos.y + height, 0, -pos.x),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width),
      new THREE.Vector3(pos.y, 0, -pos.x - width)
    ];

    geometry.faces = [
      new THREE.Face3(0, 1, 2),
      new THREE.Face3(2, 3, 0)
    ];

    addSpace(geometry.vertices[0], geometry.vertices[1], geometry.vertices[2]);
    addSpace(geometry.vertices[2], geometry.vertices[3], geometry.vertices[0]);

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});

window.AFRAME.registerGeometry('taskLine', {
  schema: {
    position: {
      default: '0 0'
    },
    width: {
      default: '10'
    },
    height: {
      default: '10'
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const pos = new THREE.Vector2(parseFloat(data.position.split(' ')[0]), parseFloat(data.position.split(' ')[1]));
    const width = parseFloat(data.width);
    const height = parseFloat(data.height);

    geometry.vertices = [
        new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x),
        new THREE.Vector3(pos.y, layer1, -pos.x),
        new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor),
        new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor - taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
        new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
        new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor + taskOutlineWidth),

        new THREE.Vector3(pos.y, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor),
        new THREE.Vector3(pos.y, layer1, -pos.x - width),
        new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x - width),
        new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor - taskOutlineWidth),
        new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth),
        new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth * flowOutlineWidthFactor - taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth),

        new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x),
        new THREE.Vector3(pos.y + height, layer1, -pos.x),
        new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor),
        new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor + taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
        new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
        new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width / 2 + sequenceFlowWidth * flowOutlineWidthFactor + taskOutlineWidth),

        new THREE.Vector3(pos.y + height, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor),
        new THREE.Vector3(pos.y + height, layer1, -pos.x - width),
        new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor, layer1, -pos.x - width),
        new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width / 2 - sequenceFlowWidth * flowOutlineWidthFactor - taskOutlineWidth),
        new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth),
        new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth * flowOutlineWidthFactor + taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth)
    ];

    geometry.faces = [
      new THREE.Face3(0, 4, 1),
      new THREE.Face3(0, 3, 4),
      new THREE.Face3(1, 4, 2),
      new THREE.Face3(4, 5, 2),

      new THREE.Face3(6,10, 7),
      new THREE.Face3(6, 9, 10),
      new THREE.Face3(7,10, 8),
      new THREE.Face3(10,11, 8),

      new THREE.Face3(12, 13, 16),
      new THREE.Face3(12, 16, 15),
      new THREE.Face3(13, 14, 16),
      new THREE.Face3(16, 14, 17),

      new THREE.Face3(18, 19,22),
      new THREE.Face3(18, 22, 21),
      new THREE.Face3(19, 20,22),
      new THREE.Face3(22, 20,23)


    ];

    // geometry.vertices = [
    //   new THREE.Vector3(pos.y, layer1, -pos.x),
    //   new THREE.Vector3(pos.y + height, layer1, -pos.x),
    //   new THREE.Vector3(pos.y + height, layer1, -pos.x - width),
    //   new THREE.Vector3(pos.y, layer1, -pos.x - width),
    //   new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
    //   new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - taskOutlineWidth),
    //   new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth),
    //   new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width + taskOutlineWidth)
    // ];
    //
    // geometry.faces = [
    //   new THREE.Face3(0, 1, 5),
    //   new THREE.Face3(0, 5, 4),
    //   new THREE.Face3(1, 2, 5),
    //   new THREE.Face3(5, 2, 6),
    //   new THREE.Face3(6, 2, 3),
    //   new THREE.Face3(7, 6, 3),
    //   new THREE.Face3(4, 7, 3),
    //   new THREE.Face3(0, 4, 3)
    // ];

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});
