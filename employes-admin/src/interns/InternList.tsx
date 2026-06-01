import { useState } from 'react';
import { List, Datagrid, TextField, NumberField, BooleanField, EditButton, DeleteButton, ReferenceField, SearchInput, SelectInput, useCreate, ReferenceInput, useRefresh } from 'react-admin';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField as MuiTextField } from '@mui/material';
import React from 'react';

const internFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput source="department" choices={[
    { id: 'Informatique', name: 'Informatique' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'RH', name: 'RH' },
    { id: 'Finance', name: 'Finance' },
  ]} />,
  <SelectInput source="isRemunerate" label="Rémunéré" choices={[
    { id: true, name: 'Oui' },
    { id: false, name: 'Non' }
  ]} />
];

const QuickInternCreateButton = () => {
  const [open, setOpen] = useState(false);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [managerId, setManagerId] = useState('');
  const [create, { isLoading }] = useCreate();
  const refresh = useRefresh();

  const handleSubmit = () => {
    if (!firstname || !lastname || !managerId) return;
    create(
      'interns',
      { data: { firstname, lastname, managerId, isRemunerate: false, remuneration: 0, email: `${firstname.toLowerCase()}@intern.com`, department: 'Informatique' } },
      {
        onSuccess: () => {
          setOpen(false);
          setFirstname('');
          setLastname('');
          setManagerId('');
          refresh();
        }
      }
    );
  };

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)} sx={{ mb: 2 }}>
        Ajouter stagiaire rapide
      </Button>
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth maxWidth="xs">
        <DialogTitle>Création Rapide</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
          <MuiTextField label="Prénom" value={firstname} onChange={e => setFirstname(e.target.value)} fullWidth />
          <MuiTextField label="Nom" value={lastname} onChange={e => setLastname(e.target.value)} fullWidth />
          <ReferenceInput source="managerId" reference="employees" filter={{ active: true }}>
            <SelectInput label="Manager" onChange={e => setManagerId(e.target.value as string)} fullWidth />
          </ReferenceInput>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annuler</Button>
          <Button onClick={handleSubmit} variant="contained" disabled={isLoading}>Enregistrer</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export const InternList = () => (
  <div>
    <QuickInternCreateButton />
    <List filters={internFilters}>
      <Datagrid rowClick="show">
        <TextField label="Prénom" source="firstname" />
        <TextField label="Nom" source="lastname" />
        <TextField source="email" />
        <TextField label="Département" source="department" />
        <ReferenceField source="managerId" reference="employees" label="Manager">
          <TextField source="lastname" />
        </ReferenceField>
        <NumberField source="remuneration" label="Gratification" options={{ style: 'currency', currency: 'EUR' }} />
        <BooleanField label="Rémunéré" source="isRemunerate" />
        <EditButton onClick={(e: React.MouseEvent) => e.stopPropagation()} />
        <DeleteButton onClick={(e: React.MouseEvent) => e.stopPropagation()} />
      </Datagrid>
    </List>
  </div>
);