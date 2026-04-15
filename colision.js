const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
const contadorLabel = document.getElementById("contador");

// Dimensiones fijas para estabilidad del escenario
canvas.width = 800;
canvas.height = 500;

let score = 0;
let mousePos = { x: canvas.width / 2, y: canvas.height / 2 };

// --- CARGA DE ACTIVOS LOCALES ---
const imgNave = new Image();
imgNave.src = 'assets/player_ship.png';

const imgEnemigo = new Image();
imgEnemigo.src = 'assets/enemy_ship.png';

const imgFondo = new Image();
imgFondo.src = 'assets/fondo.jpg'; 

// --- CARGA DE SONIDOS ---
const sfxDisparo = 'assets/laser.mp3';
const sfxExplosion = 'assets/pum.mp3'; // Asegúrate de tener este archivo en assets/

// Control de carga para iniciar el juego
let loadedImages = 0;
const totalImages = 3;

const checkLoad = () => {
    loadedImages++;
    if (loadedImages === totalImages) animate();
};

imgNave.onload = checkLoad;
imgEnemigo.onload = checkLoad;
imgFondo.onload = checkLoad;

// --- CLASE PROYECTIL ---
class Bullet {
    constructor(x, y, angle) {
        this.x = x;
        this.y = y;
        this.angle = angle;
        this.speed = 12;
        this.size = 4;
        this.toRemove = false;
        this.vx = Math.cos(this.angle - Math.PI / 2) * this.speed;
        this.vy = Math.sin(this.angle - Math.PI / 2) * this.speed;
    }
    update() {
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
            this.toRemove = true;
        }
    }
    draw() {
        ctx.fillStyle = "#00ffff"; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// --- CLASE JUGADOR ---
class Player {
    constructor() {
        this.x = canvas.width / 2;
        this.y = canvas.height / 2;
        this.size = 60;
        this.angle = 0;
    }
    update() {
        let dx = mousePos.x - this.x;
        let dy = mousePos.y - this.y;
        this.angle = Math.atan2(dy, dx) + Math.PI / 2;
    }
    draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.angle);
        ctx.drawImage(imgNave, -this.size / 2, -this.size / 2, this.size, this.size);
        ctx.restore();
    }
}

// --- CLASE ENEMIGO ---
class Enemy {
    constructor() {
        this.reset();
    }
    reset() {
        this.size = Math.random() * 20 + 35;
        this.x = Math.random() * (canvas.width - this.size);
        this.y = Math.random() * (canvas.height - this.size);
        this.vx = (Math.random() - 0.5) * 6;
        this.vy = (Math.random() - 0.5) * 6;
        this.isDying = false;
        this.dyingTimer = 0;
    }
    update() {
        if (this.isDying) return;
        this.x += this.vx;
        this.y += this.vy;
        if (this.x < 0 || this.x > canvas.width - this.size) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height - this.size) this.vy *= -1;
    }
    draw() {
        ctx.save();
        if (this.isDying) {
            // Animación de Explosión: Se desvanece y crece
            ctx.globalAlpha = 1 - (this.dyingTimer / 15);
            let expansion = 1 + (this.dyingTimer / 10); 
            let centerX = this.x + this.size / 2;
            let centerY = this.y + this.size / 2;

            ctx.translate(centerX, centerY);
            ctx.scale(expansion, expansion);
            ctx.drawImage(imgEnemigo, -this.size / 2, -this.size / 2, this.size, this.size);
            
            this.dyingTimer++;
            if (this.dyingTimer > 15) this.reset();
        } else {
            ctx.drawImage(imgEnemigo, this.x, this.y, this.size, this.size);
        }
        ctx.restore();
    }
}

// --- INSTANCIAS Y EVENTOS ---
const player = new Player();
const enemies = Array.from({ length: 25 }, () => new Enemy()); 
let bullets = [];

canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mousePos.x = e.clientX - rect.left;
    mousePos.y = e.clientY - rect.top;
});

canvas.addEventListener('mousedown', () => {
    bullets.push(new Bullet(player.x, player.y, player.angle));
    
    // Polifonía de Disparo
    let audioD = new Audio(sfxDisparo);
    audioD.volume = 0.4;
    audioD.play().catch(e => console.log("Audio disparo bloqueado"));
});

// --- BUCLE PRINCIPAL ---
function animate() {
    ctx.drawImage(imgFondo, 0, 0, canvas.width, canvas.height);

    player.update();
    player.draw();

    bullets = bullets.filter(b => !b.toRemove);
    bullets.forEach(b => {
        b.update();
        b.draw();
        enemies.forEach(en => {
            // Detección de Colisión
            if (!en.isDying && b.x > en.x && b.x < en.x + en.size && b.y > en.y && b.y < en.y + en.size) {
                en.isDying = true;
                b.toRemove = true;
                score++;
                contadorLabel.innerText = score; 

                // Sonido de Explosión al impactar
                let audioE = new Audio(sfxExplosion);
                audioE.volume = 0.3;
                audioE.play().catch(e => console.log("Audio explosión bloqueado"));
            }
        });
    });

    enemies.forEach(en => {
        en.update();
        en.draw();
    });

    requestAnimationFrame(animate);
}