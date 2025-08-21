#!/usr/bin/env node

import chalk from 'chalk';
import figlet from 'figlet';
import gradient from 'gradient-string';
import boxen from 'boxen';
import { ConwayGameOfLife } from './simulations/gameOfLife';
import { ParticleSystem } from './creative/particleSystem';
import { MatrixRain } from './creative/matrixRain';
import { WaveAnimation } from './creative/waveAnimation';
import { SpiralPattern } from './creative/spiralPattern';
import { DNAHelix } from './creative/dnaHelix';
import { CircuitBoard } from './creative/circuitBoard';
import { Kaleidoscope } from './creative/kaleidoscope';
import { Fireflies } from './creative/fireflies';
import { FloatingCard } from './cards/floatingCard';
import { GlitchCard } from './cards/glitchCard';
import { NeonCard } from './cards/neonCard';
import { AsciiWaveCard } from './cards/asciiWaveCard';
import { ConstellationCard } from './cards/constellationCard';

const sleep = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

// Clear screen with ANSI escape codes
function clearScreen(): void {
  process.stdout.write('\x1b[2J\x1b[H');
}

// Simple seedable PRNG (Linear Congruential Generator)
class SeededRandom {
  private seed: number;
  
  constructor(seed: number) {
    this.seed = seed;
  }
  
  next(): number {
    // LCG parameters from Numerical Recipes
    this.seed = (this.seed * 1664525 + 1013904223) % 2147483647;
    return this.seed / 2147483647;
  }
  
  reset(seed: number): void {
    this.seed = seed;
  }
}

// Global random instance
let random: SeededRandom;

// Wrapper for Math.random() that uses seed if available
function getRandom(): number {
  return random ? random.next() : Math.random();
}

// Visual effects with shorter durations
async function showConway(): Promise<void> {
  const game = new ConwayGameOfLife(80, 20);
  const patterns = ['pulsar', 'gospergun', 'random'];
  game.loadPattern(patterns[Math.floor(getRandom() * patterns.length)]);
  
  for (let i = 0; i < 25; i++) {
    clearScreen();
    console.log(gradient.vice(game.render()));
    game.step();
    await sleep(40);
  }
}

async function showParticles(): Promise<void> {
  const particles = new ParticleSystem(80, 20, 50);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    const frame = particles.render();
    console.log(gradient.rainbow(frame));
    particles.update();
    await sleep(30);
  }
}

async function showMatrixRain(): Promise<void> {
  const matrix = new MatrixRain(80, 20);
  
  for (let i = 0; i < 35; i++) {
    clearScreen();
    console.log(matrix.render());
    matrix.update();
    await sleep(25);
  }
}

async function showWave(): Promise<void> {
  const wave = new WaveAnimation(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(gradient.cristal(wave.render(i)));
    await sleep(30);
  }
}

async function showGlitch(): Promise<void> {
  const chars = '▓░▒█▀▄■□▪▫╱╲╳✕✖✗⬢⬡◆◇◈⬟⬠';
  const width = 80;
  const height = 20;
  
  for (let frame = 0; frame < 25; frame++) {
    clearScreen();
    let art = '';
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const t = frame * 0.1;
        const noise = Math.sin(x * 0.1 + t) * Math.cos(y * 0.1 + t) + 
                      Math.sin((x + y) * 0.05 + t * 2);
        const glitch = getRandom() < 0.02 ? getRandom() * chars.length : 0;
        const index = Math.floor(Math.abs(noise + glitch) * chars.length) % chars.length;
        art += gradient.teen(chars[index]);
      }
      art += '\n';
    }
    
    console.log(art);
    await sleep(40);
  }
}

async function showSpiral(): Promise<void> {
  const spiral = new SpiralPattern(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(gradient.pastel(spiral.render(i)));
    await sleep(35);
  }
}

async function showDNA(): Promise<void> {
  const dna = new DNAHelix(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(gradient.vice(dna.render(i)));
    await sleep(35);
  }
}

async function showCircuit(): Promise<void> {
  const circuit = new CircuitBoard(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(gradient.atlas(circuit.render(i)));
    await sleep(35);
  }
}

async function showKaleidoscope(): Promise<void> {
  const kaleidoscope = new Kaleidoscope(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(gradient.rainbow(kaleidoscope.render(i)));
    await sleep(35);
  }
}

async function showFireflies(): Promise<void> {
  const fireflies = new Fireflies(80, 20);
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(fireflies.render(i));
    await sleep(35);
  }
}

