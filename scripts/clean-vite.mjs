import { rmSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const paths = [
  join(process.cwd(), 'node_modules', '.vite'),
  join(process.cwd(), 'client', 'node_modules', '.vite'),
  join(process.cwd(), 'client', '.vite'),
];

for (const p of paths) {
  try {
    if (existsSync(p)) {
      rmSync(p, { recursive: true, force: true });
      console.log('Removed', p);
    } else {
      console.log('Skip missing', p);
    }
  } catch (err) {
    console.warn('Failed to remove', p, err?.message ?? err);
  }
}

console.log('Vite cache cleanup complete.');
