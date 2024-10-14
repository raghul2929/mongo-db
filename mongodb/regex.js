//regex ==its is use for pattern matching
// $regex syntax
//^ is used check 1st character
db.emp.find({ename:{$regex:/^s/}})
//$ is used to check last character
db.emp.find({ename:{$regex:/s$/}})
//... is used to check the atleast 3
db.emp.find({ename:{$regex:/.../}})
//^...$ is used check exactly 3characters
db.emp.find({ename:{$regex:/^.....$/}})
//value it used to contains
db.emp.find({ename:{$regex:/ .*s.*/}})
db.emp.find({ename:{$regex:/ s /}})
// ll used to check consecutive values
db.emp.find({ename:{$regex:/ll/}})
db.emp.find({ename:{$regex:/.*ll.*/}})
//^.*l.*l.*$ chech the value contains two ll
db.emp.find({ename:{$regex:/^.*l.*l.*$/}})
// ===================challange=========================
 db.emp.find({ename:{$regex:/^a.*s$/}},{ename:1,_id:0})
 db.emp.find({ename:{$regex:/.*a.*/}},{ename:1,sal:1,_id:0})
 jspiders>  db.emp.find({ename:{$regex:/.*a.*a.*/}},{ename:1,sal:1,_id:0})
 db.emp.find({job:{$regex:/.*man.*/}},{ename:1,job:1,_id:0})
db.emp.find({ename:{$regex:/^....$/}},{ename:1,_id:0})
db.emp.find({ename:{$regex:/^..l.*/}},{ename:1,sal:1,_id:0})
db.emp.find({ename:{$regex:/^t..ne.$/}},{ename:1,job:1,_id:0})
//  db.emp.find({ename:{$:in[{$regex:/^a/},{$regex:/^m/}]}},{ename:1,job:1,_id:0})
db.emp.find({ename:{$or:[{$regex:/^a.*/},{$regex:/^m.*/}]}},{ename:1,job:1,_id:0})
db.emp.find({$or:[{ename:{$regex:/^a.*/}},{ename:{$regex:/^m.*/}}]},{ename:1,job:1,_id:0})
 

