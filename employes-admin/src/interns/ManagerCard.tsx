import { useRecordContext, useGetOne } from 'react-admin';
import { Card, CardContent, Typography, CircularProgress } from '@mui/material';

export const ManagerCard = () => {
  const intern = useRecordContext();
  const { data: manager, isPending, error } = useGetOne(
    'employees',
    { id: intern?.managerId },
    { enabled: !!intern?.managerId }
  );

  if (isPending) return <CircularProgress size={20} />;
  if (error) return <Typography color="error">Erreur de chargement du manager</Typography>;
  if (!manager) return <Typography>Aucun manager rattaché.</Typography>;

  return (
    <Card sx={{ mt: 2, maxWidth: 400, bgcolor: '#f8fafc' }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Fiche Manager Encadrant</Typography>
        <Typography><strong>Nom complet :</strong> {manager.firstname} {manager.lastname}</Typography>
        <Typography><strong>Département :</strong> {manager.department}</Typography>
        <Typography><strong>Email :</strong> <a href={`mailto:${manager.email}`}>{manager.email}</a></Typography>
        <Typography><strong>Statut : </strong><span style={{ color: manager.active ? 'green' : 'red' }}>{manager.active ? 'Actif' : 'Inactif'}</span></Typography>
      </CardContent>
    </Card>
  );
};