import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'lucide-react';
import { savePersonalDetails, fetchPersonalDetails, logoutUser } from '../store/slices/userSlice';

// Simple debounce utility
const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

const PersonalDetails = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { personalDetails, isLoadingDetails } = useSelector((state) => state.user);

    // Local state for form inputs
    const [formData, setFormData] = useState({
        gender: '',
        dob: '',
        age: '',
        height: '',
        weight: '',
        assistiveDevices: '',
        mobilityStatus: '',
        healthConditions: ''
    });

    const [unitHeight, setUnitHeight] = useState('cm');
    const [unitWeight, setUnitWeight] = useState('lbs');

    // Debounce save function
    const debouncedSave = useCallback(
        debounce((data) => {
            dispatch(savePersonalDetails(data));
        }, 1000),
        [dispatch]
    );

    // Fetch details on mount
    useEffect(() => {
        dispatch(fetchPersonalDetails());
    }, [dispatch]);

    // Populate form when details are loaded
    useEffect(() => {
        if (personalDetails) {
            setFormData(prev => ({
                ...prev,
                ...personalDetails,
                // Ensure units are preserved if saved, else default
                unitHeight: personalDetails.unitHeight || 'cm',
                unitWeight: personalDetails.unitWeight || 'lbs'
            }));
            if (personalDetails.unitHeight) setUnitHeight(personalDetails.unitHeight);
            if (personalDetails.unitWeight) setUnitWeight(personalDetails.unitWeight);
        }
    }, [personalDetails]);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        const updatedData = { ...formData, [name]: value, unitHeight, unitWeight };
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-save
        debouncedSave(updatedData);
    };

    // Handle unit changes specifically to trigger save
    const handleUnitChange = (type, value) => {
        if (type === 'height') {
            setUnitHeight(value);
            debouncedSave({ ...formData, unitHeight: value });
        } else {
            setUnitWeight(value);
            debouncedSave({ ...formData, unitWeight: value });
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(savePersonalDetails({ ...formData, unitHeight, unitWeight })).unwrap();
            navigate('/profile');
        } catch (err) {
            console.error('Failed to save:', err);
            // Check if session expired
            if (err?.status === 401) {
                alert("Your session has expired. Please log in again.");
                dispatch(logoutUser());
                navigate('/login');
            }
        }
    };

    if (isLoadingDetails) {
        return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-[#FBF9F6] flex flex-col">


            <div className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-xl w-full">
                    <h2 className="text-3xl font-bold text-[#064E3B] font-montserrat mb-8 text-center">
                        Personal Details
                    </h2>

                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* Gender */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Gender</label>
                            <div className="relative">
                                <select
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="appearance-none block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring-green-500 focus:border-green-500"
                                >
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Date of Birth & Age */}
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Date Of Birth</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        name="dob"
                                        value={formData.dob}
                                        onChange={handleChange}
                                        placeholder="dd-mm-yy"
                                        className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                    />
                                    <Calendar className="absolute right-3 top-3.5 h-5 w-5 text-gray-400" />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-800 mb-2">Age</label>
                                <input
                                    type="text"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    placeholder="Enter Age"
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                            </div>
                        </div>

                        {/* Height */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Height</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="height"
                                    value={formData.height}
                                    onChange={handleChange}
                                    placeholder="Enter Height"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <div className="flex bg-gray-200 rounded-full p-1 w-32 relative">
                                    <button
                                        type="button"
                                        onClick={() => handleUnitChange('height', 'cm')}
                                        className={`flex-1 rounded-full text-sm font-medium transition-all py-2 z-10 ${unitHeight === 'cm' ? 'bg-[#059669] text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        cm
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleUnitChange('height', 'in')}
                                        className={`flex-1 rounded-full text-sm font-medium transition-all py-2 z-10 ${unitHeight === 'in' ? 'bg-[#059669] text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        in
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Weight</label>
                            <div className="flex gap-4">
                                <input
                                    type="text"
                                    name="weight"
                                    value={formData.weight}
                                    onChange={handleChange}
                                    placeholder="Enter Weight"
                                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-green-500 focus:border-green-500"
                                />
                                <div className="flex bg-gray-200 rounded-full p-1 w-32 relative">
                                    <button
                                        type="button"
                                        onClick={() => handleUnitChange('weight', 'kg')}
                                        className={`flex-1 rounded-full text-sm font-medium transition-all py-2 z-10 ${unitWeight === 'kg' ? 'bg-[#059669] text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        kg
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => handleUnitChange('weight', 'lbs')}
                                        className={`flex-1 rounded-full text-sm font-medium transition-all py-2 z-10 ${unitWeight === 'lbs' ? 'bg-[#059669] text-white' : 'text-gray-500 hover:text-gray-700'}`}
                                    >
                                        lbs
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Dropdowns */}
                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Do you use any Assistive Devices?</label>
                            <div className="relative">
                                <select
                                    name="assistiveDevices"
                                    value={formData.assistiveDevices}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                >
                                    <option value="">Select from dropdown</option>
                                    <option value="None">None</option>
                                    <option value="Walker">Walker</option>
                                    <option value="Cane">Cane</option>
                                    <option value="Wheelchair">Wheelchair</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Current mobility status</label>
                            <div className="relative">
                                <select
                                    name="mobilityStatus"
                                    value={formData.mobilityStatus}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                >
                                    <option value="">Select from dropdown</option>
                                    <option value="Independent">Independent</option>
                                    <option value="Assisted">Assisted</option>
                                    <option value="Limited">Limited</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-800 mb-2">Existing health conditions</label>
                            <div className="relative">
                                <select
                                    name="healthConditions"
                                    value={formData.healthConditions}
                                    onChange={handleChange}
                                    className="block w-full px-4 py-3 border border-gray-300 rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-green-500 focus:border-green-500 appearance-none"
                                >
                                    <option value="">Select from dropdown</option>
                                    <option value="None">None</option>
                                    <option value="Diabetes">Diabetes</option>
                                    <option value="Hypertension">Hypertension</option>
                                    <option value="Arthritis">Arthritis</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700">
                                    <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                            </div>
                        </div>

                        {/* Buttons */}
                        <div className="grid grid-cols-2 gap-4 mt-8 pt-4">
                            <button type="button" onClick={() => navigate(-1)} className="w-full py-3 px-4 border border-[#059669] text-[#059669] font-bold rounded-full hover:bg-green-50 transition-colors">
                                Cancel
                            </button>
                            <button type="submit" className="w-full py-3 px-4 bg-[#059669] text-white font-bold rounded-full hover:bg-[#047857] transition-colors">
                                Continue
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            {/* Footer */}
            <footer className="bg-[#064E3B] text-white py-6">
                <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center text-sm">
                    <div className="flex gap-6">
                        <a href="#" className="hover:underline">About Us</a>
                        <a href="#" className="hover:underline">Contact Us</a>
                    </div>
                    <div className="text-xs text-gray-400 mt-4 md:mt-0">
                        Copyright © 2025 METY Technology, Inc. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PersonalDetails;
