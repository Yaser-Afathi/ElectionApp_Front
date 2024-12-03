import { Autocomplete, TextField } from '@mui/material';

const ClassSelector = ({ classes, selectedClass, setSelectedClass, fetchCandidats }) => {
    return (
        <Autocomplete
            options={classes} // Provide the list of classes
            getOptionLabel={(option) => option.name} // Display the name of the class in the dropdown
            value={classes.find((classe) => classe.id === selectedClass) || null} // Set the current value based on selectedClass
            onChange={(event, newValue) => {
                setSelectedClass(newValue?.id || ''); // Set the selected class ID
                if (newValue) {
                    fetchCandidats(newValue.id); // Fetch candidats for the selected class if a new value is selected
                }
            }}
            renderInput={(params) => (
                <TextField
                    {...params}
                    label="Select Class" // Label for the dropdown
                    variant="outlined" // Add variant to style the input
                />
            )}
            isOptionEqualToValue={(option, value) => option.id === value.id} // Ensure options are compared correctly by ID
        />
    );
};

export default ClassSelector;
