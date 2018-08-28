import axios from 'axios';
const URL = 'https://ncnewsrobd.herokuapp.com/api/'

const errorHandler = (apiCallFn) => {
    return (...args) => apiCallFn(...args)
                .catch(err => {
                    const {data: {msg}, status} = err.response
                    return {status, msg}
                })
}

export const fetchAllArticles = errorHandler(() => {
    return axios.get(`${URL}articles`)
        .then(res => res.data.articles)
})

export const fetchTopics = errorHandler(() => {
    return axios.get(`${URL}topics`)
        .then(res => res.data.topics)
})

export const fetchArticlesByTopic = errorHandler((topic_slug) => {
    return axios.get(`${URL}topics/${topic_slug}/articles`)
        .then(res => res.data.articles)
})

export const fetchComments = errorHandler((article_id) => {
    return axios.get(`${URL}articles/${article_id}/comments`)
        .then(res => res.data.comments)
})

export const fetchArticle = errorHandler((article_id) => {
    return axios.get(`${URL}articles/${article_id}`)
        .then(res => res.data.article)
})

export const patchVotes = (path, direction) => {
    return axios.put(`${URL}${path}?vote=${direction}`)
}

export const postContent = errorHandler((path, content) => {
    return axios.post(`${URL}${path}`, content)
        .then(res => res.data.posted)
})

export const fetchUser = errorHandler((username) => {
    return axios.get(`${URL}users/${username}`)
        .then(res => res.data.user)
})

export const deleteComment = errorHandler((comment_id) => {
    return axios.delete(`${URL}comments/${comment_id}`)
})