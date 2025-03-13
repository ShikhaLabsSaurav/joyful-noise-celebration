import React, { createContext, useContext, useState, ReactNode } from 'react';

interface ModeContextType {
  isHardMode: boolean;
  toggleHardMode: () => void;
}

const defaultContext: ModeContextType = {
  isHardMode: true,
  toggleHardMode: () => {},
};

const ModeContext = createContext<ModeContextType>(defaultContext);

export const useModeContext = () => useContext(ModeContext);

interface ModeProviderProps {
  children: ReactNode;
}

export const ModeProvider: React.FC<ModeProviderProps> = ({ children }) => {
  const [isHardMode, setIsHardMode] = useState(true);

  const toggleHardMode = () => {
    setIsHardMode((prev) => !prev);
  };

  return (
    <ModeContext.Provider value={{ isHardMode, toggleHardMode }}>
      {children}
    </ModeContext.Provider>
  );
}; 