import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { updateUser } from '../component/Redux/Features/getUserSlice';

const Delete = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate(); // To redirect after update
    const [updateData, setUpdateData] = useState({
        title: '',
        description: '',
        status: '',
    });
    const { users } = useSelector((state) => state.userDetail);

    useEffect(() => {
        if (id) {
            const singleUser = users.find((ele) => ele.id === id);
            if (singleUser) {
                setUpdateData(singleUser);
            }
        }
    }, [id, users]);

    const handleChange = (e) => {
        setUpdateData({
            ...updateData,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(updateUser(updateData)).then(() => {
            navigate('/read'); // Redirect to home or wherever after update
        });
    };

    return (
        <div className="container mt-5 w-50">
            <h2>Update POST {id}</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={updateData.title}
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
                        value={updateData.description}
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
                        value={updateData.status}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Select Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Delete;
