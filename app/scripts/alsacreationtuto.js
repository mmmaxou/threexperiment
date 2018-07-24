$(document).ready(function () {
  
  let renderer, scene, camera, ambiantLight, directionalLight
  let earth, star, bump, cloud, orbit
  
  const innerWidth = window.innerWidth - 100
  const innerHeight = window.innerHeight - 300
  
  init()
  animate()
  
  function init() {
    renderer = new THREE.WebGLRenderer()
    
    renderer.setSize( innerWidth, innerHeight )
    $('#canvas').append( renderer.domElement )    
    
    scene = new THREE.Scene()
    camera = new THREE.PerspectiveCamera( 50, innerWidth / innerHeight, 1, 1000 )
    camera.position.set( 0, 0, 15 )
    scene.add( camera )
    
    ambiantLight = new THREE.AmbientLight( 0x969696 )
    directionalLight = new THREE.DirectionalLight( 0xfdfcf0, 1 )
    directionalLight.position.set(20, 10, 20)
    scene.add( ambiantLight )
    scene.add( directionalLight )
    
    var earthGeometry = new THREE.SphereGeometry( 5, 50, 50 )
    var earthMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/images/textures/earth.jpg"),
      color: 0xaaaaaa,
      specular: 0x333333,
      shininess: 15
    })
    
    var cloudGeometry = new THREE.SphereGeometry(5.05, 50, 50 )
    var cloudMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/images/textures/clouds.png"),
      transparent: true,
      opacity: 0.8
    })
    
    var bumpGeometry = new THREE.SphereGeometry(5, 50, 50 )
    var bumpMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/images/textures/bump.jpg"),
      transparent: true,
      opacity: 0.2
    })
    
    var starGeometry = new THREE.SphereGeometry(200, 50, 50 )
    var starMaterial = new THREE.MeshPhongMaterial({
      map: new THREE.TextureLoader().load("/images/textures/star.jpg"),
      side: THREE.DoubleSide,
      shininess: 0
    })
    
    star = new THREE.Mesh( starGeometry, starMaterial )
    earth = new THREE.Mesh( earthGeometry, earthMaterial )
    cloud = new THREE.Mesh( cloudGeometry, cloudMaterial )
    bump = new THREE.Mesh( bumpGeometry, bumpMaterial )
    
    scene.add( star )
    scene.add( earth )
    scene.add( cloud )
    scene.add( bump )
    
    orbit = new THREE.OrbitControls( camera, renderer.domElement )
    
  }
  
  function animate () {
    
    earth.rotation.y += .0015
    cloud.rotation.y += .0025
    cloud.rotation.x += .00125
    bump.rotation.y += .0015
    
    renderer.render( scene, camera )
    requestAnimationFrame( animate )
  }
  
})