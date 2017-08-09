console.log('yay');
console.log(window.location.href);
console.log('cookie', document.cookie);

console.log('document', document);

// load aframe
function loadScript(name, toBody) {
  const scriptTag = document.createElement('script');
  scriptTag.setAttribute('src', name);

  if(toBody) {
    document.body.appendChild(scriptTag);
  } else {
    document.head.appendChild(scriptTag);
  }
}

// loadScript("https://sebastianstamm.github.io/BAT/bpmn-viewer.js");
loadScript("https://aframe.io/releases/0.5.0/aframe.min.js");

window.setTimeout(() => {
  loadScript("https://sebastianstamm.github.io/BAT/globals.js", true);
  // loadScript("https://sebastianstamm.github.io/BAT/utils.js", true);
  loadScript("https://sebastianstamm.github.io/BAT/collision.js", true);
  loadScript("https://sebastianstamm.github.io/BAT/sequenceFlow.js", true);
  loadScript("https://sebastianstamm.github.io/BAT/task.js", true);
  loadScript("https://sebastianstamm.github.io/BAT/gateway.js", true);
  loadScript("https://sebastianstamm.github.io/BAT/event.js", true);
}, 1000);


const batButtonContainer = document.createElement('div');
batButtonContainer.setAttribute('class', 'item-wrapper');

const batButton = document.createElement('button');
batButton.setAttribute('class', 'item item-button btn btn-warning');
batButton.textContent = '🦇 B.A.T.';

batButtonContainer.appendChild(batButton);
document.querySelector('.diagram-header').appendChild(batButtonContainer);

let diagramXML = '';

batButton.addEventListener('click', evt => {
  evt.preventDefault();

  eval(document.querySelector('script[data]').textContent);

  diagramXML = window.__data.diagram.content;

  let opacity = 1;
  function tick() {
    if(opacity > 0) {
      requestAnimationFrame(tick);
    } else {
      document.body.style.opacity = 1;
      document.body.innerHTML = '';
      start();
      return;
    }

    opacity -= .01;
    document.body.style.opacity = opacity;
  }
  tick();
});

function start() {
  console.log('starting game');
  var BpmnViewer = window.BpmnJS;

  var viewer = new BpmnViewer({ container: document.createElement('div') });

  viewer.importXML(diagramXML, (err, result) => {
    handleModel(viewer);
  });

}
