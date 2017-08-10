AFRAME.registerGeometry('gateway', {
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
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, 0, -pos.x),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y, 0, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, 0, -pos.x - width),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, 0, -pos.x - width / 2 + sequenceFlowWidth),

      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, sequenceFlowHeight, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, sequenceFlowHeight, -pos.x),
      new THREE.Vector3(pos.y, sequenceFlowHeight, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y, sequenceFlowHeight, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, sequenceFlowHeight, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, sequenceFlowHeight, -pos.x - width),
      new THREE.Vector3(pos.y + height, sequenceFlowHeight, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, sequenceFlowHeight, -pos.x - width / 2 + sequenceFlowWidth),

      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, gatewayHeight, -pos.x),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, gatewayHeight, -pos.x),
      new THREE.Vector3(pos.y, gatewayHeight, -pos.x - width / 2 + sequenceFlowWidth),
      new THREE.Vector3(pos.y, gatewayHeight, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height / 2 - sequenceFlowWidth, gatewayHeight, -pos.x - width),
      new THREE.Vector3(pos.y + height / 2 + sequenceFlowWidth, gatewayHeight, -pos.x - width),
      new THREE.Vector3(pos.y + height, gatewayHeight, -pos.x - width / 2 - sequenceFlowWidth),
      new THREE.Vector3(pos.y + height, gatewayHeight, -pos.x - width / 2 + sequenceFlowWidth)
    ];

    geometry.faces = [
      new THREE.Face3(0,2,1),
      new THREE.Face3(0,3,2),
      new THREE.Face3(0,4,3),
      new THREE.Face3(0,5,4),
      new THREE.Face3(0,6,5),
      new THREE.Face3(0,7,6),

      new THREE.Face3(10, 11, 19),
      new THREE.Face3(10, 19, 18),
      new THREE.Face3(3, 4, 20),
      new THREE.Face3(3, 20, 19),
      new THREE.Face3(12, 13, 21),
      new THREE.Face3(12, 21, 20),
      new THREE.Face3(5, 6, 22),
      new THREE.Face3(5, 22, 21),
      new THREE.Face3(14, 15, 23),
      new THREE.Face3(14, 23, 22),
      new THREE.Face3(7, 0, 16),
      new THREE.Face3(7, 16, 23),
      new THREE.Face3(8, 9, 17),
      new THREE.Face3(8, 17, 16),
      new THREE.Face3(1, 2, 18),
      new THREE.Face3(1, 18, 17)
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

AFRAME.registerGeometry('gatewayLine', {
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

  // <a-image src="#my-image"></a-image>
  let img;
  switch(element.type) {
    case 'bpmn:StartEvent': img = 'start'; break;
    case 'bpmn:EndEvent': img = 'end'; break;
    case 'bpmn:IntermediateEvent': img = 'intermediate'; break;
    case 'bpmn:ExclusiveGateway': img = 'exclusive'; break;
    case 'bpmn:ParallelGateway': img = 'parallel'; break;
  }
  const label = document.createElement('a-image');
  label.setAttribute('src', 'img/'+img+'.png');
  label.setAttribute('position', (element.y * globalScaleFactor + element.height * globalScaleFactor / 2) + ' ' + layer1 + ' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 2));
  label.setAttribute('rotation', '90 90 0');
  label.setAttribute('scale', '3 3 3');

  scene.appendChild(gateway);
  scene.appendChild(line);
  scene.appendChild(label);

  const openExits = findOpenExits(element);

  if(openExits.n) {
    const label = document.createElement('a-image');
    label.setAttribute('src', 'img/'+img+'.png');
    label.setAttribute('position', (element.y * globalScaleFactor + layer1) + ' ' + (roomHeight / 4) + ' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 2));
    label.setAttribute('rotation', '0 90 0');
    label.setAttribute('scale', (sequenceFlowWidth * 2) + ' ' + (roomHeight / 2));
    scene.appendChild(label);
  }
  if(openExits.s) {
    const label = document.createElement('a-image');
    label.setAttribute('src', 'img/'+img+'.png');
    label.setAttribute('position', ((element.y + element.height) * globalScaleFactor - layer1) + ' ' + (roomHeight / 4) + ' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 2));
    label.setAttribute('rotation', '0 90 0');
    label.setAttribute('scale', (sequenceFlowWidth * 2) + ' ' + (roomHeight / 2));
    scene.appendChild(label);
  }
  if(openExits.w) {
    const label = document.createElement('a-image');
    label.setAttribute('src', 'img/'+img+'.png');
    label.setAttribute('position', ((element.y + element.height / 2) * globalScaleFactor) + ' ' + (roomHeight / 4) + ' ' + -(element.x * globalScaleFactor + layer1));
    label.setAttribute('rotation', '0 0 0');
    label.setAttribute('scale', (sequenceFlowWidth * 2) + ' ' + (roomHeight / 2));
    scene.appendChild(label);
  }
  if(openExits.e) {
    const label = document.createElement('a-image');
    label.setAttribute('src', 'img/'+img+'.png');
    label.setAttribute('position', ((element.y + element.height / 2) * globalScaleFactor) + ' ' + (roomHeight / 4) + ' ' + -((element.x + element.width) * globalScaleFactor - layer1));
    label.setAttribute('rotation', '0 0 0');
    label.setAttribute('scale', (sequenceFlowWidth * 2) + ' ' + (roomHeight / 2));
    scene.appendChild(label);
  }
}
