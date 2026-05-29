import { 
  Edit, 
  SimpleForm, 
  TextInput, 
  SelectInput, 
  NumberInput, 
  BooleanInput,
  required,
  minValue,
  useRecordContext
} from 'react-admin';


const EmployeeTitle = () => {
  const record = useRecordContext();
  return record ? <span>Modifier : {record.firstname} {record.lastname}</span> : <span>Chargement...</span>;
};

export const EmployeeEdit = () => (
  <Edit title={<EmployeeTitle />} redirect="list">
    <SimpleForm>
      <TextInput source="firstname" label="Prénom" validate={required()} />
      <TextInput source="lastname" label="Nom" validate={required()} />
      <TextInput source="email" type="email" validate={required()} />
      <SelectInput source="department" label="Département" validate={required()} choices={[
        { id: 'Informatique', name: 'Informatique' },
        { id: 'Marketing', name: 'Marketing' },
        { id: 'RH', name: 'RH' },
        { id: 'Finance', name: 'Finance' },
      ]} />
      <NumberInput source="salary" label="Salaire" validate={[required(), minValue(1500)]} />
      <BooleanInput source="active" label="Actif" />
    </SimpleForm>
  </Edit>
);