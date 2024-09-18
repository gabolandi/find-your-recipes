import express from "express";
import axios from "axios";

const app = express();
const port = 3000;

const recipes = "https://api.spoonacular.com/recipes/";
const ingredientWidget = "/ingredientWidget.json";
const apiKey = "apiKey=80eb2b5f970c436aa1ae7eb59cc44d6e";
const random = "https://api.spoonacular.com/recipes/random?number=1&";

//Ejemplo https://api.spoonacular.com/recipes/1003464/ingredientWidget.json

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.render("index.ejs")
});

app.post("/random", async (req, res) => {
    
    try {
        const result = await axios.get(random + apiKey);
        const recipeObject = result.data.recipes[0];
        const ingredients = recipeObject.extendedIngredients;        
        res.render("index.ejs", { recipe: recipeObject });
    } catch (err) {
        console.log(err);
        res.render("index.ejs", { recipe: recipeObject })
    }
    
});

app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });
