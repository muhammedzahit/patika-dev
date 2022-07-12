const {nanoid} = require('nanoid')
const {pipe,filter} = require('@graphql-yoga/node')


module.exports = {
	Post: {
		comments: (parent, args, context) =>
			context.db.comments.filter((c) => c.post_id == parent.id),
		user: (parent, args, context) =>
			context.db.users.find((u) => u.id == parent.user_id),
		short_description : (parent, args, context) =>
			parent.description.slice(0,100)
	},
	Query: {
		posts: (p, a, context) => {
			let searchKey = ""
			if(a.searchKey)
				searchKey = a.searchKey
			return context.db.posts.filter((p) => p.title.toLowerCase().startsWith(searchKey.toLowerCase()))
		}, 
		post: (parent, args, context) =>
			context.db.posts.find((p) => p.id == args.id),
	},
	Mutation: {
		addNewPost: (p, a, context) => {
			let user_id = a.user_id;
			if (a.user_fullName && !a.user_id)
				user_id = context.db.users.find(
					(u) => u.fullName == a.user_fullName
				).id;
			let index = context.db.posts.push({
				...a,
				id: nanoid(),
				user_id : user_id,
			});
			let user_data = context.db.users.find(
				(u) => u.id == context.db.posts[index - 1].user_id
			);
			console.log(user_data);
			context.pubSub.publish("watchUserDetailChanged", user_data);
			context.pubSub.publish("watchNewPosts", context.db.posts[index - 1]);
			return context.db.posts[index - 1];
		},
		updatePost: (p, a, context) => {
			let index = context.db.posts.findIndex((e) => e.id == a.context.db.id);
			if (index == -1)
				throw new Error("Girdiğiniz ID veritabanında bulunamadı");
			context.db.posts[index] = {
				...context.db.posts[index],
				...a.data,
			};
			return context.db.posts[index];
		},
		deletePost: (p, a, context) => {
			let index = context.db.posts.findIndex((e) => e.id == a.id);
			if (index == -1) throw new Error("ID veritabanında bulunamadı");
			let deleted = context.db.posts.splice(index, 1)[0];

			return deleted;
		},
		deleteAllPosts: () => {
			let length = context.db.posts.length;
			context.db.posts.splice(0, length);
			return length;
		},
	},
	Subscription:{
		watchNewPosts : {
			subscribe : (p,a,c) => {
				return pipe(
					c.pubSub.asyncIterator('watchNewPosts'),
					filter((v) => v.title.toLowerCase().startsWith(a.searchKey.toLowerCase()))
				)
			},
			resolve : (v) => v
		}
	}
};	
