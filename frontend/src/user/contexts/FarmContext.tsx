import { createContext, useContext, useState, type ReactNode } from 'react';

type FarmContextType = {
  farmName: string;
  setFarmName: (name: string) => void;
};

const FarmContext = createContext<FarmContextType | undefined>(undefined);

export const useFarmContext = () => {
  const context = useContext(FarmContext);
  if (!context) {
    throw new Error('useFarmContext must be used within a FarmProvider');
  }
  return context;
};

export const FarmProvider = ({ children }: { children: ReactNode }) => {
  const [farmName, setFarmName] = useState('');

  return (
    <FarmContext.Provider value={{ farmName, setFarmName }}>
      {children}
    </FarmContext.Provider>
  );
};
