import React, { createContext, useState, useContext } from "react";

interface User {
  email: string;
}

interface AuthContextData {
  signed: boolean;
  user: User | null;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  const [user] = useState<User | null>(null);

  function signOut() {
    localStorage.clear();
  }

  return (
    <AuthContext.Provider
      value={{
        signed: !!user,
        user,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
