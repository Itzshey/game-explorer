import 'dotenv/config';
const apiKey = process.env.API_KEY;


const API_URL_TRENDING = `https://api.rawg.io/api/games?key=${apiKey}&page_size=9&ordering=-added`;

async function getTrendingGames(){

    const response  = await fetch(API_URL_TRENDING);

    if(!response.ok){
        throw new Error("Failed to load games");
    }
    const data = await response.json();

    return data.results;
}

const trending = await getTrendingGames();

/*
trending.forEach(games => {

    
});
*/