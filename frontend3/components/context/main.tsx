"use client";

import React, { Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from 'react';

interface KeyPair {
  privateKey: string;
  publicKey: string;
  displayPubKey: string;
  color: string;
  isSet: boolean;
}

interface StealthAccount {
  address: string;
  randomSecret: string;
}

interface MainContextType {
  keys: KeyPair[];
  setKeys: Dispatch<SetStateAction<KeyPair[]>>;
  index: string | undefined;
  setIndex: Dispatch<SetStateAction<string | undefined>>;
  stealthAccounts: StealthAccount[];
  setStealthAccounts: Dispatch<SetStateAction<StealthAccount[]>>;
}

const MainContext = React.createContext<MainContextType | null>(null);

interface MainProviderProps {
  children: ReactNode;
}


export const MainProvider = ({ children }: MainProviderProps) => {
  const [keys, setKeys] = useState<KeyPair[]>([]);
  const [index, setIndex] = useState<string>();
  const [stealthAccounts, setStealthAccounts] = useState<StealthAccount[]>([]);

  const value = {
    keys,
    setKeys,
    index,
    setIndex,
    stealthAccounts,
    setStealthAccounts,
  };

  // useEffect updating the localStorage
  useEffect(() => {
    if (keys.length !== 0) {
      localStorage.setItem('keys', JSON.stringify(keys));
    }
  }, [keys]);
  useEffect(() => {
    if (index !== undefined) {
      localStorage.setItem('index', index);
    }
  }, [index]);
  useEffect(() => {
    if (stealthAccounts.length !== 0) {
      localStorage.setItem('stealthAccounts', JSON.stringify(stealthAccounts));
    }
  }, [stealthAccounts]);

  // useEffect loading the localStorage
  useEffect(() => {
    if (localStorage.getItem('keys') != null) {
      setKeys(JSON.parse(localStorage.getItem('keys') || '[]'));
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('index') != null || localStorage.getItem('index') !== "undefined"){
      setIndex(localStorage.getItem('index') || undefined);
    }
  }, []);
  useEffect(() => {
    if (localStorage.getItem('stealthAccounts') != null) {
      setStealthAccounts(JSON.parse(localStorage.getItem('stealthAccounts') || '[]'));
    }
  }, []);

  console.log(keys, index, stealthAccounts);

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