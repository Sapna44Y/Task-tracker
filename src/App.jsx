import { useState } from "react";
import { TaskProvider, useTasks } from "./context/TaskContext";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import { GlobalStyles } from "./styles/GlobalStyles";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard";
import Header from "./components/Header";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

const RequireAuth = ({ children, inverse = false }) => {
  const { user, isInitialized } = useTasks();

  if (!isInitialized) return <div>Loading...</div>;

  if (inverse) {
    return user ? <Navigate to="/dashboard" replace /> : children;
  }

  return user ? children : <Navigate to="/" replace />;
};

const App = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
      <GlobalStyles />
      <TaskProvider>
        <Router>
          <div className="container">
            <Header darkMode={darkMode} setDarkMode={setDarkMode} />
            <Routes>
              <Route
                path="/"
                element={
                  <RequireAuth inverse={true}>
                    <Login />
                  </RequireAuth>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <RequireAuth>
                    <Dashboard />
                  </RequireAuth>
                }
              />
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </div>
        </Router>
      </TaskProvider>
    </ThemeProvider>
  );
};

export default App;
