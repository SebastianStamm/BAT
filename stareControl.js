AFRAME.registerComponent('gaze-control', {
  dependencies: ['raycaster'],

  init: function () {
    let lastHit = {x: 0, y: 0, z: 0};
    let fuse = 0;

    this.el.addEventListener('raycaster-intersection', function (evt) {
      const pt = evt.detail.intersections[0].point;

      if(distanceBetween(lastHit, pt) < movementSensitivity) {
        fuse++;
      } else {
        fuse = 0;
      }

      lastHit = pt;

      if(fuse === 20) {
        fuse = 0;
        BATcamera.setAttribute('position', pt.x + ' 1.6 ' + pt.z);
      }
    });


  }
});

function distanceBetween(p1, p2) {
	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.z - p2.z, 2);
}
