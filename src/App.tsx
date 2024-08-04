// import { useState } from 'react'
// import './App.css'
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./sites/Home/Home.tsx";
import TelephoneNumber from "./sites/telephonenumber-input/TelephoneNumber.tsx";
import Matrix from "./sites/Matrix/Matrix.tsx";
import Stellung from "./sites/Stellung/Stellung.tsx";

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
          <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/phoneNumber" element={<TelephoneNumber />} />
                <Route path="/matrix" element={<Matrix />} />
                <Route path="/stellung" element={<Stellung />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
