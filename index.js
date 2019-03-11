const qrcode = require('qrcode');
const generatePayload = require('promptpay-qr');
const axios = require('axios');
var users = [];

module.exports = function (context, cb) {
  users = JSON.parse(context.secrets.users);
  var amount = context.secrets.amount;

  // Create QR Code 
  const payload = generatePayload(context.secrets.promptpayId, { amount });
  var options = { type: 'png', color: { dark: '#003b6a', light: '#f7f8f7' } }
  new Promise((resolve, reject) => {
    qrcode.toString(payload, options, (err, svg) => {
      if (err) return reject(err)
      resolve(svg)
    })
  })
  .then(function (png) {
    // Send qr code to users
    users.forEach(function(element) {
      // Get users DM channel
      axios.post('https://discordapp.com/api/v6/users/@me/channels', {'recipient_id': element}, {
        headers: {
          'Authorization': 'Bot ' + context.secrets.botId,
          'Content-Type': 'application/json'
        }
      })
      .then(function (res) {
        
        // Sned content to users DM channel
        if (res.data && res.data.id) {
          axios.post('https://discordapp.com/api/v6/channels/' + res.data.id + '/messages', {
            "content": "Netflix monthly 100 Baht.",
            "embed": {
              "title": "Netflix",
              "url": "https://discordapp.com",
              "color": 9895936,
              "image": {
                "url": context.secrets.promptpayQr
              },
              "fields": [
                {
                  "name": "Promptpay",
                  "value": context.secrets.promptpayId,
                  "inline": true
                },
                {
                  "name": "Value (Baht)",
                  "value": "100",
                  "inline": true
                }
              ]
            }
          },
          {
            headers: {
              'Authorization': 'Bot ' + context.secrets.botId,
              'Content-Type': 'application/json'
            }
          });
        }
      });
    });
    
    cb();
  });
  
  
}