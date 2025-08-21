import chalk from 'chalk';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  char: string;
  life: number;
}

export class InteractiveField {
  private particles: Particle[] = [];
  private attractors: { x: number; y: number; strength: number }[] = [];
  private mouseX: number;
  private mouseY: number;
  private mode: 'attract' | 'repel' | 'spawn' = 'attract';
  
  constructor(
    private width: number,
    private height: number
  ) {
    this.mouseX = width / 2;
    this.mouseY = height / 2;
    this.initParticles();
  }
  
  private initParticles(): void {
    const chars = ['✦', '✧', '●', '○', '◉', '◆', '◇', '✨', '⭐', '💫'];
    for (let i = 0; i < 30; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        char: chars[Math.floor(Math.random() * chars.length)],
        life: 1000
      });
    }
  }
  
  handleKey(key: string): void {
    switch (key.toLowerCase()) {
      case 'w':
      case 'up':
        this.mouseY = Math.max(0, this.mouseY - 2);
        break;
      case 's':
      case 'down':
        this.mouseY = Math.min(this.height - 1, this.mouseY + 2);
        break;
      case 'a':
      case 'left':
        this.mouseX = Math.max(0, this.mouseX - 3);
        break;
      case 'd':
      case 'right':
        this.mouseX = Math.min(this.width - 1, this.mouseX + 3);
        break;
      case ' ':
        this.spawnBurst();
        break;
      case 'r':
        this.mode = 'repel';
        break;
      case 'e':
        this.mode = 'attract';
        break;
      case 'q':
        this.mode = 'spawn';
        this.spawnBurst();
        break;
      case 'c':
        this.particles = [];
        this.initParticles();
        break;
    }
  }
  
  private spawnBurst(): void {
    const burstChars = ['✨', '💫', '⭐', '✦'];
    const count = 10;
    for (let i = 0; i < count; i++) {
      const angle = (Math.PI * 2 * i) / count;
      this.particles.push({
        x: this.mouseX,
        y: this.mouseY,
        vx: Math.cos(angle) * 2,
        vy: Math.sin(angle) * 2,
        char: burstChars[Math.floor(Math.random() * burstChars.length)],
        life: 50
      });
    }
  }
  
  update(): void {
    // Update attractors
    this.attractors = [{
      x: this.mouseX,
      y: this.mouseY,
      strength: this.mode === 'repel' ? -3 : 3
    }];
    
    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      
      // Apply forces from attractors
      for (const attractor of this.attractors) {
        const dx = attractor.x - p.x;
        const dy = attractor.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 0.1 && dist < 20) {
          const force = attractor.strength / (dist * dist);
          p.vx += (dx / dist) * force * 0.1;
          p.vy += (dy / dist) * force * 0.1;
        }
      }
      
      // Damping
      p.vx *= 0.98;
      p.vy *= 0.98;
      
      // Update position
      p.x += p.vx;
      p.y += p.vy;
      
      // Wrap around edges
      if (p.x < 0) p.x = this.width - 1;
      if (p.x >= this.width) p.x = 0;
      if (p.y < 0) p.y = this.height - 1;
      if (p.y >= this.height) p.y = 0;
      
      // Update life
      p.life--;
      if (p.life <= 0) {
        this.particles.splice(i, 1);
      }
    }
    
    // Maintain minimum particles
    if (this.particles.length < 20) {
      this.initParticles();
    }
  }
  
  render(): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    // Draw particles
    for (const p of this.particles) {
      const x = Math.floor(p.x);
      const y = Math.floor(p.y);
      
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        if (p.life < 20) {
          grid[y][x] = '·';
        } else {
          grid[y][x] = p.char;
        }
      }
    }
    
    // Draw cursor
    const cursorX = Math.floor(this.mouseX);
    const cursorY = Math.floor(this.mouseY);
    if (cursorX >= 0 && cursorX < this.width && cursorY >= 0 && cursorY < this.height) {
      const cursorChar = this.mode === 'repel' ? '⊖' : this.mode === 'spawn' ? '✧' : '⊕';
      grid[cursorY][cursorX] = cursorChar;
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
  
  getInstructions(): string {
    return `${chalk.dim('Controls:')} ${chalk.cyan('WASD/Arrows')} move · ${chalk.yellow('Space')} burst · ${chalk.green('E')} attract · ${chalk.red('R')} repel · ${chalk.magenta('Q')} spawn · ${chalk.gray('C')} clear`;
  }
}