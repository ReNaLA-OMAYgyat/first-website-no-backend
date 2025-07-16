//adi
function showAura(element) {
  const aura = element.querySelector(".aura-adi");
  const particles = element.querySelectorAll(".particle-adi");

  aura.style.opacity = "1";
  aura.style.transform = "scale(1)";

  particles.forEach((particle) => {
    particle.style.opacity = "1";
    particle.style.transform = "translateY(-10px)";
  });
}

function hideAura(element) {
  const aura = element.querySelector(".aura-adi");
  const particles = element.querySelectorAll(".particle-adi");

  aura.style.opacity = "0";
  aura.style.transform = "scale(0.8)";

  particles.forEach((particle) => {
    particle.style.opacity = "0";
    particle.style.transform = "translateY(0)";
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("alifah-container");
  //nako
  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("flower-petal");
    petal.style.position = "absolute";
    petal.style.top = `${Math.random() * 120}px`;
    petal.style.left = `${Math.random() * 120}px`;
    const size = 6 + Math.random() * 6;
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;
    const pinkShades = ["#F8BBD0", "#F48FB1", "#F06292", "#EC407A", "#E91E63"];
    petal.style.backgroundColor =
      pinkShades[Math.floor(Math.random() * pinkShades.length)];
    petal.style.borderRadius = "50%";
    petal.style.opacity = 0;
    petal.style.boxShadow = "0 0 6px 1px rgba(255, 182, 193, 0.6)";
    petal.style.transition = "opacity 0.5s ease, transform 3s ease";
    container.appendChild(petal);
    setTimeout(() => {
      petal.style.opacity = 1;
      petal.style.transform = `translateY(-15px) rotate(${
        Math.random() * 360
      }deg)`;
    }, 50);
    setTimeout(() => {
      petal.style.opacity = 0;
      petal.style.transform = `translateY(0) rotate(0deg)`;
      setTimeout(() => petal.remove(), 500);
    }, 3500);
  }

  container.addEventListener("mouseenter", () => {
    container.petalInterval = setInterval(createPetal, 300);
  });

  container.addEventListener("mouseleave", () => {
    clearInterval(container.petalInterval);
  });
});

window.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("tasya-webgl");
  if (!container) return;

  const width = container.offsetWidth;
  const height = container.offsetHeight;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ alpha: true });
  renderer.setSize(width, height);
  container.appendChild(renderer.domElement);

  const starCount = 300;
  const geometry = new THREE.BufferGeometry();
  const positions = [];

  for (let i = 0; i < starCount; i++) {
    const x = (Math.random() - 0.5) * 2;
    const y = (Math.random() - 0.5) * 2;
    const z = (Math.random() - 0.5) * 2;
    positions.push(x, y, z);
  }
  geometry.setAttribute(
    "position",
    new THREE.Float32BufferAttribute(positions, 3)
  );

  const material = new THREE.PointsMaterial({ color: 0xffffff, size: 0.015 });
  const stars = new THREE.Points(geometry, material);
  scene.add(stars);

  camera.position.z = 1.5;

  function animate() {
    requestAnimationFrame(animate);
    stars.rotation.y += 0.002;
    stars.rotation.x += 0.001;
    renderer.render(scene, camera);
  }

  animate();
});

//nilam
const canvas = document.getElementById("tasya-canvas");
const ctx = canvas.getContext("2d");
const container = document.getElementById("tasya-container");
let particles = [];

canvas.width = container.offsetWidth;
canvas.height = container.offsetHeight;

for (let i = 0; i < 30; i++) {
  particles.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 1.5 + 0.5,
    dx: (Math.random() - 0.5) * 0.5,
    dy: (Math.random() - 0.5) * 0.5,
    opacity: Math.random(),
  });
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach((p) => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${p.opacity})`;
    ctx.fill();
    p.x += p.dx;
    p.y += p.dy;

    if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
  });
  requestAnimationFrame(drawParticles);
}

drawParticles();

//farel
function createParticle(container) {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  const size = Math.random() * 6 + 4; // 4-10 px
  particle.style.width = size + "px";
  particle.style.height = size + "px";

  particle.style.left = Math.random() * 100 + "%";
  particle.style.bottom = "0";

  container.appendChild(particle);

  const duration = Math.random() * 1500 + 1000; // 1-2.5 detik
  const horizontalMovement = (Math.random() - 0.5) * 30;

  let start = null;

  function animate(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;

    let bottomPos = Math.min((progress / duration) * 60, 60);
    let leftPos =
      (parseFloat(particle.style.left) / 100) * container.clientWidth +
      horizontalMovement * (progress / duration);

    particle.style.bottom = bottomPos + "px";
    particle.style.left = leftPos + "px";
    particle.style.opacity = 1 - progress / duration;

    if (progress < duration) {
      requestAnimationFrame(animate);
    } else {
      container.removeChild(particle);
    }
  }

  requestAnimationFrame(animate);
}

function spawnParticles() {
  const leftContainer = document.querySelector(".fire-particles.left");
  const rightContainer = document.querySelector(".fire-particles.right");

  createParticle(leftContainer);
  createParticle(rightContainer);
}

setInterval(spawnParticles, 300);

// Initialize Three.js canvas for Tasya's cosmic background
document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("tasya-canvas");
  if (!canvas) return;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
  renderer.setSize(96, 96);

  // Create particles
  const particlesGeometry = new THREE.BufferGeometry();
  const particlesCount = 100;
  const posArray = new Float32Array(particlesCount * 3);

  for (let i = 0; i < particlesCount * 3; i++) {
    posArray[i] = (Math.random() - 0.5) * 5;
  }

  particlesGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(posArray, 3)
  );

  const particlesMaterial = new THREE.PointsMaterial({
    size: 0.05,
    color: 0x8a2be2,
    transparent: true,
    opacity: 0.8,
  });

  const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
  scene.add(particlesMesh);

  camera.position.z = 2;

  // Animation
  function animate() {
    requestAnimationFrame(animate);
    particlesMesh.rotation.x += 0.001;
    particlesMesh.rotation.y += 0.001;
    renderer.render(scene, camera);
  }

  animate();
});
