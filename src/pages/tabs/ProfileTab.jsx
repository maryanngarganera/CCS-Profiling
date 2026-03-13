import { T } from '../../constants/colors';
import { programColor, yearLabel, getFaculty } from '../../utils/helpers';
import Avatar from '../../components/Avatar';
import ProfileCard from '../../components/ProfileCard';
import SectionBlock from '../../components/SectionBlock';
import { MOCK_FACULTY } from '../../constants/data';

export default function ProfileTab({ student }) {
  const col = programColor(student.program);
  const faculty = getFaculty(student.faculty_id) || MOCK_FACULTY[0];

  // Add missing faculty props from mock data if not present
  const fullFaculty = {
    ...faculty,
    position: faculty.department === 'Computer Science' ? 'Chairperson' : 'Professor',
    employee_number: `EMP-${faculty.id.toString().padStart(3, '0')}`,
  };

  return (
    <ProfileCard color={col}>
      {/* Adviser banner */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 14,
        padding: '14px 18px', marginBottom: 26,
        background: T.purple + '0d',
        border: `1px solid ${T.purple}28`,
        borderRadius: 12,
      }}>
        <Avatar name={`${fullFaculty.first_name} ${fullFaculty.last_name}`} size={42} color={T.purple} />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 2 }}>
            Assigned Adviser / Instructor
          </div>
          <div style={{ fontSize: 14, fontWeight: 700, color: T.purple }}>
            {fullFaculty.first_name} {fullFaculty.last_name}
          </div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 1 }}>
            {fullFaculty.position} · {fullFaculty.department}
          </div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace', letterSpacing: '0.08em', marginBottom: 3 }}>EMP. NO.</div>
          <div style={{ fontSize: 11, color: T.text, fontFamily: 'monospace' }}>{fullFaculty.employee_number}</div>
          <div style={{ fontSize: 11, color: T.muted, marginTop: 3 }}>{fullFaculty.email}</div>
        </div>
      </div>

      {/* Two-column layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 52px' }}>
        <div>
          <SectionBlock label="Personal" color={T.accent} fields={[
            ['Full Name',  `${student.first_name} ${student.last_name}`],
            ['Gender',     student.gender || 'N/A'],
            ['Birth Date', student.birth_date || 'N/A'],
            ['Address',    student.address || 'N/A'],
          ]} />
          <SectionBlock label="Contact" color={T.purple} fields={[
            ['Email', student.email || 'N/A'],
            ['Phone', student.phone || 'N/A'],
          ]} />
        </div>
        <div>
          <SectionBlock label="Academic" color={col} fields={[
            ['Student No.', student.student_number],
            ['Program',     student.program],
            ['Year Level',  yearLabel(student.year_level)],
            ['Enrolled',    student.created_at || 'N/A'],
          ]} />
          <SectionBlock label="Account" color={T.gold} fields={[
            ['Student ID',   `#${student.id}`],
            ['Status',       student.status || 'Active'],
            ['GPA',          student.gpa || 'N/A'],
          ]} />
        </div>
      </div>
    </ProfileCard>
  );
}

