import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { EDIT_NUMBER } from "./src/persons/graphql-mutations";


export const PhoneForm = ({notifyError}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')


    const [changeNumber, result] = useMutation(EDIT_NUMBER)


    useEffect(() => {
        if (result.data && result.data.editNumber === null) {
            console.log('Person not found');
            notifyError('Person not found')
        }
    }, [result.data])


    const handleSubmit = e => {
        e.preventDefault()

        changeNumber({ variables: { name, phone }})


        setName('')
        setPhone('')
    }


    return(
        <div>
            <h2>Edit phone number</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={ evt => setName(evt.target.value)} />
                <input placeholder="Phone" value={phone} onChange={ evt => setPhone(evt.target.value)} />
                <button>Change Phone</button>
            </form>
        </div>
    )





}