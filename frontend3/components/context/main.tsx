"use client";

import React, { Dispatch, ReactNode, SetStateAction, useContext, useState } from 'react';

interface KeyPair {
  privateKey: string;
  publicKey: string;
  displayPubKey: string;
  color: string;
}

interface MainContextType {
  keys: KeyPair[];
  setKeys: Dispatch<SetStateAction<KeyPair[]>>;
}

const MainContext = React.createContext<MainContextType | null>(null);

interface MainProviderProps {
  children: ReactNode;
}


export const MainProvider = ({ children }: MainProviderProps) => {
  const [keys, setKeys] = useState<KeyPair[]>([]);

  const value = {
    keys,
    setKeys,
  };

  return (
    <MainContext.Provider value={value}>
      {children}
    </MainContext.Provider>
  );
};

export const useMain = () => {
  const context = useContext(MainContext);

  if (context === null) {
    throw new Error('useMain must be used within a MainProvider');
  }

  return context;
};