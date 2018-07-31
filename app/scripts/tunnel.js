var camera, scene, renderer, mouseClicked = false, $canvas, previousMousePos

$(document).ready( function () {
  
  /* Initiate the scene */
  init()
  $canvas = document.getElementById('canvas');
    
  let c1 = new THREE.Mesh( 
    new THREE.BoxGeometry( 3, 3, 3 ),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  )
  c1.position.set(12, 16, 32)
  scene.add( c1 );
  let c2 = c1.clone()
  c2.position.set(25, 31, 0)
  scene.add( c2 )
  let c3 = c1.clone()
  c3.position.set(-12, 5, -25)
  scene.add( c3 )
  let c4 = c1.clone()
  c4.position.set(15, -36, 0)
  scene.add( c4 )
  let c5 = c1.clone()
  c5.position.set(0, 0, 46)
  scene.add( c5 )
  
  animate()
    
  $(document).on('mousedown', function (e) { 
    mouseClicked = true
    previousMousePos = getMousePos(e)
  })
  $(document).on('mouseup', () => { mouseClicked = false })
  $("#canvas").on('mousemove', function(e) {
    if ( !mouseClicked ) return
    var currentMousePos = getMousePos(e);
    const SLOWER = 10
    var deltaY = (currentMousePos.x - previousMousePos.x) / SLOWER
    var deltaX = (currentMousePos.y - previousMousePos.y) / SLOWER
    
    // Display
    console.log("DeltaY:", deltaY, " | deltaX:", deltaX);
    
    // Move
    camera.rotTarget.y += radian( deltaY )
    camera.rotTarget.x += radian( deltaX )
    
    previousMousePos = currentMousePos
    
  });
})

function init () {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 25
  camera.rotTarget = {x:0, y:0, z:0}
  renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth - 10, window.innerHeight - 10 );
  $('#canvas').append( renderer.domElement )
  
}
function animate () {
  renderer.render( scene, camera );
  
  
  
  /* Camera Movement */
  const INERTIA = 0.9
  const MIN = 0.005
  camera.rotateOnWorldAxis( new THREE.Vector3(0,1,0), camera.rotTarget.y * INERTIA )
  camera.rotateX( camera.rotTarget.x * INERTIA )
  camera.rotTarget.y = camera.rotTarget.y < MIN && camera.rotTarget.y > -MIN ? 0 : camera.rotTarget.y * INERTIA
  camera.rotTarget.x = camera.rotTarget.x < MIN && camera.rotTarget.x > -MIN ? 0 : camera.rotTarget.x * INERTIA
  
  
  
  requestAnimationFrame( animate );
}
function getMousePos(e) {
  var rect = $canvas.getBoundingClientRect();
  return {
    x: e.clientX - rect.left,
    y: e.clientY - rect.top
  };
}
var radian = ( x ) => x*Math.PI/180
var degree = ( x ) => x*180/Math.PI