let camera, scene, orbit, loader, geometry, material, textMesh, plane, ambiantLight, directionalLight
let current = {x: -400, y: 80, z: 0, lookAt: 0}
let target = {x: 300, y: 25, z: 500, lookAt: 250}
let tweenPosition
const TEXT_WRITTEN = "Send Nudes ;)"


$(document).ready(function () {

  scene = new THREE.Scene();
  scene.background = new THREE.Color( 0x000000 )

  camera = new THREE.PerspectiveCamera( 40, window.innerWidth/window.innerHeight, 1, 2000 )
  camera.position.set( current.x, current.y, current.z )
  camera.lookAt(current.lookAt, 0, 0)
  scene.add( camera )

  var renderer = new THREE.WebGLRenderer({antialias: true});
  renderer.setSize( window.innerWidth, window.innerHeight );
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFSoftShadowMap;

  $('#canvas').append( renderer.domElement )
  orbit = new THREE.OrbitControls( camera, renderer.domElement )

  // Let's create a plan
  const planeGeometry = new THREE.PlaneGeometry( 1800, 1200, 32 )
  const planeMaterial = new THREE.MeshPhongMaterial({color: 0xffffff})
  plane = new THREE.Mesh( planeGeometry, planeMaterial )
  plane.rotation.x = radian( -90 )
  plane.position.set(250, -20, 0)
  plane.receiveShadow = true
  scene.add( plane )

  ambiantLight = new THREE.AmbientLight( 0x969696, 0.125 )
  directionalLight = new THREE.DirectionalLight( 0xfdfcf0, 1 )
  directionalLight.position.set(target.x, target.y + 200, target.z)
  directionalLight.shadow.camera.near = 0.1
  directionalLight.shadow.camera.far = 1000
  directionalLight.castShadow = true
  directionalLight.shadow.camera.left = -500;
  directionalLight.shadow.camera.bottom = -500;
  directionalLight.shadow.camera.right = 500;
  directionalLight.shadow.camera.top = 500;
  scene.add( ambiantLight )
  scene.add( directionalLight )


  loader = new THREE.TTFLoader()
  loader.load( 
    '/fonts/ChelaOne-Regular.ttf',
    function ( json ) {
      let font = new THREE.Font( json )
      geometry = new THREE.TextBufferGeometry( TEXT_WRITTEN, {
        font: font,

        size: 70,
        height: 16,
        curveSegments: 12,

        bevelEnabled: true,
        bevelThickness: 1.5,
        bevelSize: 1.5,
        bevelSegments: 8
      })
      material = new THREE.MeshPhongMaterial( { color: 0xb46f6f } );
      textMesh = new THREE.Mesh( geometry, material )
      textMesh.castShadow = true
      textMesh.receiveShadow = true
      scene.add( textMesh )
      directionalLight.target = textMesh
    },
    function ( xhr ) {
      console.log(xhr.loaded / xhr.total * 100, '% loaded')
    },
    function ( err ) {
      console.log( "Error happenned: ", err)
    }
  )

  //Create a helper for the shadow camera (optional)
  var helper2 = new THREE.CameraHelper( directionalLight.shadow.camera );
//  scene.add( helper2 );


  var animate = function () {
    requestAnimationFrame( animate )
    TWEEN.update()
    renderer.render( scene, camera )
  }
  animate()

  $(window).keypress( function (e) {
    if ( e.which == 32 ) { // SPACE
      e.preventDefault()
      tweenPosition = new TWEEN.Tween( current )
        .to( target, 3000 )
        .easing(TWEEN.Easing.Elastic.InOut)
        .onUpdate( function () {
        camera.position.set( current.x, current.y, current.z)
        camera.lookAt(current.lookAt, 0, 0)
      })
        .start()

    }
  })
})

const radian = ( x ) => x*Math.PI/180