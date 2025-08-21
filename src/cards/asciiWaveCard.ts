import chalk from 'chalk';
import gradient from 'gradient-string';

export class AsciiWaveCard {
  constructor(
    private width: number = 80,
    private height: number = 20
  ) {}
  
  render(time: number): string {
    const lines: string[] = [];
    const waveChars = '~≈∼∿〜～━─';
    
    for (let y = 0; y < this.height; y++) {
      let line = '';
      
      for (let x = 0; x < this.width; x++) {
        // Create wave pattern
        const wave1 = Math.sin((x * 0.1) + (time * 0.05) + (y * 0.2));
        const wave2 = Math.sin((x * 0.05) - (time * 0.03) + (y * 0.1));
        const combined = wave1 + wave2;
        
        if (Math.abs(combined) > 1.5) {
          const charIndex = Math.floor(Math.abs(combined * 3)) % waveChars.length;
          line += waveChars[charIndex];
        } else {
          line += ' ';
        }
      }
      
      // Overlay text
      if (y === Math.floor(this.height / 2) - 2) {
        const text = 'spinute';
        const startX = Math.floor((this.width - text.length) / 2);
        for (let i = 0; i < text.length; i++) {
          if (startX + i < line.length) {
            line = line.substring(0, startX + i) + text[i] + line.substring(startX + i + 1);
          }
        }
        lines.push(gradient.cristal(line));
      } else if (y === Math.floor(this.height / 2)) {
        const url = 'https://spinute.notion.site/';
        const startX = Math.floor((this.width - url.length) / 2);
        line = ' '.repeat(this.width);
        for (let i = 0; i < url.length; i++) {
          if (startX + i < line.length) {
            line = line.substring(0, startX + i) + url[i] + line.substring(startX + i + 1);
          }
        }
        lines.push(chalk.cyan(line));
      } else if (y === Math.floor(this.height / 2) + 1) {
        const url = 'https://github.com/spinute';
        const startX = Math.floor((this.width - url.length) / 2);
        line = ' '.repeat(this.width);
        for (let i = 0; i < url.length; i++) {
          if (startX + i < line.length) {
            line = line.substring(0, startX + i) + url[i] + line.substring(startX + i + 1);
          }
        }
        lines.push(chalk.white(line));
      } else if (y === Math.floor(this.height / 2) + 2) {
        const url = 'https://x.com/spinute';
        const startX = Math.floor((this.width - url.length) / 2);
        line = ' '.repeat(this.width);
        for (let i = 0; i < url.length; i++) {
          if (startX + i < line.length) {
            line = line.substring(0, startX + i) + url[i] + line.substring(startX + i + 1);
          }
        }
        lines.push(chalk.white(line));
      } else {
        lines.push(chalk.dim(line));
      }
    }
    
    return lines.join('\n');
  }
}