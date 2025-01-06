---
to: src/validations/index.js
inject: true
append: true
---
module.exports.<%= name.toLowerCase() %>Validation = require('./<%= name.toLowerCase() %>.validation');
