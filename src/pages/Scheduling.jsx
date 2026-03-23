import { useState } from 'react'
import './Scheduling.css'
import { T } from '../constants/colors';

const initialSchedules = [
  { id: 1, course: 'CS101', section: 'A', courseName: 'Introduction to Programming', faculty: 'Dr. Ricardo Martinez', room: 'Room 101', building: 'CS Building', day: 'Monday', time: '9:00 AM - 10:30 AM', type: 'Lecture' },
  { id: 2, course: 'CS201', section: 'A', courseName: 'Data Structures & Algorithms', faculty: 'Prof. Antonio Lopez', room: 'Lab 201', building: 'CS Building', day: 'Monday', time: '11:00 AM - 12:30 PM', type: 'Lab' },
  { id: 3, course: 'IT301', section: 'A', courseName: 'Database Management Systems', faculty: 'Dr. Sofia Bautista', room: 'Room 305', building: 'IT Building', day: 'Tuesday', time: '9:00 AM - 10:30 AM', type: 'Lecture' },
  { id: 4, course: 'CS401', section: 'A', courseName: 'Artificial Intelligence', faculty: 'Dr. Ricardo Martinez', room: 'Lab 401', building: 'CS Building', day: 'Tuesday', time: '1:00 PM - 2:30 PM', type: 'Lab' },
  { id: 5, course: 'IT201', section: 'A', courseName: 'Web Development', faculty: 'Dr. Elena Cruz', room: 'Lab 202', building: 'IT Building', day: 'Wednesday', time: '9:00 AM - 10:30 AM', type: 'Lab' },
  { id: 6, course: 'CS301', section: 'A', courseName: 'Software Engineering', faculty: 'Dr. Ferdinand Santos', room: 'Room 102', building: 'CS Building', day: 'Wednesday', time: '11:00 AM - 12:30 PM', type: 'Lecture' },
  { id: 7, course: 'CY301', section: 'A', courseName: 'Cyber Security Fundamentals', faculty: 'Dr. Manuel Filipino', room: 'Lab 301', building: 'CS Building', day: 'Thursday', time: '9:00 AM - 10:30 AM', type: 'Lab' },
  { id: 8, course: 'DS301', section: 'A', courseName: 'Data Science & Analytics', faculty: 'Prof. Gloria Rivera', room: 'Lab 501', building: 'DS Building', day: 'Thursday', time: '1:00 PM - 2:30 PM', type: 'Lab' },
]

const rooms = [
  { id: 1, name: 'Room 101', building: 'CS Building', capacity: 40, type: 'Classroom' },
  { id: 2, name: 'Room 102', building: 'CS Building', capacity: 35, type: 'Classroom' },
  { id: 3, name: 'Lab 201', building: 'CS Building', capacity: 30, type: 'Lab' },
  { id: 4, name: 'Lab 202', building: 'IT Building', capacity: 30, type: 'Lab' },
  { id: 5, name: 'Room 305', building: 'IT Building', capacity: 45, type: 'Classroom' },
  { id: 6, name: 'Lab 301', building: 'CS Building', capacity: 25, type: 'Lab' },
  { id: 7, name: 'Lab 401', building: 'CS Building', capacity: 25, type: 'Lab' },
  { id: 8, name: 'Lab 501', building: 'DS Building', capacity: 30, type: 'Lab' },
]

const tabs = [
  { id: 'schedule', label: 'Schedule' },
  { id: 'courses', label: 'Courses' },
  { id: 'sections', label: 'Sections' },
  { id: 'rooms', label: 'Rooms' },
]

const Scheduling = () => {
  const [activeTab, setActiveTab] = useState('schedule')
  const [schedules, setSchedules] = useState(initialSchedules)
  const [filterDay, setFilterDay] = useState('all')
  const [filterType, setFilterType] = useState('all')

  const filteredSchedules = schedules.filter(s => {
    const matchesDay = filterDay === 'all' || s.day === filterDay
    const matchesType = filterType === 'all' || s.type === filterType
    return matchesDay && matchesType
  })

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']

  return (
    <div className="scheduling-page">
<div className="fade-up" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ background: `linear-gradient(135deg, ${T.purple}, #7c3aed)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Scheduling</span> Management
        </h1>
        <p style={{ color: T.muted, fontSize: 16 }}>
          Manage course schedules, sections, rooms, and faculty assignments.
        </p>
      </div>

      <div className="tabs-container">
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {activeTab === 'schedule' && (
        <>
          <div className="filters-section">
            <div className="filter-group">
              <select value={filterDay} onChange={(e) => setFilterDay(e.target.value)}>
                <option value="all">All Days</option>
                {days.map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
              </select>
              <select value={filterType} onChange={(e) => setFilterType(e.target.value)}>
                <option value="all">All Types</option>
                <option value="Lecture">Lecture</option>
                <option value="Lab">Lab</option>
              </select>
            </div>
          </div>

          <div className="schedule-grid">
            {days.map(day => {
              const daySchedules = filteredSchedules.filter(s => s.day === day)
              if (filterDay !== 'all' && day !== filterDay) return null
              return (
                <div key={day} className="day-column">
                  <div className="day-header">
                    <span className="day-name">{day}</span>
                    <span className="day-count">{daySchedules.length} classes</span>
                  </div>
                  <div className="day-schedules">
                    {daySchedules.map(schedule => (
                      <div key={schedule.id} className={`schedule-card ${schedule.type.toLowerCase()}`}>
                        <div className="schedule-time">{schedule.time}</div>
                        <div className="schedule-course">{schedule.course} - {schedule.section}</div>
                        <div className="schedule-name">{schedule.courseName}</div>
                        <div className="schedule-details">
                          <span>{schedule.faculty}</span>
                          <span>{schedule.room}</span>
                        </div>
                        <span className={`schedule-type ${schedule.type.toLowerCase()}`}>{schedule.type}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </>
      )}

      {activeTab === 'rooms' && (
        <div className="rooms-grid">
          {rooms.map(room => (
            <div key={room.id} className="room-card">
              <div className="room-info">
                <h3>{room.name}</h3>
                <p>{room.building}</p>
              </div>
              <div className="room-meta">
                <span className="room-capacity">{room.capacity} seats</span>
                <span className={`room-type ${room.type.toLowerCase()}`}>{room.type}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Scheduling

