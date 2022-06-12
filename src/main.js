import './style.css'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});


renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);
camera.position.setX(-3);
renderer.render(scene, camera);



// Torus
const vGeometry = new THREE.TorusGeometry(10, 3, 16, 100);
const vMaterial = new THREE.MeshStandardMaterial({ color: "#ff4500", wireframe: true });
const torus = new THREE.Mesh(vGeometry, vMaterial);
scene.add(torus);

// LIGTH
const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(20, 20, 20);
// const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight);

// Helpers
// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50);
// scene.add(gridHelper)
// const controls = new OrbitControls(camera, renderer.domElement);

// starts
function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}
Array(200).fill().forEach(addStar);

//Square
function addquares() {
  const geometry = new THREE.BoxGeometry(2, 2, 2);
  const material = new THREE.MeshBasicMaterial({ color: "#ffffff", wireframe: true });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(200));

  cube.position.set(x, y, z);
  scene.add(cube);
}
Array(200).fill().forEach(addquares);

//planets
function addPlanet() {
  const geometry = new THREE.SphereGeometry(25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff, wireframe: true });
  const planet = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(500));

  planet.position.set(x, y, z);
  scene.add(planet);
}
Array(5).fill().forEach(addPlanet);



// Background
const spaceTexture = new THREE.TextureLoader().load('./../space.avif');
const other = new THREE.TextureLoader().load('https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569__480.jpg')
// scene.background = spaceTexture;



// Moon
const moonTexture = new THREE.TextureLoader().load('./../moon.jpg');
const normalTexture = new THREE.TextureLoader().load('./../normal.jpg');

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture,
  })
);

scene.add(moon);

moon.position.z = 30;
moon.position.setX(-10);

//Mars
const marsTexture = new THREE.TextureLoader().load('./../mars.jpg');

const mars = new THREE.Mesh(
  new THREE.SphereGeometry(4, 42, 42),
  new THREE.MeshStandardMaterial({
    map: marsTexture,
    normalMap: normalTexture,
  })
);

scene.add(mars);
mars.position.z = 50
mars.position.setX(-10)


// Scroll Animation
function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;

}

document.body.onscroll = moveCamera;
moveCamera();

// Animation Loop
function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  moon.rotation.x += 0.005;
  mars.rotation.x += 0.005;

  renderer.render(scene, camera);

}

animate();
