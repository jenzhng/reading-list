import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";
import { DataGrid } from '@mui/x-data-grid';

function App() {
	
	const [bookTitle, setBookTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [bookTitleList, setBookList] = useState([])
	
	useEffect(()=> {
		Axios.get('http://localhost:5000/api/get').then((response)=> {
			setBookList(response.data); //retrieves books from the database
		});
	}, []);
	
	const submitBook = () => {
		Axios.post('http://localhost:5000/api/insert', {bookTitle: bookTitle, author: author,
		}).then(() => {
			alert("successful insert"); //adds new book to the database
		});
		
	};
	
	//Set columns for table
	const columns = [
  		{ field: 'id', headerName: 'ID', width: 70 },
  		{ field: 'name', headerName: 'Name', width: 160 },
  		{ field: 'title', headerName: 'Title', width: 300 },
  	];
	
	const rows = [];
	
  return (
	  
	  <div className="App">
		<h1>Reading List</h1>
		
	 	//Form to submit new book to database
		<div className="form">
		<label>Book Title:</label>
		<input 
		type="text" 
		name="bookTitle" 
		onChange={(e) => {
			setBookTitle(e.target.value);
		}}
		/>
		<label>Author:</label>
		<input 
		type="text" 
		name="author"
		onChange={(e) => {
			setAuthor(e.target.value);
		}}
		/>
		<button onClick={submitBook}> Submit </button>
		</div>

		//Retrieve book list from SQL database
		{bookTitleList.map((val) => {
			rows.push({id: val.id, title: val.title, name: val.name});
		})} 

		//Add styling for mui-table of book list
		<div className="table">
		<div style={{ height: 400, width: '50%' }}>
			<DataGrid
				rows={rows}
				columns={columns}
				pageSize={5}
				rowsPerPageOptions={[5]}
				checkboxSelection
			/>
		</div>
		</div>
	  </div>
  );
}

export default App;



