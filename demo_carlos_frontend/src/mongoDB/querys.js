import { gql } from '@apollo/client';

//Get news list query (ordered by ASC Date)
const GET_NEWS_QUERY = gql` 
    query getNewsList {
        newss (query: {archiveDate_exists: false}, sortBy: DATE_ASC) {
        _id
            archiveDate
            content
            author
            date
            description
            title
        }
    }
`

//Get archived news list query (ordered by ASC Archive date)
const GET_NEWS_QUERY_ARCHIVED = gql` 
    query getArchivedNewsList {
        newss (query: {archiveDate_exists: true}, sortBy: ARCHIVEDATE_ASC) {
        _id
            archiveDate
            content
            author
            date
            description
            title
        }
    }
`

export {GET_NEWS_QUERY, GET_NEWS_QUERY_ARCHIVED}