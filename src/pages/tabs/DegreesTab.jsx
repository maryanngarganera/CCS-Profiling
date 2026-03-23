import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function DegreesTab() {
  return (
    <ProfileCard color={T.gold}>
      <EmptyTab
        icon="🎓"
        title="No degrees recorded"
        sub="Faculty academic degrees and certifications will appear here."
        color={T.gold}
        fieldsLabel="faculty_degrees fields"
        fields={["Degree Name", "Institution", "Year Graduated", "Field of Study"]}
      />
    </ProfileCard>
  );
}
