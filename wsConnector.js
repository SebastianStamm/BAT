const socket = new WebSocket("ws://"+window.location.host);
socket.onmessage = function(evt) {
  console.log('got data from controller', evt.data);
  switch(evt.data) {
      case 'RESET': return resetPosition();
  }
};

socket.onopen = function(evt) {
  socket.send('INIT PLAYER');
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