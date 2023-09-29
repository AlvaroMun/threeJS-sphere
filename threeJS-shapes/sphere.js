import * as THREE from "three";

//Create our sphere(this is just the shape, it doesn't have color or reflectiveness)
const geometry = new THREE.SphereGeometry(3, 64, 64);
//Material is how it looks like
const material = new THREE.MeshStandardMaterial({
  color: "blue",
  roughness: 0.5,
});

//this is the combination of your geometry and material
export const sphereMesh = new THREE.Mesh(geometry, material);
