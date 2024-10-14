//create
db.createCollection('student')
//insert
db.student.insertOne({name:'raghul',age:21})
// insert new datw/
db.student.insertOne({ename:'smith',hiredate:new Date('2024-12-1')})
db.student.insertMany([{name:'raghul',age:21},{name:'dharani',age:21}])
// capped collection
// db.createCollection('student',{capped:true,size:1000,max:100})
db.createCollection('collection',{capped:true,size:1000,max:3})
db.iscapped()
// read
db.student.findOne()
db.student.find()
db.student.find({name:'dharani'},{name:1,age:1,_id:0}) 
update//$set
db.student.updateOne({name:'dharani'},{$set:{name:'muh'}},{upsert:true})
db.student.updateMany({name:'raghul'},{$set:{age:'23',name:'dharani'}},{upsert:true})
db.student.updateMany({},{$set:{skill:['hlml','css']}},{upsert:true})
// delete
db.student.deleteOne({name:'raghul'})
db.student.deleteMany({name:'raghul'})
//////////////////////blukwrite/////////////////////////////////
db.student.bulkWrite([
    {insertOne:{
       document :{ename:'dharani',age:21}}},
   {insertOne:{
        document :{ename:'raghul',age:21}}},
    {
        updateOne:{
            filter:{
                ename:'dharani'
            },
            update:{
                $set:{ename:'muh'}
            }
        }
    },{
        deleteOne:{
            filter:{
                ename:'raghul'
            }
        }
    }
])
///task
//////////////////////////find//////
// waqtd ename,mgrof emp
db.emp.find({},{ename:1,mgr:1,_id:0})
db.emp.find({},{sal:1,job:1,_id:0})
db.emp.find({},{empno:1,deptno:1,_id:0})
db.emp.find({},{sal:1,comm:1,_id:0})
db.emp.find({},{job:1,_id:0})
db.emp.find({},{ename:1,hiredate:1,_id:0})
db.emp.find({mgr:7698},{deptno:1,_id:0})
db.emp.find({ename:'king'},{job:1,comm:1,_id:0})
db.emp.find({ename:'miller'})
//waqtd deptname,location of emp
 db.dept.find({},{dname:1,loc:1,_id:0})
 //////////////////////////////update///////////////////////////
 db.emp.updateOne({mgr:7782},{$set:{sal:1000}})
 db.emp.updateOne({ename:'king'},{$set:{sal:1000,comm:400}})
 db.dept.updateMany({dname:'research'},{$set:{loc:'usa'}})
 db.emp.updateOne({ename:'allen'},{$set:{job:'clerk'}})

 db.new.bulkWrite([
 {
    insertOne:{
        document:{
            ename:'dharani',
        }

    }
 }, 
{
    updateMany:{
        filter:{},
        update:{$set:{age:21}},
    }
 },
{
    deleteMany:{
        filter:{ename:'raghul'}
    }
 },
6
 ])