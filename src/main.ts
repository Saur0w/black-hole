import * as THREE from "three";
import "./style.css";

const container = document.querySelector<HTMLDivElement>("#app")!;

const renderer = new THREE.WebGLRenderer({
  antialias: true,
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
container.appendChild(renderer.domElement);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000);

const camera = new THREE.PerspectiveCamera(
  60,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

camera.position.set(0, 0, 5);

const clock = new THREE.Clock();

const horizon = new THREE.Group();
scene.add(horizon);

// Event Horizon
const coreGeometry = new THREE.SphereGeometry(1, 64, 64);
const coreMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });
const eventHorizonMesh = new THREE.Mesh(coreGeometry, coreMaterial);
horizon.add(eventHorizonMesh);

const shellGeometry = new THREE.SphereGeometry(1.02, 32, 32);
const shellMaterial = new THREE.MeshBasicMaterial({
  color: 0xff5500,
  wireframe: true,
  transparent: true,
  opacity: 0.15,
});
const shellMesh = new THREE.Mesh(shellGeometry, shellMaterial);
horizon.add(shellMesh);

// Accretion Disk
const diskGeometry = new THREE.RingGeometry(1.3, 2.8, 64);
const diskMaterial = new THREE.MeshBasicMaterial({
  color: 0xff8800,
  side: THREE.DoubleSide,
  transparent: true,
  opacity: 0.8,
});
const accretionDisk = new THREE.Mesh(diskGeometry, diskMaterial);
accretionDisk.rotation.x = Math.PI / 2.3; 
horizon.add(accretionDisk);

function tick() {
  const dt = Math.min(clock.getDelta(), 1 / 30);

  horizon.rotation.y += dt * 0.25;
  horizon.rotation.x += dt * 0.08;

  renderer.render(scene, camera);

  requestAnimationFrame(tick);
}

tick();

window.addEventListener("resize", () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});