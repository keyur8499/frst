var express= require("express");
var mysql = require("mysql");
var bodyParser = require("body-parser");

var app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:false}));

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"node"
})
con.connect();
app.get('/',function(req,res){
    res.sendFile(__dirname+'/index.html');
    
})
app.get('/ejs',function(req,res){
    var sq = "select * from tbl";
    con.query(sq,function(error,result,field){
        if(error)throw error;
        res.render('index',{result});
    })
})
app.post('/ejs',function(req,res){
    var name = req.body.name;
    var email = req.body.email;
    var number =req.body.number;
    var iq = "insert into tbl(name,email,number)values('"+ name +"','"+ email +"','" + number + "')";

    con.query(iq,function(error,result,field){
        if(error) throw error;
        res.redirect('/ejs');
    })


})
app.post('/up',function(req,res){
    var id = req.body.id;
    var name = req.body.name;
    var email = req.body.email;
    var number = req.body.number;
    var uq = "update tbl set name='"+name+"',email='"+email+"',number='"+number+"' where id='"+id+"' ";
   
    // console.log(id);
    con.query(uq,function(error,result,field){
        if(error) throw error;
        res.redirect('/ejs');
    })
})
app.get('/delete/:id',function(req,res){
    var id = req.params.id;
    var dq = "delete from tbl where id = "+id;
    con.query(dq,function(error,result,field){
        if(error)throw error;
        res.redirect('/ejs');
    })
})
app.get('/update/:id',function(req,res){
    var id = req.params.id;
    var sq= "select * from tbl where id ="+id;
    con.query(sq,function(error,result,field){
        if(error) throw error;
        res.render('form',{result});
    })
})


app.listen(3000);