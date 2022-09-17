import * as THREE from  'three';
import { OrbitControls } from '../build/jsm/controls/OrbitControls.js';
import {initRenderer, 
        initCamera,
        initDefaultBasicLight,
        setDefaultMaterial,
        InfoBox,
        onWindowResize,
        createGroundPlaneXZ} from "../libs/util/util.js";

let scene, renderer, camera, material, light, orbit,material1,material2; // Initial variables
scene = new THREE.Scene();    // Create main scene
renderer = initRenderer();    // Init a basic renderer
camera = initCamera(new THREE.Vector3(0, 15, 30)); // Init camera in this position
material = setDefaultMaterial(); // create a basic material
material1 = setDefaultMaterial( 'rgb(6,55,25)');
material2 = setDefaultMaterial( 'rgb(25,0,63)' );

light = initDefaultBasicLight(scene); // Create a basic light to illuminate the scene
orbit = new OrbitControls( camera, renderer.domElement ); // Enable mouse rotation, pan, zoom etc.

// Listen window size changes
window.addEventListener( 'resize', function(){onWindowResize(camera, renderer)}, false );

// Show axes (parameter is size of each axis)
let axesHelper = new THREE.AxesHelper( 12 );
scene.add( axesHelper );

// create the ground plane
let plane = createGroundPlaneXZ(20, 20)
scene.add(plane);

// create objects
let cubeGeometry = new THREE.BoxGeometry(4, 4, 4);
let cylinderGeometry = new THREE.CylinderGeometry( 3, 3, 5, 32 );
let sphereGeometry = new THREE.SphereGeometry( 3, 16, 16 );

let cube = new THREE.Mesh(cubeGeometry, material);
let cylinder = new THREE.Mesh(cylinderGeometry, material1);
let sphere = new THREE.Mesh(sphereGeometry, material2);
// position the cube
// coordenates:
//     x equals orange line
//     y equals green line
//     z equals blue line
cube.position.set(0.0, 2.0, 0.0);
cylinder.position.set(5.5, 2.5, 0.0);
sphere.position.set(-5.5, 3.0, 0.0);
// add the cube to the scene
scene.add(cube);
scene.add(cylinder);
scene.add(sphere);

// Use this to show information onscreen
let controls = new InfoBox();
  controls.add("Basic Scene");
  controls.addParagraph();
  controls.add("Use mouse to interact:");
  controls.add("* Left button to rotate");
  controls.add("* Right button to translate (pan)");
  controls.add("* Scroll to zoom in/out.");
  controls.show();

render();
function render()
{
  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}