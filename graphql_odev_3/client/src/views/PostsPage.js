import * as React from "react";
import List from "@mui/material/List";
import Link from "@mui/material/Link";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import AppBar from "../components/AppBar";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import ReactLoading from "react-loading";
import { useNavigate, useLocation } from "react-router-dom";

export default function AlignItemsList() {
	const darkTheme = createTheme({
		palette: {
			background: { default: "#35c9ca" },
			primary: { main: "#04071c" },
		},
	});

	let navigate = useNavigate();
	let location = useLocation();

	const handleNavigate = (loc) => {
		if (loc !== location.pathname) navigate(loc);
	};

	const [searchKey, setSearchKey] = React.useState("");

	const GET_POSTS = gql`
		query {
			posts(searchKey : "${searchKey}") {
				id
				title
				short_description
				user {
					id
					fullName
					photoUrl
				}
			}
		}
	`;

	const { loading, error, data } = useQuery(GET_POSTS);

	const handleSearchChange = (e) => {
		console.log(e.target.value);
		setSearchKey(e.target.value);
	};

	const handlePostClick = (id) => {};

	return (
		<div>
			<AppBar />
			{loading && (
				<Grid
					container
					spacing={0}
					direction="column"
					alignItems="center"
					justifyContent="center"
					style={{ minHeight: "100vh" }}
				>
					<Grid item xs={3}>
						<ReactLoading type="spinningBubbles" />
					</Grid>
				</Grid>
			)}
			<ThemeProvider theme={darkTheme}>
				<CssBaseline />
				<Grid container sx={{ marginTop: 5 }}>
					<Grid item xs={3} />
					<Grid item xs={6}>
						<Paper elavation={20} sx={{ backgroundColor: "#cfcce0" }}>
							<SearchBar onChangeFunc={handleSearchChange} />
							<List sx={{ width: "100%" }}>
								{data &&
									data.posts.map((post, index) => {
										return (
											<ListItem alignItems="flex-start">
												<ListItemAvatar>
													<Avatar
														alt={post.user.fullName}
														src={post.user.photoUrl}
													/>
												</ListItemAvatar>
												<ListItemText
													primary={
														<React.Fragment>
															<Link
																underline="hover"
																onClick={(e) => {
																	handleNavigate("/post/" + post.id);
																}}
															>
																<Typography
																	sx={{ display: "inline" }}
																	component="span"
																	variant="body2"
																	color="text.primary"
																>
																	{post.title + " - " + post.user.fullName}
																</Typography>
															</Link>
															<Typography variant="body2" sx={{color:"gray"}}>
																{post.short_description + " ..."} 
															</Typography>
														</React.Fragment>
													}
												/>
											</ListItem>
										);
									})}

								<Divider variant="inset" component="li" />
							</List>
						</Paper>
					</Grid>
					<Grid item xs={3} />
				</Grid>
			</ThemeProvider>
		</div>
	);
}
