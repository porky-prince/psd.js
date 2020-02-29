const _ = require('lodash');

_([1, 2, 3])
    .tap(function (array) {
// Mutate input array.
        array.pop();
    })
    .reverse()
    .value();
// => [2, 1]


var object = {
    'a': [{'b': 2}, {'d': 4}]
};

var other = {
    'a': [{'c': 3}, {'e': 5}]
};

_.merge(object, other);
// => { 'a': [{ 'b': 2, 'c': 3 }, { 'd': 4, 'e': 5 }] }


_.last([1, 2, 3]);
// => 3


var objects = [{ 'a': 1 }, { 'b': 2 }];

var shallow = _.clone(objects);
console.log(shallow[0] === objects[0]);
// => true


_.flatten([1, [2, [3, [4]], 5]]);
// => [1, 2, [3, [4]], 5]


_.some([null, 0, 'yes', false], Boolean);
// => true


_.reduce([1, 2], function(sum, n) {
    return sum + n;
}, 0);
// => 3