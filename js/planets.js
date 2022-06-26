import * as THREE from 'three';

export class Planets{
	
	constructor(scene){
		this.Sun = null;
		this.Mercury = null;
		this.Earth = null;
		this.Mars = null;
		this.Jupiter = null;
		this.Saturn = null; // Saturn = {planet,rings}
		this.Uranus = null;
		this.Neptune = null;
		this._initPlanets(scene);
	}

    // Create and add planets to scene
	_initPlanets(scene){
		const textureLoader = new THREE.TextureLoader();
		const SunTexture = textureLoader.load('./img/sun.jpeg');    // Done
		this.Sun = new THREE.Mesh(
			new THREE.SphereGeometry( 1.5, 32, 32 ), 
			new THREE.MeshBasicMaterial({ map:SunTexture}));
		scene.add(this.Sun);

      const MercuryTexture = textureLoader.load('./img/Mercury.jpeg');    // Done
      this.Mercury = new THREE.Mesh(
        new THREE.SphereGeometry( .1, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:MercuryTexture}));
      this.Mercury.position.set(1,0,3.9);
      scene.add(this.Mercury);

      console.log(this.Mercury.position)


      const geometry = new THREE.TorusGeometry( 4.026, 0.01, 3, 50 );
      const material = new THREE.MeshBasicMaterial( { color: 0xB2BEB5 } );
      const torus = new THREE.Mesh( geometry, material );
      scene.add( torus );
      torus.rotation.x = Math.PI/2;











      const VenusTexture = textureLoader.load('./img/Venus.jpeg');    // Done
      this.Venus = new THREE.Mesh(
        new THREE.SphereGeometry( .2, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:VenusTexture}));
        this.Venus.position.set(2.1,0,-3.9);
      scene.add(this.Venus);

      const EarthTexture = textureLoader.load('./img/Earth.jpeg');    // Done
      this.Earth = new THREE.Mesh(
        new THREE.SphereGeometry( .23, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:EarthTexture}));
      this.Earth.position.set(-5,0,-2);
      scene.add(this.Earth);

      const MarsTexture = textureLoader.load('./img/Mars.jpeg');        // Done
      this.Mars = new THREE.Mesh(
        new THREE.SphereGeometry( .12, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:MarsTexture}));
      this.Mars.position.set(6,0,-3.2);
      scene.add(this.Mars);

      const JupiterTexture = textureLoader.load('./img/Jupiter.jpeg');  // Done
      this.Jupiter = new THREE.Mesh(
        new THREE.SphereGeometry( .45, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:JupiterTexture}));
      this.Jupiter.position.set(-5.5,0,5.5);
      scene.add(this.Jupiter);

      const SaturnTexture = textureLoader.load('./img/Saturn.jpeg');    // Done
      this.Saturn = new THREE.Mesh(
        new THREE.SphereGeometry( .35, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:SaturnTexture}));
      this.Saturn.position.set(-5.4,0,-5.8);
      scene.add(this.Saturn);

      const UranusTexture = textureLoader.load('./img/Uranus.jpeg');
      this.Uranus = new THREE.Mesh(
        new THREE.SphereGeometry( .2, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:UranusTexture}));
      this.Uranus.position.set(-1,0,-7);
      scene.add(this.Uranus);


      const rings = this._CreateRings();
      scene.add(rings);













      //const mesh = new THREE.Mesh(geometry, material);









      //scene.add( mesh );








      const NeptuneTexture = textureLoader.load('./img/Neptune.jpeg');
      this.Neptune = new THREE.Mesh(
        new THREE.SphereGeometry( .2, 25, 25 ), 
        new THREE.MeshBasicMaterial({ map:NeptuneTexture}));
      this.Neptune.position.set(-1,0,5);
      scene.add(this.Neptune);
    }

    _CreateRings(){
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
      mesh.position.set(-5.4,0,-5.8);
      mesh.scale.set(.1,.1,.1)

      var axis = new THREE.Vector3(1,1,1);
      mesh.rotateOnAxis(axis, 5);




      //mesh.rotateOnAxis( 1, 3);
      return mesh;

    }


}



