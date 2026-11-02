import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, readdirSync } from 'node:fs';
import vm from 'node:vm';

// Carrega parseCSV de cada trilha sem alterar o script (que roda no navegador).
function loadParseCSV(dir) {
  const noop = () => {};
  const el = { classList: { add: noop, remove: noop, contains: () => false }, addEventListener: noop };
  const sandbox = {
    document: { getElementById: () => el, querySelectorAll: () => [], createElement: () => ({}) },
    fetch: () => new Promise(noop),
    console,
  };
  vm.createContext(sandbox);
  vm.runInContext(`${readFileSync(`${dir}/script.js`, 'utf8')}\nthis.parseCSV = parseCSV;`, sandbox);
  return sandbox.parseCSV;
}

const trilhas = readdirSync('.').filter((d) => d.startsWith('trilha-'));

for (const dir of trilhas) {
  test(`${dir}: parseCSV`, () => {
    const parseCSV = loadParseCSV(dir);
    const csv = [
      'titulo,formato,momento,link',
      'Aula 1,video,buscando-vaga,https://youtu.be/x',
      'Sem link,pdf,buscando-vaga,',
      '',
      ' Artigo , artigo , crescendo-emprego , https://exemplo.com ',
    ].join('\n');

    assert.deepEqual(JSON.parse(JSON.stringify(parseCSV(csv))), [
      { titulo: 'Aula 1', formato: 'video', momento: 'buscando-vaga', link: 'https://youtu.be/x' },
      { titulo: 'Artigo', formato: 'artigo', momento: 'crescendo-emprego', link: 'https://exemplo.com' },
    ]);
  });

  test(`${dir}: CSV só com cabeçalho retorna vazio`, () => {
    assert.equal(loadParseCSV(dir)("titulo,formato,momento,link").length, 0);
  });
}
