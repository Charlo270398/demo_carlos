import { gql } from '@apollo/client';

const CREATE_NEW_MUTATION = gql`
    mutation CreateNew($data: NewsInsertInput!) {
        insertOneNews(data: $data) {
            _id
            title
            date
            description
            title
            archiveDate
            content
        }
    }
`;

const UPDATE_NEW_ARCHIVE_DATE_BY_ID_MUTATION = gql`
    mutation UpdateNewArchiveDate($_id: ObjectId!, $set: NewsUpdateInput!) {
        updateOneNews(
            query: {_id: $_id}, 
            set: $set
        ) {
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

const DELETE_NEW_BY_ID_MUTATION = gql`
    mutation DeleteNew($_id: ObjectId!) {
        deleteOneNews(
            query: {_id: $_id}, 
        ) {
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

export {UPDATE_NEW_ARCHIVE_DATE_BY_ID_MUTATION, DELETE_NEW_BY_ID_MUTATION}