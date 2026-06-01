import { Edit, SimpleForm, TextInput, SelectInput, BooleanInput, NumberInput, ReferenceInput, required, email, useRecordContext } from 'react-admin';
import { useWatch } from 'react-hook-form';

const InternTitle = () => {
  const record = useRecordContext();
  return record ? <span>Modifier : {record.firstname} {record.lastname}</span> : null;
};

export const InternEdit = () => {
  const validateRemuneration = (value: any, allValues: any) => {
    if (allValues.isRemunerate && (!value || value <= 0)) return "Obligatoire si rémunéré";
    return undefined;
  };

  const DynamicManagerInput = () => {
    const currentDept = useWatch({ name: 'department' });
    return (
      <ReferenceInput source="managerId" reference="employees" filter={{ department: currentDept, active: true }}>
        <SelectInput label="Manager" validate={required()} disabled={!currentDept} />
      </ReferenceInput>
    );
  };

  return (
    <Edit title={<InternTitle />} redirect="list">
      <SimpleForm>
        <TextInput source="firstname" label="Prénom" validate={required()} />
        <TextInput source="lastname" label="Nom" validate={required()} />
        <TextInput source="email" validate={[required(), email()]} />
        <SelectInput source="department" label="Département" validate={required()} choices={[
          { id: 'Informatique', name: 'Informatique' },
          { id: 'Marketing', name: 'Marketing' },
          { id: 'RH', name: 'RH' },
          { id: 'Finance', name: 'Finance' },
        ]} />
        <DynamicManagerInput />
        <BooleanInput source="isRemunerate" label="Est Rémunéré" />
        <NumberInput source="remuneration" validate={validateRemuneration} />
      </SimpleForm>
    </Edit>
  );
};