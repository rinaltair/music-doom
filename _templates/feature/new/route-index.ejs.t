---
to: src/routes/v1/index.js
inject: true
before: const config = require('../../config/config');

---
const <%= name.toLowerCase() %>Route = require('./<%= name.toLowerCase() %>.route');
