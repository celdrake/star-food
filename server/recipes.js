'use strict';

var db = require('./mockDatabase');

var RECIPES_PER_PAGE = 10;

function findAllRecipes(req, res) {

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

module.exports = {
    findAllRecipes: findAllRecipes
};
