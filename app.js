import express from "express";
import axios from "axios";
import path, { dirname } from 'path';
import { fileURLToPath } from "url";
// import cors from "cors";

const app = express();
const PORT = process.env.PORT || 3001;

// app.use(cors());

const SWIGGY_API_URL = "https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.07480&lng=72.88560";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
console.log(__dirname);

app.use(express.static(path.join(__dirname,'/Swiggy_client/dist')));
app.get("/",(req,res)=> res.sendFile(path.join(__dirname,'/Swiggy_client/dist/index.html')));

app.get("/api/", async (req,res) =>{
    try{
        const response = await axios.get('https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2354111&lng=72.864102&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING',
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                }
            }
        );
        //console.log(response);

        res.json(response.data);

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
});


app.get("/api/fooditem/:id", async (req,res) =>{
    const id = req.params.id;
    try{
        const response = await axios.get(`https://www.swiggy.com/dapi/restaurants/list/v5?lat=19.2354111&lng=72.864102&collection=${id}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                }
            }
        );
        //console.log(response);

        res.json(response.data);

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
});

app.get("/api/restaurant/:id", async (req,res) =>{
    const id = req.params.id;
    try{
        const response = await axios.get(`https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=19.2354111&lng=72.864102&restaurantId=${id}`,
            {
                headers: {
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36"
                }
            }
        );
        //console.log(response);

        res.json(response.data);

    }catch(error){
        console.log(error);
        res.status(500).json({error: "Internal server error"})
    }
});

app.listen(PORT, ()=>{
    console.log(`proxy server running at http://localhost:${PORT}`);
})




