import 'dotenv/config';
import express from 'express';

const app = express();
const PORT = 3000;

app.use(express.static('.'));
//Makes the static files available.

app.get('/api/trending', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;

        if (!apiKey) {
            return res.status(500).json({
                error: 'API key not configured'
            });
        }

        const url = new URL('https://api.rawg.io/api/games');
        url.searchParams.set('key', apiKey);
        url.searchParams.set('page_size', '12');
        url.searchParams.set('ordering', '-added');
        

        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'Failed to fetch games from RAWG'
            });
        }

        const data = await response.json();
        res.json(data.results);

    } catch (error) {
        console.error('Error fetching games:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}/home.html`);
});


app.get('/api/search', async (req, res) => {
    try {
        const apiKey = process.env.API_KEY;
        const searchTerm = req.query.search?.trim();

        if (!apiKey) {
            return res.status(500).json({
                error: 'API key not configured'
            });
        }

        if(!searchTerm){
            return res.status(400).json({
                error: 'Search term is required'
            });
        }

        const url = new URL('https://api.rawg.io/api/games');
        url.searchParams.set('key', apiKey);
        url.searchParams.set('search', searchTerm);
        url.searchParams.set('search_precise', true);
        url.searchParams.set('page_size', '12');
        url.searchParams.set('ordering', '-added');


        const response = await fetch(url);

        if (!response.ok) {
            return res.status(response.status).json({
                error: 'Failed to fetch games from RAWG'
            });
        }

        const data = await response.json();
        res.json(data.results);

    } catch (error) {
        console.error('Error searching games:', error);
        res.status(500).json({
            error: 'Internal server error'
        });
    }
});