// Animated cards
async function showFloatingCard(): Promise<void> {
  const card = new FloatingCard();
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showGlitchCard(): Promise<void> {
  const card = new GlitchCard();
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showNeonCard(): Promise<void> {
  const card = new NeonCard();
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showWaveCard(): Promise<void> {
  const card = new AsciiWaveCard();
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showConstellationCard(): Promise<void> {
  const card = new ConstellationCard();
  
  for (let i = 0; i < 30; i++) {
    clearScreen();
    console.log(card.render(i));
    await sleep(35);
  }
}

// Static business card (final)
async function showStaticBusinessCard(): Promise<void> {
  clearScreen();
  
  const signature = figlet.textSync('spinute', {
    font: 'Standard',
    horizontalLayout: 'default'
  });
  
  const card = `
${gradient.pastel(signature)}

${chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${chalk.white('📍 spinute 📍')}

${chalk.cyan('https://spinute.notion.site/')}
${chalk.white('https://github.com/spinute')}
${chalk.white('https://x.com/spinute')}

${chalk.gray('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━')}

${chalk.dim('💻 🍣 🍺 🌐 🎲 🃏')}
`;

  const boxedCard = boxen(card, {
    padding: { top: 1, bottom: 1, left: 3, right: 3 },
    margin: 1,
    borderStyle: {
      topLeft: '╭',
      topRight: '╮',
      bottomLeft: '╰',
      bottomRight: '╯',
      horizontal: '─',
      vertical: '│'
    },
    borderColor: 'cyan',
    float: 'left'
  });
  
  // Typewriter effect
  const lines = boxedCard.split('\n');
  for (const line of lines) {
    console.log(line);
    await sleep(20);
  }
  
  await sleep(2000);
}

// Smooth transition function
async function smoothTransition(): Promise<void> {
  const transitionChars = ['░', '▒', '▓', '█'];
  const emojis = ['📍', '💻', '🍣', '🍺', '🌐', '🎲'];
  const height = 20;
  
  for (let i = 0; i < 5; i++) {
    clearScreen();
    let output = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < 80; x++) {
        if (getRandom() < 0.02) {
          output += emojis[Math.floor(getRandom() * emojis.length)];
        } else {
          const charIndex = Math.floor(getRandom() * transitionChars.length);
          output += chalk.dim(transitionChars[charIndex]);
        }
      }
      output += '\n';
    }
    console.log(output);
    await sleep(50);
  }
}

// Accelerating sequence with exponential speedup
async function acceleratingSequence(allAnimations: Function[]): Promise<void> {
  // Create animated snippets with motion
  const createAnimatedSnippet = (
    setup: () => any,
    render: (obj: any, frame: number) => string,
    update?: (obj: any) => void
  ) => {
    return async (frameCount: number) => {
      const obj = setup();
      for (let i = 0; i < frameCount; i++) {
        clearScreen();
        console.log(render(obj, i));
        if (update) update(obj);
        await sleep(20); // Fixed frame time for smooth motion
      }
    };
  };
  
  const animationSnippets = [
    // Conway with motion
    createAnimatedSnippet(
      () => {
        const game = new ConwayGameOfLife(80, 20);
        game.randomize(0.4);
        return game;
      },
      (game) => gradient.vice(game.render()),
      (game) => game.step()
    ),
    
    // Particles with motion
    createAnimatedSnippet(
      () => new ParticleSystem(80, 20, 50),
      (particles) => gradient.rainbow(particles.render()),
      (particles) => particles.update()
    ),
    
    // Matrix rain with motion
    createAnimatedSnippet(
      () => new MatrixRain(80, 20),
      (matrix) => matrix.render(),
      (matrix) => matrix.update()
    ),
    
    // Wave with motion
    createAnimatedSnippet(
      () => new WaveAnimation(80, 20),
      (wave, frame) => gradient.cristal(wave.render(frame * 2))
    ),
    
    // Spiral with motion
    createAnimatedSnippet(
      () => new SpiralPattern(80, 20),
      (spiral, frame) => gradient.pastel(spiral.render(frame * 3))
    ),
    
    // DNA with motion
    createAnimatedSnippet(
      () => new DNAHelix(80, 20),
      (dna, frame) => gradient.vice(dna.render(frame * 2))
    ),
    
    // Fireflies with motion
    createAnimatedSnippet(
      () => new Fireflies(80, 20),
      (fireflies, frame) => fireflies.render(frame)
    ),
    
    // Kaleidoscope with motion
    createAnimatedSnippet(
      () => new Kaleidoscope(80, 20),
      (k, frame) => gradient.rainbow(k.render(frame * 2))
    )
  ];
  
  // Start with longer animations and exponentially decrease
  let frameCount = 15; // Start with 15 frames
  const minFrames = 2;
  const acceleration = 0.85;
  
  // Run animations with increasing speed
  let iterations = 0;
  while (frameCount > minFrames && iterations < 20) {
    const randomSnippet = animationSnippets[Math.floor(getRandom() * animationSnippets.length)];
    await randomSnippet(Math.floor(frameCount));
    frameCount *= acceleration;
    iterations++;
  }
  
  // Final burst of super fast animations
  const burstChars = ['▓', '░', '▒', '█', '📍', '💻', '🍣', '🍺', '🌐', '🎲', '🃏', '🌵', '🦌', '💄'];
  for (let i = 0; i < 20; i++) {
    clearScreen();
    let output = '';
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 80; x++) {
        output += burstChars[Math.floor(getRandom() * burstChars.length)];
      }
      output += '\n';
    }
    console.log(i % 2 === 0 ? gradient.rainbow(output) : gradient.vice(output));
    await sleep(Math.max(5, 40 - i * 2)); // Gets even faster
  }
}

