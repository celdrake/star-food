'use strict';

var db = require('./mockDatabase');

function findRecipe(req, res) {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        res.status(400).send('Recipe id is required');
    } else {
        db.findRecipeById(id, function (err, recipe) {
            if (err === null && recipe !== null) {
                // The recipe was found, send it as JSON
                res.send(recipe);
            } else {
                // Error while retrieving the recipe, or it does not exist
                res.status(404).send('Sorry, this recipe doesn\'t exist or may have been removed');
            }
        });
    }
}

function star(req, res) {
    var userId = validateUser(req);
    var recipeId = parseInt(req.params.id, 10);
    db.findRecipeById(recipeId, function (err, recipe) {
        if (err === null && recipe !== null) {
            // The recipe was found, star it for given user
            updateStarredRecipe(recipe, userId);
            res.status(204).send('');
        } else {
            // Error while retrieving the recipe, or it does not exist
            res.status(404).send('Sorry, this recipe doesn\'t exist or may have been removed');
        }
    });
}

function unstar(req, res) {
    var userId = validateUser(req);
    var recipeId = parseInt(req.params.id, 10);
    db.findRecipeById(recipeId, function (err, recipe) {
        if (err === null && recipe !== null) {
            // The recipe was found, unstar it for given user
            unstarRecipe(recipe, userId);
            res.status(204).send('');
        } else {
            // Error while retrieving the recipe, or it does not exist
            res.status(404).send('Sorry, this recipe doesn\'t exist or may have been removed');
        }
    });
}

function validateUser(req) {
    var userId = parseInt(req.query.userId, 10);
    if (!userId) {
        throw new Error('User required for unstarring a recipe');
    }
    // Assume the user has been authenticated
    return userId;
}

// Functions that would belong in the Model class Recipe
function updateStarredRecipe(recipe, userId) {
    if (!recipe.starredBy) {
        recipe.starredBy = [];
    }
    // Verify that the user did not star the recipe yet
    if (recipe.starredBy.indexOf(userId) === -1) {
        recipe.starredBy.push(userId);
    }
}

function unstarRecipe(recipe, userId) {
    if (!recipe.starredBy) {
        return;
    }
    // Verify that the user did star the recipe
    var userIdx = recipe.starredBy.indexOf(userId);
    if (userIdx !== -1) {
        recipe.starredBy.splice(userIdx, 1);
    }
}

module.exports = {
    findRecipe: findRecipe,
    star: star,
    unstar: unstar
};
