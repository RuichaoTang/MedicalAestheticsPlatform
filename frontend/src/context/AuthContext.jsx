import { createContext, useReducer, useContext } from "react";

// create Context
const AuthContext = createContext(null);
const AuthDispatchContext = createContext(null);

export function AuthProvider({ children }) {
  const [userState, userDispatch] = useReducer(authReducer, initialState);

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
      };
    case "LOGOUT":
      return {
        ...initialState,
      };
    case "AUTH_ERROR":
      return {
        ...state,
      };
    default:
      return state;
  }
}

// define the initial state (no user logged in)
const initialState = {
  user: null, // user info
  isAuthenticated: false, // is user logged in?
};

// useEffect(() => {
//   const checkAuth = async () => {
//     const authToken = Cookies.get("token");
//     console.log("authToken:", authToken);

//     if (!authToken) {
//       userDispatch({ type: "LOADED" });
//       return;
//     }

//     try {
//       const response = await fetch("/api/validate-token", {
//         headers: {
//           Authorization: `Bearer ${authToken}`,
//         },
//       });

//       if (response.ok) {
//         const userData = await response.json();
//         userDispatch({ type: "LOGIN", payload: userData });
//       } else {
//         Cookies.remove("authToken");
//         userDispatch({ type: "LOADED" });
//       }
//     } catch (error) {
//       console.error("验证失败:", error);
//       Cookies.remove("authToken");
//       userDispatch({ type: "LOADED" });
//     }
//   };

//   checkAuth();
// }, []);
