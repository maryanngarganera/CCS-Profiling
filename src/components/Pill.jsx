import './Pill.css';

export default function Pill({ label, color = '#64748b' }) {
  return (
    <span 
      className="pill"
      style={{ 
        backgroundColor: color + '20',
        color: color,
        borderColor: color + '40',
      }}
    >
      {label}
    </span>
  );
}