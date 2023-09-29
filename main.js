import * as THREE from "three";
import "./style.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from "gsap";
import { sphereMesh } from "./threeJS-shapes/sphere";

//Scene
const scene = new THREE.Scene();

/* //Create our sphere(this is just the shape, it doesn't have color or reflectiveness)
const geometry = new THREE.SphereGeometry(3, 64, 64);
//Material is how it looks like
const material = new THREE.MeshStandardMaterial({
  color: "blue",
  roughness: 0.5,
});

//this is the combination of your geometry and material
const mesh = new THREE.Mesh(geometry, material); */

//we need to add our mesh to our scene in order to be visible
scene.add(sphereMesh);

//window Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

//light
const light = new THREE.PointLight("white", 100, 65, 1.5);
light.position.set(10, 10, 10);
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height);
camera.position.set(0, 0, 30);
scene.add(camera);

//Render
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });

//Constrols
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(3);

//Resize
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.updateProjectionMatrix();
  camera.aspect = sizes.width / sizes.height;
  renderer.setSize(sizes.width, sizes.height);
});

//this rerender the scene and camera on every frame
const loop = () => {
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(loop);
};

loop();

//Timeline magic
const tl = gsap.timeline({ defaults: { duration: 1 } });
tl.fromTo(sphereMesh.scale, { z: 0, y: 0, x: 0 }, { z: 1, x: 1, y: 1 });
tl.fromTo("nav", { y: "-100%" }, { y: "0%" });
tl.fromTo(".title", { y: "-100%", opacity: 0 }, { y: "0%", opacity: 1 });

//Mouse animation color
