$(document).ready(function () {

	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

	var renderer = new THREE.WebGLRenderer();
	renderer.setClearColor(0xdddddd);
	renderer.setSize( window.innerWidth, window.innerHeight );
	document.body.appendChild( renderer.domElement );

	var geometry = new THREE.BoxGeometry(20,20,20);
	var material = new THREE.MeshLambertMaterial( { color: 0x00ffff } );
	var cube = new THREE.Mesh( geometry, material );
	//scene.add( cube );

	camera.position.z = 100;

	// var light = new THREE.PointLight( 0xFFFFFF );
	// light.position.set( 0, 10, 25 );
	// scene.add( light );
	//
	// var light2 = new THREE.PointLight( 0xFFFFFF );
	// light2.position.set(-20, 0, 0);
	// scene.add( light2 );

	var light = new THREE.HemisphereLight( 0xffffff, 0x080820, 1 );
	scene.add( light );

	var width = 250;
	var height = 250;

	for(var i = -height; i<height;i++){
		for(var j= -width;j<width;j++){
			
		}
	}


	var render = function () {
	  requestAnimationFrame( render );

	  cube.rotation.x += 0.01;
	  cube.rotation.y += 0.01;
	  camera.updateProjectionMatrix();

	  renderer.render(scene, camera);
	};

	render();

});
