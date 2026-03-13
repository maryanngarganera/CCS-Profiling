import { useState } from 'react'
import { GraduationCap, CheckCircle, Calendar, Book, Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import './Faculty.css'

const initialFaculty = [
  { id: 1, facultyId: 'FAC-001', name: 'Dr. Ricardo Martinez', email: 'ricardo.martinez@ccs.edu', department: 'Computer Science', position: 'Professor', specialization: 'Artificial Intelligence', courses: 3, status: 'Active' },
  { id: 2, facultyId: 'FAC-002', name: 'Dr. Sofia Bautista', email: 'sofia.bautista@ccs.edu', department: 'Information Technology', position: 'Associate Professor', specialization: 'Database Systems', courses: 2, status: 'Active' },
  { id: 3, facultyId: 'FAC-003', name: 'Prof. Antonio Lopez', email: 'antonio.lopez@ccs.edu', department: 'Computer Science', position: 'Professor', specialization: 'Machine Learning', courses: 4, status: 'Active' },
  { id: 4, facultyId: 'FAC-004', name: 'Dr. Elena Cruz', email: 'elena.cruz@ccs.edu', department: 'Data Science', position: 'Assistant Professor', specialization: 'Data Analytics', courses: 2, status: 'Active' },
  { id: 5, facultyId: 'FAC-005', name: 'Dr. Manuel Filipino', email: 'manuel.filipino@ccs.edu', department: 'Cyber Security', position: 'Associate Professor', specialization: 'Network Security', courses: 3, status: 'Active' },
  { id: 6, facultyId: 'FAC-006', name: 'Prof. Theresa Dimagiba', email: 'theresa.dimagiba@ccs.edu', department: 'Information Technology', position: 'Professor', specialization: 'Web Development', courses: 2, status: 'On Leave' },
  { id: 7, facultyId: 'FAC-007', name: 'Dr. Ferdinand Santos', email: 'ferdinand.santos@ccs.edu', department: 'Computer Science', position: 'Assistant Professor', specialization: 'Software Engineering', courses: 3, status: 'Active' },
  { id: 8, facultyId: 'FAC-008', name: 'Prof. Gloria Rivera', email: 'gloria.rivera@ccs.edu', department: 'Data Science', position: 'Professor', specialization: 'Big Data', courses: 2, status: 'Active' },
]

const Faculty = () => {
  const [faculty, setFaculty] = useState(initialFaculty)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')

  const filteredFaculty = faculty.filter(f => {
    const matchesSearch = f.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.facultyId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      f.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || f.department === filterDepartment
    const matchesStatus = filterStatus === 'all' || f.status === filterStatus
    return matchesSearch && matchesDepartment && matchesStatus
  })

  const departments = [...new Set(initialFaculty.map(f => f.department))]

  return (
    <div className="faculty-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Faculty Information</h1>
          <p>Manage faculty members and their details</p>
        </div>
        <button className="add-btn">
          <Plus size={18} /> Add Faculty
        </button>
      </div>

      <div className="stats-row">
        <div className="stat-box">
          <span className="stat-icon"><GraduationCap size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{faculty.length}</span>
            <span className="stat-label">Total Faculty</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#dcfce7', color: '#16a34a' }}><CheckCircle size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{faculty.filter(f => f.status === 'Active').length}</span>
            <span className="stat-label">Active</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#fef3c7', color: '#d97706' }}><Calendar size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{faculty.filter(f => f.status === 'On Leave').length}</span>
            <span className="stat-label">On Leave</span>
          </div>
        </div>
        <div className="stat-box">
          <span className="stat-icon" style={{ background: '#dbeafe', color: '#2563eb' }}><Book size={24} /></span>
          <div className="stat-info">
            <span className="stat-number">{faculty.reduce((acc, f) => acc + f.courses, 0)}</span>
            <span className="stat-label">Total Courses</span>
          </div>
        </div>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            placeholder="Search by name, ID, or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-group">
          <select value={filterDepartment} onChange={(e) => setFilterDepartment(e.target.value)}>
            <option value="all">All Departments</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Faculty ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Position</th>
              <th>Specialization</th>
              <th>Courses</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaculty.map(f => (
              <tr key={f.id}>
                <td className="faculty-id">{f.facultyId}</td>
                <td>
                  <div className="faculty-name">
                    <span className="avatar">{f.name.split(' ').map(n => n[0]).join('')}</span>
                    {f.name}
                  </div>
                </td>
                <td className="email">{f.email}</td>
                <td><span className="department-badge">{f.department}</span></td>
                <td>{f.position}</td>
                <td>{f.specialization}</td>
                <td className="courses-count">{f.courses}</td>
                <td>
                  <span className={`status-badge ${f.status.toLowerCase().replace(' ', '-')}`}>
                    {f.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View"><Eye size={16} /></button>
                    <button className="action-btn edit" title="Edit"><Pencil size={16} /></button>
                    <button className="action-btn delete" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Faculty

