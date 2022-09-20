import React from "react"
import NewsList from "../../components/NewsList"
import { newStatusList } from "../../hooks/useNews"

export default function NewsListPage() {
  return (
    <>
      <h2>News</h2>
      <NewsList status={newStatusList.CURRENT_NEW}/>
    </>
  )
}