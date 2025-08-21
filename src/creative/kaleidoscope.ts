export class Kaleidoscope {
  constructor(
    private width: number,
    private height: number
  ) {}
  
  render(time: number): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    const centerX = this.width / 2;
    const centerY = this.height / 2;
    const patterns = '✦✧◈◊⬡⬢◆◇▪▫●○';
    
    const segments = 8;
    const angleStep = (Math.PI * 2) / segments;
    
    for (let i = 0; i < 100; i++) {
      const baseAngle = Math.random() * Math.PI * 2;
      const radius = Math.random() * Math.min(centerX, centerY);
      const charIndex = Math.floor(Math.random() * patterns.length);
      
      for (let seg = 0; seg < segments; seg++) {
        const angle = baseAngle + angleStep * seg + time * 0.02;
        const x = Math.floor(centerX + Math.cos(angle) * radius);
        const y = Math.floor(centerY + Math.sin(angle) * radius * 0.8);
        
        if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
          grid[y][x] = patterns[charIndex];
        }
        
        // Mirror pattern
        const mirrorX = Math.floor(centerX - Math.cos(angle) * radius);
        if (mirrorX >= 0 && mirrorX < this.width && y >= 0 && y < this.height) {
          grid[y][mirrorX] = patterns[charIndex];
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}