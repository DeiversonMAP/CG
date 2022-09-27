import * as THREE from 'three';
import GUI from '../libs/util/dat.gui.module.js'
import { TrackballControls } from '../build/jsm/controls/TrackballControls.js';
import {
  initRenderer,
  initDefaultSpotlight,
  initCamera,
  createGroundPlane,
  onWindowResize
} from "../libs/util/util.js";

let scene = new THREE.Scene();    // Create main scene
let renderer = initRenderer();    // View function in util/utils
let light = initDefaultSpotlight(scene, new THREE.Vector3(7.0, 7.0, 7.0));
let camera = initCamera(new THREE.Vector3(3.6, 4.6, 8.2)); // Init camera in this position
let trackballControls = new TrackballControls(camera, renderer.domElement);

// Show axes 
let axesHelper = new THREE.AxesHelper(5);
axesHelper.translateY(0.1);
scene.add(axesHelper);

// Listen window size changes
window.addEventListener('resize', function () { onWindowResize(camera, renderer) }, false);

let groundPlane = createGroundPlane(10, 10, 40, 40); // width, height, resolutionW, resolutionH
groundPlane.rotateX(THREE.MathUtils.degToRad(-90));
scene.add(groundPlane);

// Create sphere
let geometry = new THREE.SphereGeometry(0.2, 32, 16);
let material = new THREE.MeshPhongMaterial({ color: "red", shininess: "200" });
let sphere1 = new THREE.Mesh(geometry, material);
let sphere2 = new THREE.Mesh(geometry, material);
sphere1.castShadow = true;
sphere2.castShadow = true;
sphere1.position.set(-5, 0.2, -2);
sphere2.position.set(-5, 0.2, 2);
scene.add(sphere1);
scene.add(sphere2);

// Variables that will be used for linear interpolation

const config = {
  move1: true,
  move2: true
}
function buildInterface() {
  var reset = new function () {
    this.position = function () {
      sphere1.position.set(-5, 0.2, -2);
      sphere2.position.set(-5, 0.2, 2);
    };
  };


  let gui = new GUI();
  let folder = gui.addFolder("Lerp Options");
  folder.open();
  folder.add(config, "move1", true)
    .name("Esfera 1");
  folder.add(config, "move2", true)
    .name("Esfera 2");
  folder.add(reset, "position", true).name("RESET")
  //falta criar o botao de reset
}

buildInterface();
render();

function move_sphere1() {
  if (sphere1.position.x <= 5 && config.move1) sphere1.translateX(0.01)
}
function move_sphere2() {
  if (sphere2.position.x <= 5 && config.move2) sphere2.translateX(0.005)
}

function render() {
  move_sphere1()
  move_sphere2()
  trackballControls.update();

  // if (lerpConfig1.move) sphere1.position.lerp(lerpConfig1.destination, lerpConfig1.alpha);
  // if (lerpConfig2.move) sphere2.position.lerp(lerpConfig2.destination, lerpConfig2.alpha);

  requestAnimationFrame(render);
  renderer.render(scene, camera) // Render scene
}