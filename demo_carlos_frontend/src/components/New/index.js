import { useMutation } from '@apollo/client';
import React, { useState } from 'react'
import { newStatusList } from '../../hooks/useNews';
import { DELETE_NEW_BY_ID_MUTATION, UPDATE_NEW_ARCHIVE_DATE_BY_ID_MUTATION } from '../../mongoDB/mutations';
import { GET_NEWS_QUERY, GET_NEWS_QUERY_ARCHIVED } from '../../mongoDB/querys';
import ButtonComponent from '../Button';
import "./New.css"

export default function New({ _id, title, description, date, content, author, archiveDate, status}){

    const [mutateNewArchiveDate, {}] = useMutation(UPDATE_NEW_ARCHIVE_DATE_BY_ID_MUTATION, {
        refetchQueries: [{ query: GET_NEWS_QUERY }] //Refetch data after mutation (update)
    });
    const [mutationDeleteNew, {}] = useMutation(DELETE_NEW_BY_ID_MUTATION, {
        refetchQueries: [{ query: GET_NEWS_QUERY_ARCHIVED }] //Refetch data after mutation (deletion)
    });

    const [processing, setProcessing] = useState(false)

    const HandleClick = async (_id) => {
        setProcessing(true)
        switch (status) {
            case newStatusList.CURRENT_NEW: {
                await mutateNewArchiveDate({
                    variables: {
                        _id: _id,
                        set: { 
                            archiveDate: new Date(),
                        },
                    }
                });
                break;
            }
            case newStatusList.ARCHIVED: {
                mutationDeleteNew({
                    variables: {
                        _id: _id,
                    }
                })
                break;
            }
            default:
                break;
        }
    };
    const buttonText = status === newStatusList.CURRENT_NEW ? 'Archive' : 'Remove';

    try {
        const formattedDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',  hour: '2-digit', minute:'2-digit', second:'2-digit' };
        const formattedDate = new Date(date).toLocaleDateString("en-US", formattedDateOptions);
        const formattedArchivedDate = status === newStatusList.ARCHIVED ? new Date(archiveDate).toLocaleDateString("en-US", formattedDateOptions) : null;

        return processing === true ? <span>Processing ...</span> : (
            <div className={status === newStatusList.CURRENT_NEW ? 'newCard' : 'newCard_Archived'}>
                <h3><b>{title}</b></h3>
                <p><i>by {author} ({formattedDate}) {status === newStatusList.ARCHIVED && <span>archived on ({formattedArchivedDate})</span>}</i></p>
                <p>{description}</p>
                <p>{content}</p>
                <ButtonComponent primary onClick={() => HandleClick(_id)}>{buttonText}</ButtonComponent>
            </div>
        );
    } catch (error) {
        console.error(error);
        return <p>Error! ${error.message}</p>
    }
}