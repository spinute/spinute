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

// Visual effects with shorter durations
async function showConway(): Promise<void> {
  const game = new ConwayGameOfLife(80, 20);
  const patterns = ['pulsar', 'gospergun', 'random'];
  game.loadPattern(patterns[Math.floor(Math.random() * patterns.length)]);
  
  for (let i = 0; i < 25; i++) {
    console.clear();
    console.log(gradient.vice(game.render()));
    game.step();
    await sleep(40);
  }
}

async function showParticles(): Promise<void> {
  const particles = new ParticleSystem(80, 20, 50);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    const frame = particles.render();
    console.log(gradient.rainbow(frame));
    particles.update();
    await sleep(30);
  }
}

async function showMatrixRain(): Promise<void> {
  const matrix = new MatrixRain(80, 20);
  
  for (let i = 0; i < 35; i++) {
    console.clear();
    console.log(matrix.render());
    matrix.update();
    await sleep(25);
  }
}

async function showWave(): Promise<void> {
  const wave = new WaveAnimation(80, 20);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(gradient.cristal(wave.render(i)));
    await sleep(30);
  }
}

async function showGlitch(): Promise<void> {
  const chars = '▓░▒█▀▄■□▪▫╱╲╳✕✖✗⬢⬡◆◇◈⬟⬠';
  const width = 80;
  const height = 20;
  
  for (let frame = 0; frame < 25; frame++) {
    console.clear();
    let art = '';
    
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        const t = frame * 0.1;
        const noise = Math.sin(x * 0.1 + t) * Math.cos(y * 0.1 + t) + 
                      Math.sin((x + y) * 0.05 + t * 2);
        const glitch = Math.random() < 0.02 ? Math.random() * chars.length : 0;
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
    console.clear();
    console.log(gradient.pastel(spiral.render(i)));
    await sleep(35);
  }
}

async function showDNA(): Promise<void> {
  const dna = new DNAHelix(80, 20);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(gradient.vice(dna.render(i)));
    await sleep(35);
  }
}

async function showCircuit(): Promise<void> {
  const circuit = new CircuitBoard(80, 20);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(gradient.atlas(circuit.render(i)));
    await sleep(35);
  }
}

async function showKaleidoscope(): Promise<void> {
  const kaleidoscope = new Kaleidoscope(80, 20);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(gradient.rainbow(kaleidoscope.render(i)));
    await sleep(35);
  }
}

async function showFireflies(): Promise<void> {
  const fireflies = new Fireflies(80, 20);
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(fireflies.render(i));
    await sleep(35);
  }
}

// Animated cards
async function showFloatingCard(): Promise<void> {
  const card = new FloatingCard();
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showGlitchCard(): Promise<void> {
  const card = new GlitchCard();
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showNeonCard(): Promise<void> {
  const card = new NeonCard();
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showWaveCard(): Promise<void> {
  const card = new AsciiWaveCard();
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(card.render(i));
    await sleep(35);
  }
}

async function showConstellationCard(): Promise<void> {
  const card = new ConstellationCard();
  
  for (let i = 0; i < 30; i++) {
    console.clear();
    console.log(card.render(i));
    await sleep(35);
  }
}

// Static business card (final)
async function showStaticBusinessCard(): Promise<void> {
  console.clear();
  
  const signature = figlet.textSync('spinute', {
    font: 'Small',
    horizontalLayout: 'fitted'
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
    console.clear();
    let output = '';
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < 80; x++) {
        if (Math.random() < 0.02) {
          output += emojis[Math.floor(Math.random() * emojis.length)];
        } else {
          const charIndex = Math.floor(Math.random() * transitionChars.length);
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
  // Create snippets of each animation
  const animationSnippets = [
    // Conway snippets
    async () => {
      const game = new ConwayGameOfLife(80, 20);
      game.randomize(0.3);
      console.clear();
      console.log(gradient.vice(game.render()));
    },
    // Particle snippets
    async () => {
      const particles = new ParticleSystem(80, 20, 50);
      console.clear();
      console.log(gradient.rainbow(particles.render()));
    },
    // Matrix snippets
    async () => {
      const matrix = new MatrixRain(80, 20);
      console.clear();
      console.log(matrix.render());
    },
    // Wave snippets
    async () => {
      const wave = new WaveAnimation(80, 20);
      console.clear();
      console.log(gradient.cristal(wave.render(Math.random() * 50)));
    },
    // Spiral snippets
    async () => {
      const spiral = new SpiralPattern(80, 20);
      console.clear();
      console.log(gradient.pastel(spiral.render(Math.random() * 30)));
    },
    // DNA snippets
    async () => {
      const dna = new DNAHelix(80, 20);
      console.clear();
      console.log(gradient.vice(dna.render(Math.random() * 30)));
    },
    // Glitch snippets
    async () => {
      console.clear();
      const chars = '▓░▒█▀▄■□▪▫╱╲╳✕✖✗⬢⬡◆◇◈⬟⬠';
      let art = '';
      for (let y = 0; y < 20; y++) {
        for (let x = 0; x < 80; x++) {
          art += gradient.teen(chars[Math.floor(Math.random() * chars.length)]);
        }
        art += '\n';
      }
      console.log(art);
    }
  ];
  
  // Start with 500ms per animation and exponentially decrease
  let duration = 500;
  const minDuration = 10;
  const acceleration = 0.82; // Each animation is 18% faster
  
  // Run animations with increasing speed
  let iterations = 0;
  while (duration > minDuration && iterations < 25) {
    const randomSnippet = animationSnippets[Math.floor(Math.random() * animationSnippets.length)];
    await randomSnippet();
    await sleep(duration);
    duration *= acceleration;
    iterations++;
  }
  
  // Final burst of super fast animations
  const burstChars = ['▓', '░', '▒', '█', '📍', '💻', '🍣', '🍺', '🌐', '🎲', '🃏', '🌵', '🦌', '💄'];
  for (let i = 0; i < 20; i++) {
    console.clear();
    let output = '';
    for (let y = 0; y < 20; y++) {
      for (let x = 0; x < 80; x++) {
        output += burstChars[Math.floor(Math.random() * burstChars.length)];
      }
      output += '\n';
    }
    console.log(i % 2 === 0 ? gradient.rainbow(output) : gradient.vice(output));
    await sleep(Math.max(5, 40 - i * 2)); // Gets even faster
  }
}

// Black screen pause
async function blackScreen(): Promise<void> {
  console.clear();
  await sleep(800); // Dramatic pause
}

async function main(): Promise<void> {
  try {
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
    
    // Shuffle arrays
    const shuffledEffects = [...visualEffects].sort(() => Math.random() - 0.5);
    const shuffledCards = [...animatedCards].sort(() => Math.random() - 0.5);
    
    // 3 cycles of alternating display
    for (let cycle = 0; cycle < 3; cycle++) {
      // Show visual effect
      await shuffledEffects[cycle % shuffledEffects.length]();
      await smoothTransition();
      
      // Show animated card
      if (cycle < 2) {
        await shuffledCards[cycle % shuffledCards.length]();
        await smoothTransition();
      }
    }
    
    // Exponential acceleration sequence
    await acceleratingSequence([...shuffledEffects, ...animatedCards]);
    
    // Black screen pause
    await blackScreen();
    
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