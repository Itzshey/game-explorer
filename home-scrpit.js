const searchInput = document.getElementById('game-search');
const gameList = document.querySelector('#game-list');

async function getTrendingGames() {
    const response = await fetch('/api/trending');

    if (!response.ok) {
        throw new Error('Failed to load games');
    }

    return await response.json();
}

async function getSearchedGame(searchTerm) {
    if (!searchTerm) {
        return [];
    }

    const url = `/api/search?search=${encodeURIComponent(searchTerm)}`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Failed to load games');
    }

    return await response.json();
}


function createGameCard(game) {

    const card = document.createElement('article');
    card.classList.add('game-cards');

 
    const cover = document.createElement('img');
    cover.classList.add('game-cover');
    cover.src = game.background_image || '';
    cover.alt = `Cover of ${game.name}`;
    cover.loading = 'lazy';

    cover.addEventListener('error', () => {
        cover.style.display = 'none';
    });

  
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


async function renderSearchedGame(searchTerm) {
    gameList.textContent = 'Searching games...';

    try {
        const searchResult = await getSearchedGame(searchTerm);

        gameList.replaceChildren();

        if (searchResult.length === 0) {
            gameList.textContent = 'No games found.';
            return;
        }

        const cards = searchResult.map(createGameCard);
        gameList.append(...cards);

    } catch (error) {
        console.error('Error searching games:', error);

        gameList.textContent =
            'Could not load games. Please try again later.';
    }
}

searchInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        event.preventDefault();

        const searchTerm = searchInput.value.trim();

        if (searchTerm) {
            renderSearchedGame(searchTerm);
        }
    }
});

renderTrendingGames();


