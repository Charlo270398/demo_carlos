import React from "react"
import NewsList from "../../components/NewsList"
import { GET_NEWS_QUERY } from "../../mongoDB/querys"

export default function NewsListPage() {
  return (
    <>
        <h2>News</h2>
        <NewsList query={GET_NEWS_QUERY}/>
    </>
  )
}