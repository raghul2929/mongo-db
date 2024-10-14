// schema is a json object that define the structure of the document
//    ❖ It allows you to validate the structure of data. 
//    It is used to specify validation rules for a documents in a human readable format.
// ❖ Schema validation lets you create validation rules for your fields, such as allowed data types
// and value ranges.
// ❖ MongoDB uses a flexible schema model, which means that documents in a collection do
// not need to have the same fields or data types by default.
db.createCollection('chocolates',{
    validator:{
      $jsonSchema:{
        bsonType:'object',
        required:['name','price','descp'],
        properties:{
        name: {
              bsonType:'string',
              description:'the name should be in string'
            },
            price: {
                bsonType:'double',
                description:'the price should be in double'
              },
              descp: {
                bsonType:'string',
                description:'the descp should be in string'
              }
        }
      }
    }
  }
  )
  db.chocolates.insertMany([
  {
    name:'kikat',
    price:5.1,
    descp:'have a break'
  
  },   
  {
        name:'fivestar',
        price:10.1,
        descp:'eat five star do nothing'
  
  },
  {
  name:'sniker',
  price:10.10,
  descp:'hunder can change anything'
  
  }
  ])
  
  db.createCollection('zomato4',{
  validator:{
  $jsonSchema:{
  bsonType:'object',
  required:['orderid','ordername','price','quantity','rating','starters'],
  properties:{
    orderid:{
      bsonType:'number',
      description:'order id must be in number'
    },
    ordername:{
       bsonType:'string',
      description:'ordername must be string'
    },
    price:{
      bsonType:'double',
     description:'price must be in double'
   },
   quantity:{
    bsonType:'number',
    description:'quantity must be in number'
  },
  rating:{
    bsonType:'object',
    required:['rate'],
    properties:{
      rate:{
      bsonType:'double',
      description:'rating must be in double'
      }
    }
  },
  starters:{
  
    bsonType:'array'
  }
  }
  }
  }
  })
  db.zomato4.insertOne({
  orderid:2,
  ordername:'briyani',
  price:150.1,
  quantity:1,
  rating:{
  rate:4.1
  },
  starters:[{hi:1}]
  })
  db.getCollectionInfos({name:collectionname})//to get schema
               //  to modify schema
  
  db.runCommand({
  collMod:'zomato4',
  validator:{
  $jsonSchema:{
  bsonType:'object',
  required:['orderid','ordername','price','quantity','rating'],
  properties:{
    orderid:{
      bsonType:'number',
      description:'order id must be in number'
    },
    ordername:{
       bsonType:'string',
      description:'ordername must be string'
    },
    price:{
      bsonType:['double','number'],
     description:'price must be in double or number'
   },
   quantity:{
    bsonType:'number',
    description:'quantity must be in number'
  },
  rating:{
    bsonType:'object',
    required:['rate'],
    properties:{
      rate:{
      bsonType:'double',
      description:'rating must be in double'
      }
    }
  },
  starters:{
    bsonType:'array',
    items:{
      bsonType:['string','object']
      
    }
    
  }
  }
  }
  }
  })       
  
   db.createCollection('teachers',
    {
      validator:{
        $jsonSchema:{
             bsonType:'object',
             required:['name','id','sub'],
             properties:{
              name:{
                bsonType:'string',
                description:'id must be in string'
              },
              id:{
                bsonType:'number',
                description:'the id must be in number'
              },
               sub:{
                bsonType:'string',
                description:'id must be in string'
              }
  
             }
  
  
        }
  
      }
    }
   )
   db.zomato4.insertOne({
    orderid:2,
    ordername:'briyani',
    price:150.1,
    quantity:1,
    rating:{
      rate:4.1
    },
    starters:[{hi:1}]
      })
   db.getCollectionInfos({name:collectionname})//to get schema
                     //  to modify schema
       
   db.runCommand({
    collMod:'zomato4',
    validator:{
      $jsonSchema:{
        bsonType:'object',
        required:['orderid','ordername','price','quantity','rating'],
        properties:{
          orderid:{
            bsonType:'number',
            description:'order id must be in number'
          },
          ordername:{
             bsonType:'string',
            description:'ordername must be string'
          },
          price:{
            bsonType:['double','number'],
           description:'price must be in double or number'
         },
         quantity:{
          bsonType:'number',
          description:'quantity must be in number'
        },
        rating:{
          bsonType:'object',
          required:['rate'],
          properties:{
            rate:{
            bsonType:'double',
            description:'rating must be in double'
            }
          }
        },
        starters:{
          bsonType:'array',
          items:{
            bsonType:['string','object']
            
          }
          
        }
        }
      }
    }
   }) 
   db.runCommand(
    {
      collMod:'chocolates',
      validator:{
        $jsonSchema:{
          bsonType:'object',
          required:['name','price'],
          properties:{
            name:{
              bsonType:'string',
              description:'name must be in string'
            },
            price:{
              bsonType:'number',
              description:'price'
            }
          }
  
        }
      }
    }
   )
  
//    