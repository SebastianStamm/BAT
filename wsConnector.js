const socket = new WebSocket("ws://"+window.location.host);
socket.onmessage = function(evt) {
  const data = evt.data.split('|');
  console.log('got data from controller', evt.data);
  switch(data[0]) {
      case 'RESET': return resetPosition();
      case 'BPMN': return updateBpmn(data[1]);
  }
};

socket.onopen = function(evt) {
  socket.send('INIT|PLAYER');
};

function resetPosition() {
    const posOffset = startPosition.width / 2 * globalScaleFactor;
    const startPosX = (startPosition.y * globalScaleFactor + posOffset);
    const startPosY = (-startPosition.x * globalScaleFactor - posOffset);
    var camPosition = new THREE.Vector3().copy(BATcamera.getAttribute('position'));
    BATcamera.setAttribute('position', startPosX + ' 1.6 ' + startPosY);
    var hands = document.querySelectorAll('a-entity[tracked-controls]');
    for (var i = 0; i < hands.length; i++) {
      var position = hands[i].getAttribute('position');
      var pos = new THREE.Vector3().copy(position);
      var diff = camPosition.clone().sub(pos);
      var newPosition = new THREE.Vector3(startPosX, 1.6, startPosY).clone().sub(diff);
      hands[i].setAttribute('position', newPosition);
    }
}

function updateBpmn(newXml) {
    var BpmnViewer = window.BpmnJS;
    
    var viewer = new BpmnViewer({ container: document.createElement('div') });
    
    viewer.importXML(newXml, (err, result) => {
        updateModel(viewer);
    });
}

// function getCameraParameters() {
//     const camera = window.BATcamera;
//     return {
//         position: camera.getAttribute('position'),
//         rotation: camera.getAttribute('rotation')
//     };
// }

// function setCameraParameters(params) {
//     const camera = window.BATcamera;

//     camera.setAttribute('position', params.position);
//     camera.setAttribute('rotation', params.rotation);
// }

// function removeModel() {
//     const scene = document.querySelector('a-scene');
//     return scene.exitVR().then(() => {
//         scene.parentNode.removeChild(scene);
//     });
// }

