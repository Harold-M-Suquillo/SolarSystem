import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {SolarSystem} from '/js/SolarSystem.js';
import gsap from 'gsap';


/* 
TODO: 
  1) Create Stars
  2) Add animation toSolarSystem
  3) HTML menu
    - Planet selector
    - Planet Facts
  4) Add weather for Mars (API)
*/
class Scene{
  constructor(){
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.canvas = document.querySelector('canvas.webgl');
    this.scene = new THREE.Scene();
    // init SolarSystem and orbits
    this.SolarSystem = new SolarSystem(this);
    this.camera = this._CreateCamera();
    this.controls = this._CreateControls();
    this.renderer = this._CreateRenderer();
 
    // Resize screen Event
    window.addEventListener('resize', this._ResizeScreen.bind(this));
    this.animate();


    console.log(this.SolarSystem);
  }

  // Create, position, and add camera to scene
  _CreateCamera(scene){
    const camera = new THREE.PerspectiveCamera(30, this.sizes.width / this.sizes.height, 0.1, 80);
    camera.position.set(-3,4,10);
    this.scene.add(camera);
    return camera;
  }

  CreateAxesHelper(size){
    this.scene.add(new THREE.AxesHelper(size));
  }

  // Create and configure controls
  _CreateControls(){
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.autoRotate = true;                                     // ----------------------------------------
    controls.enableDamping;
    //controls.enablePan = false;
	 
    gsap.to(controls, {minDistance: 35, duration: 1});
    controls.maxDistance = 40;
    return controls;
  }

  // Create and Configure renderer
  _CreateRenderer(){
    const renderer = new THREE.WebGLRenderer({
      canvas: this.canvas
    })
    renderer.setSize(this.sizes.width, this.sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    return renderer;
  }

  // Updates the 
  _ResizeScreen(event){
    // Update the camera
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;
    this.camera.aspect = this.sizes.width / this.sizes.height; // Aspect ratio
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  }
  animate(){
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
    // Call tick again on the next frame
    window.requestAnimationFrame(this.animate.bind(this));





  }
}


// Create the Scene
const scene = new Scene();
//scene.CreateAxesHelper(2);





