// repeated sal
db.emp.aggregate([
    {
        $group:{
            _id:'$sal',
            count:{$count:{}}
        }
        
    },{
        $match:{
            count:{$gt:1}
        }
    },{
        $lookup:{
            from:'emp',
            let:{samesal:'$_id'},//js variable
            //it create one morre same collection
            //it will accept array
            pipeline:[{
                $match:{
                    $expr:{$eq:['$sal','$$samesal']}///it take 2 value filed 1)$_id2)$samesal
                }}
           
            ],
            as:'same sal'   

        }
    }
])
db.emp.aggregate([
    {
        $group:{
            _id:'$sal',
            count:{$count:{}}
        }
        
    },{
        $match:{
            count:{$gt:1}
        }
    },{
        $lookup:{
            from:'emp',
            localField:'empno',
            foriegnField:'mgr',
            as:'second'   

        }
    },{
        $match:{
            $expr:{$eq:[]
        }}
    }

    
])
// who is hired same as ford hiredate
db.emp.aggregate([
    {$match:{ename:'ford'}},
   {
        $lookup:{
            from:'emp',
            let:{fordhiredate:'$hiredate'},
            pipeline:[
                {
                    $match:{$expr:{$eq:['$hiredate','$$fordhiredate']}}
                }
            ],
            as:'samedate'
        }
    },



])
//whoes job is same as miller
db.emp.aggregate([
    {$match:{ename:'miller'}},
    {$group:{
     _id:'$job',
     ename:{$push:'$ename'}
    }},{
        $lookup:{
            from:'emp',
            let:{millerjob:'$_id'},
            pipeline:[
                {
                    $match:{$expr:{$eq:['$job','$$millerjob']}}
                }
            ],
            as:'samedate'
        }
    },{
        $unwind:'$samedate'
    },
{
$project:{
    ename:1,
    sameename:'$samedate.ename',
    _id:0
}
}


])
db.emp.aggregate([
    {$match:{ename:'miller'}},
    {
        $lookup:{
            from:'emp',
            let:{millerjob:'$job'},
            pipeline:[
                {
                    $match:{$expr:{$eq:['$job','$$millerjob']}}
                }
            ],
            as:'samedate'
        }
    }




])
db.emp.aggregate([
    {$group:{
     _id:'$hiredate',
     ename:{$push:'$ename'}
    }},{
        $lookup:{
            from:'emp',
            let:{millerjob:'$_id'},
            pipeline:[
                {
                    $match:{$expr:{$eq:['$job','$$millerjob']}}
                }
            ],
            as:'samedate'
        }
    },{
        $unwind:'$samedate'
    },
{
$project:{
    ename:1,
    sameename:'$samedate.ename',
    _id:0
}
}


])
db.emp.aggregate([
    {
        $group:{
            _id:'$hiredate'
        }
    },{
        $sort:{sal:-1}
     },{
        $skip:1
     },{
        $limit:1
     },
])