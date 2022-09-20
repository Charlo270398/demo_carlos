import React, { useState } from 'react'
import { newStatusList } from '../../hooks/useNews';
import ButtonComponent from '../Button';
import "./New.css"

export default function New({ _id, title, description, date, content, author, archiveDate, status, onArchiveClick, onDeleteClick}){

    const [processing, setProcessing] = useState(false)

    const HandleClick = async (_id) => {
        setProcessing(true)
        switch (status) {
            case newStatusList.CURRENT_NEW: {
                await onArchiveClick({_id})
                break;
            }
            case newStatusList.ARCHIVED: {
                await onDeleteClick({_id})
                break;
            }
            default:
                break;
        }
    };
    const buttonText = status === newStatusList.CURRENT_NEW ? 'Archive' : 'Remove';

    try {
        const formattedDateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
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