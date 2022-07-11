import * as React from "react";
import Box from "@mui/material/Box";
import ListItem from "@mui/material/ListItem";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import LoadingButton from '@mui/lab/LoadingButton';
import SendIcon from '@mui/icons-material/Send';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material/";
import AppBar from "../components/AppBar";
import { gql, useQuery } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import ReactLoading from "react-loading";
import { useParams } from "react-router-dom";
import { deepOrange } from '@mui/material/colors';
import { useLazyQuery } from '@apollo/client';

export default function AlignItemsList() {
	const { id } = useParams();


	const darkTheme = createTheme({
		palette: {
			background: { default: "#35c9ca" },
			primary: { main: "#04071c" },
		},
	});

	const [searchKey, setSearchKey] = React.useState("");

	const GET_POST_DETAIL = gql`
		query gpd($id : ID!){
			post(id: $id) {
				title
				id
				description
			}
		}
	`;

	const GET_COMMENTS = gql`
		query{
				post(id: "${id}") {
					id
					comments {
						text
					}
				}
			}
	`

	const { loading, data } = useQuery(GET_POST_DETAIL, {
		variables : {id} 
	});

	const [getComments, { loading:commentsLoading,data:commentsData }] = useLazyQuery(GET_COMMENTS);
	
	React.useEffect(() => {console.log(commentsData)}, [commentsData])

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
						<Box
							component="img"
							sx={{
								height: window.innerHeight / 1.5,
								width: window.innerWidth / 2,
							}}
							alt="The house from the offer."
							src={`https://picsum.photos/1080/720?random=${id}`}
						/>
						<Typography variant="h4" sx={{ textAlign: "center" }}>
							{data && data.post.title}
						</Typography>
						<Typography variant="body">{data && data.post.description}</Typography>
						<br/><br/>
						{!commentsData &&
							<div>
							<LoadingButton variant="contained" endIcon={<SendIcon />}
							loading={commentsLoading}
							onClick = {() => {getComments()}}
							>
							Show Comments
						  	</LoadingButton>
							</div>
							
						}
						{commentsData && 
						<div>
						<Typography variant="overline">Comments</Typography>
						<Paper elavation={20} sx={{backgroundColor:"#cfcce0"}}>

						<List sx={{ width: "100%" }}>
							{commentsData &&
								commentsData.post.comments.map((comment, index) => {
									return (
										<div key={index}>
											<ListItem alignItems="flex-start" key={index}>
											<ListItemAvatar>
												<Avatar
												 sx={{ bgcolor: deepOrange[500], color:"purple" }}
												>{comment.text[1]}</Avatar>
											</ListItemAvatar>
											<ListItemText
												primary={
													<React.Fragment>
														<Typography
															sx={{ display: "inline" }}
															component="span"
															variant="body2"
															color="black"
														>
															{comment.text}
														</Typography>
													</React.Fragment>
												}
											/>
										</ListItem>
										</div>
										
									);
								})}

							<Divider variant="inset" component="li" />
						</List>
						</Paper>

						</div>
						
						}
						
						
					</Grid>
					<Grid item xs={3} />
				</Grid>
			</ThemeProvider>
		</div>
	);
}
