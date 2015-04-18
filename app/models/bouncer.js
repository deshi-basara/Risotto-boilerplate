var Waterline = require('waterline');

/**
 * Example waterline-collection for saving banned ip-addresses.
 */
module.exports = Waterline.Collection.extend({
  tableName: 'bouncer',
  schema: true,
  connection: 'redis',
  attributes:{
    iphash: {
      type: 'string',
      required: true
    },
    tries: {
      type: 'integer',
      required: true,
      defaultsTo: 1
    },
    timeout: {
      type: 'integer',
      required: false
    }
  }
});