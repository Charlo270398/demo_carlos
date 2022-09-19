export default function registerService ({ username, password }) {
  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/register`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username, password})
  }).then(res => {
    if (!res.ok){ 
      if(res.status === 409){
        throw new Error('Username already exists')
      } else {
        throw new Error('Error while registration process')
      }
    }
    return res.json()
  }).then(res => {
    const { jwt } = res
    return jwt
  })
}