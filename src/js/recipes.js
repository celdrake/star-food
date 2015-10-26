'use strict';


var SERVER_URI = 'http://localhost:8080/';


function initialiseRecipeList() {
    fillAllRecipes();
}

function fillAllRecipes() {
    var recipesResponse = '';
    jQuery.get(SERVER_URI + 'recipes', function onSuccess(recipes) {
        if (recipes.length === 1) {
            // TODO check
            window.location.href = 'recipe.html?id=' + recipes[0].id;
            return;
        }
        var recipeElems = [];
        recipes.forEach(function (recipe) {
            var attrId = 'recipe-' + recipe.id;
            var a = '<a class="recipe__link" href="recipe.html?id=' + recipe.id + '">' + 'View Details ➤' + '</a>';
            var name = '<span class="recipe__name">' + recipe.name + '</span>';
            var elem = jQuery('<div class="recipe" data-id="' + attrId + '"></div>')
                .append(name).append(a);
            recipeElems.push(elem);
        });
        recipesResponse = recipeElems;
    }).fail(function(err) {
        recipesResponse = err.responseText;
    }).always(function () {
        populateRecipeList(recipesResponse);
    });
}

function populateRecipeList(data) {
    jQuery('#recipes-list')
        .empty()
        .html(data);
}


initialiseRecipeList();


