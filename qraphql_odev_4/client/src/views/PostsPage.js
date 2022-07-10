import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider, styled } from "@mui/material/styles";
import { CssBaseline } from '@mui/material/';
import AppBar from '../components/AppBar'
import { useLocation } from "react-router-dom";

export default function AlignItemsList() {
	const darkTheme = createTheme({ 
        palette: { 
            background: {default:"#35c9ca"}, 
            primary : { main: "#04071c" }
            }
    });
	const listTheme = createTheme({ palette: { mode: "dark" } });

    
	return (
        <div>
            <AppBar/>
            <ThemeProvider theme={darkTheme}>
            <CssBaseline/>
            <Grid container sx={{marginTop:5}}>
            <Grid item xs={3}/>
                <Grid item xs={6}>
                <Paper elavation={20}>
                <List sx={{ width: "100%"}}>
                <ListItem alignItems="flex-start">
                    <ListItemAvatar>
                        <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
                    </ListItemAvatar>
                    <ListItemText
                        primary="Brunch this weekend?"
                        secondary={
                            <React.Fragment>
                                <Typography
                                    sx={{ display: "inline" }}
                                    component="span"
                                    variant="body2"
                                    color="text.primary"
                                >
                                    Ali Connors
                                </Typography>
                                {" — I'll be in your neighborhood doing errands this…"}
                            </React.Fragment>
                        }
                    />
                </ListItem>
                <Divider variant="inset" component="li" />
                </List>
                </Paper>
                
                </Grid>
            <Grid item xs={3}/>
            
            </Grid>
        </ThemeProvider>
            
        </div>
        
        
        
		
	);
}
