AFRAME.registerGeometry('task', {
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

AFRAME.registerGeometry('taskLine', {
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

function handleTask(scene, element) {
  /* <a-entity geometry="primitive: task; position: 10 15; width: 10; height: 10;" material="color: #FFFFFF"></a-entity>
     <a-entity geometry="primitive: taskLine; position: 10 15; width: 10; height: 10;" material="color: #333333"></a-entity>
  */

  const task = document.createElement('a-entity');
  task.setAttribute('geometry', 'primitive: task; position: ' + (element.x * globalScaleFactor) + ' ' + (element.y * globalScaleFactor)+'; width: '+element.width * globalScaleFactor+'; height: '+element.height * globalScaleFactor+';');
  task.setAttribute('material', 'color: #FFFFFF');

  const line = document.createElement('a-entity');
  line.setAttribute('geometry', 'primitive: taskLine; position: ' + (element.x * globalScaleFactor) + ' ' + (element.y * globalScaleFactor)+'; width: '+element.width * globalScaleFactor+'; height: '+element.height * globalScaleFactor+';');
  line.setAttribute('material', 'color: #333333');

  // text label look-controls
  const name = element.businessObject.name;
  const label = document.createElement('a-entity');
  label.setAttribute('rotation', '-90 90 0');
  label.setAttribute('text', 'value: ' + name + '; color: black; width: ' + element.width * globalScaleFactor * 1.7 + ';');
  label.setAttribute('position', (element.y * globalScaleFactor + element.height / 2 * globalScaleFactor) + ' '+(layer1)+' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor));
  // <a-entity text="value: Hello world; color: black; width: 10;" rotation="-90 0 0"></a-entity>

  // human for usertasks
  if(element.businessObject.$instanceOf('bpmn:UserTask')) {
    //<a-entity obj-model="obj: #human-obj;" scale="0.1 0.1 0.1" rotation="0 90 0"></a-entity>
    const model = document.createElement('a-entity');
    model.setAttribute('obj-model', 'obj: #human-obj;');
    model.setAttribute('scale', '0.2 0.2 0.2');
    model.setAttribute('rotation', '0 90 0');
    model.setAttribute('position', (element.y * globalScaleFactor + element.height / 10 * globalScaleFactor) + ' '+(layer1)+' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 10));

    scene.appendChild(model);
  }

  // computer for serviceTasks
  if(element.businessObject.$instanceOf('bpmn:ServiceTask')) {
    //<a-entity obj-model="obj: #human-obj;" scale="0.1 0.1 0.1" rotation="0 90 0"></a-entity>
    const model = document.createElement('a-entity');
    model.setAttribute('obj-model', 'obj: #computer-obj;');
    model.setAttribute('scale', '0.01 0.01 0.01');
    model.setAttribute('rotation', '0 90 0');
    model.setAttribute('position', (element.y * globalScaleFactor + element.height / 10 * globalScaleFactor) + ' '+(layer1)+' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 10))

    scene.appendChild(model);
  }

  scene.appendChild(task);
  scene.appendChild(line);
  scene.appendChild(label);
}
