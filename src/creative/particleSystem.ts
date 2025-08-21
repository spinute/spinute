interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  type: string;
}

export class ParticleSystem {
  private particles: Particle[] = [];
  private gravity = 0.1;
  private wind = 0.02;
  
  constructor(
    private width: number,
    private height: number,
    private maxParticles: number
  ) {
    this.initParticles();
  }
  
  private initParticles(): void {
    for (let i = 0; i < this.maxParticles; i++) {
      this.particles.push(this.createParticle());
    }
  }
  
  private createParticle(): Particle {
    const types = ['📍', '💻', '🍣', '🍺', '🍅', '😴', '📕', '🦌', '💄', '📌', '🚶‍♀️', '🍕', '🍆', '🌐', '🌵', '🥝', '🛀', '🎲', '🃏', '✨', '⭐'];
    const mainTypes = ['📍', '📍', '📍', '💻', '🍣', '🍺']; // 📍を多めに
    const typeArray = Math.random() < 0.7 ? mainTypes : types;
    return {
      x: Math.random() * this.width,
      y: Math.random() * this.height * 0.3,
      vx: (Math.random() - 0.5) * 2,
      vy: Math.random() * 2,
      life: 0,
      maxLife: 50 + Math.random() * 50,
      type: typeArray[Math.floor(Math.random() * typeArray.length)]
    };
  }
  
  update(): void {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      p.vx += this.wind + (Math.random() - 0.5) * 0.1;
      p.vy += this.gravity;
      
      p.vx *= 0.99;
      p.vy *= 0.99;
      
      p.x += p.vx;
      p.y += p.vy;
      
      p.life++;
      
      if (p.x < 0) p.x = this.width;
      if (p.x > this.width) p.x = 0;
      
      if (p.y > this.height || p.life > p.maxLife) {
        this.particles[i] = this.createParticle();
      }
      
      if (Math.random() < 0.01) {
        const burst = this.createParticle();
        burst.x = p.x;
        burst.y = p.y;
        burst.vx = (Math.random() - 0.5) * 4;
        burst.vy = -Math.random() * 3;
        this.particles.push(burst);
        
        if (this.particles.length > this.maxParticles * 1.5) {
          this.particles.shift();
        }
      }
    }
  }
  
  render(): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    for (const p of this.particles) {
      const x = Math.floor(p.x);
      const y = Math.floor(p.y);
      
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        const opacity = 1 - (p.life / p.maxLife);
        if (opacity > 0.7) {
          grid[y][x] = p.type;
        } else if (opacity > 0.3) {
          grid[y][x] = '·';
        }
      }
      
      const trail = Math.floor(p.vy);
      for (let t = 1; t < trail && t < 3; t++) {
        const ty = y - t;
        if (x >= 0 && x < this.width && ty >= 0 && ty < this.height) {
          if (grid[ty][x] === ' ') {
            grid[ty][x] = '·';
          }
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}