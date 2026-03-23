import { T } from '../constants/colors';

const SectionBlock = ({ label, color, fields }) => {
  return (
    <div style={{
      background: T.surface,
      border: `1px solid ${color}20`,
      borderRadius: 12,
      padding: '20px 24px',
      marginBottom: 20,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        marginBottom: 16,
        fontSize: 13,
        fontWeight: 700,
        color: color,
        textTransform: 'uppercase',
        letterSpacing: '0.05em',
        fontFamily: 'monospace',
      }}>
        <div style={{ width: 4, height: 4, background: color, borderRadius: '50%' }} />
        {label}
      </div>
      <div style={{ display: 'grid', gap: 12 }}>
        {fields.map(([key, value]) => (
          <div key={key} style={{ display: 'flex', gap: 12, fontSize: 14 }}>
            <div style={{ color: T.muted, fontFamily: 'monospace', fontSize: 12, minWidth: 100 }}>
              {key}:
            </div>
            <div style={{ fontWeight: 500, color: T.text }}>{value || 'N/A'}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SectionBlock;

