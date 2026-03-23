import { T } from '../../constants/colors';
import { MOCK_STUDENTS } from '../../constants/data';
import { deptColor } from '../../utils/helpers';
import Avatar from '../../components/Avatar';
import Pill from '../../components/Pill';
import ProfileCard from '../../components/ProfileCard';
import SectionBlock from '../../components/SectionBlock';

export default function InstructorProfileTab({ faculty }) {
  const col      = deptColor(faculty.department);
  const advisees = MOCK_STUDENTS.filter(s => s.faculty_id === faculty.id);

  return (
    <ProfileCard color={col}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 52px' }}>
        {/* Left column */}
        <div>
          <SectionBlock label="Personal" color={T.purple} fields={[
            ['Full Name', `${faculty.first_name} ${faculty.last_name}`],
            ['Gender',    faculty.gender],
            ['Email',     faculty.email],
            ['Phone',     faculty.phone || 'N/A'],
          ]} />
          <SectionBlock label="Account" color={T.gold} fields={[
            ['User ID',    `#${faculty.user_id}`],
            ['Faculty ID', `#${faculty.id}`],
            ['Created At', faculty.created_at],
          ]} />
        </div>

        {/* Right column */}
        <div>
          <SectionBlock label="Employment" color={col} fields={[
            ['Employee No.', faculty.employee_number],
            ['Department',   faculty.department],
            ['Position',     faculty.position],
            ['Specialization', faculty.specialization],
            ['Hire Date',    faculty.hire_date],
          ]} />

          {/* Advisees mini-list */}
          <div style={{ marginBottom: 26 }}>
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              marginBottom: 12, paddingBottom: 8,
              borderBottom: `1px solid ${T.accent}20`,
            }}>
              <div style={{ width: 3, height: 12, background: T.accent, borderRadius: 4 }} />
              <span style={{ fontSize: 10, color: T.accent, fontFamily: 'monospace', letterSpacing: '0.12em', textTransform: 'uppercase', fontWeight: 700 }}>
                Advisees ({advisees.length})
              </span>
            </div>

            {advisees.length === 0 ? (
              <div style={{ fontSize: 12, color: T.faint, fontStyle: 'italic' }}>No students assigned</div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {advisees.slice(0, 3).map(s => {
                  return (
                    <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 12px', borderRadius: 10, background: T.surface, border: `1px solid ${T.border}` }}>
                      <Avatar name={`${s.first_name} ${s.last_name}`} size={30} color={deptColor(s.program) || T.accent} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 12, fontWeight: 600, color: T.text }}>{s.first_name} {s.last_name}</div>
                        <div style={{ fontSize: 10, color: T.muted, fontFamily: 'monospace' }}>{s.student_number}</div>
                      </div>
<Pill label={s.year_level + 'rd Year'} color={T.purple} />
                    </div>
                  );
                })}
                {advisees.length > 3 && (
                  <div style={{ fontSize: 11, color: T.muted, textAlign: 'center', padding: 8 }}>
                    +{advisees.length - 3} more
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </ProfileCard>
  );
}
