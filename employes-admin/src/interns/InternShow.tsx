import { Show, SimpleShowLayout, TextField, NumberField, BooleanField, ReferenceField } from 'react-admin';
import { ManagerCard } from './ManagerCard';

export const InternShow = () => (
  <Show>
    <SimpleShowLayout>
      <TextField label="ID" source="id" />
      <TextField label="Prénom" source="firstname" />
      <TextField label="Nom" source="lastname" />
      <TextField source="email" />
      <TextField label="Département" source="department" />
      <NumberField source="remuneration" label="Rémunération" options={{ style: 'currency', currency: 'EUR' }} />
      <BooleanField label="Rémunéré" source="isRemunerate" />
      <ReferenceField source="managerId" reference="employees" label="Lien Fiche Manager" link="show">
        <TextField source="lastname" sx={{ color: 'blue', textDecoration: 'underline' }} />
      </ReferenceField>
      <ManagerCard />
    </SimpleShowLayout>
  </Show>
);