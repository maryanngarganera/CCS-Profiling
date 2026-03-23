import { useState } from 'react'
import { Book, Clipboard, BookOpen, GraduationCap, Search, Plus, Pencil } from 'lucide-react'
import './Instruction.css'
import { T } from '../constants/colors';

const initialCourses = [
  { id: 1, code: 'CS101', name: 'Introduction to Programming', credits: 3, department: 'Computer Science', syllabus: 'Fundamentals of programming using Python', lessons: 15, curriculum: '2024', status: 'Active' },
  { id: 2, code: 'CS201', name: 'Data Structures & Algorithms', credits: 4, department: 'Computer Science', syllabus: 'Arrays, linked lists, trees, graphs, sorting', lessons: 20, curriculum: '2024', status: 'Active' },
  { id: 3, code: 'IT301', name: 'Database Management Systems', credits: 3, department: 'Information Technology', syllabus: 'SQL, normalization, transactions, indexing', lessons: 18, curriculum: '2024', status: 'Active' },
  { id: 4, code: 'CS401', name: 'Artificial Intelligence', credits: 4, department: 'Computer Science', syllabus: 'Machine learning, neural networks, NLP', lessons: 22, curriculum: '2024', status: 'Active' },
  { id: 5, code: 'IT201', name: 'Web Development', credits: 3, department: 'Information Technology', syllabus: 'HTML, CSS, JavaScript, React', lessons: 16, curriculum: '2024', status: 'Active' },
  { id: 6, code: 'CS301', name: 'Software Engineering', credits: 3, department: 'Computer Science', syllabus: 'SDLC, Agile, testing, documentation', lessons: 14, curriculum: '2023', status: 'Active' },
  { id: 7, code: 'CY301', name: 'Cyber Security Fundamentals', credits: 3, department: 'Cyber Security', syllabus: 'Network security, cryptography, ethical hacking', lessons: 18, curriculum: '2024', status: 'Active' },
  { id: 8, code: 'DS301', name: 'Data Science & Analytics', credits: 4, department: 'Data Science', syllabus: 'Python, R, statistics, data visualization', lessons: 20, curriculum: '2024', status: 'Active' },
]

const tabs = [
  { id: 'courses', label: 'Courses', icon: Book },
  { id: 'syllabus', label: 'Syllabus', icon: Clipboard },
  { id: 'lessons', label: 'Lessons', icon: BookOpen },
  { id: 'curriculum', label: 'Curriculum', icon: GraduationCap },
]

const Instruction = () => {
  const [activeTab, setActiveTab] = useState('courses')
  const [courses, setCourses] = useState(initialCourses)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterDepartment, setFilterDepartment] = useState('all')

  const filteredCourses = courses.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDepartment = filterDepartment === 'all' || c.department === filterDepartment
    return matchesSearch && matchesDepartment
  })

  const departments = [...new Set(initialCourses.map(c => c.department))]

  return (
    <div className="instruction-page">
<div className="fade-up" style={{ marginBottom: 36 }}>
        <h1 style={{ fontSize: 32, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 8 }}>
          <span style={{ background: `linear-gradient(135deg, ${T.accent}, #4f46e5)`, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Instruction</span> Management
        </h1>
        <p style={{ color: T.muted, fontSize: 16 }}>
          Manage courses, syllabus, lessons, and curriculum.
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
              <span className="tab-icon"><tab.icon size={18} /></span>
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="filters-section">
        <div className="search-filter">
          <span className="search-icon"><Search size={18} /></span>
          <input
            type="text"
            placeholder="Search courses..."
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
        </div>
      </div>

      <div className="courses-grid">
        {filteredCourses.map(course => (
          <div key={course.id} className="course-card">
            <div className="course-header">
              <span className="course-code">{course.code}</span>
              <span className={`course-status ${course.status.toLowerCase()}`}>{course.status}</span>
            </div>
            <h3 className="course-name">{course.name}</h3>
            <p className="course-syllabus">{course.syllabus}</p>
            <div className="course-meta">
              <div className="meta-item">
                <span className="meta-icon"><Book size={16} /></span>
                <span className="meta-value">{course.credits} Credits</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon"><BookOpen size={16} /></span>
                <span className="meta-value">{course.lessons} Lessons</span>
              </div>
              <div className="meta-item">
                <span className="meta-icon"><GraduationCap size={16} /></span>
                <span className="meta-value">{course.curriculum}</span>
              </div>
            </div>
            <div className="course-footer">
              <span className="course-department">{course.department}</span>
              <div className="course-actions">
                <button className="course-action-btn" title="View Syllabus"><Clipboard size={16} /></button>
                <button className="course-action-btn" title="View Lessons"><BookOpen size={16} /></button>
                <button className="course-action-btn" title="Edit"><Pencil size={16} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="empty-state">
          <Book size={48} className="empty-icon" />
          <p>No courses found matching your criteria</p>
        </div>
      )}
    </div>
  )
}

export default Instruction

