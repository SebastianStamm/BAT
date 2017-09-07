const socket = new WebSocket("ws://"+window.location.host);
let connected = false;
socket.onmessage = function(evt) {
  const data = evt.data.split('|');
  console.log('got data from controller', evt.data);
  switch(data[0]) {
      case 'RESET': return resetPosition();
      case 'BPMN': return updateBpmn(data[1]);
      case 'SHOW': return switchView(data[1]);
  }
};

socket.onopen = function(evt) {
  connected = true;
  socket.send('INIT|PLAYER');
};

window.broadcast = function(msg) {
    if(connected) {
        socket.send(msg);
    }
}

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
    
    const container = document.querySelector('#bpmnContent');
    const newDiagram = document.createElement('div');
    
    container.innerHTML = '';
    container.appendChild(newDiagram);

    const viewer = new BpmnViewer({ container: newDiagram });
    
    viewer.importXML(newXml, (err, result) => {
        updateModel(viewer);
        fixDiagramSize();
        addPlayerToken();
    });

    window.modelViewer = viewer;
}

function addPlayerToken() {
    const imageElement = document.createElementNS('http://www.w3.org/2000/svg', 'image');

    imageElement.setAttributeNS('http://www.w3.org/1999/xlink', 'xlink:href', 'img/pointer.png');
    imageElement.setAttributeNS(null, 'width', window.iconSize);
    imageElement.setAttributeNS(null, 'height', window.iconSize);
    imageElement.setAttributeNS(null, 'x', "10");
    imageElement.setAttributeNS(null, 'y', "10");

    window.playerToken = imageElement;

    window.modelViewer.get('canvas')._viewport.appendChild(imageElement);
}

function fixDiagramSize() {
    const canvas = window.modelViewer.get('canvas');

    canvas.resized();
    canvas.zoom('fit-viewport', 'auto');
}

function switchView(targetView) {
    const views = document.querySelectorAll('.content-container');
    for(let i = 0; i < views.length; i++) {
        views[i].style.opacity = '0';
    }

    document.querySelector('#'+targetView.toLowerCase() + 'Content').style.opacity = '1';

    if(targetView === 'BPMN') {
        fixDiagramSize();

        // keep vr mode partially visible
        document.querySelector('#VRContent').style.opacity = '.2';
    }
}