import { createContext, useReducer, useContext, useEffect } from "react";

// create Context
const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch("/api/users/check-login", {
          credentials: "include",
        });
        const user = await response.json();
        console.log(user);
        if (user.user) {
          userDispatch({ type: "LOGIN_SUCCESS", payload: user.user });
        } else {
          userDispatch({ type: "LOGOUT" });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        userDispatch({ type: "AUTH_ERROR" });
      }
    };
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={userState}>
      <AuthDispatchContext.Provider value={userDispatch}>
        {children}
      </AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export function useAuthDispatch() {
  return useContext(AuthDispatchContext);
}

// define reducer
function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_SUCCESS":
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        loading: false,
      };
    case "LOGOUT":
      return {
        ...initialState,
        loading: false,
      };
    case "AUTH_ERROR":
      return {
        ...initialState,
        loading: false,
      };
    default:
      return state;
  }
}

// define the initial state (no user logged in)
const initialState = {
  user: null, // user info
  isAuthenticated: false, // is user logged in?
  loading: true,
};
