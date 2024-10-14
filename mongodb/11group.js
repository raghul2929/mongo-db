db.emp.aggregate([
    {
        $group:{
            _id:null,
            max_sal:{$max:'$sal'}
        }
    }
    ,{
        $project:{
            max_sal:1
        }
    }
])
db.emp.aggregate([
    {
        $group:{
            _id:null,
            min_sal:{$min:'$sal'}
        }
    }
    ,{
        $project:{
            min_sal:1
        }
    }
])
db.emp.aggregate([
    {$match:{
        deptno:10
    }},
    {
        $group:{
            _id:"$deptno",
            total_sal:{$sum:'$sal'}
        }
    }
    ,{
        $project:{
            total_sal:1,
            deptno:1
        }
    }
])
db.emp.aggregate([
    {
        $group:{
            _id:null,
            avg_sal:{$avg:'$sal'},
            min_sal:{$min:'$sal'},
            max_sal:{$max:'$sal'},
            total:{$sum:'$sal'},
            noofemp:{$sum:1}
        }
    }
    ,{
        $project:{
            avg_sal:1,
            min_sal:1,
            max_sal:1,
            total:1,
            noofemp:1

        }
    }
])
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
db.emp.aggregate([
    {$match:{ename:"clerk"}}, 
           
               
                { $group: 
                    { _id:"$ename",
                     deptno:{$push:"$deptno"},
                    job:{$push:"$job"},
                max_sal: { $max: '$sal' } } 
                },
                { $project: 
                    { max_sal: 1, ename:"$_id",job:1,deptno:1,_id:0} 
                }] )
                db.emp.aggregate([
                    
                           { $group: 
                                    {
                                         _id:"$job",
                                        ename:{$push:"$ename"},
                                        max_sal: { $max: '$sal' } } 
                           },
                           {
                            $match:{max_sal:{$gte:2000}}
                           },
                                
                           { $project: 
                                    { max_sal: 1, job:"$_id",_id:0} 
                         }] )
                         /// write a query to dispaly no od emply based on dept
                         db.emp.aggregate([
                    
                            { $group: 
                                     {
                                          _id:"$deptno",
                                          count: { $sum: 1 } } 
                            },
                            { $project: 
                                     { count: 1, deptno:"$_id",_id:0} 
                          }] )
//groub by deptno and job count number of emp in each job  
// based only on job
  db.emp.aggregate([
                     { $group: 
                            { _id:"$deptno",
                            count: { $sum: 1 } } 
                            },
                            {
                              $match:{_id:30}
                            },
                            { $project: 
                                     { count: 1, deptno:"$_id",_id:0} 
                          }] )
                          // based on job and dept 
                          //we can grop in sing id 
                        //   sort on ascending
                          db.emp.aggregate([ { $group: { _id: { job: "$job", deptno: "$deptno" }, count: { $sum: 1 } } },{$sort:{'_id.deptno':1}}, { $project: { count: 1, job: '$_id.job', dept: '$_id.deptno', _id: 0 } }])
 
                          ///second largest salary
                        db.emp.aggregate([
                            {
                         $project:{
                            sal:1,
                            _id:0
                         },
                         },{
                            $sort:{sal:-1}
                         },{
                            $skip:2
                         },{
                            $limit:1
                         }])

                         db.emp.aggregate([
                            {$group:{
                                _id:"$deptno",
                                count:{$sum:1}

                            }},{
                                $match:{
                                    count:{$gte:4}
                                }

                            },
                            {
                         $project:{
                            deptno:"$_id",
                            count:1,
                            
                         },
                        }])
                        db.emp.aggregate([
                            {$group:{
                                _id:"$job",
                                max_sal:{$max:"$sal"},
                                count:{$count:{}}

                            }},{
                                $match:{
                                    count:{$gte:2}
                                }

                            },{
                              $sort:{max_sal:-1}

                            },{
                            },
                            {
                         $project:{
                            job:"$_id",
                            max_sal:1,
                            count:1,
                            _id:0

                            
                         },
                        }])
                        db.emp.aggregate([
                            {$match:{
                                job:"clerk"
                            }},
                            
                            {$group:{
                                _id:"$deptno",
                                job:{$push:"$job"},
                                count:{$count:{}}

                            }},{
                                $match:{
                                  count:{$gte:2}
                                }
                            },
    
                           
                            {
                         $project:{
                            deptno:"$_id",
                            count:1,
                            job:1,
                            _id:0
                            
                         },
                        }])
                        db.emp.aggregate([
                            {$group:{
                                _id:"$sal",

                            }},
                            {
                                $sort:{_id:1} 
                             
                            },
                            {
                                $project:{
                                    sal:"$_id",
                                    _id:0

                                }
                            }
                        ])
                        db.emp.aggregate([
                            {
                         $group:{
                            _id:"$sal"
                            
                         },
                         },{
                            $sort:{sal:1}
                         },{
                            $skip:2
                         },{
                            $limit:1
                         },
                        {
                            $lookup:{
                                $from:"emp",
                                $localField:"_id",
                                $foreignField:"sal",
                                $as:"maxsal"

                            }
                     }])
