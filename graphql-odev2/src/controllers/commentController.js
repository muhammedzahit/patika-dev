import { nanoid } from 'nanoid'

const queryType = `
    comments : [Comment],
    comment(id : ID!) : Comment,
`

const inputTypes = `
    input UpdateCommentInput{
        id : ID!, 
        text : String, 
        post_id : ID
    }
`

const mutationType = `
    addNewComment(text : String!, post_id : ID, post_title : String) : Comment
    updateComment(data : UpdateCommentInput!) : Comment
    deleteComment(id : ID!) : Comment
    deleteAllComments : Int
`

const resolver = (data) => {
    return {
        post : (parent,args) => data.posts.find(p => p.id == parent.post_id)
    }
}

const queryResolver = (data) =>  {
    return {
        comments : () => data.comments,
        comment : (parent,args) => data.comments.find(c => c.id == args.id)
    }
}

const mutationResolver = (data) => {
    return {
        addNewComment : (p,a) => {
            let post_id = a.post_id
            if(!a.post_id && a.post_title){
                post_id = data.posts.find(p => p.title == a.post_title).id
            }
            let index = data.comments.push({id : nanoid(), post_id, text : a.text})
            return data.comments[index - 1]
        },
        updateComment : (p,a) => {
            let comment_index = data.comments.findIndex((e) => e.id == a.data.id)
            if(comment_index == -1)
                throw new Error('Düzenlenecek ID Bulunamadı')
            
            data.comments[comment_index] = {
                ...data.comments[comment_index],
                ...a.data
            }
        },
        deleteComment : (p,a) => {
            let index = data.comments.findIndex((e) => e.id == a.id)
            if(index == -1)
                throw new Error("ID veritabanında bulunamadı")
            let deleted = data.comments.splice(index, 1)[0]

            return deleted
        },
        deleteAllComments : () => {
            let length = data.comments.length
            data.comments.splice(0, length)
            return length
        }
    }
}

export default {queryType, mutationType, mutationResolver, queryResolver, resolver, inputTypes}