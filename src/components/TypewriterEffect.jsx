import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const TypewriterEffect = ({ text, speed = 100 }) => {
  const [displayedText, setDisplayedText] = useState('');
  const [finished, setFinished] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm')); 
  useEffect(() => {
    let index = 0;
    setFinished(false);
    setDisplayedText(''); 

    const intervalId = setInterval(() => {
      setDisplayedText((prev) => prev + text.charAt(index));
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
        whiteSpace: 'pre-wrap',
        fontSize: isMobile ? '0.9rem' : '1.2rem', 
      }}
    >
      <Typography variant="subtitle1" component="span">
        {displayedText}
      </Typography>
      {/* Cursor piscante */}
      {!finished && (
        <Box
          component="span"
          sx={{
            display: 'inline-block',
            width: '6px',
            height: '1.2rem',
            backgroundColor: 'currentColor',
            marginLeft: '2px',
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
