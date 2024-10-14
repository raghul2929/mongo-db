// waqtd max sal and ename of all emp
db.emp.aggregate([{
    $group:{
        _id:'null',
        maxsal:{$max:"$sal"}
    }

},
{$project:{
    maxsal:1,
    _id:0
}}])
// min sal
db.emp.aggregate([{
    $group:{
        _id:'null',
        minsal:{$min:"$sal"}
    }

},
{$project:{
    minsal:1,
    _id:0
}}])
// total sal in deptno 10
//
db.emp.aggregate([{
    $match:{deptno:20}
},{
    $group:{
        _id:null,
        total:{$sum:'$sal'}
    }
}])
// WAQTD MIN,MAX,avg,total,noof emp of employees
db.emp.aggregate([{
    $group:{
        _id:'null',
        max:{$max:'$sal'},
        min:{$min:'$sal'},
        avg:{$avg:'$sal'},
        total:{$sum:'$sal'},
        num:{$count:{}}
    }
}
,{
    $project:{
        _id:0
    }
}])
//Waqtd ename based og each dept who deptno10 and sal lt 200
db.emp.aggregate([
    {$match:{
      $and:[ {sal:{$lt:2000}},{deptno:10}]}
    },
    {
        $group:{
            _id:"$deptno",
            ename:{$push:"$ename"},
            deptno:{$push:"$deptno"},
            job:{$push:"$job"},
            count:{$sum:1}
        }
    },{
        $project:{
            count:1,
            _id:0,
            ename:1,
            deptno:"$_id",
            job:1
        }
    }
    
   
])
// second largest sal
db.emp.aggregate([
    {$sort:{
        sal:-1
    }},
    {
   $skip:1
    },{
    $limit:1
    }
    ,{
        $project:{
            ename:1
        }
    }
])
//repeted same sal
db.emp.aggregate([{
    $group:{
        _id:"$sal",
       count:{$count:{}}

    }
}
,{
    $match:{count:{$gt:1}}
},{
    $lookup:{
        from:"emp",
        let:{samesal:'$_id'},
        pipeline:[
            {$match:{$expr:{$eq:['$sal','$$samesal']}}}
        ],
        as:'samesal'

    }
}])
db.emp.aggregate([{
    $match:{ename:'ford'}
},{
    $lookup:{
        from:'emp',
        let:{forddate:"$hiredate"},
        pipeline:[{
            $match:{$expr:{$eq:["$hiredate","$$forddate"]}}
        }],
        as:"samedate"
    }
}
])
db.emp.aggregate([{
    $match:{ename:'miller'}
},{
    $lookup:{
        from:'emp',
        let:{millerjob:"$job"},
        pipeline:[{
            $match:{$expr:{$eq:["$job","$$millerjob"]}}
        }],
        as:"samejob"
    }
}
])
db.emp.aggregate([
  {
    $lookup:{
        from:'emp',
        let:{mmgr:"$mgr"},
        pipeline:[{
            $match:{$expr:{$eq:["$empno","$$mmgr"]}}
        }],
        as:"manager"
    }
},
{$unwind:'$manager'},
{
    $lookup:{
        from:'emp',
        let:{mmmgr:"$manager.mgr"},
        pipeline:[{
            $match:{$expr:{$eq:["$empno","$$mmmgr"]}}
        }],
        as:'managermanagers'

    }
},
{
$unwind:'$managermanagers'
},
// {
//     $project:{
//         _id:0,
//         ename:1,
//         managername:'$manager.ename',
//         managermanagers:'$managermanagers.ename'


//     }
// }
])
db.emp.aggregate([{
   $match:{ename:'miller'}

},
{
    $lookup:{
        from:'emp',
        localField:'mgr',
        foreignField:'empno',
        as:'manager'

    }
},
{
    $unwind:'$manager'
},{
    $lookup:{
        from:'emp',
        localField:'manager.mgr',
        foreignField:'empno',
        as:'managermanagers'

    }
},
{
    $unwind:'$managermanagers'
},
{
$project:{
  ename:1,
  managername:'$manager.ename',
  managermagersname:'$managermanagers.ename',
  _id:0
}
}
])
// 2nd largest sal
db.emp.aggregate([
    {
        $sort:{sal:-1}
    },{
       $skip:1 
    },{
        $limit:1
    },{
           $project:{
            _id:0,
            sal:1,
            ename:1
           }
    }

])