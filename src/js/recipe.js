'use strict';


var SERVER_URI = 'http://localhost:8080/';

function initialiseRecipeDetails() {
    var id = getRecipeId();
    var recipeResponse;
    jQuery.get(SERVER_URI + 'recipe/' + id, function onSuccess(recipeDetails) {
        recipeResponse = createRecipeDetails(recipeDetails);
        addRecipeImage();
    }).fail(function(err) {
        recipeResponse = err.responseText;
    }).always(function () {
        populateRecipeDetails(recipeResponse);
    });

}

function addRecipeImage() {
    // TODO
    // TODO CATEGORY, ADD DIFFERENT COLOR
}

function createRecipeDetails(recipe) {
    var ingredients = recipe.ingredients.map(function (ing) {
        return ing.name;
    });

    var recipeElem;
    recipeElem =
    '<div class="recipe-detail-container">' +
        '<div class="recipe-details">' +
            '<div class="recipe-details__title">' +  recipe.name + '</div>' +
            '<div class="recipe-details__cooking"><div class="tag">Cooking time</div>' + '<span class="test">' +  recipe.cooking_time.measure + '</span></div>' +
            '<div class="recipe-details__ingredients"><div class="tag">Ingredients</div>' + '<span class="test">' + ingredients + '</span></div>' +
        '</div>' +
    '</div>';
    return jQuery(recipeElem).prepend('<img class="recipe-image" src="../images/test.png"/>');
}

function populateRecipeDetails(data) {
    jQuery('#recipe-details')
        .empty()
        .html(data);
}

function getRecipeId() {
    var pageUrl = decodeURIComponent(window.location.search.substring(1));
    var urlVariables = pageUrl.split('&');
    for (var i = 0; i < urlVariables.length; i++) {
        var parameterName = urlVariables[i].split('=');
        if (parameterName[0] === 'id') {
            return parameterName[1] === undefined ? true : parameterName[1];
        }
    }
}

initialiseRecipeDetails();


