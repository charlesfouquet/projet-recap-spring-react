import axios from 'axios'
import React, { useState, useEffect } from 'react'

function List() {
    const [usersList, setUsersList] = useState([]);

    useEffect(() => {
        getUsersList();
    },[]);

    const getUsersList = async() => {
        const getUsers = await axios.get("http://localhost:8080/");
        console.log(getUsers.data);
        setUsersList(getUsers.data);
    }

    const deleteUser = async(id) => {
        console.log(id);
        axios.delete("http://localhost:8080/", {params: {id: id}})
        .then(response => {
            getUsersList();
        })
        .catch(error => {

        });
    }

    return (
        <div className='w-50 p-4 mx-auto my-3 border border-success rounded'>
            <h2>Liste des utilisateurs</h2>
            {usersList.length <= 0 ? <h4 className='text-center'>Aucun utilisateur</h4> : 
                <table class="table table-striped">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Email</th>
                            <th scope="col">Supp</th>
                        </tr>
                    </thead>
                    <tbody>
                        {usersList.map(element => {
                            return (
                                <tr className='align-middle'>
                                    <th scope="row">{element.id}</th>
                                    <td>{element.nom}</td>
                                    <td>{element.prenom}</td>
                                    <td>{element.email}</td>
                                    <td><a className='btn btn-danger' onClick={() => deleteUser(element.id)}><i class="bi bi-trash3-fill"></i></a></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            }
        </div>
        
    )
}

export default List