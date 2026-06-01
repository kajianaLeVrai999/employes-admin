import { useRecordContext, useGetList } from 'react-admin';
import { Typography, Box } from '@mui/material';

export const DepartmentStats = () => {
  const employee = useRecordContext();
  const { total, isPending } = useGetList(
    'employees',
    {
      pagination: { page: 1, perPage: 1 },
      sort: { field: 'id', order: 'ASC' },
      filter: { department: employee?.department, active: true }
    },
    { enabled: !!employee?.department }
  );

  if (isPending) return null;

  const colleaguesCount = total && total > 0 ? total - 1 : 0;

  return (
    <Box sx={{ mt: 2, p: 2, bgcolor: '#f0fdf4', borderRadius: 2, maxWidth: 400 }}>
      <Typography variant="body1" color="#166534">
        <strong>Dynamique d'équipe :</strong> {colleaguesCount} collègue(s) actif(s) dans le département {employee?.department}.
      </Typography>
    </Box>
  );
};