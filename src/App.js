import React, { useState } from 'react';
import { Box, Drawer, List, ListItem, ListItemText, ListItemIcon, IconButton, Typography } from '@mui/material';
import AjouterClasse from './AjouterClasse';
import AjouterCandidats from './AjouterCandidats';
import Voter from './Voter'; // Import the Voter component
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import MenuIcon from '@mui/icons-material/Menu';
import ClassIcon from '@mui/icons-material/Class';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import HowToVoteIcon from '@mui/icons-material/HowToVote';

const drawerWidth = 240;
const collapsedWidth = 60;

function App() {
    const [selectedItem, setSelectedItem] = useState('Ajouter Classe');
    const [isCollapsed, setIsCollapsed] = useState(false);

    const handleListItemClick = (item) => {
        setSelectedItem(item);
    };

    const renderContent = () => {
        switch (selectedItem) {
            case 'Ajouter Classe':
                return <AjouterClasse />;
            case 'Ajouter Candidats':
                return <AjouterCandidats />;
            case 'Voter':
                return <Voter />; // Render the Voter component
            default:
                return <div>Select an option from the sidebar</div>;
        }
    };

    return (
        <Box sx={{ display: 'flex', minHeight: '100vh', margin: 0, padding: 0, backgroundColor: '#f0f2f5', position: 'relative' }}> {/* Removed fixed height */}

            {/* Top Bar */}
            <Box
                sx={{
                    width: isCollapsed ? `calc(100% - ${collapsedWidth}px)` : `calc(100% - ${drawerWidth}px)`, // Adjust width based on sidebar
                    height: '50px',
                    backgroundColor: '#1b1e24',
                    color: '#fff',
                    position: 'fixed',
                    top: 0,
                    left: isCollapsed ? collapsedWidth : drawerWidth, // Move the bar based on sidebar width
                    transition: 'width 0.3s ease, left 0.3s ease', // Smooth transition
                    zIndex: 900, // Keep z-index lower than the sidebar
                }}
            >
                {/* Only display the collapse icon in the top bar when the sidebar is expanded */}
                {!isCollapsed && (
                    <IconButton
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        sx={{ color: '#fff', marginLeft: 2, zIndex: 1100, marginTop: 0.5 }}
                    >
                        <MenuOpenIcon />
                    </IconButton>
                )}
            </Box>

            {/* Sidebar Drawer */}
            <Drawer
                variant="permanent"
                sx={{
                    width: isCollapsed ? collapsedWidth : drawerWidth,
                    flexShrink: 0,
                    transition: 'width 0.3s ease',
                    zIndex: 1000, // Ensure the sidebar is on top of the top bar
                    [`& .MuiDrawer-paper`]: {
                        width: isCollapsed ? collapsedWidth : drawerWidth,
                        transition: 'width 0.3s ease',
                        boxSizing: 'border-box',
                        backgroundColor: '#1b1e24',
                        color: '#fff',
                        zIndex: 1000, // Ensure the sidebar stays on top
                    },
                }}
            >
                {/* Sidebar Collapse Icon when collapsed */}
                {isCollapsed && (
                    <IconButton
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        sx={{ color: '#fff', marginTop: 1, alignSelf: 'center' }}
                    >
                        <MenuIcon />
                    </IconButton>
                )}

                {/* ISGA Dashboard Title with Red Background - Only Show when Sidebar is Not Collapsed */}
                {!isCollapsed && (
                    <Box
                        sx={{
                            backgroundColor: '#7f0404', // Red background
                            padding: '8.5px',
                            textAlign: 'center',
                            color: '#fff',
                        }}
                    >
                        <Typography variant="h5">
                            ISGA Election
                        </Typography>
                    </Box>
                )}

                {/* Profile Section */}
                <Box
                    sx={{
                        display: 'flex',
                        backgroundColor: !isCollapsed ? '#080a0e' : '#1b1e24',
                        flexDirection: 'column',
                        alignItems: 'center',
                        p: 2,
                        transition: 'all 0.3s ease',
                    }}
                >
                    <Box
                        component="img"
                        src="http://www.fes.isga-elearning.ma/photos/0.png"
                        alt="Profile"
                        sx={{
                            width: isCollapsed ? '40px' : '100px',
                            height: isCollapsed ? '40px' : '100px',
                            borderRadius: '10%',
                            transition: 'all 0.3s ease',
                        }}
                    />
                </Box>

                {/* Menu Items */}
                <List>
                    <ListItem
                        button
                        onClick={() => handleListItemClick('Ajouter Classe')}
                        sx={{
                            backgroundColor: selectedItem === 'Ajouter Classe' ? '#7f0404' : 'transparent',
                            '&:hover': { backgroundColor: '#555' },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <ClassIcon />
                        </ListItemIcon>
                        {!isCollapsed && <ListItemText primary="Ajouter Classe" />}
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => handleListItemClick('Ajouter Candidats')}
                        sx={{
                            backgroundColor: selectedItem === 'Ajouter Candidats' ? '#7f0404' : 'transparent',
                            '&:hover': { backgroundColor: '#555' },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <PersonAddIcon />
                        </ListItemIcon>
                        {!isCollapsed && <ListItemText primary="Ajouter Candidats" />}
                    </ListItem>

                    <ListItem
                        button
                        onClick={() => handleListItemClick('Voter')}
                        sx={{
                            backgroundColor: selectedItem === 'Voter' ? '#7f0404' : 'transparent',
                            '&:hover': { backgroundColor: '#555' },
                        }}
                    >
                        <ListItemIcon sx={{ color: '#fff' }}>
                            <HowToVoteIcon />
                        </ListItemIcon>
                        {!isCollapsed && <ListItemText primary="Voter" />}
                    </ListItem>
                </List>
            </Drawer>

            {/* Main content area */}
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    bgcolor: '#F5F5F7', // Light background for content area
                    padding: 3,
                    paddingTop: '80px', // Adjust padding to account for the top bar
                    boxShadow: 'inset 0 0 10px rgba(0, 0, 0, 0.1)', // Adds a subtle shadow to the main content area
                    minHeight: '100vh', // Ensure minimum height is always 100% of viewport height
                }}
            >
                {renderContent()}
            </Box>
        </Box>
    );
}

export default App;
