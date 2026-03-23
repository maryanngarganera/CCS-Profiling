import { useState } from 'react'
import { Calendar, Book, PartyPopper, Users, Clock, MapPin, User, Plus } from 'lucide-react'
import './Events.css'
import { T } from '../constants/colors';

const initialEvents = [
  { id: 1, title: 'Faculty Development Program', type: 'Curricular', date: '2024-11-15', time: '9:00 AM - 4:00 PM', location: 'Conference Hall', organizer: 'Dr. Ricardo Martinez', status: 'Upcoming', attendees: 45 },
  { id: 2, title: 'Student Orientation', type: 'Extra-Curricular', date: '2024-11-18', time: '10:00 AM - 12:00 PM', location: 'Main Auditorium', organizer: 'Student Affairs', status: 'Upcoming', attendees: 120 },
  { id: 3, title: 'Mid-term Examinations', type: 'Curricular', date: '2024-11-22', time: 'All Day', location: 'Various Rooms', organizer: 'Examination Cell', status: 'Upcoming', attendees: 0 },
  { id: 4, title: 'Tech Symposium 2024', type: 'Extra-Curricular', date: '2024-11-25', time: '9:00 AM - 5:00 PM', location: 'CS Building', organizer: 'Computer Science Dept', status: 'Upcoming', attendees: 200 },
  { id: 5, title: 'Parent-Teacher Meeting', type: 'Curricular', date: '2024-11-28', time: '2:00 PM - 5:00 PM', location: 'Conference Hall', organizer: 'Academic Office', status: 'Upcoming', attendees: 80 },
  { id: 6, title: 'Sports Day', type: 'Extra-Curricular', date: '2024-12-05', time: '8:00 AM - 6:00 PM', location: 'Sports Complex', organizer: 'Physical Education', status: 'Upcoming', attendees: 300 },
  { id: 7, title: 'Workshop: AI & ML', type: 'Curricular', date: '2024-12-10', time: '10:00 AM - 4:00 PM', location: 'Lab 401', organizer: 'Dr. Sofia Bautista', status: 'Upcoming', attendees: 35 },
  { id: 8, title: 'Annual Day Celebration', type: 'Extra-Curricular', date: '2024-12-20', time: '5:00 PM - 9:00 PM', location: 'Main Auditorium', organizer: 'Cultural Committee', status: 'Upcoming', attendees: 500 },
]

const tabs = [
  { id: 'curricular', label: 'Curricular', icon: Book },
  { id: 'extracurricular', label: 'Extra-Curricular', icon: PartyPopper },
  { id: 'calendar', label: 'Calendar', icon: Calendar },
]

const Events = () => {
  const [activeTab, setActiveTab] = useState('curricular')
  const [events, setEvents] = useState(initialEvents)
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredEvents = events.filter(e => {
    const matchesType = filterType === 'all' || e.type === filterType
    const matchesStatus = filterStatus === 'all' || e.status === filterStatus
    return matchesType && matchesStatus
  })

  const upcomingEvents = events.filter(e => e.status === 'Upcoming')
  const curricularEvents = events.filter(e => e.type === 'Curricular')
  const extracurricularEvents = events.filter(e => e.type === 'Extra-Curricular')

  return (
    <div className="events-page">
<div className="fade-up" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ background: `linear-gradient(135deg, ${T.blue}, #2563eb)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Events</span> Management
        </h1>
        <p style={{ color: T.muted, fontSize: 16 }}>
          Manage curricular and extra-curricular events.
        </p>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-icon"><Calendar size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{upcomingEvents.length}</span>
            <span className="stat-label">Upcoming Events</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}><Book size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{curricularEvents.length}</span>
            <span className="stat-label">Curricular</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#fce7f3', color: '#db2777' }}><PartyPopper size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{extracurricularEvents.length}</span>
            <span className="stat-label">Extra-Curricular</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><Users size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{events.reduce((acc, e) => acc + e.attendees, 0)}</span>
            <span className="stat-label">Total Attendees</span>
          </div>
        </div>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className="tab-icon"><tab.icon size={18} /></span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="all">All Types</option>
            <option value="Curricular">Curricular</option>
            <option value="Extra-Curricular">Extra-Curricular</option>
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Upcoming">Upcoming</option>
            <option value="Completed">Completed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="events-grid">
        {filteredEvents.map(event => (
          <div key={event.id} className="event-card">
            <div className="event-header">
              <span className={`event-type ${event.type.toLowerCase().replace(' ', '-')}`}>
                {event.type === 'Curricular' ? <Book size={16} /> : <PartyPopper size={16} />} {event.type}
              </span>
              <span className={`event-status ${event.status.toLowerCase()}`}>{event.status}</span>
            </div>
            <h3 className="event-title">{event.title}</h3>
            <div className="event-details">
              <div className="event-detail">
                <span className="detail-icon"><Calendar size={16} /></span>
                <span>{event.date}</span>
              </div>
              <div className="event-detail">
                <span className="detail-icon"><Clock size={16} /></span>
                <span>{event.time}</span>
              </div>
              <div className="event-detail">
                <span className="detail-icon"><MapPin size={16} /></span>
                <span>{event.location}</span>
              </div>
              <div className="event-detail">
                <span className="detail-icon"><User size={16} /></span>
                <span>{event.organizer}</span>
              </div>
            </div>
            {event.attendees > 0 && (
              <div className="event-attendees">
                <Users size={16} /> {event.attendees} attendees
              </div>
            )}
            <div className="event-actions">
              <button className="event-action-btn">View Details</button>
              <button className="event-action-btn secondary">Edit</button>
            </div>
          </div>
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="empty-state">
          <PartyPopper size={48} className="empty-icon" />
          <p>No events found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default Events

