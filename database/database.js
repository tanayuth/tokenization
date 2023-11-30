var loki = require('lokijs')
var db = new loki('tokendb.json')

var tokenCollection = db.addCollection('token', {unique: ['token', 'tokenization']})
tokenCollection.ensureUniqueIndex('token')
tokenCollection.ensureUniqueIndex('tokenization')

tokenCollection.insert([
    {token: '4111-1111-1111-1111', tokenization: 'fvMymE7X0Je1IzMDgWooV5iGBPw0yoFy'},
    {token: '4444-3333-2222-1111', tokenization: 'L4hKuBJHxe67ENSKLVbdIH8NhFefPui2'},
    {token: '4444-1111-2222-3333', tokenization: 'ZA5isc0kVUfvlxTE5m2dxIY8AG76KoP3'}
]);

tokenCollection.on( 'error', (obj) => {
    console.log(`error on ${obj}`)
})

module.exports = tokenCollection