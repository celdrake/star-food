'use strict';


var SERVER_URI = 'http://localhost:8080/';

function initialiseRecipeDetails() {
    var id = getRecipeId();
    var recipeResponse;
    jQuery.get(SERVER_URI + 'recipe/' + id, function onSuccess(recipeDetails) {
        recipeResponse = '<div class="recipe">' +  recipeDetails.name + '</div>';
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

function populateRecipeDetails(response) {
    jQuery('#recipe-details')
        .empty()
        .html(response);
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


