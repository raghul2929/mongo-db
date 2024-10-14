//query
// $eq
// $ne
// $gt
// $lt
// $gte
// $lte
// $in
// $nin
db.emp.find({ename:{$eq:'smith'}})
db.emp.find({ename:{$ne:'smith'}})
db.emp.find({sal:{$gt:2000}})
db.emp.find({sal:{$gte:2000}})
db.emp.find({sal:{$lte:2000}})
db.emp.find({sal:{$lt:2000}})
db.emp.find({ename:{$in:['smith','miller']}})
db.emp.find({ename:{$nin:['smith','miller']}})//
///task
db.emp.find({sal:0})
db.products.find({price:{$gt:2000}})
db.flipcart.find({status:{$ne:'active'}})
///////////////////////////////////////////////////////////////logical operator///////////////////////////////////////////////////////////
// $and
// $or
// $not
// $nor
db.emp.find({$and:[{ename:'smith'},{sal:2000}]})
db.emp.find({$or:[{ename:'smith'},{sal:2000}]})
db.emp.find({$nor:[{ename:'RAGhul'},{sal:200000}]})
db.emp.find({$nor:[{ename:'RAGhul'},{sal:200000}]})
/////////////////////////////////////////////////////////////////arrayoperator///////////////////////////////////////////////////////////////////
$all
$elemMatch
$size
db.emp.find({skills:{$all:['html','css','js']}}) 
 
db.emp.find({skills:{$size:3}})
//////////////////////////////////////////////////////////element query
$exists
$type
db.emp.find({skills:{$exists:true}})
db.emp.find({skills:{$type:'int'}})
//////////////////////////////////////////////s////////////////