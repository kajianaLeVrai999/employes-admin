import { useRecordContext, useGetList } from 'react-admin';
import { Typography, List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

export const InternsByManager = () => {
  const employee = useRecordContext();
  const { data: interns, total, isPending } = useGetList(
    'interns',
    {
      pagination: { page: 1, perPage: 50 },
      sort: { field: 'id', order: 'ASC' },
      filter: { managerId: employee?.id }
    },
    { enabled: !!employee?.id }
  );

  if (isPending) return null;

  return (
    <div style={{ marginTop: '20px' }}>
      <Typography variant="h6">Stagiaires encadrés ({total ?? 0})</Typography>
      {total === 0 ? (
        <Typography color="textSecondary">Cet employé n'encadre aucun stagiaire actuellement.</Typography>
      ) : (
        <List>
          {interns?.map(intern => (
            <ListItem key={intern.id} component={Link} to={`/interns/${intern.id}/show`} style={{ textDecoration: 'none', color: 'inherit' }}>
              <ListItemText primary={`${intern.firstname} ${intern.lastname}`} secondary={`Email: ${intern.email}`} />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};