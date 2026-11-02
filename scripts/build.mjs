// Site estático: "build" = validar a estrutura e copiar os arquivos publicáveis para dist/.
import { cpSync, existsSync, rmSync, mkdirSync } from 'node:fs';

const trilhas = ['guias-rapidos', 'high-agency', 'soft-skills', 'hard-skills'].map((t) => `trilha-${t}`);
const required = ['index.html', ...trilhas.flatMap((t) => [`${t}/index.html`, `${t}/style.css`, `${t}/script.js`])];

const missing = required.filter((f) => !existsSync(f));
if (missing.length) {
  console.error(`Arquivos ausentes:\n${missing.map((f) => ` - ${f}`).join('\n')}`);
  process.exit(1);
}

rmSync('dist', { recursive: true, force: true });
mkdirSync('dist');
for (const entry of ['index.html', ...trilhas]) cpSync(entry, `dist/${entry}`, { recursive: true });
console.log(`Build ok: ${required.length} arquivos validados, saída em dist/`);
