import React, { createContext, useState } from 'react';
// StateProvider.js

export const StateContext = createContext();

export function StateProvider({ children }) {
  const [state, setState] = useState(
    { text: '', 
        target_page: '', 
        target_user_id: 0,
        current_page: '',
        location: '',
   });

  return (
    <StateContext.Provider value={{ state, setState }}>
      {children}
    </StateContext.Provider>
  );
}