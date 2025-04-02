import React, { useState, useEffect } from 'react';


const TextHighlight = ({ text, searchWords }) => {
    if (searchWords === undefined || searchWords === null || searchWords.length === 0){
        return text;
    }

    const words = text.split(/\s+/);
    const highlighted = words.map((word, index) => {
      const isMatch = searchWords.some(target => 
        word.toLowerCase().includes(target.toLowerCase())
      );
      
      if (isMatch) {
        // Выделение только совпадающего слова
        return (
          <span key={index} className="highlight">
            {word}
          </span>
        );
      }
      return word + " ";
    });
  
    return highlighted;
  };

  export default TextHighlight;