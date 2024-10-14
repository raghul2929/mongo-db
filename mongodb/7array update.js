// /ARRAY UPDATE OPERATORS
$
// $[]
$[identifier]
operation. 
// ❖ SYNTAX:  { <update operator>: { "<array>.$[<identifier>]" : value } }, 
// { arrayFilters: [ { <identifier>: <condition> } ] } 
$pop
$push
$Pull
$each
$addtoset

db.person.insertMany([{
    name:'vignesh',
    age:22,
    empno:35462,
    gender:'male',
    address:{
        city:'bangalore',
        state :'karnatka'
    }[
        {comapny:'accenture',duration:4},
        {comapny:'ibm',duration:5},
        {comapny:'samsung',duration:4},
        {comapny:'google',duration:4}
    ]
},
{
    name:'rabi',
    age:22,
    empno:35463,
    gender:'male',
    address:{
        city:'btm',
        state :'karnatka'
    }[
        {comapny:'google',duration:5},
        {comapny:'wibro',duration:1},
        {comapny:'hcl',duration:7},
        {comapny:'juspay',duration:6}
    ]
},
{
    name:'anand',
    age:22,
    empno:35466,
    gender:'female',
    address:{
        city:'madivala',
        state :'karnatka'
    }[
        {comapny:'apple',duration:7},
        {comapny:'black rock',duration:2},
        {comapny:'tyss',duration:1},
        {comapny:'alpa',duration:3}
    ]
},
{
    name:'suraj',
    age:23,
    empno:35473,
    gender:'male',
    address:{
        city:'hebbal',
        state :'karnatka'
    },
    experience:[
        {comapny:'infosys',duration:4},
        {comapny:'zoho',duration:2 },
        {comapny:'fossil',duration:7},
        {comapny:'tyss',duration:7}
    ]
}
])
$//condition staisfies once thanm it updatedonely one feild it iss condition is skip other if its is true also
db.person.updateMany({experience:{$elemMatch:{duration:{gte:6}}}},{$set:{'experience.$.experienced':true}})
db.person.updateMany({experience:{$elemMatch:{duration:{gte:6}}}},{$set:{'experience.$.experienced':true}})
// $[]//one conditon in array true then it upodate every field of array
db.person.updateMany({experience:{$elemMatch:{duration:{$gte:6}}}},{$set:{'experience.$[].experienced':true}})
$[identifier]
db.person.updateMany({gender:'female'},{$set:{'experience.$[ele].female':true}},
    {arrayFilters:[{'ele.duration':{$gte:1}}]})
 $push://  add first or element  by create array it create one it al1ows dublicate
 db.person.updateOne({ename:'rabi'},{$push:{skills:['java','sql']}})
$each//add element with out array //depend up on push or pop with alonw we cant use
db.person.updateOne({name:'rabi'},{$push:{skills:{$each:['mongodb','react']}}})
$addtoset//add element without duplicates // with array to remove array each
db.person.updateOne({ename:'suraj'},{$addToSet:{skills:{$each:['mongoodb','js']}}})
$Pull
//it use to del the field values
db.person.updateOne({name:'rabi'},{$pull:{skills: ['sql']}})
$pullAll//
$pop
//it is used del first element or lAST element 1 -1
$unwind
// for removing array
db.person.insertMany([{
    name:'vignesh',
    age:22,
    empno:35462,
    gender:'male',
    address:{
        city:'bangalore',
        state :'karnatka'
    },
    experience:[
        {comapny:'accenture',duration:4},
        {comapny:'ibm',duration:5},
        {comapny:'samsung',duration:4},
        {comapny:'google',duration:4}
    ]
},
{
    name:'rabi',
    age:22,
    empno:35463,
    gender:'male',
    address:{
        city:'btm',
        state :'karnatka'
    },
    experience:[
        {comapny:'google',duration:5},
        {comapny:'wibro',duration:1},
        {comapny:'hcl',duration:7},
        {comapny:'juspay',duration:6}
    ]
},
{
    name:'anand',
    age:22,
    empno:35466,
    gender:'female',
    address:{
        city:'madivala',
        state :'karnatka'
    },    experience:[
        {comapny:'apple',duration:7},
        {comapny:'black rock',duration:2},
        {comapny:'tyss',duration:1},
        {comapny:'alpa',duration:3}
    ]
},
{
    name:'suraj',
    age:23,
    empno:35473,
    gender:'male',
    address:{
        city:'hebbal',
        state :'karnatka'
    },
    experience:[
        {comapny:'infosys',duration:4},
        {comapny:'zoho',duration:2 },
        {comapny:'fossil',duration:7},
        {comapny:'tyss',duration:7}
    ]
}
])

//$
db.person.updateMany({experience:{$elemMatch:{comapny:{$eq:apple}}}},{$set:{'experience.$.appleproduct':true}})
db.person.find({},{'experience.$':1})

