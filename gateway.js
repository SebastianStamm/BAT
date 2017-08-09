AFRAME.registerGeometry('gateway', {
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

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});

AFRAME.registerGeometry('gatewayLine', {
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

      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, layer1, -pos.x - taskOutlineWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, layer1, -pos.x - taskOutlineWidth),
      new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y + taskOutlineWidth, layer1, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, layer1, -pos.x - width + taskOutlineWidth),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, layer1, -pos.x - width + taskOutlineWidth),
      new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height - taskOutlineWidth, layer1, -pos.x - width / 2 + sequenceFlowWidth)
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

function handleGateway(scene, element) {
  /*  <a-entity geometry="primitive: gateway; position: 8 3;" material="color: #FFFFFF;"></a-entity>
      <a-entity geometry="primitive: gatewayLine; position: 8 3;" material="color: #333333"></a-entity>
  */

  const posOffset = element.width / 2 * globalScaleFactor;

  const gateway = document.createElement('a-entity');
  gateway.setAttribute('geometry', 'primitive: gateway; position:' + (element.x * globalScaleFactor) + ' ' + (element.y * globalScaleFactor) + '; width: '+(element.width * globalScaleFactor)+'; height: '+(element.height * globalScaleFactor)+';');
  gateway.setAttribute('material', 'color: #FFFFFF');

  const line = document.createElement('a-entity');
  line.setAttribute('geometry', 'primitive: gatewayLine; position:' + (element.x * globalScaleFactor) + ' ' + (element.y * globalScaleFactor) + '; width: '+(element.width * globalScaleFactor)+'; height: '+(element.height * globalScaleFactor)+';');
  line.setAttribute('material', 'color: #333333');

  scene.appendChild(gateway);
  scene.appendChild(line);
}
