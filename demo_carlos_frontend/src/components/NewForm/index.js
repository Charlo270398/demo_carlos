import { useState } from "react";
import ButtonComponent from '../Button';
import { useForm } from 'react-hook-form'
import { ErrorMessage } from '@hookform/error-message';
import "./NewForm.css"
import {useLocation} from "wouter"
import { useNews } from "../../hooks/useNews";


export default function NewForm () {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false);
    const [add_new_error, setAddNewError] = useState({show: false, text: 'Error during process'});
    const {addNew} = useNews({})
    const [, navigate] = useLocation()

    const handleAddNew = async (data) => {
        setLoading(true)
        setAddNewError(false)
        try {
            await addNew(data)
            navigate("/")
        } catch (error) {
            console.error(error)
            setAddNewError({show: true, text: "Error during process"})
        }
        setLoading(false)
    }

    return (
        <>
            <form className="form" onSubmit={handleSubmit(handleAddNew)}>
                <div>
                    <label className="form_label" htmlFor="title">Title</label>
                    <input type='text' {...register("title", { required: "Title field is required." })} />
                </div>
                <div>
                    <label className="form_label" htmlFor="author">Author</label>
                    <input type='text' {...register("author", { required: "Author field is required." })} />
                </div>
                <div>
                    <label className="form_label" htmlFor="description">Description</label>
                    <input type='text' {...register("description", { required: "Description field is required." })} />
                </div>
                <div>
                    <label className="form_label" htmlFor="content">Content</label>
                    <input type='text' {...register("content", { required: "Content field is required." })} />
                </div>  
                <div>
                    <p>
                        <ErrorMessage errors={errors} name="title" />
                    </p>
                    <p>
                        <ErrorMessage errors={errors} name="author" />
                    </p>
                    <p>
                        <ErrorMessage errors={errors} name="description" />
                    </p>
                    <p>
                        <ErrorMessage errors={errors} name="content" />
                    </p>
                </div>
                <div className="form_footer">
                    <ButtonComponent primary >Add New</ButtonComponent>
                    {loading && <p>Processing...</p>}
                    {add_new_error.show && <p>{add_new_error.text}</p>}
                </div>
            </form>
        </>
    )
}