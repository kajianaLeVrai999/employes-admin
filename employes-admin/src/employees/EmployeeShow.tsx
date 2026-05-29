import { 
  Show, 
  SimpleShowLayout, 
  TextField, 
  NumberField, 
  BooleanField,
  TopToolbar,
  ListButton,
  EditButton
} from 'react-admin';

// Barre d'actions supérieure personnalisée
const ShowActions = () => (
  <TopToolbar>
    <ListButton label="Retour à la liste" />
    <EditButton label="Modifier" />
  </TopToolbar>
);

export const EmployeeShow = () => (
  <Show actions={<ShowActions />}>
    <SimpleShowLayout>
      <TextField label="ID" source="id" />
      <TextField label="Prénom" source="firstname" />
      <TextField label="Nom" source="lastname" />
      <TextField source="email" />
      <TextField label="Département" source="department" />
      <NumberField 
        source="salary" 
        label="Salaire" 
        options={{ style: 'currency', currency: 'EUR' }} 
      />
      <BooleanField label="Actif" source="active" />
    </SimpleShowLayout>
  </Show>
);