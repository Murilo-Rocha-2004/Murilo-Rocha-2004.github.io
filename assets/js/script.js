// Aguardando o carregamento completo
document.addEventListener('DOMContentLoaded', function() {
    
    // SWITCH DE TEMA DARK/LIGHT
    const themeToggle = document.getElementById('theme-toggle');
    const rootEl = document.documentElement; // seleciona o elemento <html>

    // aplica o tema e atualiza o estado
    function applyTheme(theme) {
        // aplica o atributo no <html>
        rootEl.setAttribute('data-theme', theme);

        // switch do tema
        themeToggle.checked = theme === 'dark';

        // guarda o tema no localStorage
        localStorage.setItem('theme', theme);
    }

    // muda o tema quando o switch é alterado
    themeToggle.addEventListener('change', function() {
        // marcado = 'dark' // não marcado = 'light'.
        const selectedTheme = this.checked ? 'dark' : 'light';
        applyTheme(selectedTheme); // aplica o tema selecionado
    });

    // inicializa o tema quando carrega a página
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        // aplica o tema salvo no localStorage
        applyTheme(savedTheme);
    } else {
        // se nao tiver tema salvo, utiliza o tema do sistema operacional
        const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        applyTheme(prefersDarkMode ? 'dark' : 'light');
    }
    // SWITCH DE TEMA DARK/LIGHT (fim)

    // FILTRO DE PROJETOS / Portfolio
    if (document.querySelector('.filter-buttons')) {
        const filterContainer = document.querySelector('.filter-buttons');
        const projectCards = document.querySelectorAll('.project-card');
        const tagCounts = {};
        const allTags = [];
        // coleta e conta tags
        projectCards.forEach(card => {
            const tags = card.querySelectorAll('.project-tags span');
            tags.forEach(tag => {
                const tagName = tag.textContent.trim();
                allTags.push(tagName);
            });
        });
        // conta a quantidade de cada tag
        allTags.forEach(tag => {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
        });
        // cria botão para tags unicas
        const uniqueTags = [...new Set(allTags)].sort();
        let buttonsHTML = `<button class="active" data-filter="all">Todos</button>`;
        uniqueTags.forEach(tag => {
            const count = tagCounts[tag];
            buttonsHTML += `<button data-filter="${tag.toLowerCase()}">${tag} <span class="tag-count">${count}</span></button>`;
        });
        filterContainer.innerHTML = buttonsHTML;
        const dynamicFilterButtons = filterContainer.querySelectorAll('button');
        dynamicFilterButtons.forEach(button => {
            button.addEventListener('click', function() {
                dynamicFilterButtons.forEach(btn => btn.classList.remove('active'));
                this.classList.add('active');
                const filter = this.getAttribute('data-filter').toLowerCase();
                // filtra os cards de projeto
                projectCards.forEach(card => {
                    const tags = card.querySelectorAll('.project-tags span');
                    const tagTexts = Array.from(tags).map(tag => tag.textContent.trim().toLowerCase());
                    // verifica se o card tem a tag selecionada
                    const hasTag = tagTexts.includes(filter);
                    if (filter === 'all' || hasTag) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    // FILTRO DE PROJETOS (fim)
});