// ===========================================task==========================/
//group employee by job tittle and count the number of employee in each job
db.emp.aggregate([
    {$group:{
        _id:"$job",
        count:{$sum:1}

    }},
    {
 $project:{
    job:"$_id",
    count:1,
    _id:0
    
 },
}])
//group employee by deparment no amd calculate the avg sal in each department
db.emp.aggregate([
    {$group:{
        _id:"$deptno",
        avg_sal:{$avg:"$sal"}

    }},
    {
 $project:{
    deptno:"$_id",
    avg_sal:1,
    _id:0
    
 },
 
}])
//group employee by mgr aand calculate the total sal managed my each manager 
db.emp.aggregate([
    {$group:{
        _id:"$mgr",
        total_sal:{$sum:"$sal"}

    }},
    {
 $project:{
    mgr:"$_id",
    total_sal:1,
    _id:0
    
 },
 
}])
//group employeee by deptno and find the max sal in each dept
db.emp.aggregate([
    {$group:{
        _id:"$deptno",
        max_sal:{$max:"$sal"}

    }},
    {
 $project:{
    deptno:"$_id",
    max_sal:1,
    _id:0
    
 },
 
}])
//group empby deptno and find min sal
db.emp.aggregate([
    {$group:{
        _id:"$deptno",
        min_sal:{$min:"$sal"}

    }},
    {
 $project:{
    deptno:"$_id",
    min_sal:1,
    _id:0
    
 },
 
}])
//group emp by job and cal total comm in each job
db.emp.aggregate([
    {$group:{
        _id:"$job",
        total_comm:{$sum:"$comm"}

    }},
    {
 $project:{
    job:"$_id",
    total_comm:1,
    _id:0
    
 },
 
}])
//group emp by job and avg comm 
db.emp.aggregate([
    {$group:{
        _id:"$job",
        avg_comm:{$avg:"$comm"}

    }},
    {
 $project:{
    job:"$_id",
    avg_comm:1,
    _id:0
    
 },
 
}])
//group emp by hire year and coun the no emp hired each year
db.emp.aggregate([
    {$group:{
        _id:{$year:"$hiredate"},
        count:{$sum:1}

    }},
    {
 $project:{
    hiredate:"$_id",
    count:1,
    _id:0
    
 },
 
}])
//group by dept no and cal total emp
db.emp.aggregate([
    {$group:{
        _id:"$deptno",
        count:{$sum:1}

    }},
    {
 $project:{
    deptno:"$_id",
    count:1,
    _id:0
    
 },
 
}])
//group by job and fin max comm in each job
db.emp.aggregate([
    {$group:{
        _id:"$job",
        max_comm:{$max:"$comm"}

    }},
    {
 $project:{
    job:"$_id",
    max_comm:1,
    _id:0
    
 },
 
}])
//find the total sal of emp in dept 10
db.emp.aggregate([
    {$match:{deptno:10}},
    {$group:{
        _id:"null",
        total_sal:{$sum:"$sal"}

    }},
    {
 $project:{
    total_sal:1,
    deptno:1,
    _id:0
    
 },
 
}])
// count no of manager who where hires before jan 1 1982
db.emp.aggregate([
    {$match:{$and:[{job:"manager"},{hiredate:{$lt:new Date('1982-01-01')}}]}},
    {$group:{
        _id:"null",
        count:{$sum:"1"}

    }},
    {
 $project:{
    
    count:1,
    _id:0
    
 },
 
}])

