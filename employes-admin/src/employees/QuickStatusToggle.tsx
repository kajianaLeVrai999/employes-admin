import { useRecordContext, useUpdate } from 'react-admin';
import { Button } from '@mui/material';
import React from 'react';

export const QuickStatusToggle = () => {
  const record = useRecordContext();
  const [update, { isLoading }] = useUpdate();

  if (!record) return null;

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    update(
      'employees',
      { 
        id: record.id, 
        data: { ...record, active: !record.active }, 
        previousData: record 
      },
      { mutationMode: 'optimistic' }
    );
  };

  return (
    <Button
      variant="contained"
      size="small"
      disabled={isLoading}
      onClick={handleToggle}
      sx={{
        backgroundColor: record.active ? '#e91313' : '#026125',
        '&:hover': { backgroundColor: record.active ? '#900202' : '#8af6b1' },
        color: '#fff',
        textTransform: 'none'
      }}
    >
      {record.active ? 'Désactiver' : 'Activer'}
    </Button>
  );
};