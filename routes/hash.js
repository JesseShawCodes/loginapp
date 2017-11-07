const bcrypt = require('bcryptjs');

var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('bacon', hash));
var hash = bcrypt.hashSync('bacon', 10);
console.log(hash);
console.log(bcrypt.compareSync('not_bacon', hash));