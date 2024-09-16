import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserById, updateUser } from '../Redux/Features/getUserSlice';
import { useParams, useNavigate } from 'react-router-dom';

const Update = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user, loading, error } = useSelector((state) => state.userDetail);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
    });

    useEffect(() => {
        if (id) {
            dispatch(fetchUserById(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                title: user.title || '',
                description: user.description || '',
                status: user.status || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser({ id, ...formData }))
            .unwrap() // Unwrap the promise to handle it correctly
            .then(() => {
                navigate('/read');
            })
            .catch((error) => {
                console.error('Update failed:', error);
            });
    };

    return (
        <div className="container mt-4">
            <h2>Update User</h2>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : !user ? (
                <p>User data not available</p>
            ) : (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            id="description"
                            name="description"
                            rows="3"
                            value={formData.description}
                            onChange={handleChange}
                            required
                        ></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="status" className="form-label">Status</label>
                        <select
                            className="form-select"
                            id="status"
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select Status</option>
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Update</button>
                </form>
            )}
        </div>
    );
};

export default Update;
