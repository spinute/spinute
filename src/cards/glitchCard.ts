import chalk from 'chalk';
import gradient from 'gradient-string';

export class GlitchCard {
  private chars = '█▓▒░';
  private emojis = ['📍', '💻', '🍣', '🍺', '🍅', '😴', '📕', '🦌', '💄', '📌', '🚶‍♀️', '🍕', '🍆', '🌐', '🌵', '🥝', '🛀', '🎲', '🃏'];
  
  constructor(
    private width: number = 80,
    private height: number = 20
  ) {}
  
  render(time: number): string {
    const lines: string[] = [];
    
    // Glitch intensity
    const glitchLevel = (Math.sin(time * 0.1) + 1) / 2;
    
    const addLine = (text: string, y: number) => {
      let line = text;
      
      // Apply glitch effects
      if (Math.random() < glitchLevel * 0.3) {
        // Shift effect
        const shift = Math.floor(Math.random() * 5) - 2;
        line = ' '.repeat(Math.max(0, shift)) + line;
      }
      
      if (Math.random() < glitchLevel * 0.2) {
        // Character corruption
        const chars = line.split('');
        const corruptPos = Math.floor(Math.random() * chars.length);
        chars[corruptPos] = this.chars[Math.floor(Math.random() * this.chars.length)];
        line = chars.join('');
      }
      
      return line;
    };
    
    // Center content
    const centerY = Math.floor(this.height / 2) - 4;
    
    for (let y = 0; y < this.height; y++) {
      if (y === centerY) {
        lines.push(addLine(this.centerText('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', this.width), y));
      } else if (y === centerY + 1) {
        lines.push(gradient.vice(addLine(this.centerText('📍 s p i n u t e 📍', this.width), y)));
      } else if (y === centerY + 2) {
        lines.push(addLine(this.centerText('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', this.width), y));
      } else if (y === centerY + 4) {
        lines.push(chalk.cyan(addLine(this.centerText('https://spinute.notion.site/', this.width), y)));
      } else if (y === centerY + 5) {
        lines.push(chalk.gray(addLine(this.centerText('https://github.com/spinute', this.width), y)));
      } else if (y === centerY + 6) {
        lines.push(chalk.gray(addLine(this.centerText('https://x.com/spinute', this.width), y)));
      } else if (y === centerY + 8) {
        lines.push(addLine(this.centerText('▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓', this.width), y));
      } else {
        // Background noise with emojis
        let bgLine = '';
        for (let x = 0; x < this.width; x++) {
          if (Math.random() < glitchLevel * 0.05) {
            bgLine += this.chars[Math.floor(Math.random() * this.chars.length)];
          } else if (Math.random() < glitchLevel * 0.01) {
            bgLine += this.emojis[Math.floor(Math.random() * this.emojis.length)];
          } else {
            bgLine += ' ';
          }
        }
        lines.push(chalk.dim(bgLine));
      }
    }
    
    return lines.join('\n');
  }
  
  private centerText(text: string, width: number): string {
    const padding = Math.max(0, Math.floor((width - text.length) / 2));
    return ' '.repeat(padding) + text + ' '.repeat(Math.max(0, width - padding - text.length));
  }
}