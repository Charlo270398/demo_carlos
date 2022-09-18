import React from "react"
import NewsList from "../../components/NewsList"
import { GET_NEWS_QUERY_ARCHIVED } from "../../mongoDB/querys"

export default function ArchivedNewsListPage() {
  return (
    <>
      <h2>Archived news</h2>
      <NewsList query={GET_NEWS_QUERY_ARCHIVED}/>
    </>
  )
}