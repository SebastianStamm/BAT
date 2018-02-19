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

function updateModel(viewer) {
  // remove old model entity
  const oldElements = document.querySelectorAll('[model-entity="true"]');
  console.log('oldelements', oldElements);

  for(var i = 0; i < oldElements.length; i++) {
    oldElements[i].parentNode.removeChild(oldElements[i]);
  }

  const oldElements2 = document.querySelectorAll('[model-entity2="true"]');

  for(var i = 0; i < oldElements2.length; i++) {
    oldElements2[i].parentNode.removeChild(oldElements2[i]);
  }

  availableDoors.length = 0;

  // add new elements
  let startPosition;

  const data = [];
  const elementRegistry = viewer.get('elementRegistry');
  const scene = window.BATscene;

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

  window.startPosition = startPosition;
}

function handleModel(viewer) {
  const scene = document.createElement('a-scene');

  // <a-sky color="#ECECEC"></a-sky>
  const sky = document.createElement('a-sky');
  sky.setAttribute('color', '#ECECEC');
  scene.appendChild(sky);

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

  // <a-entity camera="userHeight: 1.7" look-controls></a-entity>
  const posOffset = startPosition.width / 2 * globalScaleFactor;
  const camera = document.createElement('a-entity');
  camera.setAttribute('camera', 'userHeight: 1.7');
  camera.setAttribute('look-controls', true);
  camera.setAttribute('wasd-controls', 'acceleration: 250');
  camera.setAttribute('position', (startPosition.y * globalScaleFactor + posOffset) + ' 0 ' + (-startPosition.x * globalScaleFactor - posOffset));
  camera.setAttribute('collision', true);
  scene.appendChild(camera);

  // setup lights
  const ambientLight = document.createElement('a-entity');
  ambientLight.setAttribute('light', 'type: ambient; color: #BBB;');
  scene.appendChild(ambientLight);

  const movingLight = document.createElement('a-entity');
  movingLight.setAttribute('light', 'type: point; color: #FFF; intensity: 0.2;');
  camera.appendChild(movingLight);

  const directionalLight = document.createElement('a-entity');
  directionalLight.setAttribute('light', 'type: directional; color: #FFF; intensity: 0.6');
  directionalLight.setAttribute('position', '0 1 0');
  scene.appendChild(directionalLight);

  document.querySelector('#vrContent').appendChild(scene);

  window.startPosition = startPosition;
  window.BATscene = scene;
  window.BATcamera = camera;
}

function findOpenExits(element) {
  let n=s=w=e = false;

  element.incoming.forEach(incoming => {
    const lastWp = incoming.waypoints[incoming.waypoints.length -1];
    if(lastWp.x === element.x) {
      w = incoming.source.businessObject.name;
    }
    if(lastWp.x === element.x + element.width) {
      e = incoming.source.businessObject.name;
    }
    if(lastWp.y === element.y) {
      n = incoming.source.businessObject.name;
    }
    if(lastWp.y === element.y + element.height) {
      s = incoming.source.businessObject.name;
    }
  });

  element.outgoing.forEach(outgoing => {
    const lastWp = outgoing.waypoints[0];
    if(lastWp.x === element.x) {
      w = outgoing.target.businessObject.name;
    }
    if(lastWp.x === element.x + element.width) {
      e = outgoing.target.businessObject.name;
    }
    if(lastWp.y === element.y) {
      n = outgoing.target.businessObject.name;
    }
    if(lastWp.y === element.y + element.height) {
      s = outgoing.target.businessObject.name;
    }
  });

  return {n,s,w,e};
}
