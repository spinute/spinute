import chalk from 'chalk';
import gradient from 'gradient-string';

export class FloatingCard {
  constructor(
    private width: number = 80,
    private height: number = 20
  ) {}
  
  render(time: number): string {
    const grid: string[][] = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
    
    // Draw card with proper centering
    const cardContent = [
      '📍',
      'spinute',
      '📍',
      'https://spinute.notion.site/',
      'https://github.com/spinute',
      'https://x.com/spinute'
    ];
    
    // Calculate proper card width based on longest content
    const longestLine = Math.max(...cardContent.map(line => line.length));
    const cardWidth = longestLine + 8; // padding
    
    const card: string[] = [];
    card.push('╭' + '─'.repeat(cardWidth - 2) + '╮');
    
    // Add empty line
    card.push('│' + ' '.repeat(cardWidth - 2) + '│');
    
    // Add centered content
    for (let i = 0; i < cardContent.length; i++) {
      const content = cardContent[i];
      const padding = Math.floor((cardWidth - 2 - content.length) / 2);
      const line = '│' + ' '.repeat(padding) + content + ' '.repeat(cardWidth - 2 - padding - content.length) + '│';
      card.push(line);
      
      // Add spacing after emojis
      if (i === 2) {
        card.push('│' + ' '.repeat(cardWidth - 2) + '│');
      }
    }
    
    // Add empty line
    card.push('│' + ' '.repeat(cardWidth - 2) + '│');
    card.push('╰' + '─'.repeat(cardWidth - 2) + '╯');
    
    // Floating card position
    const offsetY = Math.sin(time * 0.05) * 2;
    const offsetX = Math.cos(time * 0.03) * 3;
    
    const actualCardWidth = card[0].length;
    const cardHeight = card.length;
    const startX = Math.floor((this.width - actualCardWidth) / 2 + offsetX);
    const startY = Math.floor((this.height - cardHeight) / 2 + offsetY);
    
    // Draw floating particles
    const emojis = ['📍', '💻', '🍣', '🍺', '🌐', '🎲'];
    for (let i = 0; i < 20; i++) {
      const x = Math.floor(Math.random() * this.width);
      const y = Math.floor(Math.random() * this.height);
      const useEmoji = Math.random() < 0.2;
      const particle = useEmoji ? emojis[Math.floor(Math.random() * emojis.length)] : (Math.random() < 0.5 ? '·' : '∘');
      if (y >= 0 && y < this.height && x >= 0 && x < this.width) {
        grid[y][x] = particle;
      }
    }
    
    for (let y = 0; y < card.length; y++) {
      const line = card[y];
      for (let x = 0; x < line.length; x++) {
        const gridY = startY + y;
        const gridX = startX + x;
        if (gridY >= 0 && gridY < this.height && gridX >= 0 && gridX < this.width) {
          grid[gridY][gridX] = line[x];
        }
      }
    }
    
    // Convert to string with gradient
    let output = '';
    for (let y = 0; y < this.height; y++) {
      const row = grid[y].join('');
      if (y >= startY && y < startY + card.length) {
        output += gradient.pastel(row) + '\n';
      } else {
        output += chalk.dim(row) + '\n';
      }
    }
    
    return output;
  }
}