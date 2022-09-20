export default async function addNewService({ title, description, author, content, jwt }) {
  if(!jwt){
    throw new Error('JWT required')
  }

  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/news/add`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${jwt}`
    },
    body: JSON.stringify({ title, description, author, content })
  }).then(res => {
    if (!res.ok){ 
      if(res.status === 403){
        throw new Error('Forbidden')
      } else {
        throw new Error('Error during process')
      }
    }
    return res.json()
  }).then(res => {
    return res
  })
}