// Black screen pause
async function blackScreen(): Promise<void> {
  clearScreen();
  await sleep(800); // Dramatic pause
}

// Pin loading screen
async function pinLoadingScreen(): Promise<void> {
  clearScreen();
  const width = 80;
  const height = 20;
  const centerX = width / 2;
  const centerY = height / 2;
  
  // Create different loading patterns with 📍
  const loadingPatterns = [
    // Rotating circle
    async () => {
      for (let frame = 0; frame < 30; frame++) {
        clearScreen();
        const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
        
        // Draw rotating pins
        const radius = 8;
        const pinCount = 8;
        for (let i = 0; i < pinCount; i++) {
          const angle = (i / pinCount) * Math.PI * 2 + frame * 0.1;
          const x = Math.floor(centerX + Math.cos(angle) * radius);
          const y = Math.floor(centerY + Math.sin(angle) * radius * 0.5);
          if (x >= 0 && x < width && y >= 0 && y < height) {
            grid[y][x] = '📍';
          }
        }
        
        // Center pin
        grid[Math.floor(centerY)][Math.floor(centerX)] = '📍';
        
        console.log(grid.map(row => row.join('')).join('\n'));
        await sleep(50);
      }
    },
    // Pulsing pins
    async () => {
      for (let frame = 0; frame < 20; frame++) {
        clearScreen();
        const grid: string[][] = Array(height).fill(null).map(() => Array(width).fill(' '));
        
        const pulse = Math.sin(frame * 0.3) * 0.5 + 0.5;
        const size = Math.floor(pulse * 5) + 1;
        
        for (let dy = -size; dy <= size; dy++) {
          for (let dx = -size; dx <= size; dx++) {
            if (Math.abs(dx) + Math.abs(dy) <= size) {
              const x = Math.floor(centerX + dx * 3);
              const y = Math.floor(centerY + dy);
              if (x >= 0 && x < width && y >= 0 && y < height) {
                grid[y][x] = '📍';
              }
            }
          }
        }
        
        console.log(gradient.pastel(grid.map(row => row.join('')).join('\n')));
        await sleep(60);
      }
    }
  ];
  
  const pattern = loadingPatterns[Math.floor(getRandom() * loadingPatterns.length)];
  await pattern();
}

// Show animation for specific duration
async function showTimedAnimation(animationFunc: Function, durationMs: number): Promise<void> {
  const startTime = Date.now();
  
  // Run the animation for the specified duration
  while (Date.now() - startTime < durationMs) {
    // Check remaining time before starting animation
    const remainingTime = durationMs - (Date.now() - startTime);
    if (remainingTime <= 0) break;
    
    // Start the animation
    const animStart = Date.now();
    await animationFunc();
    
    // If animation took longer than duration, break
    if (Date.now() - startTime >= durationMs) break;
  }
}

// Show card for specific duration
async function showTimedCard(cardFunc: Function, durationMs: number): Promise<void> {
  const startTime = Date.now();
  let frameCount = 0;
  
  while (Date.now() - startTime < durationMs) {
    await cardFunc();
    frameCount++;
    // Cards update less frequently
    if (Date.now() - startTime < durationMs - 50) {
      await sleep(50);
    }
  }
}

