require("dotenv").config();
const express = require("express"); // import du package express
const app = express(); // création du serveur
const cors = require("cors");
app.use(express.json());
app.use(cors());
const axios = require("axios");

//ROUTE POUR AFFICHER LA LISTE DES COMICS

app.get("/comics", async (req, res) => {
  try {
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics?apiKey=${process.env.API_KEY}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE POUR AFFICHER LA LISTE DES PERSONNAGES
app.get("/characters", async (req, res) => {
  try {
    const name = req.query.name || "";
    const response = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/characters/?apiKey=${process.env.API_KEY}&name=${name}`
    );
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ROUTE POUR AFFICHER LA LISTE DES COMICS D'UN SEUL PERSONNAGE
app.get("/comics/:characterId", async (req, res) => {
  try {
    const comics = await axios.get(
      `https://lereacteur-marvel-api.herokuapp.com/comics/${req.params.characterId}?apiKey=${process.env.API_KEY}`
    );
    console.log(comics.data);
    res.json(comics.data);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

app.all("*", (req, res) => {
  return res.status(404).json("Cette route n'existe pas");
});

app.listen(process.env.PORT, () => {
  // Mon serveur va écouter le port 3000
  console.log("Server has started"); // Quand je vais lancer ce serveur, la callback va être appelée
});
