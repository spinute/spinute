export class ConwayGameOfLife {
  private grid: boolean[][];
  private nextGrid: boolean[][];
  public generation: number = 0;
  
  constructor(private width: number, private height: number) {
    this.grid = this.createGrid();
    this.nextGrid = this.createGrid();
  }
  
  private createGrid(): boolean[][] {
    return Array(this.height).fill(null).map(() => Array(this.width).fill(false));
  }
  
  randomize(density: number = 0.3): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        this.grid[y][x] = Math.random() < density;
      }
    }
  }
  
  loadPattern(pattern: string): void {
    this.grid = this.createGrid();
    
    switch (pattern) {
      case 'random':
        this.randomize();
        break;
        
      case 'glider':
        const glider = [[0, 1], [1, 2], [2, 0], [2, 1], [2, 2]];
        this.placePattern(glider, 5, 5);
        break;
        
      case 'pulsar':
        const pulsar = [
          [2, 4], [2, 5], [2, 6], [2, 10], [2, 11], [2, 12],
          [4, 2], [5, 2], [6, 2], [4, 7], [5, 7], [6, 7],
          [4, 9], [5, 9], [6, 9], [4, 14], [5, 14], [6, 14],
          [7, 4], [7, 5], [7, 6], [7, 10], [7, 11], [7, 12],
          [9, 4], [9, 5], [9, 6], [9, 10], [9, 11], [9, 12],
          [10, 2], [11, 2], [12, 2], [10, 7], [11, 7], [12, 7],
          [10, 9], [11, 9], [12, 9], [10, 14], [11, 14], [12, 14],
          [14, 4], [14, 5], [14, 6], [14, 10], [14, 11], [14, 12]
        ];
        this.placePattern(pulsar, 10, 5);
        break;
        
      case 'gospergun':
        const gun = [
          [5, 1], [5, 2], [6, 1], [6, 2],
          [5, 11], [6, 11], [7, 11], [4, 12], [8, 12],
          [3, 13], [9, 13], [3, 14], [9, 14], [6, 15],
          [4, 16], [8, 16], [5, 17], [6, 17], [7, 17], [6, 18],
          [3, 21], [4, 21], [5, 21], [3, 22], [4, 22], [5, 22],
          [2, 23], [6, 23], [1, 25], [2, 25], [6, 25], [7, 25],
          [3, 35], [4, 35], [3, 36], [4, 36]
        ];
        this.placePattern(gun, 5, 5);
        break;
    }
  }
  
  private placePattern(pattern: number[][], offsetX: number, offsetY: number): void {
    for (const [y, x] of pattern) {
      if (y + offsetY < this.height && x + offsetX < this.width) {
        this.grid[y + offsetY][x + offsetX] = true;
      }
    }
  }
  
  private countNeighbors(x: number, y: number): number {
    let count = 0;
    for (let dy = -1; dy <= 1; dy++) {
      for (let dx = -1; dx <= 1; dx++) {
        if (dx === 0 && dy === 0) continue;
        
        const nx = x + dx;
        const ny = y + dy;
        
        if (nx >= 0 && nx < this.width && ny >= 0 && ny < this.height) {
          if (this.grid[ny][nx]) count++;
        }
      }
    }
    return count;
  }
  
  step(): void {
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const neighbors = this.countNeighbors(x, y);
        const alive = this.grid[y][x];
        
        if (alive) {
          this.nextGrid[y][x] = neighbors === 2 || neighbors === 3;
        } else {
          this.nextGrid[y][x] = neighbors === 3;
        }
      }
    }
    
    [this.grid, this.nextGrid] = [this.nextGrid, this.grid];
    this.generation++;
  }
  
  render(): string {
    let output = '';
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        output += this.grid[y][x] ? '█' : ' ';
      }
      output += '\n';
    }
    return output;
  }
}