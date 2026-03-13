import './Avatar.css';

export default function Avatar({ name, size = 40, color = '#6366f1' }) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();
  
  return (
    <div 
      className="avatar"
      style={{ 
        width: size, 
        height: size, 
        backgroundColor: color,
        fontSize: size * 0.4,
      }}
    >
      {initials}
    </div>
  );
}