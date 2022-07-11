import * as React from "react";
import List from "@mui/material/List";
import Button from "@mui/material/Button";
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
import { gql, useQuery, useSubscription } from "@apollo/client";
import SearchBar from "../components/SearchBar";
import ReactLoading from "react-loading";
import { useNavigate, useLocation } from "react-router-dom";
import Alert from "@mui/material/Alert";
import Badge from '@mui/material/Badge';
import MailIcon from '@mui/icons-material/Mail';
import PostAddIcon from '@mui/icons-material/PostAdd';

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


	const MODES = {
		ALL_POSTS : "ALL_POSTS",
		NEW_POSTS : "NEW_POSTS"
	}

	const [searchKey, setSearchKey] = React.useState("");
	const [alertComponent, setAlertComponent] = React.useState(null);
	const [newPosts, setNewPosts] = React.useState([])
	const [pageMode, setPageMode] = React.useState(MODES.ALL_POSTS)
	

	const POST_SUBSCRIPTION = gql`
		subscription{
			watchNewPosts(searchKey : "${searchKey}") {
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

	const GET_POSTS = gql`
		query getPosts($searchKey: String) {
			posts(searchKey: $searchKey) {
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

	const { loading, data } = useQuery(GET_POSTS, {
		variables: { searchKey },
		fetchPolicy: "network-only",
	});
	const { data: subscriptionData, loading: subscriptionLoading } =
		useSubscription(POST_SUBSCRIPTION);

	

	React.useEffect(() => {
		if (!subscriptionData) return;
		setNewPosts([subscriptionData.watchNewPosts, ...newPosts])
		console.log("girdi");
		let formerSearchKey = (" " + searchKey).slice(1);
		setSearchKey("");
		setTimeout(() => {
			setSearchKey(formerSearchKey);
		}, 0);

		setAlertComponent(
			<Alert
				severity="info"
				onClick={(e) => {
					handleNavigate("/post/" + subscriptionData.watchNewPosts.id);
				}}
			>
				{subscriptionData.watchNewPosts.user.fullName} published{" "}
				{subscriptionData.watchNewPosts.title} post (Go To Post Detail)
			</Alert>
		);
		setTimeout(() => {
			setAlertComponent(null);
		}, 5000);
	}, [searchKey, subscriptionData]);

	const handleSearchChange = (e) => {
		console.log(e.target.value);
		setSearchKey(e.target.value);
	};

	const generateListItemPost = (post) => {
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
							<Typography
								variant="body2"
								sx={{ color: "gray" }}
							>
								{post.short_description + " ..."}
							</Typography>
						</React.Fragment>
					}
				/>
			<Divider variant="inset" component="li" />
			
			</ListItem>
		);
	}

	return (
		<div>
			<AppBar />
			{alertComponent}
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
							<Button 
							onClick={(e) => {setPageMode(MODES.ALL_POSTS)}}
							sx = {{float : "left"}}startIcon = {<MailIcon color="action" fontSize="large" />}>
							All Posts
							</Button>
							<Button 
							onClick={(e) => {setPageMode(MODES.NEW_POSTS)}}
							sx = {{float : "right"}}startIcon = {<Badge color="info" badgeContent={newPosts.length}>
								<PostAddIcon color="action" fontSize="large" />
							</Badge>}>
							New Posts
							</Button>
							<br></br>
							<br></br>
							<SearchBar onChangeFunc={handleSearchChange} />
							<List sx={{ width: "100%" }}>
								{console.log(data)}
								{pageMode === MODES.ALL_POSTS && 
									data?.posts.map((post, index) => {
										return generateListItemPost(post)
									})}
								{pageMode === MODES.NEW_POSTS && 
									newPosts.map((post, index) => {
										return generateListItemPost(post)
									})}
							</List>
						</Paper>
					</Grid>
					<Grid item xs={3} />
				</Grid>
			</ThemeProvider>
		</div>
	);
}
