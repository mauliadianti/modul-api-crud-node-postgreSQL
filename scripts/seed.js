const db = require('../db'); 

(async () => {
  try{
    await db('products').insert({products_id : '1234567', name: 'paper', qty: '1000', price: '500', photo: 'img/paper.png'})
    await db('products').insert({products_id : `1234568`, name: 'books', qty: '500', price: '10000', photo: 'img/books.png'})
    await db('products').insert({products_id : `1234569`, name: 'pen', qty: '100', price: '1250', photo: 'img/pen.png'})
    console.log('Added raw products data')
    process.exit(0)
  }catch(err){
    console.log(err)
    process.exit(1)
  }
})()