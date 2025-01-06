---
to: src/services/index.js
inject: true
before: // Non Contorller

---
module.exports.<%= name.toLowerCase() %>Service = require('./<%= name.toLowerCase() %>.service');