import { BijoyEngine } from './src/engine/bijoy-engine.ts';

const engine = new BijoyEngine();

// Type 'ব '
console.log(engine.processKey('KeyH', false)); // ব
console.log(engine.processKey('Space', false)); // space

// Type 'ক্লা' (J, G, Shift+V, F)
console.log('--- Typing ক্লা ---');
console.log(engine.processKey('KeyJ', false)); // ক
console.log(engine.processKey('KeyG', false)); // ्
console.log(engine.processKey('KeyV', true));  // ল
console.log(engine.processKey('KeyF', false)); // া

// Type ' '
console.log('--- Space ---');
console.log(engine.processKey('Space', false)); // space

// Type 'ক্লি' (D, J, G, Shift+V)
console.log('--- Typing ক্লি ---');
console.log(engine.processKey('KeyD', false)); // ি
console.log(engine.processKey('KeyJ', false)); // ক
console.log(engine.processKey('KeyG', false)); // ्
console.log(engine.processKey('KeyV', true));  // ল

// Type ' '
console.log('--- Space ---');
console.log(engine.processKey('Space', false)); // space

// Type 'কৃ' (J, A)
console.log('--- Typing কৃ ---');
console.log(engine.processKey('KeyJ', false)); // ক
console.log(engine.processKey('KeyA', false)); // ৃ

console.log('--- Final Buffer ---');
console.log(engine.getBuffer());
