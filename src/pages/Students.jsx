import { useState } from 'react'
import { Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { MOCK_STUDENTS } from '../constants/data'
import { yearLabel } from '../utils/helpers'
import './Students.css'

const Students = ({ setSelectedStudent }) => {
  const navigate = useNavigate()
  const [students, setStudents] = useState(MOCK_STUDENTS)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProgram, setFilterProgram] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const filteredStudents = students.filter(student => {
    const matchesSearch = `${student.first_name} ${student.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.student_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesProgram && matchesStatus
  })

  const programs = [...new Set(MOCK_STUDENTS.map(s => s.program))]

  // count for header
  const studentCount = filteredStudents.length

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '48px' }}>
      {/* header similar to StudentsPage layout */}
      <div className="fade-up" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ color: '#6366f1' }}>Students</span> Information
        </h1>
        <p style={{ color: '#64748b', fontSize: 14 }}>
          Browse all enrolled students and view detailed academic profiles.
        </p>
      </div>

      <div className="fade-up fade-up-1" style={{ display: 'flex', gap: 12, marginBottom: 32, flexWrap: 'wrap', alignItems: 'center' }}>
        <div style={{ position: 'relative' }}>
          <span style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', fontSize: 14, color: '#64748b' }}>
            <Search size={14} />
          </span>
          <input
            className="search-input"
            placeholder="Search by name, ID or email…"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            style={{ paddingLeft: 36 }}
          />
        </div>

        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {programs.map(p => (
            <button key={p} onClick={() => setFilterProgram(p)} style={{
              padding: '8px 14px', borderRadius: 9, fontSize: 11, fontWeight: 600,
              cursor: 'pointer', fontFamily: 'monospace', letterSpacing: '0.05em',
              border: `1px solid ${filterProgram === p ? '#6366f150' : '#e2e8f0'}`,
              background: filterProgram === p ? '#6366f150' : 'transparent',
              color: filterProgram === p ? '#6366f1' : '#64748b',
              transition: 'all 0.15s',
            }}>
              {p === 'all' ? 'All Programs' : p}
            </button>
          ))}
        </div>

        <div style={{ marginLeft: 'auto', fontSize: 12, color: '#64748b', fontFamily: 'monospace' }}>
          {studentCount} student{studentCount !== 1 ? 's' : ''}
        </div>
      </div>

      <div className="filters-section">
        <div className="filter-group">
          <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="all">All Status</option>
            <option value="Active">Active</option>
            <option value="Probation">Probation</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>
      </div>

      <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Program</th>
              <th>Year</th>
              <th>GPA</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td className="student-id">{student.student_number}</td>
                <td>
                  <div className="student-name">
                    <span className="avatar">{student.first_name.charAt(0)}</span>
                    {student.first_name} {student.last_name}
                  </div>
                </td>
                <td className="email">{student.email}</td>
                <td>{student.program}</td>
                <td>{yearLabel(student.year_level)}</td>
                <td className="gpa">{student.gpa}</td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <button className="action-btn view" title="View" onClick={() => { setSelectedStudent(student); navigate('/student-profile'); }}><Eye size={16} /></button>
                    <button className="action-btn edit" title="Edit"><Pencil size={16} /></button>
                    <button className="action-btn delete" title="Delete"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <span className="pagination-info">Showing {filteredStudents.length} of {students.length} students</span>
        <div className="pagination-buttons">
          <button className="page-btn" disabled>Previous</button>
          <button className="page-btn active">1</button>
          <button className="page-btn">2</button>
          <button className="page-btn">3</button>
          <button className="page-btn">Next</button>
        </div>
      </div>
    </div>
  )
}

export default Students

