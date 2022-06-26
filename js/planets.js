import * as THREE from 'three';

export class Planets{
	/*
	Planet = {
		Planet: Planet Object,
		Orbit: Orbit Object
	}
	Saturn has an addition 
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
		this._initPlanets(scene);
   	this._CreatePlanetaryOrbits(scene);
	}

    // Create and add planets to scene
	_initPlanets(scene){
		const textureLoader = new THREE.TextureLoader();
		const SunTexture = textureLoader.load('./img/sun.jpeg');    // Done
		this.Sun.Planet = new THREE.Mesh(
			new THREE.SphereGeometry( 1.5, 32, 32 ), 
			new THREE.MeshBasicMaterial({ map:SunTexture}));
		scene.add(this.Sun.Planet);

      const MercuryTexture = textureLoader.load('./img/Mercury.jpeg');    // Done
      this.Mercury.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .1, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:MercuryTexture}));
      this.Mercury.Planet.position.set(1,0,3.2);
      scene.add(this.Mercury.Planet);

      const VenusTexture = textureLoader.load('./img/Venus.jpeg');    // Done
      this.Venus.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .2, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:VenusTexture}));
      	this.Venus.Planet.position.set(2.1,0,-3.9);
      scene.add(this.Venus.Planet);


      const EarthTexture = textureLoader.load('./img/Earth.jpeg');    // Done
      this.Earth.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .23, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:EarthTexture}));
      this.Earth.Planet.position.set(-5,0,-2);
      scene.add(this.Earth.Planet);

      const MarsTexture = textureLoader.load('./img/Mars.jpeg');        // Done
      this.Mars.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .12, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:MarsTexture}));
      this.Mars.Planet.position.set(6,0,-3.2);
      scene.add(this.Mars.Planet);

      const JupiterTexture = textureLoader.load('./img/Jupiter.jpeg');  // Done
      this.Jupiter.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .45, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:JupiterTexture}));
      this.Jupiter.Planet.position.set(-5.5,0,5.5);
      scene.add(this.Jupiter.Planet);

      const SaturnTexture = textureLoader.load('./img/Saturn.jpeg');    // Done
      this.Saturn.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .4, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:SaturnTexture}));
      this.Saturn.Planet.position.set(-6.5,0,-7);
      scene.add(this.Saturn.Planet);
		// Create Saturns Rings
		this.Saturn.Rings = this._CreateSaturnRings(scene);

		console.log(this);


      const UranusTexture = textureLoader.load('./img/Uranus.jpeg');
      this.Uranus.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .5, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:UranusTexture}));
      this.Uranus.Planet.position.set(3,0,10.5);
      scene.add(this.Uranus.Planet);


      
      
      const NeptuneTexture = textureLoader.load('./img/Neptune.jpeg');
      this.Neptune.Planet = new THREE.Mesh(
      	new THREE.SphereGeometry( .55, 25, 25 ), 
      	new THREE.MeshBasicMaterial({ map:NeptuneTexture}));
      this.Neptune.Planet.position.set(12,0,-5);
      scene.add(this.Neptune.Planet);
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
      mesh.scale.set(.1,.1,.1)

      var axis = new THREE.Vector3(1,1,1);
      mesh.rotateOnAxis(axis, 5);
		scene.add(mesh);
      return mesh;

    }

    _CreatePlanetaryOrbits(scene){
      this.Mercury.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 3.3526, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Mercury.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Mercury.Orbit);


		this.Venus.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 4.4294, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Venus.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Venus.Orbit);

		this.Earth.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 5.385, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Earth.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Earth.Orbit);

		this.Mars.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 6.8, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Mars.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Mars.Orbit);

		this.Jupiter.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 7.778, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Jupiter.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Jupiter.Orbit);

		this.Saturn.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 9.552, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Saturn.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Saturn.Orbit);

		this.Uranus.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 10.92, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Uranus.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Uranus.Orbit);

		this.Neptune.Orbit = new THREE.Mesh(
			new THREE.TorusGeometry( 13, 0.01, 3, 50 ),
			new THREE.MeshBasicMaterial({color: 0xB2BEB5})
		);
		this.Neptune.Orbit.rotation.x = Math.PI/2;
      scene.add(this.Neptune.Orbit);
		
      


    }


}



