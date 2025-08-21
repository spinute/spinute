interface Vector2D {
  x: number;
  y: number;
}

class Boid {
  position: Vector2D;
  velocity: Vector2D;
  acceleration: Vector2D;
  maxSpeed = 2;
  maxForce = 0.05;
  
  constructor(x: number, y: number) {
    this.position = { x, y };
    this.velocity = {
      x: (Math.random() - 0.5) * 2,
      y: (Math.random() - 0.5) * 2
    };
    this.acceleration = { x: 0, y: 0 };
  }
  
  applyForce(force: Vector2D): void {
    this.acceleration.x += force.x;
    this.acceleration.y += force.y;
  }
  
  update(width: number, height: number): void {
    this.velocity.x += this.acceleration.x;
    this.velocity.y += this.acceleration.y;
    
    const speed = Math.sqrt(this.velocity.x ** 2 + this.velocity.y ** 2);
    if (speed > this.maxSpeed) {
      this.velocity.x = (this.velocity.x / speed) * this.maxSpeed;
      this.velocity.y = (this.velocity.y / speed) * this.maxSpeed;
    }
    
    this.position.x += this.velocity.x;
    this.position.y += this.velocity.y;
    
    this.acceleration = { x: 0, y: 0 };
    
    if (this.position.x < 0) this.position.x = width;
    if (this.position.x > width) this.position.x = 0;
    if (this.position.y < 0) this.position.y = height;
    if (this.position.y > height) this.position.y = 0;
  }
}

export class Boids {
  private boids: Boid[] = [];
  
  constructor(
    private width: number,
    private height: number,
    count: number
  ) {
    for (let i = 0; i < count; i++) {
      this.boids.push(new Boid(
        Math.random() * width,
        Math.random() * height
      ));
    }
  }
  
  private distance(a: Vector2D, b: Vector2D): number {
    return Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
  }
  
  private separation(boid: Boid): Vector2D {
    const desiredSeparation = 3;
    const steer = { x: 0, y: 0 };
    let count = 0;
    
    for (const other of this.boids) {
      if (other === boid) continue;
      
      const d = this.distance(boid.position, other.position);
      if (d < desiredSeparation && d > 0) {
        const diff = {
          x: boid.position.x - other.position.x,
          y: boid.position.y - other.position.y
        };
        const norm = Math.sqrt(diff.x ** 2 + diff.y ** 2);
        diff.x /= norm;
        diff.y /= norm;
        diff.x /= d;
        diff.y /= d;
        steer.x += diff.x;
        steer.y += diff.y;
        count++;
      }
    }
    
    if (count > 0) {
      steer.x /= count;
      steer.y /= count;
    }
    
    return steer;
  }
  
  private alignment(boid: Boid): Vector2D {
    const neighborDist = 10;
    const sum = { x: 0, y: 0 };
    let count = 0;
    
    for (const other of this.boids) {
      if (other === boid) continue;
      
      const d = this.distance(boid.position, other.position);
      if (d < neighborDist) {
        sum.x += other.velocity.x;
        sum.y += other.velocity.y;
        count++;
      }
    }
    
    if (count > 0) {
      sum.x /= count;
      sum.y /= count;
      const norm = Math.sqrt(sum.x ** 2 + sum.y ** 2);
      if (norm > 0) {
        sum.x = (sum.x / norm) * boid.maxSpeed;
        sum.y = (sum.y / norm) * boid.maxSpeed;
        sum.x -= boid.velocity.x;
        sum.y -= boid.velocity.y;
      }
    }
    
    return sum;
  }
  
  private cohesion(boid: Boid): Vector2D {
    const neighborDist = 10;
    const sum = { x: 0, y: 0 };
    let count = 0;
    
    for (const other of this.boids) {
      if (other === boid) continue;
      
      const d = this.distance(boid.position, other.position);
      if (d < neighborDist) {
        sum.x += other.position.x;
        sum.y += other.position.y;
        count++;
      }
    }
    
    if (count > 0) {
      sum.x /= count;
      sum.y /= count;
      return this.seek(boid, sum);
    }
    
    return { x: 0, y: 0 };
  }
  
  private seek(boid: Boid, target: Vector2D): Vector2D {
    const desired = {
      x: target.x - boid.position.x,
      y: target.y - boid.position.y
    };
    
    const norm = Math.sqrt(desired.x ** 2 + desired.y ** 2);
    if (norm > 0) {
      desired.x = (desired.x / norm) * boid.maxSpeed;
      desired.y = (desired.y / norm) * boid.maxSpeed;
      desired.x -= boid.velocity.x;
      desired.y -= boid.velocity.y;
      
      const steerNorm = Math.sqrt(desired.x ** 2 + desired.y ** 2);
      if (steerNorm > boid.maxForce) {
        desired.x = (desired.x / steerNorm) * boid.maxForce;
        desired.y = (desired.y / steerNorm) * boid.maxForce;
      }
    }
    
    return desired;
  }
  
  update(): void {
    for (const boid of this.boids) {
      const sep = this.separation(boid);
      const ali = this.alignment(boid);
      const coh = this.cohesion(boid);
      
      sep.x *= 1.5;
      sep.y *= 1.5;
      ali.x *= 1.0;
      ali.y *= 1.0;
      coh.x *= 1.0;
      coh.y *= 1.0;
      
      boid.applyForce(sep);
      boid.applyForce(ali);
      boid.applyForce(coh);
      boid.update(this.width, this.height);
    }
  }
  
  render(): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    for (const boid of this.boids) {
      const x = Math.floor(boid.position.x);
      const y = Math.floor(boid.position.y);
      
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        const angle = Math.atan2(boid.velocity.y, boid.velocity.x);
        const dirIndex = Math.round(angle / (Math.PI / 4)) + 4;
        const chars = ['→', '↗', '↑', '↖', '←', '↙', '↓', '↘', '→'];
        grid[y][x] = chars[dirIndex % 8];
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}