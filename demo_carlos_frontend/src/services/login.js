export default function loginService ({ username, password }) {
    return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/login`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({username, password})
    }).then(res => {
      if (!res.ok){ 
        if(res.status === 403){
          throw new Error('Wrong Username/Password')
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