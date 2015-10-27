'use strict';

var db = require('./mockDatabase');

function findRecipe(req, res) {
    var id = parseInt(req.params.id, 10);
    if (!id) {
        res.status(400).send('Id is required');
    } else {
        db.findRecipeById(id, function (err, recipe) {
            if (err === null && recipe !== null) {
                // The recipe was found, send it as JSON
                res.send(recipe);
            } else {
                // Error while retrieving the recipe, or it does not exist
                res.status(404).send('Sorry, this recipe doesn\'t exist or may have been removed');
            }
        });
    }
}

module.exports = {
    findRecipe: findRecipe
};
