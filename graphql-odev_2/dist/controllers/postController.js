import { nanoid } from 'nanoid';
const queryType = `
    posts : [Post],
    post(id : ID!) : Post!,
`;
const inputTypes = `
    input UpdatePostInput{
        id : ID!
        title : String
        user_id : ID
    }
`;
const mutationType = `
    addNewPost(title : String!, user_id : ID, user_fullName : String) : Post
    updatePost(data : UpdatePostInput!) : Post
    deletePost(id : ID!) : Post
    deleteAllPosts : Int
`;
const resolver = (data) => {
    return {
        comments: (parent, args) => data.comments.filter(c => c.post_id == parent.id),
        user: (parent, args) => data.users.find(u => u.id == parent.user_id)
    };
};
const queryResolver = (data) => {
    return {
        posts: () => data.posts,
        post: (parent, args) => data.posts.find(p => p.id == args.id),
    };
};
const mutationResolver = (data) => {
    return {
        addNewPost: (p, a, context) => {
            let user_id = a.user_id;
            if (a.user_fullName && !a.user_id)
                user_id = data.users.find(u => u.fullName == a.user_fullName).id;
            let index = data.posts.push({ id: nanoid(), user_id, title: a.title });
            let user_data = data.users.find((u) => u.id == data.posts[index - 1].user_id);
            console.log(user_data);
            context.pubSub.publish('watchUserDetailChanged', user_data);
            return data.posts[index - 1];
        },
        updatePost: (p, a) => {
            let index = data.posts.findIndex((e) => e.id == a.data.id);
            if (index == -1)
                throw new Error("Girdiğiniz ID veritabanında bulunamadı");
            data.posts[index] = Object.assign(Object.assign({}, data.posts[index]), a.data);
            return data.posts[index];
        },
        deletePost: (p, a) => {
            let index = data.posts.findIndex((e) => e.id == a.id);
            if (index == -1)
                throw new Error("ID veritabanında bulunamadı");
            let deleted = data.posts.splice(index, 1)[0];
            return deleted;
        },
        deleteAllPosts: () => {
            let length = data.posts.length;
            data.posts.splice(0, length);
            return length;
        }
    };
};
export default { queryType, mutationType, mutationResolver, queryResolver, resolver, inputTypes };
//# sourceMappingURL=postController.js.map