import chalk from 'chalk';
import gradient from 'gradient-string';

export class NeonCard {
  constructor(
    private width: number = 80,
    private height: number = 20
  ) {}
  
  render(time: number): string {
    const lines: string[] = [];
    
    // Neon pulse effect
    const pulse = (Math.sin(time * 0.08) + 1) / 2;
    const glow = pulse > 0.5;
    
    const centerY = Math.floor(this.height / 2) - 3;
    
    for (let y = 0; y < this.height; y++) {
      if (y === centerY - 1 && glow) {
        lines.push(this.centerText('═══════════════════════════════', this.width));
      } else if (y === centerY) {
        const name = '║      S P I N U T E      ║';
        lines.push(gradient.teen(this.centerText(name, this.width)));
      } else if (y === centerY + 1 && glow) {
        lines.push(this.centerText('═══════════════════════════════', this.width));
      } else if (y === centerY + 3) {
        const url1 = glow ? '▸ https://spinute.notion.site/' : 'https://spinute.notion.site/';
        lines.push(chalk.cyan(this.centerText(url1, this.width)));
      } else if (y === centerY + 4) {
        const url2 = glow ? '▸ https://github.com/spinute' : 'https://github.com/spinute';
        lines.push(chalk.magenta(this.centerText(url2, this.width)));
      } else if (y === centerY + 5) {
        const url3 = glow ? '▸ https://x.com/spinute' : 'https://x.com/spinute';
        lines.push(chalk.yellow(this.centerText(url3, this.width)));
      } else {
        // Neon grid background
        let bgLine = '';
        for (let x = 0; x < this.width; x++) {
          if ((x % 10 === 0 || y % 5 === 0) && Math.random() < 0.1) {
            bgLine += glow ? '+' : '·';
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