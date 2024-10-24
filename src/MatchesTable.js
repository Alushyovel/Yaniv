// MatchesTable.js
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Button, TextField, Stack } from '@mui/material';

const MatchesTable = ({ participants, matches, setMatches, resetMatches }) => {
  const handleScoreChange = (index, name, value) => {
    const updatedMatches = [...matches];
    updatedMatches[index] = { ...updatedMatches[index], [name]: parseInt(value, 10) || 0 };
    setMatches(updatedMatches);
  };

  const addMatch = () => {
    const newMatch = participants.reduce((acc, p) => ({ ...acc, [p.name]: 0 }), {});
    setMatches([...matches, newMatch]);
  };

  const getWinnerName = (match) => {
    const lowestScore = Math.min(...Object.values(match));
    return Object.keys(match).find((name) => match[name] === lowestScore);
  };

  return (
    <div>
      <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
        <Button variant="contained" onClick={addMatch}>
          Add Match
        </Button>
        <Button variant="contained" color="error" onClick={resetMatches}>
          Reset All Matches
        </Button>
      </Stack>
      <Table>
        <TableHead>
          <TableRow>
            {participants.map((p) => (
              <TableCell key={p.id}>{p.name}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {matches.map((match, index) => {
            const winnerName = getWinnerName(match); // Find the winner's name for this match

            return (
              <TableRow key={index}>
                {participants.map((p) => {
                  const score = match[p.name] || 0;

                  let textColor = 'black';
                  if (score > 30) textColor = 'red'; // Red if score > 30
                  else if (p.name === winnerName) textColor = 'green'; // Green if winner

                  return (
                    <TableCell key={p.id}>
                      <TextField
                        type="number"
                        value={score}
                        onChange={(e) => handleScoreChange(index, p.name, e.target.value)}
                        inputProps={{
                          style: {
                            color: textColor,
                          },
                        }}
                      />
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default MatchesTable;
