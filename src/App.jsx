import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegistrationPage from './pages/RegistrationPage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import ProfilePage from './pages/ProfilePage';
import PendingConnectionsPage from './pages/Admins/PendingConnectionsPage';
import './App.css';
import AdminLogin from './components/adminComponent/AdminLogin';
import PrivateRoute from './features/auth/PrivateRoute';
import AdminPrivateRoute from './features/auth/AdminPrivateRoute';

import RechargePlansPage from './pages/Admins/RechargePlansPage';
import AdminPage from './pages/Admins/AdminPage';
import RechargePage from './pages/RechargePage';
import PaymentPage from './pages/PaymentPage';
import ChatbotPage from './pages/ChatbotPage';
import AddOptionPage from './pages/Admins/AddOptionPage';
import AddnewplanPage from './pages/Admins/AddnewplanPage';
import EditPlanPage from './pages/Admins/EditPlanPage';
import HomePage from './pages/HomePage';
import ChatscreenPage from './pages/ChatscreenPage';
import AddnewcatPage from './pages/Admins/AddnewcatPage';

function App() {
  return (
    <div>
      <Router>
      <Routes>
      <Route exact path="/profile/*"
            element={
              (
                <PrivateRoute
                  element={<ProfilePage/>}
                />
              )
            }
          />

          
        <Route exact path="/admins/"
            element={
              (
                <AdminPrivateRoute
                  element={<AdminPage/>}
                />
              )
            }
          />
          
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/chatbot" element={<ChatbotPage/>} />
        <Route path="/chat" element={<ChatscreenPage/>} />
        <Route path="/admins/chatmanager" element={<AddOptionPage/>} />
        <Route path="/admins/recharge/add" element={<AddnewplanPage/>} />
        <Route path="/admins/category/add" element={<AddnewcatPage />} />
        <Route path="/admins/recharge/edit" element={<EditPlanPage/>} />
        
        <Route path="/recharge" element={<RechargePage />} />
        <Route path="/payment" element={<PaymentPage />} />
        
       
        {/* <Route path="/admins" element={<AdminPage/>} /> */}
        <Route path="/admins/recharge-plans" element={<RechargePlansPage />} />


        {/* <Route path="/profile" element={<ProfilePage />} /> */}
        <Route path="/registration" element={<RegistrationPage />} />
        
        
        <Route path="/admins/pendingconnections" element={<PendingConnectionsPage/>} />
        <Route path="/admins/login" element={<AdminLogin/>} />
      </Routes>
    </Router>
    <ToastContainer />

    </div>
    
  );
}

export default App;
