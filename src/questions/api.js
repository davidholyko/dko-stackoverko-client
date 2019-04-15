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

export const indexQuestions = (user) => {
  return axios({
    url: `${apiUrl}/questions`,
    method: 'GET',
    headers: { 'Authorization': `Token token=${user.token}` }
  })
}

export const signUp = credentials => {
  return axios({
    method: 'POST',
    url: apiUrl + '/sign-up',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password,
        password_confirmation: credentials.passwordConfirmation
      }
    }
  })
}

export const signIn = credentials => {
  return axios({
    url: apiUrl + '/sign-in',
    method: 'POST',
    data: {
      credentials: {
        email: credentials.email,
        password: credentials.password
      }
    }
  })
}

export const signOut = user => {
  return axios({
    url: apiUrl + '/sign-out',
    method: 'DELETE',
    headers: {
      'Authorization': `Token token=${user.token}`
    }
  })
}

export const changePassword = (passwords, user) => {
  return axios({
    url: apiUrl + '/change-password',
    method: 'PATCH',
    headers: {
      'Authorization': `Token token=${user.token}`
    },
    data: {
      passwords: {
        old: passwords.oldPassword,
        new: passwords.newPassword
      }
    }
  })
}
