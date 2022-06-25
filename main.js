import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Planets} from '/js/planets.js';

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Create planets
const planets = new Planets(scene);


















//AxesHelper
const axesHelper = new THREE.AxesHelper(1.3);
scene.add(axesHelper);


// Screen Size
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight
}

// Event listener to resize screen
window.addEventListener('resize', e =>{
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update the Camera
  camera.left =  -(sizes.width / sizes.height);
  camera.right = sizes.width / sizes.height;
  camera.updateProjectionMatrix();



  // Update renderer
  renderer.setSize(sizes.width, sizes.height)
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
});

// Camera
//const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)

const camera = new THREE.OrthographicCamera(-(sizes.width / sizes.height),sizes.width / sizes.height, 1, -1, 0.1, 100);
camera.position.z = 10;
scene.add(camera)


const controls = new OrbitControls(camera, canvas);
//controls.autoRotate = true;
controls.enableDamping




// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))






const clock = new THREE.Clock()
const tick = () =>
{
  const elapsedTime = clock.getElapsedTime()
  controls.update();

  //camera.lookAt(planets.Earth.position);

    // Render
  renderer.render(scene, camera)

  // Call tick again on the next frame
  window.requestAnimationFrame(tick)
}


tick()