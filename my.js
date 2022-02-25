const mysql = require('mysql2');
const express = require('express');
var app = express();

// database file to json
const parser = require('body-parser')
app.use(parser.json());

var connection = mysql.createConnection(
    {
        host:'localhost',
        user : 'root',
        password : '1234',
        database : 'rent_management'
    }
);

connection.connect((err)=>
{
    if(!err)
        console.log('Database Connected');
    else
        console.log('Error!')
});

app.listen(5900,()=>{
    console.log('Server Started!!')
});

app.get('/tenants',(req,res)=>{
    connection.query("SELECT * FROM tenants",(err,rows,fields)=>{
    if(!err)
        res.send(rows);
    else
        console.log('Error!');
    })
})

app.get('/tenants/:id',(req,res)=>{
    connection.query("SELECT * FROM tenants WHERE T_ID = ?",[req.params.id],(err,rows,fields)=>{
    if(!err)
        res.send(rows);
    else
        console.log('Error!');
    })
})

app.get('/add',(req,res)=>{
    var post = {T_ID:11,Name:sumi,No_member:3,Contact_no:989654231,Age:23};
    var sql = 'INSERT INTO tenants SET ?';
    var query = connection.query(sql,post,(err,result)=>{
        if(err) throw err;
        res.send('Rows Inserted!')
    })
});

app.get('/update/:id',(req,res)=>{
    var name = 'vikash';
    
    var sql = `UPDATE tenants SET Name ='${name}' WHERE T_ID = '${req.params.id}'`;
    var query = connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Rows Updated!')
    })
});

app.get('/delete/:id',(req,res)=>{
    
    var sql = `DELETE from tenants WHERE T_ID = '${req.params.id}'`;
    var query = connection.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('Rows Deleted!')
    })
});
