export class SpiralPattern {
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
    const chars = ['📍', '💻', '🍣', '🍺', '🍅', '😴', '📕', '🦌', '💄', '📌', '🚶‍♀️', '🍕', '🍆', '🌐', '🌵', '🥝', '🛀', '🎲', '🃏'];
    const pinChars = ['📍', '📌', '💄']; // ピン系の絵文字
    
    // 中心に大きな📍
    grid[Math.floor(centerY)][Math.floor(centerX)] = '📍';
    
    for (let i = 0; i < 150; i++) {
      const angle = i * 0.2 + time * 0.1;
      const radius = i * 0.3;
      
      const x = Math.floor(centerX + Math.cos(angle) * radius);
      const y = Math.floor(centerY + Math.sin(angle) * radius * 0.5);
      
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        // スパイラルの要所に📍系を配置
        if (i % 10 === 0) {
          grid[y][x] = pinChars[Math.floor(Math.random() * pinChars.length)];
        } else {
          const charIndex = Math.floor((i + time) / 5) % chars.length;
          grid[y][x] = chars[charIndex];
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}