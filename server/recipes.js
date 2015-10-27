'use strict';

var db = require('./mockDatabase');

var RECIPES_PER_PAGE = 10;

function findAllRecipes(req, res) {
    // If there are parameters in the query, it will either be page OR filters
    var queryParams = req.query;
    if (queryParams && !queryParams.page) {
        return filterRecipes(req, res);
    }
    // Normal query for all the recipes. The "page" parameter can be specified in the URL
    db.findAllRecipes(function (err, recipes) {
        if (err === null && recipes.length > 0) {
            var recipesNumber = recipes.length;
            var recipeResult;
            if (recipesNumber < 10) {
                // Results fit a single page, so no need to paginate
                recipeResult = recipes;
            } else {
                // Results fit a single page, so we will paginate the response
                var page = parseInt(req.query.page || 0, 10);
                var pageStart = page * RECIPES_PER_PAGE;
                var pageEnd = pageStart + RECIPES_PER_PAGE;
                recipeResult = recipes.slice(pageStart, pageEnd);
            }
            res.send({
                totalResults: recipes.length, // return the unfiltered number of recipes
                recipes: recipeResult
            });
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
            // Add recipes that are valid for all the request filters
            recipes.forEach(function (recipe) {
                if (isValidForFilter(recipe, req.query)) {
                    filteredRecipes.push(recipe);
                }
            });
            // Check if there is at least one valid recipe for the given filters
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
    // "Parallel if-statements" would allow for multiple filters simultaneously
    var isValid = true;
    if (queryParams.name) {
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
        // Transform the values into minutes before comparing them
        var timeInMinutes = getTimeInMinutes(recipe.cookingTime.measure, recipe.cookingTime.units);
        var maxMinutes = getTimeInMinutes(parseInt(queryParams.maxCookingTime, 10), queryParams.units);
        isValid = isValid && timeInMinutes <= maxMinutes;
    }
    // "false" is a valid value
    if (queryParams.starred !== undefined) {
        // Mock user authentication
        var currentUserId = 1;
        isValid = isValid && isRecipeStarredBy(recipe, currentUserId, queryParams.starred);
    }
    return isValid;
}

function getTimeInMinutes(measure, units) {
    var multiplierToMinutes;
    switch (units) {
        case 'hours':
            multiplierToMinutes = 60;
            break;
        case 'days':
            multiplierToMinutes = 24 * 60;
            break;
        case 'minutes':
        default:
            // Values which don't have units are considered to be entered as minutes
            multiplierToMinutes = 1;
            break;
    }
    return measure * multiplierToMinutes;
}

function isRecipeStarredBy(recipe, userId, starred) {
    if (!recipe.starredBy) {
        return starred === 'false';
    }
    // Validate for the case of filtering for starred or unstarred recipes (xor but without using the operator)
    var userHasStarred = recipe.starredBy.indexOf(userId) !== -1;
    return (userHasStarred && starred === 'true') || (!userHasStarred && starred === 'false');
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
