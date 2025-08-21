export class DNAHelix {
  constructor(
    private width: number,
    private height: number
  ) {}
  
  render(time: number): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    const bases = ['A', 'T', 'G', 'C'];
    const connectors = ['─', '═', '╌', '┅'];
    
    const centerX = this.width / 2;
    
    for (let y = 0; y < this.height; y++) {
      const phase1 = Math.sin((y - time * 0.2) * 0.3) * 15 + centerX - 10;
      const phase2 = Math.sin((y - time * 0.2) * 0.3 + Math.PI) * 15 + centerX + 10;
      
      const x1 = Math.floor(phase1);
      const x2 = Math.floor(phase2);
      
      if (x1 >= 0 && x1 < this.width) {
        grid[y][x1] = bases[Math.floor(Math.random() * bases.length)];
      }
      
      if (x2 >= 0 && x2 < this.width) {
        grid[y][x2] = bases[Math.floor(Math.random() * bases.length)];
      }
      
      if (y % 2 === 0 && x1 >= 0 && x2 < this.width) {
        const connector = connectors[y % connectors.length];
        for (let x = Math.min(x1, x2) + 1; x < Math.max(x1, x2); x++) {
          if (x >= 0 && x < this.width) {
            grid[y][x] = connector;
          }
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}