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

(function() {
	window.AFRAME.registerComponent( 'collision', {
		init: function() {
      console.log('initializing collision');
			window.openSpaces = window.openSpaces || [];
		},

		tick: function () {
			var self = this;
      window.debugObj = this;

			if ( collides() ) {
				this.el.setAttribute( 'position', this.lastKnownGoodPosition );
        this.el.components['wasd-controls'].data.acceleration = 0;
			} else {
				this.lastKnownGoodPosition = {
					x: this.el.object3D.position.x,
					y: this.el.object3D.position.y,
					z: this.el.object3D.position.z
				};
        this.el.components['wasd-controls'].data.acceleration = 250;
			}

			/**
			 * Tests each collideWiths for intersection.
			 */

			function collides() {
        return !window.openSpaces.some(openSpace => {
          return isInside(self.el.object3D.position, openSpace);
        });
			}
		}
	});
})();

function isInside(pt, space) {
  const b1 = sign(pt, space.p1, space.p2) < 0;
  const b2 = sign(pt, space.p2, space.p3) < 0;
  const b3 = sign(pt, space.p3, space.p1) < 0;

  return b1 === b2 && b2 === b3;
}

function sign(p1, p2, p3){
  // only x and z coordinates are relevant
  return (p1.x - p3.x) * (p2.z - p3.z) - (p2.x - p3.x) * (p1.z - p3.z);
}
