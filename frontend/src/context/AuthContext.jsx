import { createContext, useReducer, useContext } from "react";

// 1. 创建 Context
const AuthContext = createContext();

// 2. 定义初始状态
const initialState = {
  user: null, // 用户信息
  isAuthenticated: false, // 登录状态
  loading: true, // 初始化加载状态
  error: null, // 错误信息
};

// 3. 定义 reducer
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
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
}

// 4. 创建 Provider 组件
export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // 登录方法
  const login = async (credentials) => {
    try {
      // 这里替换为真实的 API 调用
      const user = await fakeAuthAPI(credentials);
      dispatch({ type: "LOGIN_SUCCESS", payload: user });
    } catch (error) {
      dispatch({ type: "AUTH_ERROR", payload: error.message });
    }
  };

  // 登出方法
  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

// 5. 创建自定义 Hook
export function useAuth() {
  return useContext(AuthContext);
}

// 模拟 API
const fakeAuthAPI = ({ email, password }) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === "test@example.com" && password === "123456") {
        resolve({ name: "John Doe", email });
      } else {
        reject(new Error("Invalid credentials"));
      }
    }, 1000);
  });
};
