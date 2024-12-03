import React, { useEffect, useState } from 'react';
import { Grid, CircularProgress, Box, Button, Typography, IconButton } from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material'; // Import the back arrow icon
import axios from 'axios';
import ClassSelector from './ClassSelector';
import CandidateCard from './CandidatCard';
import WinnerCard from './WinnerCard';

const Voter = () => {
  const [classes, setClasses] = useState([]); // State to store list of classes
  const [selectedClass, setSelectedClass] = useState(''); // State to store the selected class
  const [candidats, setCandidats] = useState([]); // State to store list of candidats
  const [loading, setLoading] = useState(false); // Loading state
  const [showWinner, setShowWinner] = useState(false); // State to toggle showing the winner
  const [error, setError] = useState(null); // Error state for API requests

  // Fetch classes from the API
  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const response = await axios.get('http://localhost:9090/GetAllClasses'); // API endpoint to fetch classes
        setClasses(response.data);
      } catch (error) {
        setError('Error fetching classes.');
        console.error('Error fetching classes', error);
      }
    };

    fetchClasses();
  }, []);

  // Fetch candidates based on the selected class
  const fetchCandidats = async (classId) => {
    try {
      setLoading(true);
      const response = await axios.get(`http://localhost:9090/${classId}/candidats`); // API endpoint to fetch candidats by class
      setCandidats(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError('Error fetching candidats.');
      console.error('Error fetching candidats', error);
    }
  };

  // Handle vote increment
  const handleVote = async (id) => {
    try {
      await axios.post(`http://localhost:9090/addVote/${id}`); // Using POST to add vote
      setCandidats((prevCandidats) =>
          prevCandidats.map((candidat) =>
              candidat.id === id ? { ...candidat, votes: candidat.votes + 1 } : candidat
          )
      );
    } catch (error) {
      setError('Error adding vote.');
      console.error('Error adding vote', error.response || error.message);
    }
  };

  // Utility functions
  const calculatePercentage = (votes, totalStudents) =>
      totalStudents > 0 ? ((votes / totalStudents) * 100).toFixed(2) : 0;

  const getTotalVotesForClass = (classeName) =>
      candidats
          .filter((candidat) => candidat.classeName === classeName)
          .reduce((totalVotes, candidat) => totalVotes + candidat.votes, 0);

  const isVotingClosedForClass = (classeName) => {
    const totalVotes = getTotalVotesForClass(classeName);
    const classSize = candidats.find((candidat) => candidat.classeName === classeName)?.totalClasseNumber || 0;
    return totalVotes >= classSize;
  };

  const getMostVotedCandidate = () =>
      candidats.reduce((max, candidat) => (candidat.votes > max.votes ? candidat : max), candidats[0]);

  const resetElection = () => {
    setSelectedClass(''); // Reset selected class
    setCandidats([]); // Clear the candidats list
    setShowWinner(false); // Hide the winner
  };

  // Show loading state while fetching data
  if (loading) {
    return <CircularProgress />;
  }

  // Display error message if any
  if (error) {
    return <Typography color="error" sx={{ mt: 2 }}>{error}</Typography>;
  }

  // If showWinner is true, only display the most voted candidate
  if (showWinner) {
    const winner = getMostVotedCandidate();
    return <WinnerCard winner={winner} resetElection={resetElection} />;
  }

  // Fetch the selected class name
  const selectedClassName = classes.find((classe) => classe.id === selectedClass)?.name || '';

  return (
      <Box sx={{ padding: '16px', maxWidth: '1200px', margin: 'auto' }}>

        {/* Show "Go Back" button if a class is selected */}
        {selectedClass && (
            <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 1, marginTop: -5 }}>
              <ArrowBackIcon sx={{ marginRight: 0.5, color: '#7f0404', cursor: 'pointer' }} onClick={resetElection} />
              <Typography
                  variant="h6"
                  sx={{ color: '#7f0404', fontWeight: 'bold', cursor: 'pointer' }}
                  onClick={resetElection} // Go back to class selection
              >
                Go Back
              </Typography>
            </Box>
        )}

        {/* Header with Two Logos on left and right */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 3 }}>
          {/* Left Logo */}
          <Box
              component="img"
              src="https://i0.wp.com/edvantis.ma/wp-content/uploads/2022/08/edvantis-.png?resize=1080%2C715&ssl=1"
              alt="Logo edvantis"
              sx={{ height: '100px', objectFit: 'contain' }}
          />

          {/* Dynamic Center Title */}
          <Typography variant="h4" sx={{ color: '#7f0404', fontWeight: 'bold', textAlign: 'center' }}>
            {selectedClass
                ? `Election of the Class: ${selectedClassName} Representative`
                : 'Election System'}
          </Typography>

          {/* Right Logo */}
          <Box
              component="img"
              src="https://info.isga.ma/hs-fs/hubfs/isga-logo-ISGA-ROUGE%20et%20gris-1.png?width=300&height=176&name=isga-logo-ISGA-ROUGE%20et%20gris-1.png"
              alt="Logo ISGA"
              sx={{ height: '100px', objectFit: 'contain' }}
          />
        </Box>

        {/* Show class selector if no class is selected */}
        {!selectedClass && (
            <ClassSelector
                classes={classes}
                selectedClass={selectedClass}
                setSelectedClass={setSelectedClass}
                fetchCandidats={fetchCandidats}
            />
        )}

        {/* Candidates List */}
        {selectedClass && (
            <Grid container spacing={3} justifyContent="center">
              {candidats.length > 0 ? (
                  candidats.map((candidat) => (
                      <Grid item key={candidat.id} xs={12} sm={6} md={4}>
                        <CandidateCard
                            candidat={candidat}
                            handleVote={handleVote}
                            isVotingClosedForClass={isVotingClosedForClass}
                            calculatePercentage={calculatePercentage}
                        />
                      </Grid>
                  ))
              ) : (
                  <Typography variant="body1" sx={{ mt: 2 }}>
                    No candidates available for this class.
                  </Typography>
              )}
            </Grid>
        )}

        {/* Conditionally render "Show Winner" button only if a class is selected */}
        {selectedClass && (
            <Grid container justifyContent="center" sx={{ marginTop: 3 }}>
              <Button
                  variant="contained"
                  sx={{ backgroundColor: '#7f0404', color: '#fff' }} // Use sx prop for custom styles
                  onClick={() => setShowWinner(true)} // Toggle showing the winner
              >
                Show Winner
              </Button>
            </Grid>
        )}
      </Box>
  );
};

export default Voter;
