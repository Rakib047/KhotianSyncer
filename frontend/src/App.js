import { BrowserRouter, Routes, Route,Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";
//pages and components
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import { Profile } from "./pages/Profile";
import {Resource} from "./pages/Resource"
import SeniorResource from "./pages/SeniorResource";
import { CourseSlide } from "./pages/CourseSlide";
import { TermFinalResource } from "./pages/TermFinalResource";
import ClassRoutine from "./pages/ClassRoutine";

function App() {

  const {user} =useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={user? <Home />:<Navigate to="/login" />} /> 
            <Route path="/login" element={!user?<Login />:<Navigate to="/"/>} />
            <Route path="/signup" element={!user?<Signup />:<Navigate to="/"/>} />
            <Route path="/profile" element={user? <Profile />:<Navigate to="/login" />} />
            <Route path="/resource" element={user? <Resource />:<Navigate to="/login" />} />
            <Route path="/resource/seniorresource" element={user? <SeniorResource/>:<Navigate to="/login" />} />
            <Route path="/resource/courseslide" element={user? <CourseSlide/>:<Navigate to="/login" />} />
            <Route path="/resource/termfinal" element={user? <TermFinalResource/>:<Navigate to="/login" />} />
            <Route path="/routine" element={user?<ClassRoutine/>:<Navigate to="/login"/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
