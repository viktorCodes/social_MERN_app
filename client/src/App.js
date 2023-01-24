
import { BrowseRouter, Navigate, Routes, Route} from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/ProfilePage";



 export default function App() {
  return (
    <div className="app">

      <BrowseRouter>
      <Routes>

        <Route path='/' element={<LoginPage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/profile/:userId' element={<ProfilePage />} />
         </Routes>
      </BrowseRouter>
      
    </div>
  );
}


