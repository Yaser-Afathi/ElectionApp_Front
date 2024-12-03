// import { Card, CardContent, Avatar, Typography, Grid, Button } from '@mui/material';
//
// const WinnerCard = ({ winner, resetElection }) => {
//     return (
//         <Grid container spacing={3} justifyContent="center">
//             <Grid item xs={12} sm={6} md={4}>
//                 <Card sx={{ maxWidth: 345, boxShadow: 3, borderRadius: 3, transition: '0.3s', '&:hover': { transform: 'scale(1.05)', boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)' } }}>
//                     <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//                         <Avatar
//                             src={`data:image/jpeg;base64,${winner.image}`} // Assuming the image is base64 encoded
//                             alt={`${winner.nom} ${winner.prenom}`}
//                             sx={{ width: 150, height: 150, marginBottom: 2 }} // Circular Avatar
//                         />
//                         <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
//                             {winner.nom} {winner.prenom}
//                         </Typography>
//                         <Typography variant="h4" color="primary" fontWeight="bold" gutterBottom>
//                             WINNER
//                         </Typography>
//                         <Typography variant="body1" color="text.secondary">
//                             Votes: {winner.votes}
//                         </Typography>
//                     </CardContent>
//                 </Card>
//             </Grid>
//             <Grid item xs={12} sx={{ marginTop: 2 }}>
//                 <Button variant="contained" color="primary" onClick={resetElection}>
//                     Back to Class Selection
//                 </Button>
//             </Grid>
//         </Grid>
//     );
// };
//
// export default WinnerCard;
import React from 'react';
import {Card, CardContent, Avatar, Typography, Grid, Button} from '@mui/material';

const WinnerCard = ({winner, resetElection}) => {
    return (
        <div style={{position: 'relative', overflow: 'hidden', padding: '20px'}}>
            <Grid container spacing={3} justifyContent="center">
                <Grid item xs={12} sm={6} md={4}>
                    <Card
                        sx={{
                            maxWidth: 345,
                            boxShadow: 5,
                            borderRadius: 3,
                            background: 'linear-gradient(145deg, #FFD700, #FF8C00)',
                            color: 'white',
                            textAlign: 'center',
                            '&:hover': {
                                transform: 'scale(1.05) rotate(1deg)',
                                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.2)',
                            },
                        }}
                    >
                        <CardContent sx={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
                            <Avatar
                                src={`data:image/jpeg;base64,${winner.image}`} // Assuming the image is base64 encoded
                                alt={`${winner.nom} ${winner.prenom}`}
                                sx={{
                                    width: 150,
                                    height: 150,
                                    marginBottom: 2,
                                    border: '5px solid white',
                                }}
                            />
                            <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                                {winner.nom} {winner.prenom}
                            </Typography>
                            <Typography
                                variant="h3"
                                sx={{
                                    color: 'white',
                                    fontWeight: 'bold',
                                    letterSpacing: '2px',
                                    textShadow: '2px 2px 10px rgba(0,0,0,0.5)',
                                }}
                                gutterBottom
                            >
                                WINNER
                            </Typography>
                            <Typography variant="body1" color="white">
                                Votes: {winner.votes}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                {/* Centering the button */}
                <Grid
                    item
                    xs={12}
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        marginTop: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        sx={{
                            backgroundColor: '#7f0404', // Maroon color
                            color: '#fff', // White text
                            fontWeight: 'bold',
                            '&:hover': {
                                backgroundColor: '#ffffff', // White background on hover
                                color: '#7f0404', // Maroon text
                                border: '1px solid #7f0404', // Optional: border for better distinction
                            },
                        }}
                        onClick={resetElection}
                    >
                        Back to Class Selection
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default WinnerCard;