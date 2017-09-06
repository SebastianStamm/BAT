(function() {
	AFRAME.registerComponent( 'collision', {
		init: function() {
		},

		tick: function () {
			var self = this;

			availableDoors.forEach(door => {
				if(distanceBetween(door.object3D.position, this.el.object3D.position) < doorThreshold) {
					openDoor(door);
				} else {
					closeDoor(door);
				}
			});

		}
	});
})();

function distanceBetween(p1, p2) {
	return Math.pow(p1.x - p2.x, 2) + Math.pow(p1.z - p2.z, 2);
}

function openDoor(door) {
	// door.object3D.position.y = sequenceFlowHeight;
	if(door.closingAnimObj) {
		door.removeChild(door.closingAnimObj);
		door.closingAnimObj = null;
	}
	if(!door.openingAnimObj) {
		const anim = document.createElement('a-animation');
		console.log('opening door');
		anim.setAttribute('attribute', 'position');
		anim.setAttribute('dur', '500');
		anim.setAttribute('to', door.object3D.position.x + ' ' + (sequenceFlowHeight * 1.5) + ' ' + door.object3D.position.z);

		door.appendChild(anim);
		door.openingAnimObj = anim;
	}
}

function closeDoor(door) {
	// door.object3D.position.y = sequenceFlowHeight / 2;
	if(door.openingAnimObj) {
		door.removeChild(door.openingAnimObj);
		door.openingAnimObj = null;
	}
	if(!door.closingAnimObj) {
		const anim = document.createElement('a-animation');
		anim.setAttribute('attribute', 'position');
		anim.setAttribute('dur', '500');
		anim.setAttribute('to', door.object3D.position.x + ' ' + (sequenceFlowHeight * 0.5) + ' ' + door.object3D.position.z);

		door.appendChild(anim);
		door.closingAnimObj = anim;
	}
}
