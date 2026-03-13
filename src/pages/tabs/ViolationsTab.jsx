import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function ViolationsTab() {
  return (
    <ProfileCard color={T.red}>
      <div style={{ display: 'flex', gap: 12, marginBottom: 24 }}>
        {[
          { label: 'Active', value: 0, color: T.red },
          { label: 'Resolved', value: 0, color: T.gold },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ flex: 1, textAlign: 'center', padding: '20px', background: T.surface, borderRadius: 12, border: `1px solid ${T.border}` }}>
            <div style={{ fontSize: 24, fontWeight: 900, color, fontFamily: 'monospace' }}>{value}</div>
            <div style={{ fontSize: 11, color: T.muted, fontFamily: 'monospace' }}>{label}</div>
          </div>
        ))}
      </div>

      <EmptyTab
        icon="⚠️"
        title="No violations recorded"
        sub="Disciplinary records and violations will appear here."
        color={T.red}
        fieldsLabel="student_violations fields"
        fields={['Date', 'Type', 'Description', 'Status']}
      />
    </ProfileCard>
  );
}

