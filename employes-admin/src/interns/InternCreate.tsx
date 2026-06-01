import { Create, SimpleForm, TextInput, SelectInput, BooleanInput, NumberInput, ReferenceInput, required, email } from 'react-admin';
import { useWatch } from 'react-hook-form';

export const InternCreate = () => {
  const validateRemuneration = (value: any, allValues: any) => {
    if (allValues.isRemunerate && (!value || value <= 0)) {
      return "La rémunération est obligatoire si le stagiaire est rémunéré";
    }
    return undefined;
  };

  const DynamicManagerInput = () => {
    const currentDept = useWatch({ name: 'department' });
    return (
      <ReferenceInput source="managerId" reference="employees" filter={{ department: currentDept, active: true }}>
        <SelectInput label="Manager (Même domaine & Actif)" validate={required()} disabled={!currentDept} />
      </ReferenceInput>
    );
  };

  return (
    <Create redirect="list">
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
        <NumberInput source="remuneration" label="Montant" validate={validateRemuneration} />
      </SimpleForm>
    </Create>
  );
};