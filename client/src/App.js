import React from 'react';
import './App.css';
import Footer from './components/Footer';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import AdminLogin from './components/pages/AdminLogin';
import DonorLogin from './components/pages/DonorLogin';
import SchoolLogin from './components/pages/SchoolLogin';
import AdminSignup from './components/pages/Admin';
import DonorSignup from './components/pages/Donor';
import AboutUs from './components/pages/AboutUs';
import SchoolSignup from './components/pages/School';
import OurMission from './components/pages/OurMission';
import Gallery from './components/pages/Gallery';
import SchoolPage from './components/sch_page/SchoolPage';
import DonorPage from './components/donor_page/DonorPage';
import AdminPage from './components/admin_page/AdminPage';
import MainPage from './components/pages/MainPage';
import Makedon from './components/donor_page/Makedon';
import MakeReq from './components/sch_page/MakeReq';
import Verification from './components/Verification';
import Test from './components/Test'
import PreVerification from './components/preverification';
import Donhis from './components/donor_page/Donhis';
import SchHis from './components/sch_page/SchHis';

function App() {
  return (
    <Router>
       <Routes>
          <Route path='/' element={<Home/>} />

          <Route path='/AdminSignup' element={<AdminSignup/>} />
          <Route path='/DonorSignup' element={<DonorSignup/>} />
          <Route path='/SchoolSignup' element={<SchoolSignup/>} />

          <Route path='/DonorLogin' element={<DonorLogin/>} />
          <Route path='/AdminLogin' element={<AdminLogin/>} />
          <Route path='/SchoolLogin' element={<SchoolLogin/>} />

          <Route path='/SchoolPage' element={<SchoolPage />} />
          <Route path='/AdminPage' element={<AdminPage/>} />
          <Route path='/DonorPage' element={<DonorPage/>} />

          <Route path="/user/:role/verify" element={<Verification/>} />
          <Route path="/preverify" element={<PreVerification/>} />

          <Route path='/AboutUs' element={<AboutUs/>} />
          <Route path='/OurMission' element={<OurMission/>} />
          <Route path='/Gallery' element={<Gallery/>} />
          <Route path='/MainPage' element={<MainPage />} />
          <Route path='/SchoolPage' element={<SchoolPage />} />
          <Route path='/Makedon' element={<Makedon />} />
          <Route path='/MakeReq' element={<MakeReq />} />
          <Route path='/Donhis' element={<Donhis />} />
          <Route path='/SchHis' element={<SchHis />} />

          <Route path="/tests" element={<Test/>} />
        </Routes>
        <Footer />
    </Router>
  );
}

export default App;
