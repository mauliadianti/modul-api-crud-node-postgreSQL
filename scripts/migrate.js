const db = require('../db.js'); 

(async () => {
  try{
    await db.schema.dropTableIfExists('products')
    await db.schema.withSchema('public').createTable('products', (table) => {
      table.string('products_id')
      table.string('name')
      table.string('qty')
      table.string('price')
      table.string('photo')
    })
    console.log('Create table products success')
    process.exit(0)
  }catch(err){
    console.log(err)
    process.exit(1)
  }
})()

