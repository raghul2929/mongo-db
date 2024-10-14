// to give alias name for a filed while projecting
db.emp.aggregate([{$project:{ename:1,sal:1,_id:0}}])
db.emp.aggregate([{$project:{employename:"$ename",salary:"$sal",_id:0}}])
// find job based on aggregate
db.emp.aggregate([{$match:{job:'manager'}}])
db.emp.aggregate([{$match:{job:'manager'}},{$project:{ename:1,_id:0}}])
//giving alias name
db.emp.aggregate([{$match:{job:'manager'}},{$project:{employeename:"$ename",_id:0}}])
// db.emp.aggregate([{$match:{job:'manager'}},{$project:{anual:{$mul:["$sal*12"]},_id:0}}])

//add field to add extran field into out put
// waqtd ename annualsalary
/ db.emp.aggregate([{
              $addFields:{annualsal:{$multiply:["$sal",12]}}
             },
             {$project:{ename:1,annualsal:1,_id:0}}])
////waqtd ename mid salary and job is clerk and mid term sal must be greater than 2000and ename start with contain s
             db.emp.aggregate([
                {
                $addFields:{midsal:{$multiply:["$sal",6]}}
               },
               {$match:{
                $and:[
                    {job:"clerk"},
                    {midsal:{$lt:20000}},
                    {ename:{$regex:/.*s.*/}}
                ]}},
               {$project:{ename:1,midsal:1,_id:0}},
               
              ])
            db.emp.aggregate([
                {$addFields:{year:{$year:'$hiredate'}}},{
                   $match:{year:1982}
                },
                {
                   $project:{ename:1,year:1,_id:0}
                }
            ])
            // emp hire date must in the month of 9 or 10//$month
db.emp.aggregate([
   {$addFields:{month:{$month:'$hiredate'}}},
   {$match:{$or:[{month:9},{month:10}]}},
   {
      $project:{
         ename:1,
         month:1,
         _id:0
      }
   }
])
// emp hire date must in the day of 1
db.emp.aggregate([
   {$addFields:{day:{$dayOfMonth:'$hiredate'}}},
   {$match:{day:1}},
   {
      $project:{
         ename:1,
         day:1,
         _id:0
      }
   }
])   
////waqtd ename mid salary and job is clerk and mid term sal must be greater than 2000and ename start with contain s
db.emp.aggregate([{$addFields:{midsal:{$multiply:['$sal',6]}}}
,{
   $match:{
      $and:[{midsal:{$gt:2000}},{job:'clerk'},{ename:{$regex:/^s/}}]
   }
},{
   $project:{
      ename:1,
      midsal:1,
      _id:0
   }
}])
 // emp ename hiredatemust in the month of 9 or 10//$month
 db.emp.aggregate([{
   $addFields:{
      month:{$month:'$hiredate'},
   }
 },{
   $match:{
      month:{$in:[12,1]}
   }
 },{
   $project:{
      ename:1,
      _id:0
   }
 }])
 // emp hire date must in the day of 1
db.emp.aggregate([{
   $addFields:{
      day:{$dayOfMonth:"$hiredate"}
   }
},{
   $match:{
      $or:[{day:1},{day:5},{day:3}]
   }
}])
