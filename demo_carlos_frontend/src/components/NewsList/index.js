import React from 'react'
import New from '../New';
import "./NewsList.css"
import { newStatusList, useNews } from '../../hooks/useNews';


export default function NewsList({status = newStatusList.CURRENT_NEW}){
    const {news, loading, error, archiveNew, deleteNew} = useNews({status})
    try {
        if (loading) return <p>Loading news...</p>;
        if (error) return <p>Error! ${error.message}</p>;
        if  (news.length === 0) return <p>No results available</p>
        return (
            news.map((_new) => (
                <New 
                    key={'new_'+_new._id} 
                    {..._new} 
                    status = {!_new.archiveDate ? newStatusList.CURRENT_NEW : newStatusList.ARCHIVED} 
                    onArchiveClick = {archiveNew}
                    onDeleteClick = {deleteNew}
                />
            ))
        );
    } catch (error) {
        return <p>Error! ${error.message}</p>;
    }
}