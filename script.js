const tank = document.getElementById('tank');


const pictures = [
  'images/fish1.jpg',
  'images/fish2.jpg',
  'images/fish3.jpg',
  'images/fish4.jpg',
  'images/fish5.jpg'
];

class Fish {
  constructor() {
    this.element = document.createElement('img');
    this.element.className = 'fish';
    this.element.alt = 'Swimming fish';
    this.element.src = pictures[Math.floor(Math.random() * pictures.length)];
    this.width = 74;
    this.height = 58;
    this.x = Math.random() * (tank.clientWidth - this.width);
    this.y = Math.random() * (tank.clientHeight - this.height);
    this.direction = Math.random() < 0.5 ? -1 : 1;
    this.normalSpeed = 35 + Math.random() * 35; // pixels per second
    this.speed = this.normalSpeed;
    this.speedTimer = null;
    tank.appendChild(this.element);
    this.element.addEventListener('click', () => this.speedUp());
    this.scheduleDirectionCheck();
    this.draw();
  }

  draw() {
    this.element.style.left = this.x + 'px';
    this.element.style.top = this.y + 'px';
    this.element.style.transform = this.direction === -1 ? 'scaleX(-1)' : 'scaleX(1)';
  }

  move(seconds) {
    const maxX = Math.max(0, tank.clientWidth - this.width);
    const maxY = Math.max(0, tank.clientHeight - this.height);
    this.x += this.direction * this.speed * seconds;
    this.x = Math.max(0, Math.min(maxX, this.x));
    this.y = Math.max(0, Math.min(maxY, this.y));
    this.draw();
  }

  scheduleDirectionCheck() {
    const delay = 2000 + Math.random() * 6000;
    setTimeout(() => {
      if (Math.random() < 0.5) this.direction *= -1;
      this.scheduleDirectionCheck();
    }, delay);
  }

  speedUp() {
    this.speed = this.normalSpeed * 2; // never stacks beyond double speed
    clearTimeout(this.speedTimer);
    this.speedTimer = setTimeout(() => {
      this.speed = this.normalSpeed;
    }, 3000);
  }
}

const fish = [];
for (let i = 0; i < 7; i++) {
  fish.push(new Fish());
}

let lastTime = performance.now();
function animate(now) {
  const seconds = Math.min((now - lastTime) / 1000, 0.05);
  lastTime = now;
  fish.forEach(f => f.move(seconds));
  requestAnimationFrame(animate);
}
requestAnimationFrame(animate);
