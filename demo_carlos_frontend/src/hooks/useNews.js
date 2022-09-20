import { useContext, useEffect, useState} from 'react'
import getNewsListService from '../services/getNewsList';
import UserContext from "../context/UserContext";
import archiveNewService from '../services/archiveNewService';
import deleteNewService from '../services/deleteNewService';
import addNewService from '../services/addNewService';

export function useNews ({ status = newStatusList.CURRENT_NEW }) {
  const [news, setNews] = useState([])
  const {jwt} = useContext(UserContext)

  useEffect(() => {
    getNewsList()
  }, [news]) 

  useEffect(() => {
    const timer = setInterval(getNewsList, 2000);
    return () => clearInterval(timer);
  }, []);//Refetch list of news (checking for new news)

  const getNewsList = async () => {
    getNewsListService({isArchivedNews: status === newStatusList.ARCHIVED ? true : false, jwt: jwt }).then(res => {
      if(news.length !== res.length){
        setNews(res);
      }
    }).catch(err => {
      console.error(err)
    })
  };

  async function archiveNew ({_id}){
    await archiveNewService({_id, jwt})
    setNews(news.filter(_new => _new._id !== _id))
  }

  async function deleteNew ({_id}){
    await deleteNewService({_id, jwt})
    setNews(news.filter(_new => _new._id !== _id))
  }

  async function addNew ({title, author, content, description}){
    const addedNew = await addNewService({title, author, content, description, jwt})
    setNews(news.push(addedNew))
  }

  return {news, setNews, archiveNew, deleteNew, addNew}
}

export const newStatusList = { CURRENT_NEW: 'CURRENT_NEW', ARCHIVED: 'ARCHIVED'}