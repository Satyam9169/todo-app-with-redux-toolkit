import React, { useEffect, useState } from 'react'
import { showUser, deleteUser } from '../Redux/Features/getUserSlice';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../Loading/Loading';
import PopupModel from '../Popmodel/PopupModel';
import { Link } from 'react-router-dom';

const Read = () => {

    const dispatch = useDispatch();

    const [id, setId] = useState();

    const [showPopup, setShowPopup] = useState(false);

    const { users, loading } = useSelector((state) => state.userDetail); 
                                                                                                
    useEffect(() => {
        dispatch(showUser());
    }, [dispatch]);

    if (loading) {
        return <h2><Loading /></h2>;
    }

    return (
        <div className="container mt-4">
            {
                showPopup && (<PopupModel
                    id={id}
                    showPopup={showPopup}
                    setShowPopup={setShowPopup}
                />)
            }
            <h2>User List</h2>
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users && users.map((user) => (
                        <tr key={user.id}>
                            <td>{user.title}</td>
                            <td>{user.description}</td>
                            <td>{user.status}</td>
                            <td>
                                <Link to={`/edit/${user.id}`} className="btn btn-warning me-2" >
                                    Update
                                </Link>

                                <button className="btn btn-secondary me-2"
                                    onClick={() => {
                                        setId(user.id);
                                        setShowPopup(true);
                                         }
                                    }>
                                    View
                                </button>

                                <button className="btn btn-danger me-2"
                                onClick={()=> dispatch(deleteUser(user.id))}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div >
    )
}

export default Read