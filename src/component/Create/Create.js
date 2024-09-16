import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createPost } from '../Redux/Features/getUserSlice';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const dispach = useDispatch()
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        status: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Form Data:', formData);
        // Handle form submission logic here
        dispach(createPost(formData))
        navigate('/read')
        setFormData({
            title: '',
            description: '',
            status: '',
        });
    };

    return (
        <div className="container mt-5  w-50">
            <h2>Create POST</h2>
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
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default Create;
