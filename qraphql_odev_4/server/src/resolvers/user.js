const {nanoid} = require('nanoid')
const {pipe,filter} = require('@graphql-yoga/node')
module.exports = {
	User: {
		posts: (parent, args, context) =>
			context.db.posts.filter((p) => p.user_id == parent.id),
	},

	Query: {
		users: (p, a, context) => context.db.users,
		user: (parent, args, context) =>
			context.db.users.find((u) => u.id == args.id),
	},

	Mutation: {
		addNewUser: (p, a, context) => {
			let index = context.db.users.push({ id: nanoid(), fullName: a.fullName });
			context.pubSub.publish("userCreated", context.db.users[index - 1]);
			context.pubSub.publish("userCount", context.db.users.length);
			return context.db.users[index - 1];
		},
		updateUser: (p, a, context) => {
			let user_index = context.db.users.findIndex(
				(e) => e.id == a.context.db.id
			);
			if (user_index == -1) throw new Error("ID Veritabanında bulunamadı");

			context.db.users[user_index] = {
				...context.db.users[user_index],
				...a.data,
			};
			return context.db.users[user_index];
		},
		deleteUser: (p, a, context) => {
			let index = context.db.users.findIndex((e) => e.id == a.id);
			if (index == -1) throw new Error("ID veritabanında bulunamadı");
			let deleted = context.db.users.splice(index, 1)[0];
			context.pubSub.publish("userCount", context.db.users.length);

			return deleted;
		},
		deleteAllUsers: () => {
			let length = context.db.users.length;
			context.db.users.splice(0, length);
			return length;
		},
	},

	Subscription: {
		userCreated: {
			subscribe: (_, args, context) =>
				context.pubSub.asyncIterator("userCreated"),
			resolve: (payload) => payload,
		},
		userCount: {
			subscribe: (_, args, context) =>
				context.pubSub.asyncIterator("userCount"),
			resolve: (payload) => payload,
		},
		watchUserDetailChanged: {
			subscribe: (_, args, context) =>
				pipe(
					context.pubSub.asyncIterator("watchUserDetailChanged"),
					filter((value) => {
						console.log(value);
						return value.id == args.id;
					})
				),
			resolve: (value) => value,
		},
	},
};
