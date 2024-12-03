import { Card, CardContent, Avatar, Typography, Button, CardActions, LinearProgress } from '@mui/material';

const CandidateCard = ({ candidat, handleVote, isVotingClosedForClass, calculatePercentage }) => {
    return (
        <Card sx={{
            maxWidth: 345,
            boxShadow: 4,
            borderRadius: 5,
            transition: '0.3s',
            backgroundColor: '#fff', // Keep card white but with shadow
            border: '1px solid #e0e0e0',
            '&:hover': {
                transform: 'scale(1.03)',
                boxShadow: '0 6px 20px rgba(0, 0, 0, 0.15)'
            }
        }}>
            <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
                <Avatar
                    src={`data:image/jpeg;base64,${candidat.image}`}
                    alt={`${candidat.nom} ${candidat.prenom}`}
                    sx={{ width: 120, height: 120, marginBottom: 2, borderRadius: '50%' }}
                />
                <Typography variant="h5" component="div" fontWeight="bold" gutterBottom>
                    {candidat.nom} {candidat.prenom}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Classe: {candidat.classeName || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Votes: {candidat.votes}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
                    Voting Percentage: {calculatePercentage(candidat.votes, candidat.totalClasseNumber)}%
                </Typography>
                <LinearProgress
                    variant="determinate"
                    value={calculatePercentage(candidat.votes, candidat.totalClasseNumber)}
                    sx={{ width: '100%', marginTop: 2, borderRadius: 5, height: 8 }}
                />
            </CardContent>
            <CardActions sx={{ justifyContent: 'center', paddingBottom: 3 }}>
                <Button
                    variant="contained"
                    onClick={() => handleVote(candidat.id)}
                    disabled={isVotingClosedForClass(candidat.classeName)}
                    sx={{
                        backgroundColor: isVotingClosedForClass(candidat.classeName) ? '#888' : '#7f0404',
                        color: '#fff',
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: isVotingClosedForClass(candidat.classeName) ? '#888' : '#5f0303',
                        },
                        padding: '8px 20px',
                        fontSize: '16px',
                    }}
                >
                    {isVotingClosedForClass(candidat.classeName) ? 'Voting Closed' : `Vote for ${candidat.nom}`}
                </Button>
            </CardActions>
        </Card>
    );
};

export default CandidateCard;
