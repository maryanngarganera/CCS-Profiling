import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { programColor, yearLabel, getFaculty } from '../utils/helpers';
import { T } from '../constants/colors';
import Avatar from '../components/Avatar';
import Pill from '../components/Pill';
import ProfileTab     from './tabs/ProfileTab';
import SkillsTab      from './tabs/SkillsTab';
import AchievementsTab from './tabs/AchievementsTab';
import ViolationsTab  from './tabs/ViolationsTab';
import MedicalTab     from './tabs/MedicalTab';

const TABS = [
  { id: 'profile',      label: 'Profile',      color: T.accent  },
  { id: 'skills',       label: 'Skills',        color: T.purple  },
  { id: 'achievements', label: 'Achievements',  color: T.gold    },
  { id: 'violations',   label: 'Violations',    color: T.red     },
  { id: 'medical',      label: 'Medical',       color: T.blue    },
];

export default function StudentProfilePage({ student }) {
  if (!student) {
    return (
      <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 48px', textAlign: 'center', color: T.muted }}>
        <h2>Loading student profile...</h2>
        <p>Select a student from the Students directory.</p>
      </div>
    );
  }

  const [tab, setTab] = useState('profile');
  const navigate = useNavigate();
  const col     = programColor(student.program);
  const faculty = getFaculty(student.faculty_id);

  const content = {
    profile:      <ProfileTab      student={student} />,
    skills:       <SkillsTab />,
    achievements: <AchievementsTab />,
    violations:   <ViolationsTab />,
    medical:      <MedicalTab />,
  };

  return (
    <div style={{ maxWidth: 960, margin: '0 auto', padding: '40px 48px' }}>
      {/* Back */}
      <button className="back-btn" onClick={() => navigate('/students')} style={{ marginBottom: 28 }}>
        ← Back to Students
      </button>

      {/* Hero banner */}
      <div className="hero-banner" style={{
        background: `linear-gradient(135deg, ${T.card}, ${T.surface})`,
        border: `1px solid ${col}30`,
        borderRadius: 20, padding: '28px 34px', marginBottom: 22,
        position: 'relative', overflow: 'hidden',
        boxShadow: `0 4px 60px ${col}0e`,
      }}>
        <div style={{ position: 'absolute', top: -50, right: -50, width: 220, height: 220, borderRadius: '50%', background: `radial-gradient(circle, ${col}12, transparent 70%)`, pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${col}50, ${T.purple}40, transparent)` }} />

        <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
          <Avatar name={`${student.first_name} ${student.last_name}`} size={68} color={col} />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 26, fontWeight: 900, letterSpacing: '-0.02em', marginBottom: 4 }}>
              {student.first_name} <span style={{ color: col }}>{student.last_name}</span>
            </div>
            <div style={{ fontSize: 12, color: T.muted, fontFamily: 'monospace', marginBottom: 10 }}>
              {student.student_number}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 7 }}>
              <Pill label={student.program}           color={col}      />
              <Pill label={yearLabel(student.year_level)} color={T.purple} />
              <Pill label={student.gender || 'N/A'}            color={T.muted}  />
              {faculty && <Pill label={`Under: ${faculty.last_name}`} color={T.purple} />}
            </div>
          </div>
          <div style={{ textAlign: 'right', flexShrink: 0 }}>
            <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace', letterSpacing: '0.1em', marginBottom: 4 }}>ENROLLED SINCE</div>
            <div style={{ fontSize: 13, color: T.text, fontFamily: 'monospace' }}>{student.created_at || 'N/A'}</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 20, flexWrap: 'wrap' }}>
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
      <div>
        {content[tab]}
      </div>
    </div>
  );
}

