const mysql = require('mysql');
require('dotenv').config()

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    // Create the table if its not created yet
    // con.query('CREATE TABLE IF NOT EXISTS ZipCodes(id MEDIUMINT NOT NULL AUTO_INCREMENT, ZipCode MEDIUMINT , PRIMARY KEY(id));');
    
    // This is the name of our database. Have to tell mysql which database to use
    con.query('Use AfternoonTeam;');

      // This inserts a row in our table
    con.query('INSERT INTO ZipCodes (ZipCode) VALUES (1111);',function(err,result){
        if (err) throw err;
        console.log(result);
    })

    // The name of our table is Zipcodes
    // This gets all rows from our table
    con.query('Select * from ZipCodes;' ,function (err,result){
        if (err) throw err;
        console.log(result);
    });

    // Top ten most common zip codes
    let sql = 'SELECT ZipCode, count(*) FROM ZipCodes GROUP BY ZipCode '+
    'ORDER BY count(*) DESC LIMIT 10;'

    con.query(sql,function(err,result){
        if (err) throw err;

        console.log(result);
    })

    con.end();
});
