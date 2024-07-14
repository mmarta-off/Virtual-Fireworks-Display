document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('fireworksCanvas');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    const particles = [];
    const colorSelector = document.getElementById('colorSelector');

    canvas.addEventListener('click', function(e) {
        createFirework(e.clientX, e.clientY, colorSelector.value);
    });

    function createFirework(x, y, color) {
        const count = 30; // Number of particles in a firework
        for (let i = 0; i < count; i++) {
            const velocity = {
                x: Math.cos(i * (360 / count) * Math.PI / 180) * Math.random() * 6,
                y: Math.sin(i * (360 / count) * Math.PI / 180) * Math.random() * 6
            };
            particles.push({ x, y, velocity, color, life: 100 });
        }
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Trail effect
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle, index) => {
            if (particle.life > 0) {
                ctx.fillStyle = particle.color === 'random' ? `hsl(${Math.random() * 360}, 100%, 50%)` : particle.color;
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
                ctx.fill();
                // Update particle
                particle.x += particle.velocity.x;
                particle.y += particle.velocity.y;
                particle.velocity.y += 0.05; // Simulate gravity
                particle.life--;
            } else {
                particles.splice(index, 1);
            }
        });
        requestAnimationFrame(draw);
    }

    function clearSky() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.length = 0; // Remove all particles
    }

    draw(); // Start the animation loop
});
