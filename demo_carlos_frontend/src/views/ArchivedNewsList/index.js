import React from "react"
import NewsList from "../../components/NewsList"
import { newStatusList } from "../../hooks/useNews"

export default function ArchivedNewsListPage() {
  return (
    <>
      <h2>Archived news</h2>
      <NewsList status={newStatusList.ARCHIVED}/>
    </>
  )
}