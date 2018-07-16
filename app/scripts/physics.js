let camera, scene, paused = true

$(document).ready(function () {

  let orbit

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 25

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );
  $('#canvas').append( renderer.domElement)

  // Let's create a plan
  const planeGeometry = new THREE.PlaneGeometry( 20, 20, 32 )
  const planeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00, side: THREE.DoubleSide})
  const plane = new THREE.Mesh( planeGeometry, planeMaterial )
  scene.add( plane )

  // Now a ball
  const ballGeometry = new THREE.SphereGeometry( 1, 32, 32 )
  const ballMaterial = new THREE.MeshBasicMaterial({color: 0xbf5dbf})
  const ball = new THREE.Mesh( ballGeometry, ballMaterial )
  ball.position.z = 30
  ball.speed = new THREE.Vector3(0, 0, 0)
  scene.add( ball )


  orbit = new THREE.OrbitControls( camera, renderer.domElement )

  var animate = function () {
    requestAnimationFrame( animate );

    // ANIMATION LOOP HERE
    if( !paused ) {
      ball.speed.z -= 0.1
      ball.position.z += ball.speed.z
      if ( ball.position.z-1 <= plane.position.z ) {
        ball.speed.z = -ball.speed.z
        ball.position.z = -ball.position.z
      }
    }

    renderer.render( scene, camera );
  };

  $(window).keypress( function (e) {
    if ( e.which == 32 ) { 
      paused = false
      e.preventDefault()
    }
  })

  animate();

})

const radian = ( x ) => {x * Math.PI / 180}