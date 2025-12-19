(() => {
  const form = document.getElementById("registrationForm");
  const table = document.getElementById("userTable");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    event.stopPropagation();

    if (!form.checkValidity()) {
      form.classList.add("was-validated");
      return;
    }

    const inputs = form.querySelectorAll("input");
    const firstName = inputs[0].value;
    const lastName = inputs[1].value;
    const email = inputs[2].value;

    const row = document.createElement("tr");
    row.innerHTML = `
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
        `;

    table.appendChild(row);

    form.reset();
    form.classList.remove("was-validated");
  });
})();

const explodeBtn = document.getElementById("explodeBtn");
const particles = [];
const gravity = 0.6;
const bounce = 0.6;

explodeBtn.addEventListener("click", () => {
  explodeBtn.classList.add("shake");
  setTimeout(() => explodeBtn.classList.remove("shake"), 400);

  const rect = explodeBtn.getBoundingClientRect();
  const originX = rect.left + rect.width / 2;
  const originY = rect.top + rect.height / 2;

  createParticles(originX, originY);
});

function createParticles(x, y) {
  const colors = ["#ffc107", "#fd7e14", "#dc3545", "#0d6efd", "#198754"];
  const count = 25;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const size = Math.random() * 6 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 8 + 4;

    const velocity = {
      x: Math.cos(angle) * speed,
      y: Math.sin(angle) * speed * -1,
    };

    const data = {
      el: particle,
      x,
      y,
      vx: velocity.x,
      vy: velocity.y,
      life: 120,
    };

    particle.style.left = `${x}px`;
    particle.style.top = `${y}px`;

    document.body.appendChild(particle);
    particles.push(data);
  }
}

function animateParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    const p = particles[i];

    p.vy += gravity;

    p.x += p.vx;
    p.y += p.vy;

    const ground = window.innerHeight - 10;
    if (p.y > ground) {
      p.y = ground;
      p.vy *= -bounce;
      p.vx *= 0.98;
    }

    p.el.style.left = `${p.x}px`;
    p.el.style.top = `${p.y}px`;

    p.el.style.opacity = p.life / 120;
    p.life--;

    if (p.life <= 0) {
      p.el.remove();
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animateParticles);
}

animateParticles();
