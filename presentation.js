document.body.addEventListener('keydown', evt => {
  switch(evt.key) {
    case '1': return enableFly(true);
    case '2': return enableFly(false);
    case '3': return hide('[model-entity],a-image');
    case '4': return show('[isGateway],[isGatewayLine],[model-entity2],[isTask],[isTaskLine],[isSequenceFlow],[isSequenceFlowLine]');
    case '5': return show('[isGatewayWall],[isTaskWall],[isSequenceFlowWall]');
    case '6': return show('[isDoor]');
    case '7': return show('[isLabel]');
  }
});

function enableFly(on) {
  const elem = document.querySelector('[wasd-controls]');
  elem.setAttribute('wasd-controls', 'acceleration: 500; fly: '+on);
}

function hide(selector) {
  const elems = document.querySelectorAll(selector);

  for(let i = 0; i < elems.length; i++) {
    elems[i].setAttribute('visible', 'false');
  }
}

function show(selector) {
  const elems = document.querySelectorAll(selector);

    for(let i = 0; i < elems.length; i++) {
      elems[i].setAttribute('visible', 'true');
    }
}