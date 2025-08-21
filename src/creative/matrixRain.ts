export class MatrixRain {
  private drops: number[] = [];
  private chars: string[] = [];
  
  constructor(
    private width: number,
    private height: number
  ) {
    this.drops = Array(this.width).fill(0).map(() => Math.floor(Math.random() * this.height));
    this.chars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン📍💻🍣🍺🌐🎲'.split('');
  }
  
  update(): void {
    for (let i = 0; i < this.drops.length; i++) {
      if (Math.random() > 0.98 || this.drops[i] > this.height) {
        this.drops[i] = 0;
      } else {
        this.drops[i]++;
      }
    }
  }
  
  render(): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    for (let x = 0; x < this.width; x++) {
      const drop = this.drops[x];
      for (let y = 0; y <= drop && y < this.height; y++) {
        // 📍を頻繁に表示
        const usePin = Math.random() < 0.15;
        const char = usePin ? '📍' : this.chars[Math.floor(Math.random() * this.chars.length)];
        const brightness = (drop - y) / 5;
        
        if (brightness > 0.8) {
          grid[y][x] = '\x1b[97m' + char + '\x1b[0m'; // bright white
        } else if (brightness > 0.4) {
          grid[y][x] = '\x1b[92m' + char + '\x1b[0m'; // bright green
        } else if (brightness > 0) {
          grid[y][x] = '\x1b[32m' + char + '\x1b[0m'; // green
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}