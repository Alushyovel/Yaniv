// App.js
import React, { useState, useEffect } from 'react';
import { Container, Typography, Grid, Paper, Button, Stack } from '@mui/material';
import ParticipantsTable from './ParticipantsTable';
import MatchesTable from './MatchesTable';

const initialParticipants = [
  { id: 1, name: 'Stav', score: 0, wins: 0, difference: 0 },
  { id: 2, name: 'Yovel', score: 0, wins: 0, difference: 0 },
  { id: 3, name: 'Kfir', score: 0, wins: 0, difference: 0 },
];

function App() {
  const [participants, setParticipants] = useState(initialParticipants);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    updateScoresAndWins();
  }, [matches]);

  const updateScoresAndWins = () => {
    const updatedParticipants = participants.map((participant) => {
      const totalScore = matches.reduce(
        (sum, match) => sum + (match[participant.name] || 0),
        0
      );

      const totalWins = matches.reduce((wins, match) => {
        const lowestScore = Math.min(...Object.values(match));
        return match[participant.name] === lowestScore ? wins + 1 : wins;
      }, 0);

      return { ...participant, score: totalScore, wins: totalWins };
    });

    const participantsWithDifferences = updatedParticipants
      .sort((a, b) => a.score - b.score)
      .map((p, i, arr) => ({
        ...p,
        difference: i > 0 ? p.score - arr[i - 1].score : 0,
      }));

    setParticipants(participantsWithDifferences);
  };

  const addParticipant = () => {
    const newParticipant = {
      id: participants.length + 1,
      name: `Participant ${participants.length + 1}`,
      score: 0,
      wins: 0,
      difference: 0,
    };
    setParticipants([...participants, newParticipant]);
  };

  const removeParticipant = (id) => {
    setParticipants(participants.filter((p) => p.id !== id));
    setMatches(matches.map(match => {
      const { [participants.find(p => p.id === id).name]: _, ...rest } = match;
      return rest;
    }));
  };

  const resetMatches = () => {
    setMatches([]);
    setParticipants(participants.map(p => ({ ...p, score: 0, wins: 0, difference: 0 })));
  };

  return (
    <Container>
      <Typography variant="h4" align="center" gutterBottom>
        Yaniv Game Management
      </Typography>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Stack direction="row" spacing={2} sx={{ marginBottom: 2 }}>
              <Button variant="contained" onClick={addParticipant}>
                Add Participant
              </Button>
            </Stack>
            <ParticipantsTable
              participants={participants}
              removeParticipant={removeParticipant}
            />
          </Paper>
        </Grid>

        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <MatchesTable
              participants={participants}
              matches={matches}
              setMatches={setMatches}
              resetMatches={resetMatches}
            />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default App;
