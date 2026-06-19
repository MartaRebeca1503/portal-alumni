const SHEET_ID = '1Dsn4Y8q5O8guBT0Z3RSixOxatMkfrR5yMYLIE0TvfEs';
const GID = '0'; // Assumindo gid=0 para Guias Rápidos
const CSV_URL = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=${GID}`;

let allMaterials = [];
let filtroFormato = 'todos';
let filtroMomento = 'todos';

const grid = document.getElementById('materials-grid');
const loading = document.getElementById('loading');
const errorMsg = document.getElementById('error');
const emptyMsg = document.getElementById('empty');

async function init() {
    try {
        const response = await fetch(CSV_URL);
        if (!response.ok) throw new Error('Falha ao buscar dados');
        const csvText = await response.text();
        allMaterials = parseCSV(csvText);
        
        loading.classList.add('hidden');
        render();
    } catch (err) {
        console.error(err);
        loading.classList.add('hidden');
        errorMsg.classList.remove('hidden');
    }
}

function parseCSV(text) {
    const lines = text.split('\n');
    const result = [];
    
    // Pula a primeira linha (cabeçalho)
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;

        // Parser simples de CSV (considerando que não há vírgulas dentro de aspas para simplificar)
        // Se houver vírgulas nos títulos, precisaria de um parser mais robusto
        const [titulo, formato, momento, link] = line.split(',').map(item => item.trim());

        // Validação mínima conforme data-model.md
        if (titulo && formato && momento && link) {
            result.push({ titulo, formato, momento, link });
        }
    }
    return result;
}

function render() {
    grid.innerHTML = '';
    
    const filtered = allMaterials.filter(m => {
        const matchFormato = filtroFormato === 'todos' || m.formato === filtroFormato;
        const matchMomento = filtroMomento === 'todos' || m.momento === filtroMomento;
        return matchFormato && matchMomento;
    });

    if (filtered.length === 0) {
        emptyMsg.classList.remove('hidden');
    } else {
        emptyMsg.classList.add('hidden');
        filtered.forEach(m => {
            const card = createCard(m);
            grid.appendChild(card);
        });
    }
}

function createCard(m) {
    const a = document.createElement('a');
    a.href = m.link;
    a.target = '_blank';
    a.rel = 'noopener';
    a.className = 'card';

    const formatoLabels = {
        'video': '🎥 Vídeo',
        'pdf': '📄 PDF',
        'artigo': '📰 Artigo'
    };

    const momentoLabels = {
        'buscando-vaga': 'Buscando 1ª vaga',
        'preparando-entrevista': 'Preparando entrevista',
        'crescendo-emprego': 'Crescendo no emprego'
    };

    a.innerHTML = `
        <div class="card-title">${m.titulo}</div>
        <div class="card-badges">
            <span class="badge badge-format">${formatoLabels[m.formato] || m.formato}</span>
            <span class="badge badge-momento">${momentoLabels[m.momento] || m.momento}</span>
        </div>
    `;

    return a;
}

// Filtros
document.getElementById('filter-formato').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filter')) {
        updateActiveBtn('filter-formato', e.target);
        filtroFormato = e.target.dataset.value;
        render();
    }
});

document.getElementById('filter-momento').addEventListener('click', (e) => {
    if (e.target.classList.contains('btn-filter')) {
        updateActiveBtn('filter-momento', e.target);
        filtroMomento = e.target.dataset.value;
        render();
    }
});

function updateActiveBtn(containerId, activeBtn) {
    const buttons = document.querySelectorAll(`#${containerId} .btn-filter`);
    buttons.forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
}

init();
