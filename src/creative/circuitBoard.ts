export class CircuitBoard {
  private circuit: string[][];
  
  constructor(
    private width: number,
    private height: number
  ) {
    this.circuit = this.generateCircuit();
  }
  
  private generateCircuit(): string[][] {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    const components = ['┼', '├', '┤', '┬', '┴', '│', '─', '●', '○', '◆', '◇'];
    
    // Generate random circuit paths
    for (let i = 0; i < 8; i++) {
      let x = Math.floor(Math.random() * this.width);
      let y = Math.floor(Math.random() * this.height);
      let length = 10 + Math.floor(Math.random() * 20);
      
      for (let j = 0; j < length; j++) {
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          const isNode = Math.random() < 0.2;
          grid[y][x] = isNode ? '●' : (Math.random() < 0.5 ? '─' : '│');
        }
        
        if (Math.random() < 0.5) {
          x += Math.random() < 0.5 ? 1 : -1;
        } else {
          y += Math.random() < 0.5 ? 1 : -1;
        }
      }
    }
    
    return grid;
  }
  
  render(time: number): string {
    const output: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    // Copy circuit and add flowing electrons
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        output[y][x] = this.circuit[y][x];
        
        // Add flowing electrons
        if (this.circuit[y][x] !== ' ' && Math.random() < 0.05) {
          const pulse = Math.sin(time * 0.1 + x * 0.1 + y * 0.1) > 0.8;
          if (pulse) {
            output[y][x] = '◉';
          }
        }
      }
    }
    
    return output.map(row => row.join('')).join('\n');
  }
}