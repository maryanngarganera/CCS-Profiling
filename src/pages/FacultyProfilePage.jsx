import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { T } from '../constants/colors';
import { MOCK_STUDENTS, MOCK_FACULTY } from '../constants/data';
import { deptColor } from '../utils/helpers';
import Avatar from '../components/Avatar';
import Pill from '../components/Pill';
import InstructorProfileTab  from './tabs/InstructorProfileTab';
import DegreesTab            from './tabs/DegreesTab';
import InstructorSkillsTab   from './tabs/InstructorSkillsTab';
import InstructorMedicalTab  from './tabs/InstructorMedicalTab';
import './FacultyProfilePage.css';

const TABS = [
  { id: 'profile', label: 'Profile',          color: T.accent },
  { id: 'degrees', label: "Master's Degrees", color: T.gold   },
  { id: 'skills',  label: 'Skills',           color: T.purple },
  { id: 'medical', label: 'Medical',          color: T.blue   },
];


export default function FacultyProfilePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [faculty, setFaculty] = useState(null);
  const [tab, setTab] = useState('profile');

  useEffect(() => {
    const foundFaculty = MOCK_FACULTY.find(f => f.id === parseInt(id));
    if (foundFaculty) {
      setFaculty(foundFaculty);
    } else {
      navigate('/faculty');
    }
  }, [id, navigate]);

  if (!faculty) return null;

  const col      = deptColor(faculty.department);
  const advisees = MOCK_STUDENTS.filter(s => s.faculty_id === faculty.id);

  const content = {
    profile: <InstructorProfileTab faculty={faculty} />,
    degrees: <DegreesTab />,
    skills:  <InstructorSkillsTab />,
    medical: <InstructorMedicalTab />,
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 48px' }}>
      {/* Back */}
      <button className="back-btn fade-up" onClick={() => navigate('/faculty')} style={{ marginBottom: 28 }}>
        ← Back to Faculty
      </button>

      {/* Hero banner */}
      <div className="fade-up fade-up-1" style={{
        background: `linear-gradient(135deg, ${T.card}, ${T.surface})`,
        border: `1px solid ${col}30`,
        borderRadius: 20, padding: '28px 34px', marginBottom: 22,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 4px 60px ${col}0e`,
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${col}12, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${col}50, ${T.purple}40, transparent)` }} />

        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <Avatar name={`${faculty.first_name} ${faculty.last_name}`} size={68} color={col} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 4 }}>
              {faculty.first_name} <span style={{ color: col }}>{faculty.last_name}</span>
            </div>
            <div style={{ fontSize: 12, color: T.muted, fontFamily: 'monospace', marginBottom: 10 }}>
              {faculty.employee_number}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              <Pill label={faculty.position}   color={col}      />
              <Pill label={faculty.department} color={T.purple} />
              <Pill label={faculty.gender}     color={T.muted}  />
              <Pill label={`${advisees.length} advisee${advisees.length !== 1 ? 's' : ''}`} color={T.accent} />
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 4 }}>HIRED SINCE</div>
            <div style={{ fontSize: 13, color: T.text, fontFamily: 'monospace' }}>{faculty.hire_date}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="fade-up fade-up-2" style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
        {TABS.map(t => (
          <button
            key={t.id}
            className={`tab-btn${tab === t.id ? ' active' : ''}`}
            style={{ '--tc': t.color }}
            onClick={() => setTab(t.id)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Tab content */}
      <div className="fade-up fade-up-3">
        {content[tab]}
      </div>
    </div>
  );
}
