'use strict';

// This module simulates that we have an existing database.
// I have done this to simplify the development and to make it easy to evaluate
// the different cases.

// Here we have the declarations for the different database statuses given in the features
var emptyRecipeDB = require('./database_empty').database;
var oneRecipeDB = require('./database_one_recipe').database;
var sampleRecipesDB = require('./database_three_recipes').database;


/** Changing this line will change the current database status to the one in the selected module **/
//var currentDB = emptyRecipeDB;
//var currentDB = oneRecipeDB;
var currentDB = sampleRecipesDB;


function mockQueryRecipes(callback) {
    return callback(null, currentDB['recipes']);
}

function mockQueryUsers(callback) {
    return callback(null, currentDB['users']);
}

function mockQueryStarredRecipes(callback) {
    return callback(null, currentDB['starredRecipes']);
}

function findRecipeById(id, callback) {
    var recipes = currentDB['recipes'];
    var recipe = null;
    recipes.forEach(function (recipeElem) {
        if (recipeElem.id === id) {
            recipe = recipeElem;
        }
    });
    return callback(null, recipe);
}

module.exports = {
    findRecipeById: findRecipeById,
    findAllRecipes: mockQueryRecipes,
    starredRecipes: mockQueryStarredRecipes,
    usersDB: mockQueryUsers
};
