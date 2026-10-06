const { spawn } = require('child_process');

console.log('====================================================');
console.log(' Wisdom International School - Fullstack Dev Server ');
console.log(' Frontend: http://localhost:3000                     ');
console.log(' Backend:  http://localhost:5000                     ');
console.log('====================================================\n');

const backend = spawn('npm', ['--prefix', 'backend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

const frontend = spawn('npm', ['--prefix', 'frontend', 'run', 'dev'], {
  stdio: 'inherit',
  shell: true,
});

const cleanup = () => {
  try {
    backend.kill();
  } catch (_) {}
  try {
    frontend.kill();
  } catch (_) {}
  process.exit(0);
};

process.on('SIGINT', cleanup);
process.on('SIGTERM', cleanup);
process.on('exit', cleanup);
