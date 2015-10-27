'use strict';

var db = require('./mockDatabase');

var RECIPES_PER_PAGE = 10;

function findAllRecipes(req, res) {
    // If there are parameters in the query, it will either be page OR filters
    var queryParams = req.query;
    if (queryParams && !queryParams.page) {
        return filterRecipes(req, res);
    }
    db.findAllRecipes(function (err, recipes) {
        if (err === null && recipes.length > 0) {
            var recipesNumber = recipes.length;
            if (recipesNumber < 10) {
                // Return a single page with all the recipes
                res.send({
                    totalResults: recipes.length,
                    recipes: recipes
                });
            } else {
                // Paginate response
                var page = parseInt(req.query.page || 0, 10);
                var pageStart = page * RECIPES_PER_PAGE;
                var pageEnd = pageStart + RECIPES_PER_PAGE;
                res.send({
                    totalResults: recipes.length,
                    recipes: recipes.slice(pageStart, pageEnd)
                });
            }
        } else {
            // Error while retrieving the recipes, or none exists
            res.status(404).send('Sorry, we currently have no recipes for you');
        }
    });
}

function filterRecipes(req, res) {
    db.findAllRecipes(function (err, recipes) {
        var filteredRecipes = [];
        if (err === null) {
            recipes.forEach(function (recipe) {
                if (isValidForFilter(recipe, req.query)) {
                    filteredRecipes.push(recipe);
                }
            });
            if (filteredRecipes.length > 0) {
                res.send({
                    totalResults: filteredRecipes.length,
                    recipes: filteredRecipes
                });
            } else {
                // No filters validate any of the recipes
                res.status(404).send('Sorry, nothing matched your filter term');
            }

        } else {
            // Error while retrieving the recipes
            res.status(404).send('Sorry, we currently have no recipes for you');
        }
    });
}

function isValidForFilter(recipe, queryParams) {
    // Allows for multiple filters simultaneously
    var isValid = true;
    if (queryParams.name) {
        console.log('name', queryParams.name);
        isValid = isValid && hasFilterValue(recipe.name, queryParams.name);
    }
    if (queryParams.ingredient) {
        // Check if any of the recipe ingredients names match the filter
        var hasFilteredIngredient = false;
        recipe.ingredients.forEach(function (ingredient) {
            if (hasFilterValue(ingredient.name, queryParams.ingredient)) {
                hasFilteredIngredient = true;
            }
        });
        isValid = isValid && hasFilteredIngredient;
    }
    if (queryParams.maxCookingTime) {
        // Check in minutes the limit of the filter for the cooking time
        var timeInMinutes = getTimeMinutes(recipe.cookingTime.measure, recipe.cookingTime.units);
        var maxMinutes = getTimeMinutes(parseInt(queryParams.maxCookingTime, 10), queryParams.units);
        isValid = isValid && timeInMinutes <= maxMinutes;
    }
    return isValid;
}

function getTimeMinutes(measure, units) {
    var multiplierToMinutes;
    switch (units) {
        case 'hours':
            multiplierToMinutes = 60;
            break;
        case 'days':
            multiplierToMinutes = 24 * 60;
            break;
        // If the units are not specified, minutes are assumed
        case 'minutes':
        default:
            multiplierToMinutes = 1;
            break;
    }
    return measure * multiplierToMinutes;
}

function hasFilterValue(recipeField, filterValue) {
    // Performs a string validation checking both fields as an UPPERCASE
    var filterUpper = filterValue.toUpperCase();
    return recipeField.toUpperCase().indexOf(filterUpper) !== -1;
}

module.exports = {
    findAllRecipes: findAllRecipes,
    filterRecipes: filterRecipes
};
