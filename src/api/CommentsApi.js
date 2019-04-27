import apiUrl from './apiConfig'
import axios from 'axios'

export const postComment = (user, data, id) => {
  return axios({
    url: `${apiUrl}/comments`,
    method: 'POST',
    headers: { 'Authorization': `Token token=${user.token}` },
    data: {
      comment: {
        text: data.text,
        anonymous: data.anonymous,
        question_id: id
      }
    }
  })
}

export const patchComment = (user, data, id) => {
  return axios({
    url: `${apiUrl}/comments/${data.id}`,
    method: 'PATCH',
    headers: { 'Authorization': `Token token=${user.token}` },
    data: {
      comment: {
        text: data.text,
        anonymous: data.anonymous,
        question_id: id
      }
    }
  })
}

export const deleteComment = (user, data) => {
  return axios({
    url: `${apiUrl}/comments/${data.id}`,
    method: 'DELETE',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const indexComments = user => {
  return axios({
    url: `${apiUrl}/comments`,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}
