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
        const SunTexture = new THREE.TextureLoader().load('./img/sun.jpeg');
        this.Sun = new THREE.Mesh(
            new THREE.SphereGeometry( .6, 32, 32 ), 
            new THREE.MeshBasicMaterial({ map:SunTexture}));
        scene.add(this.Sun);

        const MercuryTexture = new THREE.TextureLoader().load('./img/Mercury.jpeg');
        this.Mercury = new THREE.Mesh(
          new THREE.SphereGeometry( .1, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:MercuryTexture}));
        this.Mercury.position.set(1.67,0,0);
        scene.add(this.Mercury);

        const VenusTexture = new THREE.TextureLoader().load('./img/Venus.jpeg');
        this.Venus = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:VenusTexture}));
          this.Venus.position.set(2.23,0,2);
        scene.add(this.Venus);

        const EarthTexture = new THREE.TextureLoader().load('./img/Earth.jpeg');
        this.Earth = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:EarthTexture}));
        this.Earth.position.set(-2,0,2);
        scene.add(this.Earth);

        const MarsTexture = new THREE.TextureLoader().load('./img/Mars.jpeg');
        this.Mars = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:MarsTexture}));
        this.Mars.position.set(4.73,0,-3);
        scene.add(this.Mars);

        const JupiterTexture = new THREE.TextureLoader().load('./img/Jupiter.jpeg');
        this.Jupiter = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:JupiterTexture}));
        this.Jupiter.position.set(8,0,-7);
        scene.add(this.Jupiter);

        const SaturnTexture = new THREE.TextureLoader().load('./img/Saturn.jpeg');
        this.Saturn = new THREE.Mesh(
          new THREE.SphereGeometry( .1, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:SaturnTexture}));
        this.Saturn.position.set(1,1,1);
        scene.add(this.Saturn);

        const UranusTexture = new THREE.TextureLoader().load('./img/Saturn.jpeg');
        this.Uranus = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:UranusTexture}));
        this.Uranus.position.set(-1,0,-7);
        scene.add(this.Uranus);

        // RINGS
        const RingTexture = new THREE.TextureLoader().load('./img/Rings.png');
        const rings = new THREE.RingGeometry(.15, .1, 30, 1, 0, 6.28318);
        const material = new THREE.MeshBasicMaterial( { map: RingTexture, side: THREE.DoubleSide } );
        const mesh = new THREE.Mesh( rings, material );
        mesh.position.set(1,1,1);
        scene.add( mesh );

        const NeptuneTexture = new THREE.TextureLoader().load('./img/Neptune.jpeg');
        this.Neptune = new THREE.Mesh(
          new THREE.SphereGeometry( .2, 25, 25 ), 
          new THREE.MeshBasicMaterial({ map:NeptuneTexture}));
        this.Neptune.position.set(-1,0,5);
        scene.add(this.Neptune);
    }
}



