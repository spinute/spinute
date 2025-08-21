export class WaveAnimation {
  constructor(
    private width: number,
    private height: number
  ) {}
  
  render(time: number): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    const chars = '~≈∼∿〜～';
    
    for (let y = 0; y < this.height; y++) {
      for (let x = 0; x < this.width; x++) {
        const wave1 = Math.sin((x + time) * 0.1) * Math.cos(y * 0.2);
        const wave2 = Math.sin((x - time * 0.5) * 0.15) * Math.sin((y + time * 0.3) * 0.1);
        const combined = wave1 + wave2;
        
        if (Math.abs(combined) > 0.8) {
          const charIndex = Math.floor(Math.abs(combined * chars.length)) % chars.length;
          grid[y][x] = chars[charIndex];
        } else if (Math.abs(combined) > 0.5) {
          grid[y][x] = '·';
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}