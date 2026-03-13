import { useAuth } from '../context/AuthContext'
import { Users, GraduationCap, Book, Calendar, User, FileText, Home, Sparkles, Plus, Hand } from 'lucide-react'
import './Dashboard.css'

const stats = [
  { icon: Users, label: 'Total Students', value: '1,234', change: '+12%', color: '#6366f1' },
  { icon: GraduationCap, label: 'Faculty Members', value: '89', change: '+5%', color: '#10b981' },
  { icon: Book, label: 'Active Courses', value: '156', change: '+8%', color: '#f59e0b' },
  { icon: Calendar, label: 'Scheduled Classes', value: '423', change: '+15%', color: '#ec4899' },
]

const recentActivities = [
  { id: 1, action: 'New student enrolled', module: 'Students', time: '5 min ago', icon: User },
  { id: 2, action: 'Faculty meeting scheduled', module: 'Faculty', time: '1 hour ago', icon: Calendar },
  { id: 3, action: 'Syllabus updated', module: 'Instruction', time: '2 hours ago', icon: FileText },
  { id: 4, action: 'Room booking confirmed', module: 'Scheduling', time: '3 hours ago', icon: Home },
  { id: 5, action: 'New event created', module: 'Events', time: '5 hours ago', icon: Sparkles },
]

const quickActions = [
  { icon: Plus, label: 'Add Student', path: '/students', color: '#6366f1' },
  { icon: GraduationCap, label: 'Add Faculty', path: '/faculty', color: '#10b981' },
  { icon: Book, label: 'Create Course', path: '/instruction', color: '#f59e0b' },
  { icon: Calendar, label: 'Schedule Class', path: '/scheduling', color: '#ec4899' },
]

const Dashboard = () => {
  const { user } = useAuth()

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="welcome-section">
          <h1>Welcome back, {user?.name}!</h1>
          <p>Here's what's happening with your campus today.</p>
        </div>
      </div>

      <div className="stats-grid">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card">
            <div className="stat-icon" style={{ background: `${stat.color}15`, color: stat.color }}>
              <stat.icon size={24} />
            </div>
            <div className="stat-content">
              <span className="stat-label">{stat.label}</span>
              <span className="stat-value">{stat.value}</span>
              <span className="stat-change" style={{ color: stat.color }}>
                {stat.change} from last month
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="dashboard-card recent-activity">
          <div className="card-header">
            <h2>Recent Activity</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="activity-list">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="activity-item">
                <div className="activity-icon">
                  <activity.icon size={20} />
                </div>
                <div className="activity-content">
                  <span className="activity-action">{activity.action}</span>
                  <span className="activity-meta">
                    <span className="activity-module">{activity.module}</span>
                    <span className="activity-time">{activity.time}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card quick-actions">
          <div className="card-header">
            <h2>Quick Actions</h2>
          </div>
          <div className="actions-grid">
            {quickActions.map((action, index) => (
              <button key={index} className="quick-action-btn">
                <span className="action-icon" style={{ background: `${action.color}15`, color: action.color }}>
                  <action.icon size={20} />
                </span>
                <span className="action-label">{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="dashboard-card upcoming-events">
          <div className="card-header">
            <h2>Upcoming Events</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="events-list">
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">15</span>
                <span className="event-month">Nov</span>
              </div>
              <div className="event-content">
                <span className="event-title">Faculty Development Program</span>
                <span className="event-time">9:00 AM - 4:00 PM</span>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">18</span>
                <span className="event-month">Nov</span>
              </div>
              <div className="event-content">
                <span className="event-title">Student Orientation</span>
                <span className="event-time">10:00 AM - 12:00 PM</span>
              </div>
            </div>
            <div className="event-item">
              <div className="event-date">
                <span className="event-day">22</span>
                <span className="event-month">Nov</span>
              </div>
              <div className="event-content">
                <span className="event-title">Mid-term Examinations</span>
                <span className="event-time">All Day</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

