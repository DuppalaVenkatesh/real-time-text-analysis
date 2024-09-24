import React, { useState } from 'react';
import './index.css'; 

const TextAnalyzer = () => {
  const [text, setText] = useState('');            
  const [uniqueWords, setUniqueWords] = useState(0); 
  const [charCount, setCharCount] = useState(0);     
  const [searchString, setSearchString] = useState(''); 
  const [replaceString, setReplaceString] = useState(''); 

  const calculateUniqueWordsCount = inputText => {
    const wordsArray = inputText.match(/\b\w+\b/g);
    const uniqueWordSet = new Set(wordsArray?.map(word => word.toLowerCase()));
    setUniqueWords(uniqueWordSet.size);
  }

  const calculateCharacterCount = inputText => {
    const charArray = inputText.replace(/[^a-zA-Z0-9]/g, '');
    setCharCount(charArray.length);
  }

  // Function to handle the text input and calculate statistics
  const handleTextChange = (e) => {
    const inputText = e.target.value;
    setText(inputText);

    // Calculate unique word count
    calculateUniqueWordsCount(inputText);

    // Calculate character count excluding spaces and punctuation
    calculateCharacterCount(inputText)
  };

  // Function to handle the string replacement
  const handleReplace = () => {
    const newText = text.replaceAll(searchString, replaceString); // Case-sensitive replacement
    setText(newText);
    calculateUniqueWordsCount(newText);
    calculateCharacterCount(newText);
  };

  return (
    <div className="container">
      <h1>Real-Time Text Analysis and String Replacement</h1>

      {/* Textarea for user input */}
      <textarea
        value={text}
        onChange={handleTextChange}
        placeholder="Type here..."
        rows="10"
        className="textarea"
      ></textarea>

      {/* Displaying statistics */}
      <div className="stats">
        <p className = "unique-words-count">Unique Words: <span className = "count">{uniqueWords}</span></p>
        <p className= "unique-words-count">Character Count (Excluding Spaces and Punctuation): <span className= "count">{charCount}</span></p>
      </div>

      {/* Input fields for search and replace */}
      <div className="replace-section">
        <input
          type="text"
          placeholder="Search for..."
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
          className="replace-input"
        />
        <input
          type="text"
          placeholder="Replace with..."
          value={replaceString}
          onChange={(e) => setReplaceString(e.target.value)}
          className="replace-input"
        />
        <button onClick={handleReplace} className="replace-button">Replace All</button>
      </div>
    </div>
  );
};

export default TextAnalyzer;
