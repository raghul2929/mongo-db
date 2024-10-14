            //    data modelling
//             Most Important topic in database.
// ❖ Data modeling is the process of defining how data is stored and what relationships exist between different
// entities in our data.
// ❖ It aims to visually represent the relationship between different entities in data
// Advantages:
// ❖ Easier to manage data.
// ❖ Less memory.
// ❖ Easily we can query on data.
// ❖ Less cost.
// Types of Data Model
// 1. Embedded Data Model
// 2. Reference Data Model 
// 1. Embedded Data Model
// It capture relationships between data by storing related data in a single document structure.
// ❖ It is in single structure.
// ❖ It is also called denormalized model.
// ❖ Can store only 16MB document.
// ❖ It leads duplication of data.
// 2. Reference Data Model 
// ❖ References store relationships between data by including links, called references, from one document to
// another.
// ❖ This is the most widely used modeling.
// ❖ Here we need more than one document to store data either in same collection or different collection
    // ============================================================================  
            
               //relation ship
        

 // c1 student
 //c2 student address
 db.createCollection('student')
 db.createCollection('studentAddress')
 db.student.insertOne({
     name:'raghul',
     age:20,
     course:"mernstack"
 })
 db.studentAddress.insertOne({
  address:{
    street:"micolayout",
    city:'baangalore',
    state:'karnataka'
 }
})
db.student.updateOne({name:'raghul'},{$set:{nativeplace:ObjectId('66eaa4018fad764b932710bd')}})
db.student.aggregate(
  {
    $lookup:{
      from:"studentAddress",
      localField:"nativeplace",
      foreignField:"_id",
      as:"nativeplace"
    }
  }
)
db.student.aggregate(
  {
    $lookup:{
      from:"studentAddress",
      localField:"nativeplace",
      foreignField:"_id",
      as:"nativeplace"

    }
  }
)
db.student.aggregate([
  {
    $lookup: {
      from: "studentAddress",
      localField: "nativeplace",
      foreignField: "_id",
      as: "nativeplace"
    }
  }
])
// onetomany
db.createCollection('land')
db.createCollection('owners')
db.land.insertOne({
  acres:6,
  price:900000,
})
db.owners.insertMany([{
  name:'raghul',
  amount:300000
},{
  name:'dharani',
  amount:300000
},{
  name:'sai',
  amount:300000
}])
db.land.updateOne({acres:6},{$set:{owners:[ ObjectId('66ead6a38fad764b932710bf'),
   ObjectId('66ead6a38fad764b932710c0'),
   ObjectId('66ead6a38fad764b932710c1')]}})
db.land.aggregate(
  {
    $lookup:{
      from:"owners",
      localField:"owners",
      foreignField:"_id",
      as:"owners"
    }
  }
)
///many to many
db.createCollection('books')
db.createCollection('aurthors')

db.books.insertMany([{
  name:'mongodb',
  price:300
},{
  name:'nodejs',
  price:500
},{
  name:'reactjs',
  price:600
}])
db.aurthors.insertMany([{
  aurthorname:'raghul',
  version:1
},{
  aurthorname:'dharani',
  version:2
},{
  aurthorname:'jakir',
version:3
}])
//books
db.books.updateOne({name:'mongodb'},{$set:{aurthors:[ ObjectId('66ec154e5224f601532710ce'), ObjectId('66ec154e5224f601532710cf')]}})
db.books.updateOne({name:'nodejs'},{$set:{aurthors:[ ObjectId('66ec154e5224f601532710d0'), ObjectId('66ec154e5224f601532710cf')]}})
db.books.updateOne({name:'reactjs'},{$set:{aurthors:[ ObjectId('66ec154e5224f601532710ce'), ObjectId('66ec154e5224f601532710d0')]}})

db.books.aggregate({
  $lookup:{
    from:'aurthors',
    localField:'aurthors',
    foreignField:'_id',
    as:'aurthors'
  }
})
//aurthors
db.aurthors.updateOne({aurthorname:'raghul'},{$set:{books:[ObjectId('66ec154d5224f601532710cb'),ObjectId('66ec154d5224f601532710cc')]}})
db.aurthors.updateOne({aurthorname:'dharani'},{$set:{books:[ObjectId('66ec154d5224f601532710cd'),ObjectId('66ec154d5224f601532710cc')]}})
db.aurthors.updateOne({aurthorname:'jakir'},{$set:{books:[ObjectId('66ec154d5224f601532710cb'),ObjectId('66ec154d5224f601532710cd')]}})
db.aurthors.aggregate([{
  $lookup:{
    from:'books',
    localField:'books',
    foreignField:'_id',
    as:'books'
  }
}])
 ObjectId('66ec18245224f601532710d1'),
 ObjectId('66ec18245224f601532710d2'),
 ObjectId('66ec18245224f601532710d3')


 //one to one
 db.createCollection('person')
 db.createCollection('address')

 db.person.insertOne({
  name:'dharani',
  age:22
 })
 
 db.address.insertMany([
   {
    street:'micolayout',
    city:'karnataka',
    pin:560007
  },
  {
    street:'micolayout',
    city:'karnataka',
    pin:560007
  }
 ])
 
 db.person.updateOne({name:'dharani'},{$set:{native:[ ObjectId('670a7e50e39a4be4a72710ce'),ObjectId('670a7e50e39a4be4a72710cf')]}})
 db.person.aggregate({
  $lookup:{
        from:'address',
        localField:'native',
        foreignField:'_id',
        as:'native'
  }
 })

db.createCollection('books')
db.createCollection('aurthors')
db.books.insertMany([{
  name:'mongodb',
  price:300
},{
  name:'nodejs',
  price:500
},{
  name:'reactjs',
  price:600
}])
db.aurthors.insertMany([{
  aurthorname:'raghul',
  version:1
},{
  aurthorname:'dharani',
  version:2
},{
  aurthorname:'jakir',
version:3
}])
db.books.updateOne({name:'mongodb'},{$set:{authors:[author1,author2]}})
db.books.updateOne({name:'nodejs'},{$set:{authors:[author2,author3]}})
db.books.updateOne({name:'reactjs'},{$set:{authors:[author1,author3]}})

db.authors.updateone({authuorname:'raghul'},{$set:{books:[book1,book2]}})
db.authors.updateone({authuorname:'dharani'},{$set:{books:[book2,book3]}})
db.authors.updateone({authuorname:'jahir'},{$set:{books:[book2,book1]}})
db.books.aggregate({
  $lookup:{
     from:'autour',
     localField:'',
     foreignField:'',
     as:''
  }
}
)
db.books.aggregate({
  $lookup:{
     from:'autour',
     localField:'',
     foreignField:'',
     as:''
  }
}
)