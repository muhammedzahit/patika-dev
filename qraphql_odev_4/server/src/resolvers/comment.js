const {nanoid} = require('nanoid')
module.exports = {
	Comment: {
		post: (parent, args, context) =>
			context.db.posts.find((p) => p.id == parent.post_id),
	},

	Query: {
		comments: (p, a, context) => context.db.comments,
		comment: (parent, args) => context.db.comments.find((c) => c.id == args.id),
	},

	Mutation: {
		addNewComment: (p, a, context) => {
			let post_id = a.post_id;
			let post = {}
			if (!a.post_id && a.post_title) {
				post = context.db.posts.find((p) => p.title == a.post_title);
			}
			else{
				post = context.db.posts.find((p) => p.id == a.post_id);
				post_id = post.id
			}
			
			let user = context.db.users.find((u) => u.id == post.user_id)

			let index = context.db.comments.push({
				id: nanoid(),
				post_id,
				text: a.text,
			});
			
			context.pubSub.publish("watchUserDetailChanged", user)
			return context.db.comments[index - 1];
		},
		updateComment: (p, a, context) => {
			let comment_index = context.db.comments.findIndex(
				(e) => e.id == a.context.db.id
			);
			if (comment_index == -1) throw new Error("Düzenlenecek ID Bulunamadı");

			context.db.comments[comment_index] = {
				...context.db.comments[comment_index],
				...a.data,
			};
		},
		deleteComment: (p, a, context) => {
			let index = context.db.comments.findIndex((e) => e.id == a.id);
			if (index == -1) throw new Error("ID veritabanında bulunamadı");
			let deleted = context.db.comments.splice(index, 1)[0];

			return deleted;
		},
		deleteAllComments: () => {
			let length = context.db.comments.length;
			context.db.comments.splice(0, length);
			return length;
		},
	},
};