//avg sal of clerk
db.emp.aggregate([
    {$match:{job:"clerk"}},
    {$group:{
        _id:"null",
        job:{$addtoset:{$push:"$job"}},
        avg_sal:{$avg:"$sal"},
    }},{
        $project:{
            avg_sal:1,
            job:1,
            _id:0
        }

        
    }
])
//total com earned by sales man
db.emp.aggregate([
    {$match:{job:"salesman"}},
    {$group:{
        _id:"null",
        total_comm:{$sum:"$comm"},
    }},{
        $project:{
        total_comm:1,
            _id:0
        }

        
    }
])
//count the no of employee hired after 1982 each dept
db.emp.aggregate([
    {
        $addFields:{year:{$year:"$hiredate"}}
    },
    {$match:{year:{$gte:1982}}},
    {$group:{
        _id:"$deptno",
        count:{$count:{}}
    }},{
        $project:{
            deptno:"$_id",
            count:1,
            _id:0
        }

        
    }
])
///////lookup
// manger name of all emp
db.emp.aggregate([

    {

    $lookup:{
        from:"emp",
        localField:"mgr",
        foreignField:"empno",
        as:"mgr_details"

}},{
    $unwind:"$mgr_details"
    
},{
    $project:{
        ename:1,
        mgrname:"$mgr_details.ename",
        job:1,
        _id:0
        
    }
}
])
// manager name in dept 10 or 20
db.emp.aggregate([
    
    {

    $lookup:{
        from:"emp",
        localField:"mgr",
        foreignField:"empno",
        as:"mgr_details"

}},
{$match:{$or:[{"mgr_details.deptno":10},{"mgr_details.deptno":20}]}},{
    $unwind:"$mgr_details"
    
},{
    $project:{
        mgrname:"$mgr_details.ename",
        mgrdept:"$mgr_details.deptno",
        ename:1,
        _id:0
        
    }
}
])

db.emp.aggregate([
    
    {

    $lookup:{
        from:"emp",
        localField:"mgr",
        foreignField:"empno",
        as:"mgr_details"

}},
{
$match:{$and:[{"mgr_details.sal":{$gt:2300}},{sal:{$gt:2300}}]}
},{
    $unwind:"$mgr_details"
    
},{
    $project:{
        ename:1,
        sal:1,
        mgrname:"$mgr_details.job",
        mgrsal:"$mgr_details.sal",
         _id:0
        }
}
])
// lookup task 2
db.emp.aggregate([
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},{
$unwind:"$dept_details"
}
,

{$project:{
    ename:1,
    empno:1,
    "dept_details.dname":1,
    "dept_details.loc":1,
    _id:0
}}

])
//doubt
db.emp.aggregate([
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},{
$unwind:"$dept_details"
}
,{
    $addFields:[{dname:"$dept_details.dname"},{loc:"$dept_details.loc"}]
},{
    $addFields:{loc:"$dept_details.loc"}
},

{$project:{
    ename:1,
    empno:1,
    dname:1,
    loc:1,
    _id:0
}}

])

// 12
db.emp.aggregate([
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},{
$unwind:"$dept_details"
},
{
$match:{"dept_details.loc":{$in:['new york','dallas']}}
}
,

{$project:{
    ename:1,
    "dept_details.loc":1,
    _id:0
}}

])
// 13
db.emp.aggregate([
    {$match:{ename:'miller'}},

    {

    $lookup:{
        from:"emp",
        localField:"mgr",
        foreignField:"empno",
        as:"mgr_details"

}},{
    $unwind:"$mgr_details"
    
},{
    $project:{
        ename:1,
        mgrname:"$mgr_details.ename",
        _id:0
        
    }
}
])
//10question