async function main(): Promise<void> {
  try {
    // Parse command line arguments
    const args = process.argv.slice(2);
    let seed: number | undefined;
    
    // Check for --seed parameter
    const seedIndex = args.findIndex(arg => arg === '--seed' || arg === '-s');
    if (seedIndex !== -1 && args[seedIndex + 1]) {
      seed = parseInt(args[seedIndex + 1], 10);
      if (!isNaN(seed)) {
        random = new SeededRandom(seed);
        console.log(chalk.dim(`Using seed: ${seed}`));
        await sleep(1000);
      }
    }
    
    // Check for --help
    if (args.includes('--help') || args.includes('-h')) {
      console.log(`
${chalk.cyan('spinute')} - Creative CLI self-introduction

${chalk.yellow('Usage:')}
  npx spinute [options]

${chalk.yellow('Options:')}
  --seed, -s <number>  Use a specific seed for reproducible animations
  --help, -h           Show this help message

${chalk.yellow('Examples:')}
  npx spinute
  npx spinute --seed 42
  npx spinute -s 12345
`);
      process.exit(0);
    }
    const visualEffects = [
      showConway,
      showParticles,
      showMatrixRain,
      showWave,
      showGlitch,
      showSpiral,
      showDNA,
      showCircuit,
      showKaleidoscope,
      showFireflies
    ];
    
    const animatedCards = [
      showFloatingCard,
      showGlitchCard,
      showNeonCard,
      showWaveCard,
      showConstellationCard
    ];
    
    // Shuffle arrays using Fisher-Yates for better randomness with seed
    const shuffledEffects = [...visualEffects];
    for (let i = shuffledEffects.length - 1; i > 0; i--) {
      const j = Math.floor(getRandom() * (i + 1));
      [shuffledEffects[i], shuffledEffects[j]] = [shuffledEffects[j], shuffledEffects[i]];
    }
    
    const shuffledCards = [...animatedCards];
    for (let i = shuffledCards.length - 1; i > 0; i--) {
      const j = Math.floor(getRandom() * (i + 1));
      [shuffledCards[i], shuffledCards[j]] = [shuffledCards[j], shuffledCards[i]];
    }
    
    // 2s, 1s, 2s, 1s, 2s pattern
    // Animation 1 - 2 seconds
    await showTimedAnimation(shuffledEffects[0], 2000);
    
    // Card 1 - 1 second
    await showTimedCard(shuffledCards[0], 1000);
    
    // Animation 2 - 2 seconds
    await showTimedAnimation(shuffledEffects[1], 2000);
    
    // Card 2 - 1 second
    await showTimedCard(shuffledCards[1], 1000);
    
    // Animation 3 - 2 seconds
    await showTimedAnimation(shuffledEffects[2], 2000);
    
    // Exponential acceleration sequence
    await acceleratingSequence([...shuffledEffects, ...animatedCards]);
    
    // Extended burst sequence (3 seconds) with varied patterns
    const burstStartTime = Date.now();
    const burstDuration = 3000;
    const burstChars = ['▓', '░', '▒', '█'];
    const emojis = ['📍', '💻', '🍣', '🍺', '🍅', '😴', '📕', '🦌', '💄', '📌', '🚶‍♀️', '🍕', '🍆', '🌐', '🌵', '🥝', '🛀', '🎲', '🃏'];
    
    // Conservative width for emoji placement (leave buffer on edges)
    const safeWidth = 70; // Instead of 80
    const xOffset = 5; // Start from column 5
    
    let frameCount = 0;
    while (Date.now() - burstStartTime < burstDuration) {
      clearScreen();
      const elapsed = Date.now() - burstStartTime;
      const progress = elapsed / burstDuration;
      
      // Different burst patterns based on time
      if (elapsed < 300) {
        // Pattern 1: Expanding circles
        let output = '';
        const centerX = 40;
        const centerY = 10;
        const radius = (frameCount * 2) % 20;
        
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            const dist = Math.sqrt((x - centerX) ** 2 + (y - centerY) ** 2);
            if (Math.abs(dist - radius) < 2 && x >= xOffset && x < xOffset + safeWidth) {
              output += getRandom() < 0.3 ? '📍' : burstChars[Math.floor(getRandom() * 4)];
            } else if (getRandom() < 0.05) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.rainbow(output));
        
      } else if (elapsed < 600) {
        // Pattern 2: Wave sweep
        let output = '';
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            const wave = Math.sin((x + frameCount * 3) * 0.2) * 5 + 10;
            if (Math.abs(y - wave) < 2 && x >= xOffset && x < xOffset + safeWidth) {
              output += '📍';
            } else if (getRandom() < 0.05) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.vice(output));
        
      } else if (elapsed < 900) {
        // Pattern 3: Matrix rain burst
        let output = '';
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            if ((x + frameCount) % 5 === 0 && getRandom() < 0.8) {
              output += chalk.green(burstChars[Math.floor(getRandom() * burstChars.length)]);
            } else if (getRandom() < 0.02 && x >= xOffset && x < xOffset + safeWidth) {
              output += chalk.dim('📍');
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(output);
        
      } else if (elapsed < 1200) {
        // Pattern 4: Spiral burst
        let output = '';
        const angle = frameCount * 0.2;
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            const cx = x - 40;
            const cy = y - 10;
            const r = Math.sqrt(cx * cx + cy * cy);
            const a = Math.atan2(cy, cx);
            if (Math.abs((a + angle) % (Math.PI / 3) - r * 0.1) < 0.3 && x >= xOffset && x < xOffset + safeWidth) {
              output += '📍';
            } else if (getRandom() < 0.05) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.pastel(output));
        
      } else if (elapsed < 1500) {
        // Pattern 5: Diamond cascade
        let output = '';
        const offset = frameCount % 20;
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            const diamond = Math.abs(x - 40) + Math.abs(y - offset);
            if (diamond < 10 && diamond > 7 && x >= xOffset && x < xOffset + safeWidth) {
              output += getRandom() < 0.5 ? '📍' : burstChars[Math.floor(getRandom() * 4)];
            } else if (getRandom() < 0.1) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.teen(output));
        
      } else if (elapsed < 1800) {
        // Pattern 6: Checkerboard fade
        let output = '';
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            if (((x + y + frameCount) % 4 === 0) && getRandom() < 0.8) {
              if (x >= xOffset && x < xOffset + safeWidth && getRandom() < 0.3) {
                output += '📍';
              } else {
                output += burstChars[Math.floor(getRandom() * 4)];
              }
            } else if (getRandom() < 0.2) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.cristal(output));
        
      } else if (elapsed < 2100) {
        // Pattern 7: Particle explosion
        let output = '';
        const particles = 20;
        const grid: string[][] = Array(20).fill(null).map(() => Array(80).fill(' '));
        
        for (let i = 0; i < particles; i++) {
          const angle = (i / particles) * Math.PI * 2;
          const speed = (frameCount % 30) * 0.5;
          const x = Math.floor(40 + Math.cos(angle) * speed);
          const y = Math.floor(10 + Math.sin(angle) * speed * 0.5);
          
          if (x >= xOffset && x < xOffset + safeWidth && y >= 0 && y < 20) {
            grid[y][x] = i % 3 === 0 ? '📍' : burstChars[Math.floor(getRandom() * 4)];
          }
        }
        
        // Add some random background
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            if (grid[y][x] === ' ' && getRandom() < 0.05) {
              grid[y][x] = chalk.dim(burstChars[Math.floor(getRandom() * 4)]);
            }
          }
        }
        
        output = grid.map(row => row.join('')).join('\n');
        console.log(gradient.atlas(output));
        
      } else if (elapsed < 2400) {
        // Pattern 8: Zigzag lightning
        let output = '';
        const zigzag = frameCount % 40;
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            const lightning = (y % 4 === 0) ? zigzag + (y * 2) : 80 - zigzag - (y * 2);
            if (Math.abs(x - lightning) < 2 && x >= xOffset && x < xOffset + safeWidth) {
              output += '⚡';
            } else if (Math.abs(x - lightning) < 5 && getRandom() < 0.3) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else if (getRandom() < 0.02) {
              output += burstChars[Math.floor(getRandom() * 4)];
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        console.log(gradient.rainbow(output));
        
      } else {
        // Pattern 9: Final chaos burst
        let output = '';
        const density = 0.3 + (progress * 0.5);
        for (let y = 0; y < 20; y++) {
          for (let x = 0; x < 80; x++) {
            if (getRandom() < density) {
              if (x >= xOffset && x < xOffset + safeWidth && getRandom() < 0.2) {
                output += '📍';
              } else {
                output += burstChars[Math.floor(getRandom() * burstChars.length)];
              }
            } else {
              output += ' ';
            }
          }
          output += '\n';
        }
        
        // Rapid gradient changes for final burst
        const gradients = [gradient.rainbow, gradient.vice, gradient.pastel, gradient.cristal, gradient.teen];
        const gradientFunc = gradients[Math.floor(frameCount / 2) % gradients.length];
        console.log(gradientFunc(output));
      }
      
      frameCount++;
      await sleep(30);
    }
    
    // Pin loading screen
    await pinLoadingScreen();
    
    // Final static business card
    await showStaticBusinessCard();
    
    process.exit(0);
  } catch (error) {
    console.error(chalk.red('An error occurred:'), error);
    process.exit(1);
  }
}

// Handle clean exit
process.on('SIGINT', () => {
  console.log(chalk.yellow('\n\nInterrupted. Goodbye!\n'));
  process.exit(0);
});

main();