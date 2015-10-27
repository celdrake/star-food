var express = require('express');
var app = express();

// Load application modules
var recipes = require('./recipes');
var recipe = require('./recipe');

// Set JSON pretty print
app.set('json spaces', 2);

// Enable CORS requests so that the client application can call the server running on a different port
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});


/**
 *  Route Configuration blocks
 */

// "Recipes" Endpoints
app.get('/recipes', recipes.findAllRecipes);


// "Recipe" Endpoints
app.get('/recipe/:id', recipe.findRecipe);


// Server initialisation
var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Star food server started at http://%s:%s', host, port);
});
