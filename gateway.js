AFRAME.registerGeometry('gateway', {
  schema: {
    position: {
      default: '0 0'
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const pos = new THREE.Vector2(parseFloat(data.position.split(' ')[0]) + gatewayOutlineWidth, parseFloat(data.position.split(' ')[1]) + gatewayOutlineWidth);
    const width = parseFloat(data.width) - 2 * gatewayOutlineWidth;
    const height = parseFloat(data.height) - 2 * gatewayOutlineWidth;

    geometry.vertices = [
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2),
      new THREE.Vector3(pos.y + height / 2, 0, -pos.x),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2),
      new THREE.Vector3(pos.y + height / 2, 0, -pos.x - width)
    ];

    geometry.faces = [
      new THREE.Face3(0, 1, 2),
      new THREE.Face3(2, 3, 0)
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
      new THREE.Vector3(pos.y, -layer1, -pos.x - width / 2),
      new THREE.Vector3(pos.y + height / 2, -layer1, -pos.x),
      new THREE.Vector3(pos.y + height, -layer1, -pos.x - width / 2),
      new THREE.Vector3(pos.y + height / 2, -layer1, -pos.x - width)
    ];

    geometry.faces = [
      new THREE.Face3(0, 1, 2),
      new THREE.Face3(2, 3, 0)
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
