import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function AchievementsTab() {
  return (
    <ProfileCard color={T.gold}>
      {/* Counters */}
      <div style={{ display: 'flex', gap: 12, marginBottom: 24, flexWrap: 'wrap' }}>
        {[
          { label: 'Awards', value: 0, icon: '🏆' },
          { label: 'Certifications', value: 0, icon: '📜' },
          { label: 'Competitions', value: 0, icon: '🥇' },
        ].map(({ label, value, icon }) => (
          <div key={label} style={{ flex: 1, textAlign: 'center', padding: '16px', background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 28, marginBottom: 6 }}>{icon}</div>
            <div style={{ fontSize: 24, fontWeight: 900, color: T.gold, fontFamily: 'monospace' }}>{value}</div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: 'monospace', letterSpacing: '0.05em' }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      <EmptyTab
        icon="⭐"
        title="No achievements recorded yet"
        sub="Academic awards, certifications and competition wins will appear here."
        color={T.gold}
        fieldsLabel="student_achievements fields"
        fields={['Title', 'Date', 'Issuing Organization', 'Description']}
      />
    </ProfileCard>
  );
}

