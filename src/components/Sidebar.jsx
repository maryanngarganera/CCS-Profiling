import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Sidebar.css'

const menuItems = [
  { path: '/dashboard', label: 'Dashboard', exact: true },
  { path: '/students', label: 'Student Information' },
  { path: '/faculty', label: 'Faculty Information' },
  { path: '/instruction', label: 'Instruction' },
  { path: '/scheduling', label: 'Scheduling' },
  { path: '/events', label: 'Events' },
  { path: '/search', label: 'Search' },
]

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const { user, logout } = useAuth()

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-text">CCS Profiling</span>
        </div>
        <button className="sidebar-close" onClick={toggleSidebar}>X</button>
      </div>

      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            <span className="nav-label">{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <img src={user?.avatar} alt={user?.name} className="user-avatar" />
          <div className="user-details">
            <span className="user-name">{user?.name}</span>
            <span className="user-role">{user?.role}</span>
          </div>
        </div>
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  )
}

export default Sidebar

