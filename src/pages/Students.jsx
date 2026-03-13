import { useState } from 'react'
import { Search, Plus, Eye, Pencil, Trash2 } from 'lucide-react'
import './Students.css'

const initialStudents = [
  { id: 1, studentId: 'STU-2024-001', name: 'Juan dela Cruz', email: 'juan.cruz@ccs.edu', program: 'BS Computer Science', year: '3rd Year', status: 'Active', gpa: '3.75' },
  { id: 2, studentId: 'STU-2024-002', name: 'Maria Santos', email: 'maria.santos@ccs.edu', program: 'BS Information Technology', year: '2nd Year', status: 'Active', gpa: '3.85' },
  { id: 3, studentId: 'STU-2024-003', name: 'Pedro Reyes', email: 'pedro.reyes@ccs.edu', program: 'BS Computer Science', year: '4th Year', status: 'Active', gpa: '3.92' },
  { id: 4, studentId: 'STU-2024-004', name: 'Ana Garcia', email: 'ana.garcia@ccs.edu', program: 'BS Data Science', year: '3rd Year', status: 'Active', gpa: '3.65' },
  { id: 5, studentId: 'STU-2024-005', name: 'Jose Rodriguez', email: 'jose.rodriguez@ccs.edu', program: 'BS Computer Science', year: '1st Year', status: 'Probation', gpa: '2.45' },
  { id: 6, studentId: 'STU-2024-006', name: 'Carmen Mendoza', email: 'carmen.mendoza@ccs.edu', program: 'BS Information Technology', year: '2nd Year', status: 'Active', gpa: '3.55' },
  { id: 7, studentId: 'STU-2024-007', name: 'Miguel Torres', email: 'miguel.torres@ccs.edu', program: 'BS Cyber Security', year: '3rd Year', status: 'Active', gpa: '3.80' },
  { id: 8, studentId: 'STU-2024-008', name: 'Luz Flores', email: 'luz.flores@ccs.edu', program: 'BS Computer Science', year: '4th Year', status: 'Graduated', gpa: '3.95' },
]

const Students = () => {
  const [students, setStudents] = useState(initialStudents)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterProgram, setFilterProgram] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showModal, setShowModal] = useState(false)

  const filteredStudents = students.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.studentId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      student.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesProgram = filterProgram === 'all' || student.program === filterProgram
    const matchesStatus = filterStatus === 'all' || student.status === filterStatus
    return matchesSearch && matchesProgram && matchesStatus
  })

  const programs = [...new Set(initialStudents.map(s => s.program))]

  return (
    <div className="students-page">
      <div className="page-header">
        <div className="page-title">
          <h1>Student Information</h1>
          <p>Manage and view all student records</p>
        </div>
        <button className="add-btn" onClick={() => setShowModal(true)}>
          <Plus size={18} /> Add Student
        </button>
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
          <select value={filterProgram} onChange={(e) => setFilterProgram(e.target.value)}>
            <option value="all">All Programs</option>
            {programs.map(program => (
              <option key={program} value={program}>{program}</option>
            ))}
          </select>
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
                <td className="student-id">{student.studentId}</td>
                <td>
                  <div className="student-name">
                    <span className="avatar">{student.name.charAt(0)}</span>
                    {student.name}
                  </div>
                </td>
                <td className="email">{student.email}</td>
                <td>{student.program}</td>
                <td>{student.year}</td>
                <td className="gpa">{student.gpa}</td>
                <td>
                  <span className={`status-badge ${student.status.toLowerCase()}`}>
                    {student.status}
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

