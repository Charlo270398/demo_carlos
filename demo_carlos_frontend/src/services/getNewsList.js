export default async function getNewsListService ({ isArchivedNews, jwt }) {
  if(!jwt){
    throw new Error('JWT required')
  }

  return fetch(`${process.env.REACT_APP_BACKEND_ENDPOINT}/news?isArchivedNews=${isArchivedNews ? 'true' : 'false'}`, {
    method: 'GET',
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
    return res.json()
  }).then(res => {
    return res
  })
}