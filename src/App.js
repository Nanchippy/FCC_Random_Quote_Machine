import React, {useEffect, useState} from 'react';
import './App.css';
import COLOURARRAY from './colourArray.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote,setQuote]=useState("In order to succeed, your desire for success should be greater than your fear of failure.")
  const [author,setAuthor]=useState("Bill Cosby") 
  const [randomNumber,setRandomNumber]= useState(0)
  const [quotesArray,setQuotesArray]= useState([])
  const [changeColour,setChangeColour]=useState('#282c34')

   const fetchQuotes = async (url)=>{               //fetching json
    const response= await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

   useEffect(()=>{
   fetchQuotes()
    },[quoteDBUrl]
   )

 const getRandomQuote=()=>{
  if (quotesArray.length === 0) {
    return; // Don't proceed if the array is empty
  }
    let randomNumber = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomNumber)
    setChangeColour(COLOURARRAY[randomNumber])
    setQuote(quotesArray[randomNumber].quote)
    setAuthor(quotesArray[randomNumber].author)
  }
  return (
    <div className="App">
    <header className="App-header" style={{background:changeColour,color:changeColour}}>
        <div id='quote-box' style={{color:changeColour}}>
        <p id='text'>
        "{quote}
        </p>
        <p id='author'>
          -{author}
        </p>
        <div className='buttons'>
        <a  id='tweet-quote' href={encodeURI(`http://www.twitter.com/intent/tweet?text=${quote} -${author}`)} style={{background:changeColour}} >
       <FontAwesomeIcon icon={faTwitter} />
        </a>
        <button id='new-quote' onClick={()=>getRandomQuote()} style={{background:changeColour,borderColor:changeColour}}>New quote</button> 
        </div>
        </div>
      </header>
    </div>
  );
}

export default App;
