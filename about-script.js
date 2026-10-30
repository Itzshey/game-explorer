function createGameInfo(game){

    
    const header = document.createElement('header');

    const coverImg = document.createElement('img');
    coverImg.classList.add('main-image');
    coverImg.src = game.background_image || '';
    coverImg.alt = `Cover of ${game.name}`;
    coverImg.loading = 'lazy';

    header.appendChild(coverImg);

  
    const main = document.createElement('main');
    main.classList.add('game-details');

    const gameContent = document.createElement('section');
    gameContent.classList.add('game-content');

    const mainTitle = document.createElement('div');
    mainTitle.classList.add('main-title');

    const title = document.createElement('h1');
    title.textContent = game.name;

    const controllerIcon = document.createElement('span');
    controllerIcon.classList.add('controler-icon');

    const svgNS = 'http://www.w3.org/2000/svg';

    const svg = document.createElementNS(svgNS, 'svg');

    svg.setAttribute('xmlns', svgNS);
    svg.setAttribute('width', '64');
    svg.setAttribute('height', '64');
    svg.setAttribute('viewBox', '0 0 24 24');
    svg.setAttribute('fill', 'none');
    svg.setAttribute('stroke', 'currentColor');
    svg.setAttribute('stroke-width', '1.75');
    svg.setAttribute('stroke-linecap', 'round');
    svg.setAttribute('stroke-linejoin', 'round');

    const line1 = document.createElementNS(svgNS, 'line');
    line1.setAttribute('x1', '6');
    line1.setAttribute('x2', '10');
    line1.setAttribute('y1', '11');
    line1.setAttribute('y2', '11');

    const line2 = document.createElementNS(svgNS, 'line');
    line2.setAttribute('x1', '8');
    line2.setAttribute('x2', '8');
    line2.setAttribute('y1', '9');
    line2.setAttribute('y2', '13');

    const line3 = document.createElementNS(svgNS, 'line');
    line3.setAttribute('x1', '15');
    line3.setAttribute('x2', '15.01');
    line3.setAttribute('y1', '12');
    line3.setAttribute('y2', '12');

    const line4 = document.createElementNS(svgNS, 'line');
    line4.setAttribute('x1', '18');
    line4.setAttribute('x2', '18.01');
    line4.setAttribute('y1', '10');
    line4.setAttribute('y2', '10');

    const path = document.createElementNS(svgNS, 'path');
    path.setAttribute(
    'd',
    'M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z'
    );

    svg.append(line1, line2, line3, line4, path);
    controllerIcon.appendChild(svg);
    title.appendChild(controllerIcon);
    mainTitle.appendChild(title);
    

    const gameDescription = document.createElement('section');
    gameDescription.classList.add('game-description');
    

    const aboutGameTitle = document.createElement('h3');
    aboutGameTitle.textContent = "About the game";
    const aboutGame = document.createElement('p');
    aboutGame.id = 'about-desc';
    aboutGame.textContent = game.description || 'Description unavailable.';
    const requirementsTitle = document.createElement('h3');
    requirementsTitle.textContent = "Requirements";
    const requirements = document.createElement('p');
    requirements.id = 'about-req';
    requirements.textContent = game.requirements;

    gameDescription.append(
        aboutGameTitle,
        aboutGame,
        requirementsTitle,
        requirements
    );

    gameContent.append(mainTitle, gameDescription);

    const sidebar = document.createElement('aside');
    sidebar.classList.add('sidebar');

    const infoCard = document.createElement('div');
    infoCard.classList.add('info-card');

    const secImg = document.createElement('img');
    secImg.classList.add('img-sec');
    secImg.src = game.background_image || '';
    secImg.alt = `Cover of ${game.name}`;
    secImg.loading = 'lazy';

    const gameInformation = document.createElement('h2');
    gameInformation.textContent = "Game Information";

    const platforms = createInfoItem(
    'Platforms',
    game.platforms?.map(p => p.platform.name).join(', ')
    );

    const releaseDate = createInfoItem(
    'Release date',
    game.released
    );

    const publisher = createInfoItem(
        'Publisher',
        game.publishers?.map(p => p.name).join(', ')
    );

    const developer = createInfoItem(
        'Developer',
        game.developers?.map(d => d.name).join(', ')
    );

    const genre = createInfoItem(
        'Genre',
        game.genres?.map(g => g.name).join(', ')
    );

    infoCard.append(
    secImg,
    gameInformation,
    platforms,
    releaseDate,
    publisher,
    developer,
    genre
    );

    sidebar.appendChild(infoCard);

    const backLink = document.createElement('a');
    backLink.href = 'home.html';
    backLink.classList.add('back-link');

    const arrow = document.createElement('span');
    arrow.setAttribute('aria-hidden', 'true');
    arrow.innerHTML = '&larr;';

    backLink.append(arrow, ' Back to Home');

    sidebar.appendChild(backLink);
   
    main.append(gameContent, sidebar);

    document.querySelector('header')?.remove();
    document.querySelector('main.game-details')?.remove();

    document.body.append(header, main);

}

function createInfoItem(title, value) {

    const infoItem = document.createElement('div');
    infoItem.classList.add('info-item');

    const infoTitle = document.createElement('h3');
    infoTitle.textContent = title;

    const infoValue = document.createElement('p');
    infoValue.textContent = value || 'Not available';

    infoItem.append(infoTitle, infoValue);

    return infoItem;
}