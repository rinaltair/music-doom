---
to: src/routes/v1/index.js
inject: true
after:   // My Routes


---
  {
    path: '/<%= name.toLowerCase() %>',
    route: <%= name.toLowerCase() %>Route,
  },