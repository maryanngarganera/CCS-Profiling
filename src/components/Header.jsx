import { useAuth } from '../context/AuthContext'
import './Header.css'

const Header = ({ toggleSidebar }) => {
  const { user } = useAuth()

  return (
    <header className="header">
      <div className="header-left">
        <button className="menu-toggle" onClick={toggleSidebar}>
          <span></span>
          <span></span>
          <span></span>
        </button>
        <div className="breadcrumb">
          <span className="breadcrumb-item">CCS Profiling</span>
        </div>
      </div>

      <div className="header-right">
        <div className="search-box">
          <input type="text" placeholder="Quick search..." />
        </div>
        
        <div className="header-user">
          <img src={user?.avatar} alt={user?.name} className="header-avatar" />
          <span className="header-username">{user?.name}</span>
        </div>
      </div>
    </header>
  )
}

export default Header

