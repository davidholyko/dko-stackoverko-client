import apiUrl from '../apiConfig'
import axios from 'axios'

export const postQuestion = (user, data) => {
  return axios({
    url: `${apiUrl}/questions`,
    method: 'POST',
    headers: { 'Authorization': `Token token=${user.token}` },
    data: {
      question: {
        title: data.title,
        body: data.body,
        anonymous: data.anonymous
      }
    }
  })
}

export const patchQuestion = (user, data) => {
  return axios({
    url: `${apiUrl}/questions/${data.id}`,
    method: 'PATCH',
    headers: { 'Authorization': `Token token=${user.token}` },
    data: {
      question: {
        title: data.title,
        body: data.body,
        anonymous: data.anonymous
      }
    }
  })
}

export const deleteQuestion = (user, data) => {
  return axios({
    url: `${apiUrl}/questions/${data.id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const indexQuestions = user => {
  return axios({
    url: `${apiUrl}/questions`,
    method: 'GET'
  })
}

export const showQuestion = (user, id) => {
  return axios({
    url: `${apiUrl}/questions/${id}`,
    // headers: { 'Authorization': `Token token=${user.token}` },
    method: 'GET'
  })
}

export const questionLikeCreate = (user, id) => {
  return axios({
    url: `${apiUrl}/likes`,
    method: 'POST',
    headers: { 'Authorization': `Token token=${user.token}` },
    data: {
      like: {
        question_id: id
      }
    }
  })
}

export const questionLikeDelete = (user, id) => {
  return axios({
    url: `${apiUrl}/likes/${id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const questionLikeShow = (user, id) => {
  return axios({
    url: `${apiUrl}/likes/${id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}
