import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById } from '../redux/userSlice'; 

const ViewComponent = ({ match }) => {
    const dispatch = useDispatch();
    const { user, loading } = useSelector((state) => state.userDetail);

    useEffect(() => {
        dispatch(fetchUserById(match.params.id)); // Fetch the user data by ID
    }, [dispatch, match.params.id]);

    return (
        <div className="container mt-4">
            <h2>View User</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div>
                    <p><strong>Name:</strong> {user.name}</p>
                    <p><strong>Email:</strong> {user.email}</p>
                    {/* Display other fields as needed */}
                </div>
            )}
        </div>
    );
};

export default ViewComponent;
