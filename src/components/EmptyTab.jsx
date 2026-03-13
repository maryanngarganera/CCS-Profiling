import { T } from '../constants/colors';

const EmptyTab = ({ icon, title, sub, color, fieldsLabel, fields }) => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '60px 40px',
      color: T.muted,
    }}>
      <div style={{
        fontSize: 48,
        fontWeight: 900,
        color: color + '40',
        lineHeight: 1,
        marginBottom: 20,
        fontFamily: 'monospace',
      }}>
        {icon}
      </div>
      <div style={{ fontSize: 20, fontWeight: 700, color: T.text, marginBottom: 8 }}>
        {title}
      </div>
      <div style={{ fontSize: 14, marginBottom: 32, maxWidth: 400, marginLeft: 'auto', marginRight: 'auto' }}>
        {sub}
      </div>
      {fieldsLabel && fields && (
        <div style={{ 
          background: T.card, 
          border: `1px dashed ${color}30`, 
          borderRadius: 10, 
          padding: '20px', 
          maxWidth: 320, 
          margin: '0 auto',
          fontSize: 12,
          fontFamily: 'monospace',
          color: T.muted,
        }}>
          <div style={{ marginBottom: 12, fontWeight: 600, color: color + '80' }}>
            Expected fields:
          </div>
          <div>{fields.join(' • ')}</div>
        </div>
      )}
    </div>
  );
};

export default EmptyTab;

