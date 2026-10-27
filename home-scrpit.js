
const gameList = document.querySelector('#game-list');

async function getTrendingGames() {
    const response = await fetch('/api/trending');

    if (!response.ok) {
        throw new Error('Failed to load games');
    }

    return await response.json();
}

function createGameCard(game) {
    // Card principal
    const card = document.createElement('article');
    card.classList.add('game-cards');

    // Capa
    const cover = document.createElement('img');
    cover.classList.add('game-cover');
    cover.src = game.background_image || '';
    cover.alt = `Cover of ${game.name}`;
    cover.loading = 'lazy';

    cover.addEventListener('error', () => {
        cover.style.display = 'none';
    });

    // Informações do jogo
    const info = document.createElement('div');
    info.classList.add('game-info');

    const basicInfo = document.createElement('div');
    basicInfo.classList.add('game-info-basic');

    const name = document.createElement('h3');
    name.classList.add('game-name');
    name.textContent = game.name;

    const genre = document.createElement('span');
    genre.classList.add('game-genre');
    genre.textContent =
        game.genres?.map(item => item.name).join(', ')
        || 'Genres unavailable';

    basicInfo.append(name, genre);

    // Informações extras
    const extraInfo = document.createElement('div');
    extraInfo.classList.add('game-info-extra');

    const platforms = game.parent_platforms
        ?.map(item => item.platform.name)
        .join(', ') || 'Not available';

    const tags = game.tags
        ?.slice(0, 3)
        .map(item => item.name)
        .join(', ') || 'No tags available';

    addDetail(extraInfo, 'Platforms', platforms);
    addDetail(extraInfo, 'Rating', 
        game.rating != null ? `${game.rating}/5` : 'Not rated'
    );
    addDetail(extraInfo, 'Tags', tags);

    // Link individual para cada jogo
    const detailsLink = document.createElement('a');
    detailsLink.classList.add('details-link');
    detailsLink.href = `about.html?id=${game.id}`;
    detailsLink.textContent = 'Explore game →';

    extraInfo.appendChild(detailsLink);

    info.append(basicInfo, extraInfo);
    card.append(cover, info);

    return card;
}

function addDetail(container, label, value) {
    const title = document.createElement('p');
    title.textContent = label;

    const description = document.createElement('span');
    description.textContent = value;

    container.append(title, description);
}

async function renderTrendingGames() {
    gameList.textContent = 'Loading games...';

    try {
        const games = await getTrendingGames();

        gameList.replaceChildren();

        if (games.length === 0) {
            gameList.textContent = 'No games found.';
            return;
        }

        const cards = games.map(createGameCard);
        gameList.append(...cards);

    } catch (error) {
        console.error('Error loading games:', error);
        gameList.textContent =
            'Could not load games. Please try again later.';
    }
}

renderTrendingGames();
