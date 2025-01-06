---
to: src/models/index.js
inject: true
append: true
---
module.exports.<%= name %> = require('./<%= name.toLowerCase() %>.model');