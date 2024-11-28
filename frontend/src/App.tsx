import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RideOptions from "./pages/RideOptions";
import RideRequest from "./pages/RideRequest";
import RideHistory from "./pages/RideHistory";


function App() {

  
  return (
    <Router>
      <Routes>
          <Route path="/" element={<RideRequest/>}/>
          <Route path="/opcoes" element={<RideOptions/>} />
          <Route path="/historico" element={<RideHistory/>}/>
      </Routes>
    </Router>
  );
}

export default App;
