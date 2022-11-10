import './App.css';
import Login from "./login";
import Dashboard from './Dashboard';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Switch } from "react-router"
function App() {
  return (
    <div className="app">
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-Zenh87qX5JnK2Jl0vWa8Ck2rdkQ2Bzep5IDxbcnCeuOxjzrPF/et3URy9Bv1WTRi" crossorigin="anonymous"></link>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-OERcA2EqjJCMA+/3y+gxIOqMEjwtxJY7qPCqsdltbNJuaOe923+mo//f6V8Qbsw3" crossorigin="anonymous"></script>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          {/* <Route exact path="/register" element={<Register />} />
          <Route exact path="/reset" element={<Reset />} /> */}
          <Route exact path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
    </div>
  );
}
export default App;