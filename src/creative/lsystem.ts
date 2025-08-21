interface LSystemRule {
  axiom: string;
  rules: { [key: string]: string };
  angle: number;
  iterations: number;
}

export class LSystem {
  private systems: { [key: string]: LSystemRule } = {
    fern: {
      axiom: 'X',
      rules: {
        'X': 'F+[[X]-X]-F[-FX]+X',
        'F': 'FF'
      },
      angle: 25,
      iterations: 4
    },
    tree: {
      axiom: 'F',
      rules: {
        'F': 'F[+F]F[-F][F]'
      },
      angle: 20,
      iterations: 4
    },
    bush: {
      axiom: 'F',
      rules: {
        'F': 'FF+[+F-F-F]-[-F+F+F]'
      },
      angle: 22.5,
      iterations: 3
    },
    algae: {
      axiom: 'A',
      rules: {
        'A': 'AB',
        'B': 'A'
      },
      angle: 45,
      iterations: 6
    }
  };
  
  private canvas: string[][];
  private system: LSystemRule;
  
  constructor(
    type: string,
    private width: number = 80,
    private height: number = 20
  ) {
    this.system = this.systems[type] || this.systems.fern;
    this.canvas = Array(this.height).fill(null).map(() => 
      Array(this.width).fill(' ')
    );
  }
  
  private generate(): string {
    let current = this.system.axiom;
    
    for (let i = 0; i < this.system.iterations; i++) {
      let next = '';
      for (const char of current) {
        next += this.system.rules[char] || char;
      }
      current = next;
    }
    
    return current;
  }
  
  private draw(instructions: string): void {
    const stack: Array<{ x: number; y: number; angle: number }> = [];
    let x = this.width / 2;
    let y = this.height - 2;
    let angle = -90;
    const stepLength = 2;
    
    const drawPixel = (px: number, py: number, char: string) => {
      const ix = Math.floor(px);
      const iy = Math.floor(py);
      if (ix >= 0 && ix < this.width && iy >= 0 && iy < this.height) {
        this.canvas[iy][ix] = char;
      }
    };
    
    for (const instruction of instructions) {
      switch (instruction) {
        case 'F':
        case 'A':
        case 'B':
          const newX = x + Math.cos(angle * Math.PI / 180) * stepLength;
          const newY = y + Math.sin(angle * Math.PI / 180) * stepLength;
          
          const steps = Math.max(Math.abs(newX - x), Math.abs(newY - y));
          for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const px = x + (newX - x) * t;
            const py = y + (newY - y) * t;
            
            const chars = ['│', '/', '─', '\\'];
            const charAngle = ((angle + 360) % 360) / 90;
            const charIndex = Math.round(charAngle) % 4;
            
            drawPixel(px, py, chars[charIndex]);
          }
          
          x = newX;
          y = newY;
          break;
          
        case '+':
          angle += this.system.angle;
          break;
          
        case '-':
          angle -= this.system.angle;
          break;
          
        case '[':
          stack.push({ x, y, angle });
          break;
          
        case ']':
          const state = stack.pop();
          if (state) {
            x = state.x;
            y = state.y;
            angle = state.angle;
          }
          break;
      }
    }
    
    for (let py = 0; py < this.height; py++) {
      for (let px = 0; px < this.width; px++) {
        if (this.canvas[py][px] !== ' ' && py > 0 && 
            this.canvas[py - 1][px] === ' ') {
          if (Math.random() < 0.3) {
            this.canvas[py - 1][px] = '🍃';
          }
        }
      }
    }
  }
  
  render(): string {
    const instructions = this.generate();
    this.draw(instructions);
    return this.canvas.map(row => row.join('')).join('\n');
  }
}