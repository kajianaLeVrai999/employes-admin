import { useGetList } from 'react-admin';
import { Card, CardContent, Typography, Grid, Box } from '@mui/material';

const DashCard = ({ title, value, loading }: { title: string, value?: number, loading: boolean }) => (
  <Card sx={{ minWidth: 200, bgcolor: '#fff', boxShadow: 2, borderRadius: 2 }}>
    <CardContent>
      <Typography color="textSecondary" variant="subtitle2" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h3" component="div" sx={{ fontWeight: 'bold', color: '#1e293b' }}>
        {loading ? '...' : value}
      </Typography>
    </CardContent>
  </Card>
);

export const Dashboard = () => {
  const { total: totalEmp, isPending: load1 } = useGetList('employees', { pagination: { page: 1, perPage: 1 } });
  const { total: activeEmp, isPending: load2 } = useGetList('employees', { pagination: { page: 1, perPage: 1 }, filter: { active: true } });
  const { total: totalInt, isPending: load3 } = useGetList('interns', { pagination: { page: 1, perPage: 1 } });
  const { total: remInt, isPending: load4 } = useGetList('interns', { pagination: { page: 1, perPage: 1 }, filter: { isRemunerate: true } });

  return (
    <Box sx={{ mt: 3, p: 1 }}>
      <Typography variant="h4" sx={{ mb: 4, fontWeight: 'medium', color: '#0f172a' }}>
        Tableau de bord de l'entreprise
      </Typography>
      
      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashCard title="Total Employés" value={totalEmp} loading={load1} />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashCard title="Employés Actifs" value={activeEmp} loading={load2} />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashCard title="Total Stagiaires" value={totalInt} loading={load3} />
        </Grid>
        
        <Grid size={{ xs: 12, sm: 6, md: 3 }}>
          <DashCard title="Stagiaires Rémunérés" value={remInt} loading={load4} />
        </Grid>
      </Grid>
    </Box>
  );
};