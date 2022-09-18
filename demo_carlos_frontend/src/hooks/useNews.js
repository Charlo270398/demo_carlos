import { useEffect, useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_NEWS_QUERY } from '../mongoDB/querys'

export function useNews ( query = GET_NEWS_QUERY ) {
  const { loading, error, data } = useQuery(query);
  const [news, setNews] = useState([])

  useEffect(() => {
    if(data !== undefined && news.length !== data.newss.length){
      setNews(data.newss);
    }
  }, [loading, data])

  return {news, loading, error, setNews}
}

export const newStatusList = { CURRENT_NEW: 'CURRENT_NEW', ARCHIVED: 'ARCHIVED'}