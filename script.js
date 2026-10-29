// 1. Animación de entrada al cargar la página
document.addEventListener('DOMContentLoaded', () => {
  const container = document.querySelector('.container');
  // Se agrega la clase .loaded para activar la transición CSS
  setTimeout(() => {
    container.classList.add('loaded');
  }, 100);
});

// 2. Lógica del Confeti
const button = document.getElementById('btn-celebrate');
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

// Ajustar tamaño del canvas al tamaño de la pantalla
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let particles = [];

// Función para crear una partícula de confeti
function createParticle() {
  const colors = ['#58a6ff', '#238636', '#f0883e', '#d2a8ff', '#f0f6fc'];
  return {
    x: canvas.width / 2,
    y: canvas.height / 2 + 50,
    size: Math.random() * 8 + 4,
    color: colors[Math.floor(Math.random() * colors.length)],
    vx: (Math.random() - 0.5) * 14,
    vy: (Math.random() - 1) * 12 - 4,
    gravity: 0.25,
    opacity: 1,
    rotation: Math.random() * 360,
    vRot: (Math.random() - 0.5) * 10
  };
}

// Disparar una ráfaga de confeti
function triggerConfetti() {
  for (let i = 0; i < 70; i++) {
    particles.push(createParticle());
  }
}

// Ciclo de animación
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach((p, index) => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.vRot;
    p.opacity -= 0.015;

    // Eliminar partículas invisibles
    if (p.opacity <= 0) {
      particles.splice(index, 1);
      return;
    }

    // Dibujar partícula
    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate((p.rotation * Math.PI) / 180);
    ctx.globalAlpha = p.opacity;
    ctx.fillStyle = p.color;
    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
    ctx.restore();
  });

  requestAnimationFrame(animate);
}

// Escuchar evento de clic en el botón
button.addEventListener('click', triggerConfetti);

// Iniciar bucle de animación
animate();