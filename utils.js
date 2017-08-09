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

function getVectorNormal(vec) {
  const normal = new THREE.Vector2(vec.x, vec.y);

  normal.rotateAround(new THREE.Vector2(0, 0), Math.PI / 2);
  normal.normalize();

  normal.multiplyScalar(sequenceFlowWidth);

  return normal;
}

function getAngleBetweenVectors(vec1, vec2) {
  const a = new THREE.Vector2(vec1.x, vec1.y);
  a.normalize();

  const b = new THREE.Vector2(vec2.x, vec2.y);
  b.normalize();
  b.negate();

  const angle = Math.atan2(b.y, b.x) - Math.atan2(a.y, a.x);

  return angle;
}

function calculateWaypoints(waypoints) {
  return waypoints.map((waypoint, idx) => {
    const previousWaypoint = waypoints[idx - 1];
    const nextWaypoint = waypoints[idx + 1];

    if(!previousWaypoint) {
      // first waypoint, take the normal
      const movingVector = nextWaypoint.clone().sub(waypoint);
      const normal = getVectorNormal(movingVector);
      const shortNormal = normal.clone().multiplyScalar(flowOutlineWidthFactor);
      return [
        waypoint.clone().add(normal),
        waypoint.clone().sub(normal),
        waypoint.clone().add(shortNormal),
        waypoint.clone().sub(shortNormal)
      ];
    } else {
      if(nextWaypoint) {
        // middle point, take the half angle
        const vec1 = waypoint.clone().sub(previousWaypoint);
        const vec2 = nextWaypoint.clone().sub(waypoint);

        const angle = getAngleBetweenVectors(vec1, vec2);
        const halfAngle = angle / 2;

        const normal = vec2.clone().rotateAround(new THREE.Vector2(0, 0), -halfAngle);
        normal.normalize();
        normal.multiplyScalar(sequenceFlowWidth * 1.5);

        const shortNormal = normal.clone().multiplyScalar(flowOutlineWidthFactor);

        if(halfAngle < 0) {
          return [
            waypoint.clone().add(normal),
            waypoint.clone().sub(normal),
            waypoint.clone().add(shortNormal),
            waypoint.clone().sub(shortNormal)
          ];
        } else {
          return [
            waypoint.clone().sub(normal),
            waypoint.clone().add(normal),
            waypoint.clone().sub(shortNormal),
            waypoint.clone().add(shortNormal)
          ];
        }
      } else {
        // last waypoint, take the normal
        const movingVector = waypoint.clone().sub(previousWaypoint);
        const normal = getVectorNormal(movingVector);
        const shortNormal = normal.clone().multiplyScalar(flowOutlineWidthFactor);

        return [
          waypoint.clone().add(normal),
          waypoint.clone().sub(normal),
          waypoint.clone().add(shortNormal),
          waypoint.clone().sub(shortNormal)
        ];
      }
    }
  });
}

openSpaces = [];
function addSpace(p1,p2,p3) {
  openSpaces.push({p1,p2,p3});
}

function handleModel(viewer) {
  const scene = document.createElement('a-scene');

  // <a-sky color="#ECECEC"></a-sky>
  const sky = document.createElement('a-sky');
  sky.setAttribute('color', '#ECECEC');
  scene.appendChild(sky);

  /*    <a-assets>
          <a-asset-item id="human-obj" src="/human.obj"></a-asset-item>
        </a-assets>
  */
  // const assets = document.createElement('a-assets');
  //
  // const humanObj = document.createElement('a-asset-item');
  // humanObj.setAttribute('id', 'human-obj');
  // humanObj.setAttribute('src', './human.obj');
  // assets.appendChild(humanObj);
  //
  // const computerObj = document.createElement('a-asset-item');
  // computerObj.setAttribute('id', 'computer-obj');
  // computerObj.setAttribute('src', './computer.obj');
  // assets.appendChild(computerObj);

  // scene.appendChild(assets);

  let startPosition;

  const data = [];
  const elementRegistry = viewer.get('elementRegistry');

  elementRegistry.forEach(element => {
    const bo = element.businessObject;
    if(element.type === 'label') {
      return;
    }

    if(bo.$instanceOf('bpmn:SequenceFlow')) {
      handleSequenceFlow(scene, element);
    }

    if(bo.$instanceOf('bpmn:Task')) {
      handleTask(scene, element);
    }

    if(bo.$instanceOf('bpmn:Event')) {
      handleGateway(scene, element);
      if(bo.$instanceOf('bpmn:StartEvent')) {
        startPosition = element;
      }
    }

    if(bo.$instanceOf('bpmn:Gateway')) {
      handleGateway(scene, element);
    }
  });

  // <a-entity camera="userHeight: 1.6" look-controls></a-entity>
  const posOffset = startPosition.width / 2 * globalScaleFactor;
  const camera = document.createElement('a-entity');
  camera.setAttribute('camera', 'userHeight: 1.6');
  camera.setAttribute('look-controls', true);
  camera.setAttribute('wasd-controls', 'acceleration: 250');
  camera.setAttribute('position', (startPosition.y * globalScaleFactor + posOffset) + ' 0 ' + (-startPosition.x * globalScaleFactor - posOffset));
  camera.setAttribute('collision', true);
  scene.appendChild(camera);

  document.body.appendChild(scene);
}


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

function handleSequenceFlow(scene, element) {
  /*    <a-entity geometry="primitive: sequenceFlow; points:0 0, 0 5, 0 10, 5 10, 10 10, 10 15;" material="color: #FFFFFF"></a-entity>
        <a-entity geometry="primitive: sequenceFlowLine; points:0 0, 0 5, 0 10, 5 10, 10 10, 10 15;" material="color: #333333"></a-entity>
  */
  const points = element.waypoints.reduce((acc, val) => {
    return acc += (val.x * globalScaleFactor) + ' ' + (val.y * globalScaleFactor) + ', ';
  }, '').slice(0, -2);

  const flow = document.createElement('a-entity');
  flow.setAttribute('geometry', 'primitive: sequenceFlow; points:' + points + ';');
  flow.setAttribute('material', 'color: #FFFFFF; side: double;');

  const line = document.createElement('a-entity');
  line.setAttribute('geometry', 'primitive: sequenceFlowLine; points:' + points + ';');
  line.setAttribute('material', 'color: #333333');

  scene.appendChild(flow);
  scene.appendChild(line);
}

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

    // scene.appendChild(model);
  }

  // computer for serviceTasks
  if(element.businessObject.$instanceOf('bpmn:ServiceTask')) {
    //<a-entity obj-model="obj: #human-obj;" scale="0.1 0.1 0.1" rotation="0 90 0"></a-entity>
    const model = document.createElement('a-entity');
    model.setAttribute('obj-model', 'obj: #computer-obj;');
    model.setAttribute('scale', '0.01 0.01 0.01');
    model.setAttribute('rotation', '0 90 0');
    model.setAttribute('position', (element.y * globalScaleFactor + element.height / 10 * globalScaleFactor) + ' '+(layer1)+' ' + -(element.x * globalScaleFactor + element.width * globalScaleFactor / 10))

    // scene.appendChild(model);
  }

  scene.appendChild(task);
  scene.appendChild(line);
  scene.appendChild(label);
}


window.calculateWaypoints = calculateWaypoints;
window.addSpace = addSpace;
window.openSpaces = openSpaces;
