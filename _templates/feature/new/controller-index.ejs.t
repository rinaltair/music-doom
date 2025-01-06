---
to: src/controllers/index.js
inject: true
append: true
---
module.exports.<%= name.toLowerCase() %>Controller = require('./<%= name.toLowerCase() %>.controller');
