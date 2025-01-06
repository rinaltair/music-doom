---
to: src/models/<%= name.toLowerCase() %>.model.js
---
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const <%= name.toLowerCase() %>Schema = mongoose.Schema(
  {
    // Create your model here
    // name: {
    //   type: String,
    //   required: true,
    //   trim: true,
    // },
      },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
<%= name.toLowerCase() %>Schema.plugin(toJSON);
<%= name.toLowerCase() %>Schema.plugin(paginate);

const <%= name %> = mongoose.model('<%= name %>', <%= name.toLowerCase() %>Schema);

module.exports = <%= name %>;


