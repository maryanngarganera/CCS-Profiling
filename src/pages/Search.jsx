import { useState } from 'react'
import { User, GraduationCap, Book, PartyPopper, File, Search, X } from 'lucide-react'
import './Search.css'

const studentsData = [
  { id: 1, type: 'student', name: 'Juan dela Cruz', studentId: 'STU-2024-001', email: 'juan.cruz@ccs.edu', program: 'BS Computer Science', year: '3rd Year' },
  { id: 2, type: 'student', name: 'Maria Santos', studentId: 'STU-2024-002', email: 'maria.santos@ccs.edu', program: 'BS Information Technology', year: '2nd Year' },
  { id: 3, type: 'student', name: 'Pedro Reyes', studentId: 'STU-2024-003', email: 'pedro.reyes@ccs.edu', program: 'BS Computer Science', year: '4th Year' },
]

const facultyData = [
  { id: 1, type: 'faculty', name: 'Dr. Ricardo Martinez', facultyId: 'FAC-001', email: 'ricardo.martinez@ccs.edu', department: 'Computer Science', position: 'Professor' },
  { id: 2, type: 'faculty', name: 'Dr. Sofia Bautista', facultyId: 'FAC-002', email: 'sofia.bautista@ccs.edu', department: 'Information Technology', position: 'Associate Professor' },
]

const coursesData = [
  { id: 1, type: 'course', name: 'CS101 - Introduction to Programming', code: 'CS101', department: 'Computer Science', credits: 3 },
  { id: 2, type: 'course', name: 'CS201 - Data Structures & Algorithms', code: 'CS201', department: 'Computer Science', credits: 4 },
  { id: 3, type: 'course', name: 'IT301 - Database Management Systems', code: 'IT301', department: 'Information Technology', credits: 3 },
]

const eventsData = [
  { id: 1, type: 'event', name: 'Faculty Development Program', date: '2024-11-15', location: 'Conference Hall', category: 'Curricular' },
  { id: 2, type: 'event', name: 'Student Orientation', date: '2024-11-18', location: 'Main Auditorium', category: 'Extra-Curricular' },
  { id: 3, type: 'event', name: 'Tech Symposium 2024', date: '2024-11-25', location: 'CS Building', category: 'Extra-Curricular' },
]

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filters, setFilters] = useState({
    type: 'all',
    department: 'all',
    year: 'all',
    status: 'all',
  })

  const allData = [...studentsData, ...facultyData, ...coursesData, ...eventsData]

  const filteredData = allData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.studentId && item.studentId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.facultyId && item.facultyId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.email && item.email.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (item.code && item.code.toLowerCase().includes(searchTerm.toLowerCase()))
    
    const matchesType = filters.type === 'all' || item.type === filters.type
    
    return matchesSearch && matchesType
  })

  const getResultIcon = (type) => {
    switch (type) {
      case 'student': return User
      case 'faculty': return GraduationCap
      case 'course': return Book
      case 'event': return PartyPopper
      default: return File
    }
  }

  const getResultDetails = (item) => {
    switch (item.type) {
      case 'student':
        return (
          <>
            <span className="detail">{item.program}</span>
            <span className="detail">{item.year}</span>
          </>
        )
      case 'faculty':
        return (
          <>
            <span className="detail">{item.department}</span>
            <span className="detail">{item.position}</span>
          </>
        )
      case 'course':
        return (
          <>
            <span className="detail">{item.department}</span>
            <span className="detail">{item.credits} Credits</span>
          </>
        )
      case 'event':
        return (
          <>
            <span className="detail">{item.date}</span>
            <span className="detail">{item.location}</span>
          </>
        )
      default:
        return null
    }
  }

  const ResultIcon = getResultIcon(filters.type)

  return (
    <div className="search-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Comprehensive Search</h1>
          <p>Search across students, faculty, courses, and events</p>
        </div>
      </div>

      <div className="search-container">
        <div className="search-box-large">
          <span className="search-icon-large"><Search size={24} /></span>
          <input
            type="text"
            placeholder="Search by name, ID, email, course code..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input-large"
          />
          {searchTerm && (
            <button className="clear-btn" onClick={() => setSearchTerm('')}><X size={20} /></button>
          )}
        </div>

        <div className="search-filters">
          <div className="filter-chips">
            <button 
              className={`filter-chip ${filters.type === 'all' ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, type: 'all' })}
            >
              All
            </button>
            <button 
              className={`filter-chip ${filters.type === 'student' ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, type: 'student' })}
            >
              <User size={16} /> Students
            </button>
            <button 
              className={`filter-chip ${filters.type === 'faculty' ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, type: 'faculty' })}
            >
              <GraduationCap size={16} /> Faculty
            </button>
            <button 
              className={`filter-chip ${filters.type === 'course' ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, type: 'course' })}
            >
              <Book size={16} /> Courses
            </button>
            <button 
              className={`filter-chip ${filters.type === 'event' ? 'active' : ''}`}
              onClick={() => setFilters({ ...filters, type: 'event' })}
            >
              <PartyPopper size={16} /> Events
            </button>
          </div>
        </div>
      </div>

      <div className="search-results">
        <div className="results-header">
          <span className="results-count">
            {filteredData.length} result{filteredData.length !== 1 ? 's' : ''} found
          </span>
        </div>

        <div className="results-list">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => {
              const IconComponent = getResultIcon(item.type)
              return (
                <div key={index} className="result-card">
                  <div className="result-icon"><IconComponent size={24} /></div>
                  <div className="result-content">
                    <div className="result-header">
                      <h3 className="result-name">{item.name}</h3>
                      <span className={`result-type ${item.type}`}>{item.type}</span>
                    </div>
                    <div className="result-id">
                      {item.id && `ID: ${item.id}`}
                      {item.code && `Code: ${item.code}`}
                    </div>
                    <div className="result-details">
                      {getResultDetails(item)}
                    </div>
                  </div>
                  <div className="result-actions">
                    <button className="result-action-btn">View</button>
                  </div>
                </div>
              )
            })
          ) : (
            <div className="no-results">
              <Search size={48} className="no-results-icon" />
              <p>No results found for "{searchTerm}"</p>
              <span className="no-results-hint">Try searching with different keywords</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchPage

