import "./App.css";
import React, { useEffect, useState } from "react";
import Axios from "axios";

function App() {
	
	const [bookTitle, setBookTitle] = useState("");
	const [author, setAuthor] = useState("");
	const [bookTitleList, setBookList] = useState([])
	
	useEffect(()=> {
		Axios.get('http://localhost:5000/api/get').then((response)=> {
			setBookList(response.data);
		});
	}, []);
	
	const submitBook = () => {
		Axios.post('http://localhost:5000/api/insert', {bookTitle: bookTitle, author: author,
		}).then(() => {
			alert("successful insert");
		});
		
	};
	
  return (
	  
	  <div className="App">
		<h1>Reading List</h1>
		
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
		
		{bookTitleList.map((val) => {
			return (
				<h1>
				Book Title: {val.title} | Book Author: {val.name}
				
			</h1>
			);
		})} 
	  </div>
  );
}

export default App;



