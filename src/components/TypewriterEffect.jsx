import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';

const TypewriterEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let index = 0;
    setFinished(false);
    const intervalId = setInterval(() => {
      setDisplayedText(text.slice(0, index + 1));
      index++;
      if (index === text.length) {
        clearInterval(intervalId);
        setFinished(true);
      }
    }, speed);
    return () => clearInterval(intervalId);
  }, [text, speed]);

  return (
    <Box
      sx={{
        fontFamily: 'monospace',
        display: 'inline-block',
        position: 'relative',
        whiteSpace: 'pre',
      }}
    >
      <Typography variant="subtitle1" component="span">
        {displayedText}
      </Typography>
      {!finished && (
        <Box
          component="span"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: '100%',
            backgroundColor: 'currentColor',
            animation: 'blink 1s step-end infinite',
          }}
        />
      )}
      <style>
        {`
          @keyframes blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
    </Box>
  );
};

export default TypewriterEffect;
