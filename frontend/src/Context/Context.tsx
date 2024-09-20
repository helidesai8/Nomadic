import React, { createContext, useState, ReactNode, useContext } from 'react';
const AuthContext = createContext(null);
interface FilterContextType {
  freeCancelationAvailable: string;
  setFreeCancelationAvailable: (filter: string) => void;
}

const Context = createContext<FilterContextType | undefined>(undefined);

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [freeCancelationAvailable, setFreeCancelationAvailable] = useState<string>("");

  return (
    <Context.Provider value={{ freeCancelationAvailable, setFreeCancelationAvailable }}>
      {children}
    </Context.Provider>
  );
};

export const useFilter = () => {
  const context = React.useContext(Context);
  if (!context) {
    throw new Error('useFilter must be used within a FilterProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);

    const login = (userData) => {
        setUser(userData);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout , useFilter}}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};