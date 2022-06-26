import '/style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {Planets} from '/js/planets.js';

class Scene{
  constructor(){
    this.sizes = {
      width: window.innerWidth,
      height: window.innerHeight
    };
    this.canvas = document.querySelector('canvas.webgl');
    this.scene = new THREE.Scene();
    this.planets = new Planets(this.scene);                    // init Planets and orbits
    this.camera = this._CreateCamera();
    this.controls = this._CreateControls();
    this.renderer = this._CreateRenderer();
 
    // Create AxesHelper
    this._CreateAxesHelper();
    // Resize screen Event
    window.addEventListener('resize', this._ResizeScreen.bind(this));


  }


  // Create, position, and add camera to scene
  _CreateCamera(scene){
    //const camera = new THREE.OrthographicCamera(-(this.sizes.width / this.sizes.height),this.sizes.width / this.sizes.height, 1, -1, 0.1, 1000);
    const camera = new THREE.PerspectiveCamera(30, this.sizes.width / this.sizes.height, 0.1, 50)
    camera.position.z = 10;
    camera.position.y = 4;
    camera.position.x = -3;
    this.scene.add(camera);
    return camera;
  }


  // Create and add AxesHelper to scene
  _CreateAxesHelper(){
    this.scene.add(new THREE.AxesHelper(3));
  }

  // TODO ---------- Add Circular Lines
  // Create and configure controls
  _CreateControls(){
    const controls = new OrbitControls(this.camera, this.canvas);
    controls.autoRotate = true;                                     // ----------------------------------------
    controls.enableDamping;
    //controls.enablePan = false;
    controls.minDistance = 5;
    controls.maxDistance = 35;
    //this.camera.position.set( 0, 4, 10);      // The default position for the camera
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

  _ResizeScreen(event){
    // Update sizes
    this.sizes.width = window.innerWidth;
    this.sizes.height = window.innerHeight;


    // ASPECT CAMERA
    this.camera.aspect = this.sizes.width / this.sizes.height;

    // Update the Camera
    //this.camera.left =  -(this.sizes.width / this.sizes.height);
    //this.camera.right = this.sizes.width / this.sizes.height;
    this.camera.updateProjectionMatrix();

    // Update renderer
    this.renderer.setSize(this.sizes.width, this.sizes.height)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  }
  tick(){
    this.controls.update();
  
    //planets.Earth.position.y = -4;
    //this.camera.lookAt(this.planets.Earth.position);
  
    // Render
    this.renderer.render(this.scene, this.camera);
  
    // Call tick again on the next frame
    window.requestAnimationFrame(this.tick.bind(this));
  }


}

// Create the Scene
let SolarSystem = new Scene();
SolarSystem.tick();

