const crypto = require('crypto')
const dotenv = require('dotenv')
dotenv.config()
const {img,setupImg} = require('./photo.js')
const db = require('./db.js')

function Token(req){
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]
  if(process.env.TOKEN === token) return 1
  else return 0
}

class products{
  async insertNewProducts (req, res){
    try{
      if(Token(req)){
        img(req, res, async err => {
          if (err instanceof setupImg.MulterError) res.send({error: err})
          else {
            if(!req.file){
              res.send({error: "Wrong file extension"})
              return
            }
            const products_id = crypto.randomBytes(15).toString('hex')
            const result = await db('products')
              .insert({products_id : `${products_id}`, 
              name: req.body.name, 
              qty: req.body.qty , 
              price: req.body.price, 
              photo: req.file.path})
              res.send({message: 'OK'})
          }
        })        
      }else{
        res.send({error: 'Wrong Token'})
      }
    }catch(err){
      res.send({error: 'Server Error' + err})
    }
  }
  
  async getProducts (req, res){
    try{
      if(Token(req)){
        const result = await db.select("*")
          .from('products'); 
         if(result.length === 0) res.send({error: 'No data'}) 
         else{
          res.send({message: result})
         }
      }else{
        res.send({error: 'Wrong Token'})
      }
    }catch(err){
      res.send({error: 'Server Error' + err})
    }
  }

  async getProductsById (req, res){
    try{
      if(Token(req)){
        const result = await db.select("*")
        .from('products').where({products_id : req.params.products_id}); 
          if(result.length === 0) res.send({error: 'No data'}) 
          else{
          res.send({message: result})
          }
      }
      else{
        res.send({error: 'Wrong Token'})
      }
    }catch(err){
      res.send({error: 'Server Error' + err})
    }
  }
  
  async updateProducts (req, res){
    try{
      if(Token(req)){
        if(req.body.name){
          const result = await db('products')
            .where({products_id: req.params.products_id})
            .update({name: req.body.name})
          res.send({message: 'OK'})
        }else if(req.body.qty){
          const result = await db('products')
            .where({products_id: req.params.products_id})
            .update({qty: req.body.qty})
          res.send({message: 'OK'})
        }else if(req.body.price){
          const result = await db('products')
            .where({products_id: req.params.products_id})
            .update({price: req.body.price})
          res.send({message: 'OK'})
        }
      }else{
        res.send({error: 'Wrong Token'})
      }
    }catch(err){
      res.send({error: 'Server Error' + err})
    }
  }

  async deleteProducts (req, res){
    try{
      if(Token(req)){
        const result = await db('products')
          .where({products_id: req.params.products_id})
          .del()
        res.send({message: 'OK'})
      }else{
        res.send({error: 'Wrong Token'})
      }
    }catch(err){
      res.send({error: 'Server Error' + err})
    }
  }

  photo(req,res){
    try{
      if(Token(req)){        
        img(req, res, async err => {
          if (err instanceof setupImg.MulterError) res.send({error: err})
          else {
            if(!req.file){
              res.send({error: "Wrong file extension"})
              return
            }
            const result = await db('products')
              .where({products_id: req.params.products_id})
              .update({photo: req.file.path})
            res.send({message: 'OK'})           
          }
        })        
      }else{
        res.send({error: 'Wrong Token'})
      }  }
    catch(err){
      res.send({error: 'Server Error' + err})
    }
  }

}


module.exports = products