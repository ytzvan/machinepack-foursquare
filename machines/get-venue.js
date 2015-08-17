module.exports = {


  friendlyName: 'Get venue',


  description: 'Get a single venue based on ID',


  cacheable: false,


  sync: false,


  inputs: {
    id: {
      description: 'The unique id for a Venue',
      example: '40b28c80f964a5204df81ee3',
      required: true
    },
    client_id: {

      example: 'XYRA11GEUJ0GQSS4APL0VXCI1GZIHVRBQQIR0XB32GIEDUYT',

      description: 'Your Foursquare app CLIENT_ID',

      required: true
    },

    client_secret: {

      example: 'H4JII1UI2AQK5VH4G1CASEN3XWFXM2KTY0OUWVKYZSZERR30',

      description: 'Your Foursquare app CLIENT_SECRET',

      required: true
    }
  },


  exits: {

    success: {
      variableName: 'result',
      description: 'Done.',
    },

  },


  fn: function(inputs, exits) {
    var https = require('https');
    var version = 20130815; //4sq API version
    var client_id = inputs.client_id;
    var client_secret = inputs.client_secret;
    var id = inputs.id;


    var url = "https://api.foursquare.com/v2/venues/"+id+"?client_id="+client_id+"&client_secret="+client_secret+"&v="+version;
    console.log(url);
    https.get(url, function(res) {
      console.log("Got response: " + res.statusCode);
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
    https.get(url, function(res) {
      var data = '';
      res.on("data", function(chunk) {
        data += chunk;
      });
      res.on('end',function(){
          try {
            var obj = JSON.parse(data);
            return exits.success(obj.response);
        } catch (e) {
            return exits.error(e);
        };
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
       return exits.error(e);
    });
  }
};