//1
db.emp.aggregate([
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},{
$unwind:'$dept_details'
},

{$project:{
    ename:1,
    "dept_details.loc":1,
    _id:0
}}
])
//2
db.emp.aggregate([
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},{
$unwind:'$dept_details'
},
{$match:{$or:[{'dept_details.loc':'new york'},{'dept_details:':"dallas"}]}},

{$project:{
    ename:1,
    "dept_details.loc":1,
    _id:0
}}
])
// 3

db.emp.aggregate([
    {$match:{sal:{$gt:2340}}},
    
    {
    $addFields:{anualsal:{$multiply:["$sal",12]}}}
    ,
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},

{
$unwind:'$dept_details'
   },
{$project:{
    anualsal:1,
    "dept_details.dname":1,
    _id:0
}}
])
//4 
db.emp.aggregate([
   
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},


{
    $match: { "dept_details.dname": { $regex: /a/ } }
},

{$project:{
    ename:1,
    "dept_details.dname":1,
    _id:0
}}
])
//5
db.emp.aggregate([
    {
        $match:{job:"salesman"}
    },
    
   
    
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},

{
$unwind:'$dept_details'
},

{$project:{
    ename:1,
    "dept_details.dname":1,
    _id:0
}}
])
//6
db.emp.aggregate([
   {
    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},
{
    $match: { $and: [ { job: "salesman" },{ "dept_details.dname": { $regex: /s/ } } ]}},
{
$unwind:'$dept_details'
},

{$project:{
    "dept_details.dname":1,
    job:1,
    _id:0
}}
])
//7deptno
db.emp.aggregate([ 
    {
        $match:{mgr:7839}
    },
    {

    $lookup:{
        from:"emp",
        localField:"mgr",
        foreignField:"empno",
        as:"emp_details"

}},
{
    $unwind:'$emp_details'
}, 




{$project:{
     "emp_details.ename":1,
     mgr:1,
    _id:0
}}
])
db.emp.aggregate([
    {
        $match:{$and:[{hiredate:{$gt:'1983-12-31'}},{$or:[{"dept_details.dname":"reasearch"},{"dept_details.dname":"accounting"}]}]}
    }, 
    {

    $lookup:{
        from:"dept",
        localField:"deptno",
        foreignField:"deptno",
        as:"dept_details"

}},


{
$unwind:'$dept_details'
},

{$project:{
    hiredate:1,
    "dept_details.dname":1,
    _id:0
}}
])
db.emp.aggregate([
   
    {
    $lookup:{
        from:"emp",
        localField:"",
        foreignField:"deptno",
        as:"dept_details"

}},


{
$unwind:'$dept_details'
},

{$project:{
    hiredate:1,
    "dept_details.dname":1,
    _id:0
}}
])
db.emp.aggregate([
   
    {
    $lookup:{
        from:"emp",
        localField:"",
        foreignField:"deptno",
        as:"dept_details"

}},


{
$unwind:'$dept_details'
},

{$project:{
    hiredate:1,
    "dept_details.dname":1,
    _id:0
}}
])
//
db.emp.aggregate([
    {
$match:{sal:{$gte:1200}}
    },
    {$group:{
        _id:"$job",
        count:{$sum:1}

    }},
    {
 $project:{
    job:"$_id",
    count:1,
    _id:0
    
 },
 
}])
//aual
db.emp.aggregate([
 
    {$group:{
        _id:"$job",
        Total_sal:{$sum:"$sal"}

    }},
    {
        $match:{Total_sal:{$gt:3800}}
            },
    {
 $project:{
    job:"$_id",
    Total_sal:1,
    _id:0
    
 },
 
}])
/// COMM GT SAL
// $EXPR
//$EXPR:$GT:["1F","2F"]
db.emp.aggregate([
    {
        $addFields:{
            anualsal:{$multiply:["$sal",12]}}
    },
    {
        $project:{
        
            ename:1,
            sal:1,
            anualsal:1,
            _id:0

        }
    }
])
