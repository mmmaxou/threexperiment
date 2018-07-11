$(document).ready(function () {
  
  const frameWidth = window.innerWidth-100
  const frameHeight = window.innerHeight-300

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera( 75, frameWidth / frameHeight, 0.1, 1000 );
  
  var geometry = new THREE.BoxGeometry( 1, 1, 1 );
  var material = new THREE.MeshBasicMaterial( { color: 0xac4dc3 } );
  var cube = new THREE.Mesh( geometry, material );
//  scene.add( cube );
  
  //create a blue LineBasicMaterial
  var materialLine = new THREE.LineBasicMaterial( { color: 0x9999e5 } );
  var geometryLine = new THREE.Geometry();
  geometryLine.vertices.push(new THREE.Vector3( -3, 0, -2) );
  geometryLine.vertices.push(new THREE.Vector3( 0, 1 , 0) );
  geometryLine.vertices.push(new THREE.Vector3( 1, 0, 0) );
  var line = new THREE.Line( geometryLine, materialLine );
  scene.add( line );
  

  camera.position.z = 5;
  
  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( frameWidth, frameHeight );
  $('#canvas').append( renderer.domElement)
  
  

  const animate = function () {
    requestAnimationFrame( animate );
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render( scene, camera );
  }
  animate();
  
})