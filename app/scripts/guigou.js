$(document).ready(function () {
	let orbit

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 10000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xdddddd);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	//var controls = new THREE.OrbitControls(camera, renderer.domElement);
	camera.position.set( 0, 20, 200 );
	//controls.update();

	var geometry = new THREE.BoxGeometry(20,20,20);
	var material = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
	var cube = new THREE.Mesh( geometry, material );
	//scene.add( cube );

	var light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
	scene.add( light );

	var geom = new THREE.Geometry();

		createGeometry(geom, {w : 100, h : 100, squareWidth : 3})

		function createGeometry(geom, data){
			var index = 0;
			for(var i = 0; i < data.w; i++){
				for(var j = 0; j < data.h; j ++){
					createSquare(geom, index, {x : i * data.squareWidth, z : j * data.squareWidth}, data.squareWidth);
					index++;
				}
			}
		}

		function createSquare(geom, index, center, width){
			var square = [
				[-1,  1],[1,  1],[1, -1],[-1, -1]
			];
			square.push(square[0]);
			var centerY = Math.floor (Math.random () * 2) + 1;
			for(var i = 0; i < 4; i++){
				var v1 = new THREE.Vector3(0 + center.x, centerY, 0 + center.z);
				var v2 = new THREE.Vector3(square[i][0] * width / 2 + center.x, 0, square[i][1] * width / 2 + center.z);
				var v3 = new THREE.Vector3(square[i+1][0] * width / 2 + center.x, 0, square[i+1][1] * width / 2 + center.z);
				//console.log(center.x)
				geom.vertices.push(v1);
				geom.vertices.push(v2);
				geom.vertices.push(v3);

				var face = new THREE.Face3( (i * 3) + (index * 12), (i * 3 + 1) + (index * 12), (i * 3 + 2) + (index * 12) );
				face.normal = (function (){
					var vx = (v1.y - v3.y) * (v2.z - v3.z) - (v1.z - v3.z) * (v2.y - v3.y);
					var vy = (v1.z - v3.z) * (v2.x - v3.x) - (v1.x - v3.x) * (v2.z - v3.z);
					var vz = (v1.x - v3.x) * (v2.y - v3.y) - (v1.y - v3.y) * (v2.x - v3.x);
					var va = Math.sqrt( Math.pow(vx,2) +Math.pow(vy,2)+Math.pow(vz,2));
					return new THREE.Vector3( vx/va, vy/va, vz/va);
				})();
				geom.faces.push( face );
			}
		}


		var mesh= new THREE.Mesh(
			geom,
			new THREE.MeshBasicMaterial( { color: 0xFF0000, shading: THREE.FlatShading, wireframe: true } )
		);
		scene.add(mesh);

		orbit = new THREE.OrbitControls( camera, renderer.domElement )

	var render = function () {
	  requestAnimationFrame( render );

	  cube.rotation.x += 0.01;
	  cube.rotation.y += 0.01;
	  camera.updateProjectionMatrix();

		//controls.update();
	  renderer.render(scene, camera);
	};

	render();

});
