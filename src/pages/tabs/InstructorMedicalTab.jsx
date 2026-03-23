import { T } from '../../constants/colors';
import ProfileCard from '../../components/ProfileCard';
import EmptyTab from '../../components/EmptyTab';

export default function InstructorMedicalTab() {
  return (
    <ProfileCard color={T.blue}>
      <EmptyTab
        icon="⊕"
        title="No medical records on file"
        sub="Faculty health conditions and checkup history will appear here."
        color={T.blue}
        fieldsLabel="faculty_medical_records fields"
        fields={['Condition Name', 'Description', 'Medication', 'Last Checkup', 'Doctor Name']}
      />
    </ProfileCard>
  );
}
