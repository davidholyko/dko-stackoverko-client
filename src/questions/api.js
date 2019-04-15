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
  console.log(data)
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
  console.log(data.id)
  return axios({
    url: `${apiUrl}/questions/${data.id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const indexQuestions = (user) => {
  return axios({
    url: `${apiUrl}/questions`,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}
