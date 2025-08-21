interface Firefly {
  x: number;
  y: number;
  vx: number;
  vy: number;
  brightness: number;
  phase: number;
  emoji: string;
}

export class Fireflies {
  private fireflies: Firefly[] = [];
  
  constructor(
    private width: number,
    private height: number,
    count: number = 20
  ) {
    const emojis = ['📍', '💻', '🍣', '🍺', '🍅', '😴', '📕', '🦌', '💄', '📌', '🚶‍♀️', '🍕', '🍆', '🌐', '🌵', '🥝', '🛀', '🎲', '🃏'];
    const mainEmojis = ['📍', '📍', '🍣', '🍺', '💻']; // 📍を多めに
    
    for (let i = 0; i < count; i++) {
      const emojiSet = i < 5 ? mainEmojis : emojis; // 最初の5つは主要な絵文字
      this.fireflies.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.3,
        brightness: 0,
        phase: Math.random() * Math.PI * 2,
        emoji: emojiSet[Math.floor(Math.random() * emojiSet.length)]
      });
    }
  }
  
  update(time: number): void {
    for (const ff of this.fireflies) {
      // Update position
      ff.x += ff.vx;
      ff.y += ff.vy;
      
      // Gentle wandering
      ff.vx += (Math.random() - 0.5) * 0.02;
      ff.vy += (Math.random() - 0.5) * 0.02;
      
      // Speed limit
      const speed = Math.sqrt(ff.vx * ff.vx + ff.vy * ff.vy);
      if (speed > 0.5) {
        ff.vx = (ff.vx / speed) * 0.5;
        ff.vy = (ff.vy / speed) * 0.5;
      }
      
      // Wrap around
      if (ff.x < 0) ff.x = this.width - 1;
      if (ff.x >= this.width) ff.x = 0;
      if (ff.y < 0) ff.y = this.height - 1;
      if (ff.y >= this.height) ff.y = 0;
      
      // Update brightness (pulsing)
      ff.brightness = (Math.sin(time * 0.05 + ff.phase) + 1) / 2;
    }
  }
  
  render(time: number): string {
    this.update(time);
    
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    // Background stars
    for (let i = 0; i < 50; i++) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      if (Math.random() < 0.3) {
        grid[y][x] = '·';
      }
    }
    
    // Draw fireflies
    for (const ff of this.fireflies) {
      const x = Math.floor(ff.x);
      const y = Math.floor(ff.y);
      
      if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
        if (ff.brightness > 0.5) {
          grid[y][x] = ff.emoji;
        } else if (ff.brightness > 0.2) {
          grid[y][x] = '·';
        }
        
        // Glow effect
        if (ff.brightness > 0.7) {
          for (let dx = -1; dx <= 1; dx++) {
            for (let dy = -1; dy <= 1; dy++) {
              const gx = x + dx;
              const gy = y + dy;
              if (gx >= 0 && gx < this.width && gy >= 0 && gy < this.height && 
                  grid[gy][gx] === ' ') {
                grid[gy][gx] = '·';
              }
            }
          }
        }
      }
    }
    
    return grid.map(row => row.join('')).join('\n');
  }
}