'use strict';


var recipesDB = [
    {
        'id': 1,
        'name': 'Lemon Chicken',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 4
            },
            {
                'name': 'Thyme',
                'quantity': 1,
                'units': 'tsp'
            },
            {
                'name': 'Lemon',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 2,
        'name': 'Basic Burger',
        'cookingTime': {
            'measure': 7,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Burger'
            },
            {
                'name': 'Bun'
            },
            {
                'name': 'Lettuce'
            }
        ],
        'image': 'recipes/basic_burger.jpg'
    }
];
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
