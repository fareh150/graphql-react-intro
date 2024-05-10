import { useMutation } from "@apollo/client";
import { useState } from "react";
import { ALL_PERSONS } from "./persons/graphql-queries";
import { CREATE_PERSON } from "./persons/graphql-mutations";


export const PersonForm = ({notifyError}) => {

    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [street, setStreet] = useState('')
    const [city, setCity] = useState('')

    const [createPerson] = useMutation(CREATE_PERSON, {
        //esto es para volver a hacer fetch cada ves que se ejecuta create person
        //refetchQueries: [{ query: ALL_PERSONS}],
        onError: (error) => {
            notifyError(error.graphQLErrors[0].message)
        },
        //para que no se haga fetch continuo es mejor hacer el update en la cache
        //update es manual , con un store que tiene caches de todas las query, y responce que es la respuesta de la mutacion
        update: (store, responce)=> {
            //recuperamos toda la info de ALL_PERSONS es DataInStore
            const dataInStore = store.readQuery({ query: ALL_PERSONS})
            //aqui escribimos sobre esa query ALL_PERSONS
            store.writeQuery({
                query: ALL_PERSONS,
                data: {
                    ...dataInStore,
                    allPersons: [
                        ...dataInStore.allPersons,
                        responce.data.addPerson
                        // ^ aqui agregamos la nueva persona para mostrar en pantalla y no tener que hacer otro fetch
                    ]
                }
            })
        }
    })

    const handleSubmit = e => {
        e.preventDefault()

        createPerson({variables: {name, phone , street, city}})


        setName('')
        setPhone('')
        setStreet('')
        setCity('')
    }


    return(
        <div>
            <h2>Create new Person</h2>
            <form onSubmit={handleSubmit}>
                <input placeholder="Name" value={name} onChange={ evt => setName(evt.target.value)} />
                <input placeholder="Phone" value={phone} onChange={ evt => setPhone(evt.target.value)} />
                <input placeholder="Stret" value={street} onChange={ evt => setStreet(evt.target.value)} />
                <input placeholder="City" value={city} onChange={ evt => setCity(evt.target.value)} />
                <button>Add Person</button>
            </form>
        </div>
    )





}