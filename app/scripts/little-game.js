let camera, scene, player
var ACC = 0.2
var GRAVITY = 0.2
var KEY_DOWN_Z = false
var KEY_DOWN_Q = false
var KEY_DOWN_S = false
var KEY_DOWN_D = false
var KEY_DOWN_SPACE = false

const radian = ( x ) => {x * Math.PI / 180}
const rand = (a, b) => { return ~~(Math.random()*(b-a+1)+a)}

$(document).ready(function () {

  let orbit

  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
  camera.position.z = 25

  var renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth-200, window.innerHeight-200 );
  $('#canvas').append( renderer.domElement)

  // Let's create a plan
  let pG = new THREE.PlaneGeometry( plan.w, plan.h, plan.seg )
  let pM = new THREE.MeshBasicMaterial({color: plan.col, side: THREE.DoubleSide})
  let p = new THREE.Mesh( pG, pM )
  p.position.x = 0
  p.position.y = 0
  p.position.z = 0
  scene.add( p )
  let plans = [p]
  
  for ( var i=1; i<1000; i++ ) {
    plans.push( p.clone() )
    plans[i].position.set( rand(-20, 20), rand(-20, 20), 20*i )
    scene.add( plans[i] )
    console.log(plans[i]);
  }
  

  player = new THREE.Mesh( 
    new THREE.BoxGeometry( 5, 3, 2 ),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 })
  );
  player.position.z = 5
  player.speed = { x:0, y:0, z:0 }
  scene.add( player );



  orbit = new THREE.OrbitControls( camera, renderer.domElement )

  var animate = function () {
    requestAnimationFrame( animate );

    player.speed.z -= GRAVITY

    let collided = false
    plans.forEach( function ( plan ) {
      // Check for collision
      const deltaDepth = player.geometry.parameters.depth/2
      const deltaWidth = player.geometry.parameters.width/2 + plan.geometry.parameters.width/2
      const deltaHeight = player.geometry.parameters.height/2 + plan.geometry.parameters.height/2
      const deltaX = Math.abs(player.position.x - plan.position.x)
      const deltaY = Math.abs(player.position.y - plan.position.y)
      const deltaZ = Math.abs(player.position.z - plan.position.z)
      //console.log("deltadepth:", deltaDepth, " | deltaZ:", ~~deltaZ);
      if (
        deltaZ <= deltaDepth &&
        deltaX <= deltaWidth &&
        deltaY <= deltaHeight
      ) {
        collided = true
      }
    })

    if ( collided ) {
      // RED
      player.material.color.setHex( 0xff0000 )
      KEY_DOWN_SPACE ? player.speed.z = 8 : player.speed.z = 0
    } else {
      // GREEN
      player.material.color.setHex( 0x00ff00 )        
    }


    // UPDATE
    KEY_DOWN_Z ? player.speed.y += ACC : undefined
    KEY_DOWN_S ? player.speed.y -= ACC : undefined
    KEY_DOWN_Q ? player.speed.x -= ACC : undefined
    KEY_DOWN_D ? player.speed.x += ACC : undefined

    player.position.x += player.speed.x
    player.position.y += player.speed.y
    player.position.z += player.speed.z

    player.speed.x = (player.speed.x * 0.8)
    player.speed.y = (player.speed.y * 0.8)
    player.speed.z = (player.speed.z * 0.8)

    renderer.render( scene, camera );
  };

  $('body').on('keydown', function (e) {
    //console.log('down', e.which);
    switch ( e.which ) {
      case 90:
        // key 'Z'
        KEY_DOWN_Z = true
        break;
      case 81:
        // key 'Q'
        KEY_DOWN_Q = true
        break;
      case 68:
        // key 'D'
        KEY_DOWN_D = true
        break;
      case 83:
        // key 'S'
        KEY_DOWN_S = true
        break;
      case 32:
        // key SPACE
        KEY_DOWN_SPACE = true
        break;
    }
  })
  $('body').on('keyup', function (e) {
    switch ( e.which ) {
      case 90:
        // key 'Z'
        KEY_DOWN_Z = false
        break;
      case 81:
        // key 'Q'
        KEY_DOWN_Q = false
        break;
      case 68:
        // key 'D'
        KEY_DOWN_D = false
        break;
      case 83:
        // key 'S'
        KEY_DOWN_S = false
        break;
      case 32:
        // key SPACE
        KEY_DOWN_SPACE = false
        break;
    }
  })

  animate();

})

var plan = { w:20, h:20, seg:32, col:0xffff00, x:0, y:0, z:0 }
