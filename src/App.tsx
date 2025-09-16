import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Business from './pages/Business';
import Network from './pages/Network';
import Careers from './pages/Careers';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import ManageEmployees from './pages/ManageEmployees';
import EmployeeDirectory from './pages/EmployeeDirectory';
import Service from './pages/Service';
import ContactUs from './pages/Contact';
import FloatingContact from './components/FloatingContact';
import Register from './pages/Register';
import JobListPage from './pages/Job';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/business" element={<Business />} />
              <Route path="/network" element={<Network />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/contact" element={<ContactUs/>} />
              <Route path="/login" element={<Login />} />
              <Route path='/register' element={<Register/>}/>
              
              {/* Protected Routes */}
              <Route 
                path="/dashboard" 
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                } 
              />
              <Route path='/admin/employees' element={<ManageEmployees/>}/>
              <Route path='/admin/employeedetail' element={<EmployeeDirectory/>}/>
              <Route path='/employeedetail' element={<EmployeeDirectory/>}/>
              <Route path='/admin/services' element={<Service/>}/>
              <Route path='/jobs' element={<JobListPage/>}/>
            </Routes>
            <FloatingContact/>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;