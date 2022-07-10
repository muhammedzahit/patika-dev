const {nanoid} = require('nanoid')

module.exports = {
	Post: {
		comments: (parent, args, context) =>
			context.db.comments.filter((c) => c.post_id == parent.id),
		user: (parent, args, context) =>
			context.db.users.find((u) => u.id == parent.user_id),
	},
	Query: {
		posts: (p, a, context) => context.db.posts,
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
				id: nanoid(),
				user_id,
				title: a.title,
			});
			let user_data = context.db.users.find(
				(u) => u.id == context.db.posts[index - 1].user_id
			);
			console.log(user_data);
			context.pubSub.publish("watchUserDetailChanged", user_data);

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
};
