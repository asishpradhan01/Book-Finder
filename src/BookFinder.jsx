import React, { useState } from "react";

function BookFinder() {
    const [info, setInfo] = useState([])
    const [input, setInput] = useState("")

    function Searchquery(e) {
        setInput(e.target.value);
    }
    
    const handleClick = async () => {
        try {
         const res = await fetch(`https://openlibrary.org/search.json?q=${input}`)
        const data = await res.json()
        setInfo(data.docs);
        } catch (error) {
            console.error("Error fetching data:", error)
        }
        
    }
    console.log(info);

    return (
    <div>
        <h1>Book Finder</h1>
         <div className="container">
       <input type="text" placeholder="Search a book" value={input} onChange={Searchquery} />
        <button onClick={handleClick}>Search</button>
        </div>
      
      <div className="container-second">
        {info.length > 0 ? (
          info.map((book, index) => (
            <div key={index}>
              {book.cover_i ? (
                <img
                  src={`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg`}
                  alt={book.title}
                />
              ) : (
                <span>No Cover</span>
              )}
              <h3>{book.title}</h3>
              <p>{book.author_name ? book.author_name[0] : "Unknown Author"}</p>
              <small>
                {book.first_publish_year
                  ? `First Published: ${book.first_publish_year}`
                  : ""}
              </small>
            </div>
          ))
        ) : (
          <p>Designed and devloped by Asish Pradhan</p>
        )}
      </div>
    </div>
)

}
export default BookFinder;