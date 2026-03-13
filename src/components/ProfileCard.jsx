import { T } from '../constants/colors';

const ProfileCard = ({ children, color = T.accent }) => {
  return (
    <div style={{
      background: T.card,
      border: `1px solid ${T.border}`,
      borderRadius: 16,
      padding: '28px 32px',
      boxShadow: `0 2px 20px ${color}08`,
      position: 'relative',
      overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 4,
        background: `linear-gradient(90deg, ${color}80, transparent)`,
      }} />
      {children}
    </div>
  );
};

export default ProfileCard;

