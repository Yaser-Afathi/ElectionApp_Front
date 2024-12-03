import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography, Grid, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CandidatForm() {
    const [classes, setClasses] = useState([]);
    const [selectedClassId, setSelectedClassId] = useState('');
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [errorMessage, setErrorMessage] = useState(''); // Store error message for file size

    const MAX_FILE_SIZE =  1024 * 1024; // 1MB file size limit

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await axios.get('http://localhost:9090/GetAllClasses');
                if (Array.isArray(response.data)) {
                    setClasses(response.data);
                } else {
                    console.error("Expected an array but got:", typeof response.data);
                }
            } catch (error) {
                console.error('Error fetching classes:', error);
            }
        };

        fetchClasses();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('nom', nom);
        formData.append('prenom', prenom);
        formData.append('image', image);
        formData.append('ClassId', selectedClassId);

        try {
            const response = await axios.post('http://localhost:9090/AjoutCandidat', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNom('');
            setPrenom('');
            setImage(null);
            setImagePreview(null);
            setSelectedClassId('');
        } catch (error) {
            console.error('Error submitting candidat:', error);
        }
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > MAX_FILE_SIZE) {
                setErrorMessage(`La taille du fichier dépasse la limite de 1 Mo. Veuillez télécharger une image plus petite.`);
                setImage(null); // Reset the image state
                setImagePreview(null); // Reset the image preview
            } else {
                setImage(file);
                setImagePreview(URL.createObjectURL(file)); // Preview the image
                setErrorMessage(''); // Clear any previous error messages
            }
        }
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        setErrorMessage(''); // Clear the error message if image is removed
    };

    return (
        <Box sx={{ maxWidth: 800, margin: '0 auto', padding: 4 }}>
            <Typography variant="h4" gutterBottom>
                Ajouter un nouveau Candidat
            </Typography>
            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Nom"
                            variant="outlined"
                            fullWidth
                            value={nom}
                            onChange={(e) => setNom(e.target.value)}
                            required
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            label="Prénom"
                            variant="outlined"
                            fullWidth
                            value={prenom}
                            onChange={(e) => setPrenom(e.target.value)}
                            required
                        />
                    </Grid>

                    {/* Image Upload */}
                    <Grid item xs={12}>
                        <Button
                            variant="contained"
                            sx={{ backgroundColor: '#7f0404', color: '#fff' }} // Use sx prop for custom styles
                            component="label"
                            fullWidth
                        >
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                hidden
                                onChange={handleImageChange}
                                required={!imagePreview}
                            />
                        </Button>

                        {/* Display Error Message */}
                        {errorMessage && (
                            <Alert severity="error" sx={{ mt: 2 }}>
                                {errorMessage}
                            </Alert>
                        )}

                        {/* Display Image Preview with Remove Button */}
                        {imagePreview && (
                            <Box
                                sx={{
                                    position: 'relative',
                                    display: 'inline-block',
                                    mt: 2,
                                    border: '1px solid #ccc',
                                    padding: '8px',
                                    borderRadius: '4px',
                                }}
                            >
                                <img
                                    src={imagePreview}
                                    alt="Preview"
                                    style={{
                                        maxHeight: '200px',
                                        borderRadius: '4px',
                                    }}
                                />
                                <IconButton
                                    size="small"
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        bgcolor: 'rgba(255,255,255,0.8)',
                                    }}
                                    onClick={handleRemoveImage}
                                >
                                    <CloseIcon />
                                </IconButton>
                            </Box>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth variant="outlined" required>
                            <InputLabel>Classe</InputLabel>
                            <Select
                                label="Classe"
                                value={selectedClassId}
                                onChange={(e) => setSelectedClassId(e.target.value)}
                            >
                                {Array.isArray(classes) && classes.length > 0 ? (
                                    classes.map((classe) => (
                                        <MenuItem key={classe.id} value={classe.id}>
                                            {classe.name}
                                        </MenuItem>
                                    ))
                                ) : (
                                    <MenuItem disabled>No classes available</MenuItem>
                                )}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12}>
                        <Button variant="contained"
                                sx={{ backgroundColor: '#7f0404', color: '#fff' }} // Use sx prop for custom styles
                                type="submit" fullWidth>
                            Enregistrer le Candidat
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
}

export default CandidatForm;
