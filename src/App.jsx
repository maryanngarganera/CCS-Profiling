import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from './context/AuthContext'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Students from './pages/Students'
import Faculty from './pages/Faculty'
import Instruction from './pages/Instruction'
import Scheduling from './pages/Scheduling'
import Events from './pages/Events'
import Search from './pages/Search'
import NotFound from './pages/NotFound'
import StudentProfilePage from './pages/StudentProfilePage'
import FacultyProfilePage from './pages/FacultyProfilePage'
import './App.css'

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) {
    return <Navigate to="/login" replace />
  }
  return children
}

const AppLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  
  return (
    <div className="app-layout">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
      <div className="main-content">
        <Header toggleSidebar={() => setSidebarOpen(!sidebarOpen)} />
        <main className="page-content">
          {children}
        </main>
      </div>
    </div>
  )
}

function App() {
  const { user } = useAuth()
  const [selectedStudent, setSelectedStudent] = useState(null)
  
  return (
    <Router>
      <Routes>
        <Route path="/login" element={user ? <Navigate to="/dashboard" replace /> : <Login />} />
        
        <Route path="/" element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AppLayout>
              <Dashboard />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/students" element={
          <ProtectedRoute>
            <AppLayout>
              <Students setSelectedStudent={setSelectedStudent} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/student-profile" element={
          <ProtectedRoute>
            <AppLayout>
              <StudentProfilePage student={selectedStudent} />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/faculty" element={
          <ProtectedRoute>
            <AppLayout>
              <Faculty />
            </AppLayout>
          </ProtectedRoute>
        } />
        <Route path="/faculty/:id" element={
          <ProtectedRoute>
            <AppLayout>
              <FacultyProfilePage />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/instruction" element={
          <ProtectedRoute>
            <AppLayout>
              <Instruction />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/scheduling" element={
          <ProtectedRoute>
            <AppLayout>
              <Scheduling />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/events" element={
          <ProtectedRoute>
            <AppLayout>
              <Events />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/search" element={
          <ProtectedRoute>
            <AppLayout>
              <Search />
            </AppLayout>
          </ProtectedRoute>
        } />
        
        <Route path="*" element={
          <ProtectedRoute>
            <AppLayout>
              <NotFound />
            </AppLayout>
          </ProtectedRoute>
        } />
      </Routes>
    </Router>
  )
}

export default App

