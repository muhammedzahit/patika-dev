import { nanoid } from 'nanoid';
const resolver = (data) => {
    return {
        posts: (parent, args) => data.posts.filter(p => p.user_id == parent.id)
    };
};
const inputTypes = `
    input UpdateUserInput{
        id : ID!,
        fullName : String
    }
`;
const queryType = `
    users : [User],
    user(id : ID!) : User,
`;
const queryResolver = (data) => {
    return {
        users: () => data.users,
        user: (parent, args) => data.users.find(u => u.id == args.id)
    };
};
const mutationType = `
    addNewUser(fullName : String!) : User
    updateUser(data : UpdateUserInput!) : User
    deleteUser(id : ID!) : User
    deleteAllUsers : Int
`;
const mutationResolver = (data) => {
    return {
        addNewUser: (p, a, context) => {
            let index = data.users.push({ id: nanoid(), fullName: a.fullName });
            context.pubSub.publish('userCreated', data.users[index - 1]);
            context.pubSub.publish('userCount', data.users.length);
            return data.users[index - 1];
        },
        updateUser: (p, a) => {
            let user_index = data.users.findIndex((e) => e.id == a.data.id);
            if (user_index == -1)
                throw new Error('ID Veritabanında bulunamadı');
            data.users[user_index] = Object.assign(Object.assign({}, data.users[user_index]), a.data);
            return data.users[user_index];
        },
        deleteUser: (p, a, context) => {
            let index = data.users.findIndex((e) => e.id == a.id);
            if (index == -1)
                throw new Error("ID veritabanında bulunamadı");
            let deleted = data.users.splice(index, 1)[0];
            context.pubSub.publish('userCount', data.users.length);
            return deleted;
        },
        deleteAllUsers: () => {
            let length = data.users.length;
            data.users.splice(0, length);
            return length;
        }
    };
};
export default { queryType, mutationType, mutationResolver, queryResolver, resolver, inputTypes };
//# sourceMappingURL=userController.js.map