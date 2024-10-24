// ParticipantsTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button } from '@mui/material';

const ParticipantsTable = ({ participants, removeParticipant }) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>שם</TableCell>
          <TableCell>ניקוד</TableCell>
          <TableCell>ניצחונות</TableCell>
          <TableCell>הפרש</TableCell>
          <TableCell>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {participants.map((participant) => (
          <TableRow key={participant.id}>
            <TableCell>
              <TextField
                value={participant.name}
                placeholder="Enter name"
                onChange={(e) =>
                  participant.name = e.target.value // Handle name change directly
                }
              />
            </TableCell>
            <TableCell>{participant.score}</TableCell>
            <TableCell>{participant.wins}</TableCell>
            <TableCell>{participant.difference}</TableCell>
            <TableCell>
              <Button
                variant="contained"
                color="error"
                onClick={() => removeParticipant(participant.id)}
              >
                Remove
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default ParticipantsTable;
