// Cada trilha é autocontida e declara os mesmos globais; checa-se uma de cada vez.
import { readdirSync } from 'node:fs';
import { spawnSync } from 'node:child_process';

let failed = false;
for (const dir of readdirSync('.').filter((d) => d.startsWith('trilha-'))) {
  const r = spawnSync(
    process.execPath,
    ['node_modules/typescript/bin/tsc', '--noEmit', '--allowJs', '--checkJs', '--target', 'ES2022', '--lib', 'ES2022,DOM', '--skipLibCheck', `${dir}/script.js`],
    { stdio: 'inherit' },
  );
  if (r.status !== 0) failed = true;
}
process.exit(failed ? 1 : 0);
