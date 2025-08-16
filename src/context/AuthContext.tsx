// AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
  currentUser: JWTPayload | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  isAdmin: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

// JWT payload (chỉnh theo backend trả về)
interface JWTPayload {
  sub: string;       // userId
  username: string;
  roleId: number;
  roleName: string;
  isAdmin: boolean;
  exp: number;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<JWTPayload | null>(null);
  const [token, setToken] = useState<string | null>(() => localStorage.getItem("token"));
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    if (token) {
      try {
        const decoded: JWTPayload = jwtDecode(token);
        if (decoded.exp * 1000 > Date.now()) {
          setCurrentUser(decoded);
          setIsAdmin(decoded.roleName === "admin"); // hoặc decoded.roleId === 1
        } else {
          logout(); // token hết hạn
        }
      } catch (err) {
        console.error("Invalid token", err);
        logout();
      }
    }
  }, [token]);

  useEffect(() => {
  if (token) {
    try {
      const decoded: JWTPayload = jwtDecode(token);
      console.log("Decoded token:", decoded);  // <--- xem toàn bộ payload
      console.log("isAdmin value:", decoded.isAdmin); // <--- check isAdmin
      if (decoded.exp * 1000 > Date.now()) {
        setCurrentUser(decoded);
      } else {
        logout();
      }
    } catch (err) {
      console.error("Invalid token", err);
      logout();
    }
  }
}, [token]);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5220/api/User/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, passwordHash: password }) // gửi password bình thường
      });

      if (!res.ok) return false;

      const data = await res.json();
      // console.log(data)
      // data = { token: string, user: { ... } }
      localStorage.setItem("token", data.token);
      setToken(data.token);

      const decoded: JWTPayload = jwtDecode(data.token);
      const isAdmin = decoded.roleName === "admin" // check role
      setCurrentUser({...decoded, isAdmin});
      
      return true;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setCurrentUser(null);
    setIsAdmin(false);
  };

  const value: AuthContextType = {
    currentUser,
    login,
    logout,
    isAuthenticated: !!currentUser,
    isAdmin,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
