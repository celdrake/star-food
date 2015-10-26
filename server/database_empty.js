'use strict';


var recipesDB = [];
var usersDB = [];
var starredRecipes = [];

var DB = {
    'users': usersDB,
    'starredRecipes': starredRecipes,
    'recipes': recipesDB
};

module.exports = {
    database: DB
};
