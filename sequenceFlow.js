window.AFRAME.registerGeometry('sequenceFlow', {
  schema: {
    points: {
      default: ['0 0', '10 10']
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const waypoints = data.points.map(point => {
      return point.split(' ').map(coordinate => parseFloat(coordinate));
    }).map(coordinate => {
      return new THREE.Vector2(coordinate[0], coordinate[1]);
    });

    const mappedWaypoints = window.calculateWaypoints(waypoints);

    geometry.vertices = [];
    geometry.faces = [];

    mappedWaypoints.forEach((waypoint, idx) => {
      geometry.vertices.push(
        new THREE.Vector3(waypoint[0].y, 0, -waypoint[0].x),
        new THREE.Vector3(waypoint[1].y, 0, -waypoint[1].x),
        new THREE.Vector3(waypoint[0].y, window.sequenceFlowHeight, -waypoint[0].x),
        new THREE.Vector3(waypoint[1].y, window.sequenceFlowHeight, -waypoint[1].x),
        new THREE.Vector3(waypoint[2].y, 0, -waypoint[2].x),
        new THREE.Vector3(waypoint[3].y, 0, -waypoint[3].x),
      );

      if(idx > 0) {
        const faceIndexOffset = (idx - 1) * 6;
        geometry.faces.push(new THREE.Face3(4 + faceIndexOffset, 10+ faceIndexOffset, 5 + faceIndexOffset));
        geometry.faces.push(new THREE.Face3(5 + faceIndexOffset, 10+ faceIndexOffset, 11+ faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(2 + faceIndexOffset, 3 + faceIndexOffset, 8 + faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(3 + faceIndexOffset, 9 + faceIndexOffset, 8 + faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(0 + faceIndexOffset, 2 + faceIndexOffset, 6 + faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(2 + faceIndexOffset, 8 + faceIndexOffset, 6 + faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(1 + faceIndexOffset, 7 + faceIndexOffset, 3 + faceIndexOffset));
        // geometry.faces.push(new THREE.Face3(3 + faceIndexOffset, 7 + faceIndexOffset, 9 + faceIndexOffset));

        window.addSpace(geometry.vertices[4 + faceIndexOffset], geometry.vertices[10 + faceIndexOffset], geometry.vertices[5 + faceIndexOffset]);
        window.addSpace(geometry.vertices[5 + faceIndexOffset], geometry.vertices[10 + faceIndexOffset], geometry.vertices[11 + faceIndexOffset]);
      }
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});


window.AFRAME.registerGeometry('sequenceFlowLine', {
  schema: {
    points: {
      default: ['0 0', '10 10']
    }
  },

  init: function (data) {
    var geometry = new THREE.Geometry();

    const waypoints = data.points.map(point => {
      return point.split(' ').map(coordinate => parseFloat(coordinate));
    }).map(coordinate => {
      return new THREE.Vector2(coordinate[0], coordinate[1]);
    });

    const mappedWaypoints = window.calculateWaypoints(waypoints);

    geometry.vertices = [];
    geometry.faces = [];

    mappedWaypoints.forEach((waypoint, idx) => {
      geometry.vertices.push(
        new THREE.Vector3(waypoint[0].y, 0, -waypoint[0].x),
        new THREE.Vector3(waypoint[1].y, 0, -waypoint[1].x),
        new THREE.Vector3(waypoint[2].y, 0, -waypoint[2].x),
        new THREE.Vector3(waypoint[3].y, 0, -waypoint[3].x),
      );

      if(idx > 0) {
        const faceIndexOffset = (idx - 1) * 4;
        geometry.faces.push(new THREE.Face3(0 + faceIndexOffset, 4 + faceIndexOffset, 2 + faceIndexOffset));
        geometry.faces.push(new THREE.Face3(2 + faceIndexOffset, 4 + faceIndexOffset, 6 + faceIndexOffset));
        geometry.faces.push(new THREE.Face3(3 + faceIndexOffset, 7 + faceIndexOffset, 1 + faceIndexOffset));
        geometry.faces.push(new THREE.Face3(1 + faceIndexOffset, 7 + faceIndexOffset, 5 + faceIndexOffset));
      }
    });

    geometry.computeFaceNormals();
    geometry.computeVertexNormals();
    this.geometry = geometry;
  }
});
