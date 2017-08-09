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
  const assets = document.createElement('a-assets');

  const humanObj = document.createElement('a-asset-item');
  humanObj.setAttribute('id', 'human-obj');
  humanObj.setAttribute('src', './human.obj');
  assets.appendChild(humanObj);

  const computerObj = document.createElement('a-asset-item');
  computerObj.setAttribute('id', 'computer-obj');
  computerObj.setAttribute('src', './computer.obj');
  assets.appendChild(computerObj);

  scene.appendChild(assets);

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
  scene.appendChild(camera);

  document.body.appendChild(scene);
}
