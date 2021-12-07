const express = require("express");
const bodyParser = require('body-parser')
const app = express();
const mysql = require('mysql');
const cors = require('cors');

const db = mysql.createPool({
	host: 'localhost',
	user: 'sqluser',
	password: 'sqluserpw',
	database: 'readlist'
	
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

app.post("/api/insert", (req,res) => {
	
	const title = req.body.bookTitle
	const name = req.body.author
	const sqlInsert = "INSERT INTO books (title, name) VALUES(?,?);"
	db.query(sqlInsert, [title, name], (err, result) => {
		console.log(err);
	})
});


// server started

app.listen(5000, () => {
	console.log("running on port 5000");
});