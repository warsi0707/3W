import {BrowserRouter, Routes, Route} from "react-router"
import Home from "./pages/Home"
import Navbar from "./components/Navbar"
import SignUp from "./pages/SignUp"
import Signin from "./pages/Signin"
function App() {
 

  return (
    <BrowserRouter>
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<Signin/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
