import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';

function Form() {
    const [message, setMessage] = useState([]);
    const userToUpdate = useSelector(state => state.userToUpdate);
    const [formUser, setFormUser] = useState({...userToUpdate});

    useEffect(() => {
        setFormUser({...userToUpdate});
        setFormUser({
            ...userToUpdate,
            id: 0
        })
        console.log(formUser);
    }, [userToUpdate])
    
    const onChange = e => {
        setFormUser({
            ...formUser,
            [e.target.id]: e.target.value
        })
    }

    const empty = e => {
        // VERSION SANS STATE
            e.target.value = "";
        // VERSION AVEC STATE
        // setFormUser({
        //     ...formUser,
        //     [e.target.id]: ""
        // })
    }

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
	const onSubmit = (data) => {
        console.log(data);
        axios.post("http://localhost:8080/", data)
        .then(response => {
            setMessage([{
                type: "success",
                content: response.data
            }]);
        })
        .catch(error => {
            setMessage(error.response.data);
            setMessage([{
                type: "danger",
                content: error.response.data
            }]);
        });
    }

    return (
        <form className='w-25 p-4 mx-auto my-3 border border-success rounded' onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
                <label htmlFor="nom" className="form-label">Nom</label>
                <input type="text" className={"form-control" + (errors.nom ? " is-invalid" : "")} id="nom" {...register("nom", {required: true, maxLength: 30})} value={formUser.nom} onChange={onChange} />
                {errors.nom && <span className='text-danger'><em>Nom</em> est requis (30 caractères max.)</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="prenom" className="form-label">Prénom</label>
                <input type="text" className={"form-control" + (errors.prenom ? " is-invalid" : "")} id="prenom" {...register("prenom", {required: true, maxLength: 30})} value={formUser.prenom} onChange={onChange} />
                {errors.prenom && <span className='text-danger'><em>Prénom</em> est requis (30 caractères max.)</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email</label>
                <input type="email" className={"form-control" + (errors.email ? " is-invalid" : "")} id="email" {...register("email", {required: true, maxLength: 50})} value={formUser.email} onChange={onChange} />
                {errors.email && <span className='text-danger'><em>Email</em> est requis (50 caractères max.)</span>}
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className={"form-control" + (errors.password ? " is-invalid" : "")} id="password" {...register("password", {required: true, maxLength: 30})} value={formUser.password} onChange={onChange} onClick={(event) => {if(event.target.value.length > 30){empty(event)}}} />
                {errors.password && <span className='text-danger'><em>Password</em> est requis (30 caractères max.)</span>}
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
            {message.length > 0 ? <><div className={'alert mt-3 mb-0 alert-' + (message && message[0].type)}>{message[0].content}<a type="button" href="/" className={'d-block mx-auto mt-2 btn btn-' + (message && message[0].type)}>Recharger</a></div></> : <></>}
        </form>
    )
}

export default Form