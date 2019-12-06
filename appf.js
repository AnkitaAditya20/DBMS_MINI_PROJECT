const express = require('express');
const mysql = require('mysql');
const app = express();
var bp = require("body-parser");
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));
app.use(bp.urlencoded({extended: true}));
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    charset  :'UTF8',
    port     :'3306',
    database :'animal_species_repository'
});
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

var m ={};
var f ={};
var r ={};
var a ={};
var b ={};
var ani ={};
var obj={};
var q1 ={};
var ob1 ={};
var ob2 = {};
var q1 ={};
var ci={};

app.get("/", (req,res) => {
    res.render("main");
});

app.get("/about", (req,res) => {
    res.render("about");
});
app.get("/all", (req,res) => {
    let sql = `CALL getall()`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        ani = {ani:results};
        res.render("all",ani);
    });
});

app.get('/mammals', (req, res) => {
   let sql = `SELECT a.animal_id,a.animal_name FROM category as c, animal as a, main_category as mc WHERE c.category_name="mammals" and mc.animal_id=a.animal_id and c.category_id=mc.category_id`;
   db.query(sql, (err, results) => {
        if(err) throw err;
        m = {m:results};
        console.log(m);
        res.render("mammals",m);
    });
});

app.get('/birds', (req, res) => {
    let sql = `SELECT a.animal_id,a.animal_name FROM category as c, animal as a, main_category as mc WHERE c.category_name="birds" and mc.animal_id=a.animal_id and c.category_id=mc.category_id`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        b = {b:results};
        res.render("birds",b);
    });
});

app.get('/reptiles', (req, res) => {
    let sql = `SELECT a.animal_id,a.animal_name FROM category as c, animal as a, main_category as mc WHERE c.category_name="reptiles" and mc.animal_id=a.animal_id and c.category_id=mc.category_id`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        r = {r:results};
        res.render("reptiles",r);
    });
});

app.get('/amphibians', (req, res) => {
    let sql = 'SELECT a.animal_id,a.animal_name FROM category as c, animal as a, main_category as mc WHERE c.category_name="amphibians" and mc.animal_id=a.animal_id and c.category_id=mc.category_id';
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        a = {a:results};
        res.render("amphibians",a);
    });
});

app.get('/fish', (req, res) => {
    let sql = `SELECT a.animal_id,a.animal_name FROM category as c, animal as a, main_category as mc WHERE c.category_name="fish" and mc.animal_id=a.animal_id and c.category_id=mc.category_id`;
    db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        f = {f:results};
        res.render("fish",f);
    });
});

app.get('/mammals/:id', (req, res) => {
    let sql = `SELECT * FROM animal WHERE animal_id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        q1 = {q1:result};
        res.render("description",q1);
    });
});

app.get('/birds/:id', (req, res) => {
    let sql = `SELECT * FROM animal WHERE animal_id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        q1 = {q1:result};
        res.render("description",q1);
    });
});

app.get('/fish/:id', (req, res) => {
    let sql = `SELECT * FROM animal WHERE animal_id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        q1 = {q1:result};
        res.render("description",q1);
    });
});

app.get('/reptiles/:id', (req, res) => {
    let sql = `SELECT * FROM animal WHERE animal_id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        q1 = {q1:result};
        res.render("description",q1);
    });
});

app.get('/amphibians/:id', (req, res) => {
    let sql = `SELECT * FROM animal WHERE animal_id= ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        q1 = {q1:result};
        res.render("description",q1);
    });
});

app.get('/category/:name', (req, res) => {
    let sql =`SELECT a.animal_name,a.animal_id,c.category_name,s.sub_category_name FROM animal as a, main_category as m, category as c, sub_category as s WHERE a.animal_id=m.animal_id AND m.category_id=c.category_id AND m.sub_category_id=s.sub_category_id AND s.sub_category_name='${req.params.name}'`;
    let query = db.query(sql, (err, result) => {
    if(err) throw err;
    console.log(result);
    ci = {ci:result};
        res.render("category",ci);
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});

