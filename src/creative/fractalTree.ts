export class FractalTree {
  private canvas: string[][];
  private centerX: number;
  private centerY: number;
  
  constructor(
    private depth: number,
    private angle: number,
    private width: number = 80,
    private height: number = 20
  ) {
    this.canvas = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    this.centerX = Math.floor(this.width / 2);
    this.centerY = this.height - 1;
  }
  
  private drawLine(x1: number, y1: number, x2: number, y2: number, char: string = '│'): void {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      if (x1 >= 0 && x1 < this.width && y1 >= 0 && y1 < this.height) {
        this.canvas[Math.floor(y1)][Math.floor(x1)] = char;
      }
      
      if (Math.abs(x1 - x2) < 0.5 && Math.abs(y1 - y2) < 0.5) break;
      
      const e2 = 2 * err;
      if (e2 > -dy) {
        err -= dy;
        x1 += sx;
      }
      if (e2 < dx) {
        err += dx;
        y1 += sy;
      }
    }
  }
  
  private drawBranch(
    x: number,
    y: number,
    length: number,
    angle: number,
    depth: number
  ): void {
    if (depth === 0 || length < 2) {
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        this.canvas[Math.floor(y)][Math.floor(x)] = '🍃';
      }
      return;
    }
    
    const endX = x + Math.cos(angle) * length;
    const endY = y - Math.sin(angle) * length;
    
    const chars = ['│', '/', '\\', '─'];
    const charIndex = Math.round((angle % (Math.PI * 2)) / (Math.PI / 2)) % 4;
    
    this.drawLine(x, y, endX, endY, chars[Math.abs(charIndex)]);
    
    const newLength = length * 0.7;
    const angleVariation = (Math.random() - 0.5) * 0.2;
    
    this.drawBranch(
      endX,
      endY,
      newLength,
      angle - (this.angle * Math.PI / 180) + angleVariation,
      depth - 1
    );
    
    this.drawBranch(
      endX,
      endY,
      newLength,
      angle + (this.angle * Math.PI / 180) + angleVariation,
      depth - 1
    );
    
    if (Math.random() < 0.3 && depth > 2) {
      this.drawBranch(
        endX,
        endY,
        newLength * 0.8,
        angle + angleVariation,
        depth - 1
      );
    }
  }
  
  render(): string {
    this.drawBranch(
      this.centerX,
      this.centerY,
      this.height * 0.3,
      Math.PI / 2,
      this.depth
    );
    
    return this.canvas.map(row => row.join('')).join('\n');
  }
}