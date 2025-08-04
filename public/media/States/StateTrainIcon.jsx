import React from 'react';

const StateTrainIcon = ({ height = '100%' }) => (
  <svg
    width="800px"
    height="800px"
    viewBox="0 0 64 64"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    aria-hidden="true"
    role="img"
    preserveAspectRatio="xMidYMid meet"
    style={{ enableBackground: 'new 0 0 64 64' }}
    width={height}
    height={height}
  >
    {/* Train shadow effects */}
    <path 
      fill="#94989B" 
      d="M16.4 48.9L7.8 62h4.6l8.4-13.1z"
    />
    <path 
      fill="#E6E6E6" 
      d="M16.4 48.9H12L2 62h5.8z"
    />
    <path 
      fill="#94989B" 
      d="M47.6 48.9h-4.4L51.6 62h4.6z"
    />
    <path 
      fill="#E6E6E6" 
      d="M47.6 48.9L56.2 62H62L52 48.9z"
    />
    
    {/* Train undercarriage */}
    <path 
      fill="#3E4347" 
      d="M44 50.1H20L12.4 62h39.2z"
    />
    
    {/* Train body base */}
    <path 
      d="M52.4 32.2H11.6V8.4C11.6 7.8 21.8 5 32 5s20.4 2.8 20.4 3.4v23.8" 
      fill="#BA573F"
    />
    
    {/* Train roof */}
    <path 
      d="M54.8 48.5c0 3.7-45.5 3.7-45.5 0v-6.1h45.5v6.1" 
      fill="#C5CDD3"
    />
    <path 
      d="M48 52.7c0 4.5-32 4.5-32 0v-7.5h32v7.5" 
      fill="#DAE3EA"
    />
    
    {/* Train main body */}
    <path 
      d="M54.8 42.4H9.2v-30c0-.8 11.4-4.3 22.8-4.3s22.8 3.5 22.8 4.3v30" 
      fill="#F14E3A"
    />
    
    {/* Train windows */}
    <g fill="#3E4347">
      <path 
        d="M11.6 13.7v9.5L30.9 20v-9.5c-.2-.8-19.4 2.4-19.3 3.2"
      />
      <path 
        d="M33.1 10.5V20l19.2 3.1v-9.5c.2-.7-19-3.9-19.2-3.1"
      />
    </g>
    
    {/* Train door */}
    <path 
      d="M37.9 42.4H26.1V23.1c0-2.5 11.7-2.5 11.7 0c.1 3 .1 19.3.1 19.3" 
      fill="#FDF516"
    />
    
    {/* Train headlight */}
    <ellipse 
      cx="32" 
      cy="27.3" 
      rx="3.4" 
      ry="3.3" 
      fill="#3E4347"
    />
    
    {/* Train lights */}
    <g fill="#F14E3A">
      <ellipse 
        cx="21.9" 
        cy="5.1" 
        rx="3.2" 
        ry="3.1"
      />
      <ellipse 
        cx="42.1" 
        cy="5.1" 
        rx="3.2" 
        ry="3.1"
      />
    </g>
    
    {/* Train details */}
    <g fill="#FDF516">
      <path 
        d="M42.3 33.6c-5-1.1-15.6-1.1-20.6 0c-.7.1-1.9.8-1.9 1.9v3.8c0 1 1.3 1.7 1.9 1.9c5 1.1 15.6 1.1 20.6 0c.7-.1 1.9-.8 1.9-1.9v-3.8c.1-1.1-1.2-1.8-1.9-1.9m-.2 5c0 .7-1 1.2-1.6 1.2c-4.2.7-12.9.7-17.1 0c-.6-.1-1.6-.6-1.6-1.2v-2.5c0-.7 1-1.2 1.6-1.2c4.2-.7 12.9-.7 17.1 0c.6.1 1.6.6 1.6 1.2v2.5"
      />
      <path 
        d="M9.2 36.3h45.6v2.1H9.2z"
      />
    </g>
    
    {/* Train wheel */}
    <path 
      d="M35.3 36.3c0 1.8-1.5 3.3-3.3 3.3s-3.3-1.5-3.3-3.3c0-1.8 1.5-3.3 3.3-3.3c1.8 0 3.3 1.5 3.3 3.3" 
      fill="#3E4347"
    />
    <circle 
      cx="32" 
      cy="36.3" 
      r="1.5" 
      fill="#FFFFFF"
    />
    
    {/* Train connectors */}
    <path 
      fill="#94989B" 
      d="M23 42.4h18v6.5H23z"
    />
    <g fill="#3E4347">
      <path 
        d="M27.8 46.9h2.1v4.7h-2.1z"
      />
      <path 
        d="M34.1 46.9h2.1v4.7h-2.1z"
      />
    </g>
    
    {/* Train bottom details */}
    <path 
      fill="#94989B" 
      d="M8.2 42.4h47.7v2.8H8.2z"
    />
    <path 
      fill="#F14E3A" 
      d="M26.1 53h11.7v4.3H26.1z"
    />
    
    {/* Train front details */}
    <g fill="#3E4347">
      <path 
        d="M55.8 32.9c-.1.6-.7 1-1.4.9l-9.3-1.6c-.6-.1-1.1-.7-1-1.3l.4-2.1c.1-.6.7-1 1.4-.9l9.3 1.6c.6.1 1.1.7 1 1.3l-.4 2.1"
      />
      <path 
        d="M19.7 30.9c.1.6-.3 1.2-1 1.3l-9.3 1.6c-.6.1-1.3-.3-1.4-.9l-.4-2.1c-.1-.6.3-1.2 1-1.3l9.3-1.6c.6-.1 1.3.3 1.4.9l.4 2.1"
      />
    </g>
  </svg>
);

export default StateTrainIcon;