import React, { useState } from 'react';
import axios from 'axios';
import { TextField, Button, MenuItem, Select, InputLabel, FormControl, Box, Typography } from '@mui/material';

function ClasseForm() {
    const [name, setName] = useState('');
    const [studentNumber, setStudentNumber] = useState('');
    const [typeClass, setTypeClass] = useState('Management');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const newClasse = {
            name: name,
            studentNumber: parseInt(studentNumber),
            type: typeClass
        };

        try {
            const response = await axios.post('http://localhost:9090/AjoutClasse', newClasse);
            console.log('Classe créée avec succès:', response.data);
            // Reset form fields after successful submission
            setName('');
            setStudentNumber('');
            setTypeClass('Management');
        } catch (error) {
            console.error('Erreur lors de la création de la classe:', error);
        }
    };

    return (
        <Box sx={{ maxWidth: 600, margin: '0 auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom>
                Ajouter une nouvelle Classe
            </Typography>
            <form onSubmit={handleSubmit}>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Nom de la Classe"
                        variant="outlined"
                        fullWidth
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <TextField
                        label="Nombre d'élèves"
                        type="number"
                        variant="outlined"
                        fullWidth
                        value={studentNumber}
                        onChange={(e) => setStudentNumber(e.target.value)}
                        required
                    />
                </Box>
                <Box sx={{ marginBottom: 2 }}>
                    <FormControl fullWidth variant="outlined" required>
                        <InputLabel>Type de Classe</InputLabel>
                        <Select
                            label="Type de Classe"
                            value={typeClass}
                            onChange={(e) => setTypeClass(e.target.value)}
                        >
                            <MenuItem value="Ingénieurs">Ingénieurs</MenuItem>
                            <MenuItem value="Management">Management</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <Button variant="contained"
                        sx={{ backgroundColor: '#7f0404', color: '#fff' }} // Use sx prop for custom styles
                        type="submit" fullWidth>
                    Enregistrer la Classe
                </Button>
            </form>
        </Box>
    );
}

export default ClasseForm;
