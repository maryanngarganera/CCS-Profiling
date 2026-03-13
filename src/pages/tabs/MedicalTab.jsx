import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function MedicalTab() {
  return (
    <ProfileCard color={T.blue}>
      <EmptyTab
        icon="🩺"
        title="No medical records"
        sub="Medical history and health information will be available here."
        color={T.blue}
        fieldsLabel="student_medical fields"
        fields={['Condition', 'Date', 'Notes', 'Doctor']}
      />
    </ProfileCard>
  );
}

