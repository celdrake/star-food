'use strict';

var recipesDB = [
    {
        'id': 1,
        'name': 'Recipe',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 4
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 2,
        'name': 'Recipe 2',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 3,
        'name': 'Recipe 3',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 4,
        'name': 'Recipe 4',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 5,
        'name': 'Recipe 5',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 6,
        'name': 'Recipe 6',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 7,
        'name': 'Recipe 7',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 8,
        'name': 'Recipe 8',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 9,
        'name': 'Recipe 9',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 10,
        'name': 'Recipe 10',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 11,
        'name': 'Recipe 11',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 12,
        'name': 'Recipe 12',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 13,
        'name': 'Recipe 13',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 14,
        'name': 'Recipe 14',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 15,
        'name': 'Recipe 15',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 16,
        'name': 'Recipe 16',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 17,
        'name': 'Recipe 17',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 18,
        'name': 'Recipe 18',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 19,
        'name': 'Recipe 19',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 20,
        'name': 'Recipe 20',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 21,
        'name': 'Recipe 21',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 22,
        'name': 'Recipe 22',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
    },
    {
        'id': 23,
        'name': 'Recipe 23',
        'cookingTime': {
            'measure': 30,
            'units': 'minutes'
        },
        'ingredients': [
            {
                'name': 'Chicken',
                'quantity': 1
            }
        ],
        'image': 'recipes/lemon_chicken.jpg'
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
