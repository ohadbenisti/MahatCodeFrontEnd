import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./features/Header";
import Problem from "./pages/Problem/Problem";
import Courses from "./pages/Courses/Courses";
import "./App.css";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div>
        <Header />
        <Route path="/">
          {isLoggedIn ? (
            <Content onLogout={handleLogout} />
          ) : (
            <Login onLogin={handleLogin} /> // Passes handleLogin function as prop to Login component
          )}
        </Route>
        <Route path="/problem" component={Problem} />
        <Route path="/courses" component={Courses} />
      </div>
    </Router>
  );
}

export default App;
