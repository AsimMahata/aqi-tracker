import React from 'react';

export const Footer = () => {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#fff',
      textAlign: 'center',
      padding: '7px',
      fontSize: '0.8rem' 
    }}>
      <p>
        © 2025 • Data provided by{' : '}
        <a
          href="https://aqicn.org"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: '#0af', textDecoration:'none'}}
        >
          World Air Quality Index Project
        </a>
      </p>
    </div>
  );
};
