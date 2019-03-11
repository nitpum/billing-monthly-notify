const qrcode = require('qrcode');
const generatePayload = require('promptpay-qr');
const axios = require('axios');
var users = [];
module.exports = function (context, cb) {
  users = JSON.parse(context.secrets.users);
  var amount = context.secrets.amount;
  console.log(users);

  const payload = generatePayload(context.secrets.promptpayId, { amount });
  var options = { type: 'png', color: { dark: '#003b6a', light: '#f7f8f7' } }
  new Promise((resolve, reject) => {
    qrcode.toString(payload, options, (err, svg) => {
      if (err) return reject(err)
      resolve(svg)
    })
  })
  .then(function (png) {
    
    users.forEach(function(element) {
      axios.get('https://discordapp.com/api/v6/users/@me/channels', {
        headers: {
          'Authorization': 'Bot ' + context.secrets.botId,
          'Content-Type': 'application/json',
          'recipient_id': element
        }
      })
      .then(function (res) {
        console.log(res);
      });
    
    });
    
    cb();
  });
  
  
}