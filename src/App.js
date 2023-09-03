import React, {useEffect, useState} from 'react';
import './App.css';
import COLOURARRAY from './colourArray.js';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faTwitter} from '@fortawesome/free-brands-svg-icons'
//import {faQuoteLeft} from 'f10d'

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote,setQuote]=useState("In order to succeed, your desire for success should be greater than your fear of failure.")
  const [author,setAuthor]=useState("Bill Cosby") 
  const [randomNumber,setRandomNumber]= useState(0)
  const [quotesArray,setQuotesArray]= useState(null)
  const [changeColour,setChangeColour]=useState('#282c34')

  // const changeQuoteAndAuthor=()=>{
  //   setQuote("The best time to plant a tree was 20 years ago. The second best time is now.");
  //     setAuthor("hinese Proverb")
   //}
   const fetchQuotes = async (url)=>{               //fetching json
    const response= await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    console.log(parsedJSON)
  }

   useEffect(()=>{
   fetchQuotes(quoteDBUrl)
    },[quoteDBUrl]
   )

 const getRandomQuote=()=>{
    let randomInteger = Math.floor(quotesArray.length * Math.random())
    setRandomNumber(randomInteger)
    setChangeColour(COLOURARRAY[randomInteger])
    setQuote(quotesArray[randomInteger].quote)
    setAuthor(quotesArray[randomInteger].author)
  }
  return (
    <div className="App">
    <header className="App-header" style={{background:changeColour,color:changeColour}}>
        <div id='quote-box' style={{color:changeColour}}>
        {/* <FontAwesomeIcon icon={faQuoteLeft} /> */}
        <p id='text'>
        "{quote}
        </p>
        <p id='author'>
          -{author}
        </p>
        <div className='buttons'>
        <a  id='tweet-quote' href={encodeURI('http://www.twitter.com/intent/tweet?text=${quote} -${author}')} style={{background:changeColour}} >
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
