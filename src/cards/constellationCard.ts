import chalk from 'chalk';
import gradient from 'gradient-string';

interface Star {
  x: number;
  y: number;
  brightness: number;
  connected: number[];
}

export class ConstellationCard {
  private stars: Star[] = [];
  
  constructor(
    private width: number = 80,
    private height: number = 20
  ) {
    this.generateConstellation();
  }
  
  private generateConstellation(): void {
    // Create constellation pattern for "SPINUTE" - centered on 80x20 grid
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const baseX = centerX - 18; // Adjusted to fit within safe bounds
    const baseY = centerY - 6;  // Center vertically
    
    const positions = [
      // S shape
      {x: baseX + 0, y: baseY + 2}, {x: baseX + 0, y: baseY + 4}, {x: baseX + 2, y: baseY + 6}, {x: baseX + 2, y: baseY + 8}, {x: baseX + 0, y: baseY + 10},
      // P shape  
      {x: baseX + 5, y: baseY + 2}, {x: baseX + 5, y: baseY + 10}, {x: baseX + 7, y: baseY + 2}, {x: baseX + 8, y: baseY + 4}, {x: baseX + 7, y: baseY + 6},
      // I shape
      {x: baseX + 11, y: baseY + 2}, {x: baseX + 11, y: baseY + 10},
      // N shape
      {x: baseX + 14, y: baseY + 10}, {x: baseX + 14, y: baseY + 2}, {x: baseX + 17, y: baseY + 10}, {x: baseX + 17, y: baseY + 2},
      // U shape
      {x: baseX + 20, y: baseY + 2}, {x: baseX + 20, y: baseY + 8}, {x: baseX + 21, y: baseY + 10}, {x: baseX + 23, y: baseY + 8}, {x: baseX + 23, y: baseY + 2},
      // T shape
      {x: baseX + 26, y: baseY + 2}, {x: baseX + 29, y: baseY + 2}, {x: baseX + 27, y: baseY + 2}, {x: baseX + 27, y: baseY + 10},
      // E shape
      {x: baseX + 32, y: baseY + 2}, {x: baseX + 32, y: baseY + 6}, {x: baseX + 32, y: baseY + 10}, {x: baseX + 34, y: baseY + 2}, {x: baseX + 34, y: baseY + 6}, {x: baseX + 34, y: baseY + 10}
    ];
    
    for (let i = 0; i < positions.length; i++) {
      this.stars.push({
        x: positions[i].x,
        y: positions[i].y,
        brightness: Math.random() * 0.5 + 0.5,
        connected: []
      });
    }
    
    // Define connections
    this.stars[0].connected = [1];
    this.stars[1].connected = [0, 2];
    this.stars[2].connected = [1, 3];
    this.stars[3].connected = [2, 4];
    this.stars[4].connected = [3];
    
    this.stars[5].connected = [6, 7];
    this.stars[6].connected = [5];
    this.stars[7].connected = [5, 8];
    this.stars[8].connected = [7, 9];
    this.stars[9].connected = [8];
  }
  
  render(time: number): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    // Background stars
    for (let i = 0; i < 100; i++) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (Math.random() < 0.3) {
        grid[y][x] = '·';
      }
    }
    
    // Draw constellation connections
    for (const star of this.stars) {
      for (const connectedIdx of star.connected) {
        const other = this.stars[connectedIdx];
        this.drawLine(grid, star.x, star.y, other.x, other.y);
      }
    }
    
    // Draw stars with pulsing effect
    for (const star of this.stars) {
      const pulse = Math.sin(time * 0.05 + star.x * 0.1) * 0.5 + 0.5;
      const brightness = star.brightness * pulse;
      
      if (star.y >= 0 && star.y < this.height && star.x >= 0 && star.x < this.width) {
        if (brightness > 0.8) {
          grid[star.y][star.x] = '✦';
        } else if (brightness > 0.5) {
          grid[star.y][star.x] = '◆';
        } else {
          grid[star.y][star.x] = '◇';
        }
      }
    }
    
    // Add URLs at bottom
    const urls = [
      'https://spinute.notion.site/',
      'https://github.com/spinute',
      'https://x.com/spinute'
    ];
    
    const startY = this.height - 5;
    for (let i = 0; i < urls.length; i++) {
      const url = urls[i];
      const startX = Math.floor((this.width - url.length) / 2);
      for (let x = 0; x < url.length; x++) {
        if (startX + x < this.width) {
          grid[startY + i][startX + x] = url[x];
        }
      }
    }
    
    // Convert to string with colors
    let output = '';
    for (let y = 0; y < this.height; y++) {
      let line = '';
      for (let x = 0; x < this.width; x++) {
        const char = grid[y][x];
        if (char === '✦' || char === '◆' || char === '◇') {
          line += gradient.pastel(char);
        } else if (char === '·' || char === '-' || char === '|' || char === '/' || char === '\\') {
          line += chalk.dim(char);
        } else if (y >= startY) {
          line += chalk.cyan(char);
        } else {
          line += char;
        }
      }
      output += line + '\n';
    }
    
    return output;
  }
  
  private drawLine(grid: string[][], x1: number, y1: number, x2: number, y2: number): void {
    const dx = Math.abs(x2 - x1);
    const dy = Math.abs(y2 - y1);
    const sx = x1 < x2 ? 1 : -1;
    const sy = y1 < y2 ? 1 : -1;
    let err = dx - dy;
    
    while (true) {
      if (x1 >= 0 && x1 < this.width && y1 >= 0 && y1 < this.height && grid[y1][x1] === ' ') {
        if (Math.abs(x2 - x1) > Math.abs(y2 - y1)) {
          grid[y1][x1] = '─';
        } else if (Math.abs(y2 - y1) > Math.abs(x2 - x1)) {
          grid[y1][x1] = '│';
        } else if ((x2 - x1) * (y2 - y1) > 0) {
          grid[y1][x1] = '\\';
        } else {
          grid[y1][x1] = '/';
        }
      }
      
      if (x1 === x2 && y1 === y2) break;
      
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
}