import React from 'react';
import './App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faTwitter } from '@fortawesome/free-brands-svg-icons';


function App() {
  const [text, setText] = React.useState("Well begun is half done.");
  const [author, setAuthor] = React.useState("Aristotle");
  
  // fetch quote from api call
  const quoteChangeHandler = (event) => {
    event.preventDefault();
    fetch('https://type.fit/api/quotes')
          .then(response => response.json()) 
          .then(res => {
    const quotesLen = res.length;
    const id = Math.floor(Math.random() * quotesLen);
    setText(res[id].text);
    setAuthor(res[id].author);
    const randomColor = `rgb(${Math.floor(Math.random()* 255)}, ${Math.floor(Math.random()* 255)}, ${Math.floor(Math.random()* 255)})`;
    document.body.style.backgroundColor = randomColor;
    document.getElementById("new-quote").style.backgroundColor  = randomColor;
    document.body.style.color  = randomColor;
    document.getElementById("tweet-quote").style.color  = randomColor;
    });
  }

  const twitterHef = `https://twitter.com/intent/tweet?hashtags=quotes&text= ${encodeURIComponent('"' + text + '" ' + author)}`;
  
  return (
    <div id='quote-box'>
      <p id='text'>
        <FontAwesomeIcon icon={faQuoteLeft} id="icon" />
        {text}
      </p>
      <p id='author'>
        -- {author}
      </p>
      
      <div id="buttonGroups">
        <a id='tweet-quote' href= {twitterHef} target="_top">
          <FontAwesomeIcon icon={faTwitter}/>
        </a>

        <button 
        id='new-quote'
        onClick={quoteChangeHandler}
        >
          New Quote
        </button>
      </div>      
    </div>
  );
}

export default App;
