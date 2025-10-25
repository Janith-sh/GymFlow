import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Members from './pages/Members';
import Trainers from './pages/Trainers';
import Payments from './pages/Payments';
import Attendance from './pages/Attendance';
import AttendanceReport from './pages/AttendanceReport';
import QRScanAttendance from './pages/QRScanAttendance';
import Schedule from './pages/Schedule';
import Reports from './pages/Reports';
import Feedback from './pages/Feedback';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/check-in" element={<QRScanAttendance />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/" element={<Login />} />
        <Route path="/members" element={<Layout><Members /></Layout>} />
        <Route path="/trainers" element={<Layout><Trainers /></Layout>} />
        <Route path="/payments" element={<Layout><Payments /></Layout>} />
        <Route path="/attendance" element={<Layout><Attendance /></Layout>} />
        <Route path="/attendance/report" element={<Layout><AttendanceReport /></Layout>} />
        <Route path="/schedule" element={<Layout><Schedule /></Layout>} />
        <Route path="/reports" element={<Layout><Reports /></Layout>} />
        <Route path="/feedback" element={<Layout><Feedback /></Layout>} />
        <Route path="/settings" element={<Layout><Settings /></Layout>} />
      </Routes>
    </Router>
  );
}

export default App;
