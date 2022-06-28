import * as THREE from 'three';
import gsap from 'gsap';

export class SolarSystem{
	/*
	Planet = {
		Planet: Planet Object,
		Orbit: Orbit Object
	}
	- Sun has no orbit key:value pair
	- Saturn has an addition 
		Rings: Rings Object
	*/
	constructor(scene){
		this.Sun = {};
		this.Mercury = {};
		this.Venus = {};
		this.Earth = {};
		this.Mars = {};
		this.Jupiter = {};
		this.Saturn = {};
		this.Uranus = {};
		this.Neptune = {};
		this.initPlanets(scene.scene);
		this.scene = scene;
		this.PrevPlanet = null;

		// Keep track of the planet currently in 
   	this.initOrbits(scene.scene);
		document.getElementById("planet-select").addEventListener("change", this._SelectPlanet.bind(this));
	}

    // Create and add planets to scene
	initPlanets(scene){
		const textureLoader = new THREE.TextureLoader();
		this._PlanetConstructor(scene, textureLoader, this.Sun, './img/sun.jpeg',[1.5, 32, 32], [0, 0, 0]);
		this._PlanetConstructor(scene, textureLoader, this.Mercury, './img/Mercury.jpeg', [.1, 25, 25], [1, 0, 3.2]);
		this._PlanetConstructor(scene, textureLoader, this.Venus,  './img/Venus.jpeg', [.2, 25, 25], [2.1, 0, -3.9]);
		this._PlanetConstructor(scene, textureLoader, this.Earth, './img/Earth.jpeg', [ .23, 25, 25 ], [-5, 0, -2]);
		this._PlanetConstructor(scene, textureLoader, this.Mars, './img/Mars.jpeg', [.12, 25, 25], [6, 0, -3.2]);
		this._PlanetConstructor(scene, textureLoader, this.Jupiter, './img/Jupiter.jpeg', [.45, 25, 25], [-5.5, 0, 5.5]);
		this._PlanetConstructor(scene, textureLoader, this.Saturn, './img/Saturn.jpeg', [.4, 25, 25], [-6.5, 0, -7]);
		this._PlanetConstructor(scene, textureLoader, this.Uranus, './img/Uranus.jpeg', [.5, 25, 25], [3, 0, 10.5]);
		this._PlanetConstructor(scene, textureLoader, this.Neptune, './img/Neptune.jpeg', [.55, 25, 25], [12, 0, -5]);
		// Create Saturn's Rings
		this.Saturn.Rings = this._CreateSaturnRings(scene);
    }

	 // Planet constructor
	 _PlanetConstructor(scene, textureLoader, planet, img, geo, pos){
		const texture = textureLoader.load(img);
		planet.Planet = new THREE.Mesh(
      		new THREE.SphereGeometry(geo[0], geo[1], geo[2]), 
        	new THREE.MeshBasicMaterial({ map:texture}));
		planet.Planet.position.set(pos[0], pos[1], pos[2]);
		scene.add(planet.Planet);
	 }

    _CreateSaturnRings(scene){
      const texture = new THREE.TextureLoader().load(
      	"https://i.postimg.cc/zz7Gr430/saturn-rings-top.png"
      );
    
      const material = new THREE.MeshBasicMaterial({
      	map: texture,
      	side: THREE.DoubleSide,
      	transparent: true
      });

      const geometry = new THREE.RingBufferGeometry(3, 5, 64);
      var pos = geometry.attributes.position;
      var v3 = new THREE.Vector3();
      for (let i = 0; i < pos.count; i++) {
      	v3.fromBufferAttribute(pos, i);
      	geometry.attributes.uv.setXY(i, v3.length() < 4 ? 0 : 1, 1);
      }

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(-6.5,0,-7);
      mesh.scale.set(.1,.1,1)

      var axis = new THREE.Vector3(1,1,1);
      mesh.rotateOnAxis(axis, 5);
		scene.add(mesh);
      return mesh;
    }

   initOrbits(scene){
		const color = 0xB2BEB5;
		this._OrbitConstructor(scene, color, this.Mercury, 3.3526);
		this._OrbitConstructor(scene, color, this.Venus, 4.4294);
		this._OrbitConstructor(scene, color, this.Earth, 5.385);
		this._OrbitConstructor(scene, color, this.Mars, 6.8);
		this._OrbitConstructor(scene, color, this.Jupiter, 7.778);
		this._OrbitConstructor(scene, color, this.Saturn, 9.552);
		this._OrbitConstructor(scene, color, this.Uranus, 10.92);
		this._OrbitConstructor(scene, color, this.Neptune, 13);
    }

	_OrbitConstructor(scene, color, planet, radius){
		planet.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( radius, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: color})
		);
		planet.Orbit.rotation.x = Math.PI/2;
      scene.add(planet.Orbit);
	 }

	 _SelectPlanet(event){
		const SelectedPlanet = this[event.target.value];

		// If there is a previous planet move it back 
		if (this.PrevPlanet != null){
			this.PrevPlanet.Planet.position.y = 0;
			this.Saturn.Rings.position.y = 0;	// Special case			
		}
	
		// change the PLanet title
		document.getElementById("planet-title").textContent = event.target.value;

		switch (event.target.value){
			
			case "Sun":
				this.scene.camera.position.set(-3,4,10);
				this.scene.controls.target.set(0,0,0);
				this.scene.controls.minDistance = 30;
				gsap.to(this.scene.controls, {minDistance: 6, duration: 1.5});
				this.scene.controls.maxDistance = 8;
				break;
			
			
			case "Solar-System":
				this.scene.camera.position.set(-3,4,10);
				this.scene.controls.target.set(0,0,0);
				gsap.to(this.scene.controls, {minDistance: 35, duration: 1});
				this.scene.controls.maxDistance = 45;
				break;
			
			default:
				if (SelectedPlanet == this.Saturn){
					this.Saturn.Rings.position.y = -8;
				}
				// Move the planet downward
				SelectedPlanet.Planet.position.y = -8;
				// Change the camera target
				this.scene.controls.target.set(SelectedPlanet.Planet.position.x, -8, SelectedPlanet.Planet.position.z)
				this.scene.controls.minDistance = 6;
				// Chnage the camera positioning
				gsap.to(this.scene.controls, {minDistance: 2, duration: 1});
				this.scene.controls.maxDistance = 3;
		}
		// Keep track of the previous planet
		this.PrevPlanet = SelectedPlanet;
	 }
}