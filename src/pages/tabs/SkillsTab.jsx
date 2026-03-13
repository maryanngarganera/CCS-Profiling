import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function SkillsTab() {
  return (
    <ProfileCard color={T.purple}>
      {/* Level counters */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginBottom: 24 }}>
        {[
          ['Beginner',     T.purple + '40'],
          ['Intermediate', T.purple + '80'],
          ['Advanced',     T.purple],
        ].map(([lvl, c]) => (
          <div key={lvl} style={{ textAlign: 'center', padding: '20px', background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 30, fontWeight: 900, color: c, fontFamily: 'monospace' }}>0</div>
            <div style={{ fontSize: 10, color: T.muted, marginTop: 6, fontFamily: 'monospace', letterSpacing: '0.08em' }}>{lvl.toUpperCase()}</div>
          </div>
        ))}
      </div>

      <EmptyTab
        icon="◎"
        title="No skills recorded yet"
        sub="Skills and proficiency levels will appear here once added."
        color={T.purple}
        fieldsLabel="student_skills fields"
        fields={['Skill Name', 'Level']}
      />
    </ProfileCard>
  );
}

