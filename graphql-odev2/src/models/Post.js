export default `
    type Post{

        id : ID!
        title : String
        user_id : ID!
        comments : [Comment]
        user : User
    }
`