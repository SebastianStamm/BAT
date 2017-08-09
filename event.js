function handleEvent(scene, element) {
  /*  <a-entity geometry="primitive: circle; radius: 2;" rotation="-90 0 0" material="color: #FFFFFF" position="5 0 -5"></a-entity>
      <a-entity geometry="primitive: circle; radius: 2.3;" rotation="-90 0 0" material="color: #333333;" position="5 -0.005 -5"></a-entity>
  */

  const posOffset = element.width / 2 * window.globalScaleFactor;

  const event = document.createElement('a-entity');
  event.setAttribute('geometry', 'primitive: circle; radius:' + (posOffset - window.eventOulineWidth) + ';');
  event.setAttribute('rotation', '-90 0 0');
  event.setAttribute('position', (element.y * window.globalScaleFactor + posOffset) + ' 0 ' + -(element.x * window.globalScaleFactor + posOffset));
  event.setAttribute('material', 'color: #FFFFFF');

  const line = document.createElement('a-entity');
  line.setAttribute('geometry', 'primitive: circle; radius:' + posOffset + ';');
  line.setAttribute('rotation', '-90 0 0');
  line.setAttribute('position', (element.y * window.globalScaleFactor + posOffset) + ' '+(-window.layer1)+' ' + -(element.x * window.globalScaleFactor + posOffset));
  line.setAttribute('material', 'color: #333333');

  scene.appendChild(event);
  scene.appendChild(line);
}
