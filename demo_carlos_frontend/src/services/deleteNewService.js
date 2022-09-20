export default async function deleteNewService ({ _id, jwt }) {
  if(!jwt){
    throw new Error('JWT required')
  }

  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/news/${_id}/delete`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      "Authorization": `${jwt}`
    }
  }).then(res => {
    if (!res.ok){ 
      if(res.status === 403){
        throw new Error('Forbidden')
      } else {
        throw new Error('Error during process')
      }
    }
    return res
  }).then(res => {
    return res
  })
}