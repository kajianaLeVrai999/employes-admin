import { List, Datagrid, TextField, NumberField, BooleanField, EditButton, DeleteButton, SearchInput, SelectInput, Pagination } from 'react-admin';
import { QuickStatusToggle } from './QuickStatusToggle';
import React from 'react';

const employeeFilters = [
  <SearchInput source="q" alwaysOn />,
  <SelectInput source="department" label="Département" choices={[
    { id: 'Informatique', name: 'Informatique' },
    { id: 'Marketing', name: 'Marketing' },
    { id: 'RH', name: 'RH' },
    { id: 'Finance', name: 'Finance' },
  ]} />
];

const EmployeePagination = () => <Pagination rowsPerPageOptions={[5, 10, 25]} />;

export const EmployeeList = () => (
  <List filters={employeeFilters} perPage={5} pagination={<EmployeePagination />}>
    <Datagrid rowClick="show">
      <TextField label="Prénom" source="firstname" />
      <TextField label="Nom" source="lastname" />
      <TextField source="email" />
      <TextField label="Département" source="department" />
      <NumberField source="salary" label="Salaire" options={{ style: 'currency', currency: 'EUR' }} />
      <BooleanField label="Actif" source="active" />
      <QuickStatusToggle />
      <EditButton onClick={(e: React.MouseEvent) => e.stopPropagation()} />
      <DeleteButton onClick={(e: React.MouseEvent) => e.stopPropagation()} />
    </Datagrid>
  </List>
);