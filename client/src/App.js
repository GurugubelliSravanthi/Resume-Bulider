import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Form from './components/Form/Form';
import Home from './components/Home/Home';
import Resume from './components/Resume/Resume1';
import Resume2 from './components/Resume/Resume2';
import Form2 from './components/Form/Form2';
import useFormHandlers from './components/Handler/Handler';
import useFormHandlers2 from './components/Handler/Handler2';
import './App.css';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [loading1, setLoading1] = useState(true);
    const [loading2, setLoading2] = useState(true);

    const {
        formData: formData1,
        handleChange: handleChange1,
        handleArrayChange: handleArrayChange1,
        handleNestedArrayChange: handleNestedArrayChange1,
        addSkill: addSkill1,
        addEducation: addEducation1,
        addCertificate: addCertificate1,
        addLanguage: addLanguage1,
        handleAddExperience: handleAddExperience1,
        handleDelete: handleDelete1,
        handleSubmit: handleSubmit1,
    } = useFormHandlers();

    const {
        loading: loading2State,
        formData: formData2,
        handleChange: handleChange2,
        handleArrayChange: handleArrayChange2,
        handleNestedArrayChange: handleNestedArrayChange2,
        addSkill: addSkill2,
        addEducation: addEducation2,
        addCertificate: addCertificate2,
        addLanguage: addLanguage2,
        handleAddExperience: handleAddExperience2,
        handleDelete: handleDelete2,
        handleSubmit: handleSubmit2,
        handleFileChange: handleFileChange2
    } = useFormHandlers2(); 

    useEffect(() => {
        const timeout1 = setTimeout(() => {
            setLoading1(false); 
        }, 2000);

        const timeout2 = setTimeout(() => {
            setLoading2(false);
        }, 2000);

        return () => {
            clearTimeout(timeout1);
            clearTimeout(timeout2);
        };
    }, []);

    return (
        <Router>
            <div className="app-container">
                <div className="main-content">
                    <Routes>
                        <Route path="/" element={<Navigate replace to="/login" />} />
                        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                        <Route path="/register" element={<Register />} />

                        <Route
                            path="/home"
                            element={isLoggedIn ? <Home /> : <Navigate replace to="/login" />}
                        />
                        <Route
                            path="/resume/1"
                            element={
                                isLoggedIn ? (
                                    <div className="form-and-resume">
                                        <div className="form-wrapper">
                                            <Form
                                                formData={formData1}
                                                handleChange={handleChange1}
                                                handleArrayChange={handleArrayChange1}
                                                addSkill={addSkill1}
                                                addEducation={addEducation1}
                                                addCertificate={addCertificate1}
                                                addLanguage={addLanguage1}
                                                handleAddExperience={handleAddExperience1}
                                                handleNestedArrayChange={handleNestedArrayChange1}
                                                handleSubmit={handleSubmit1}
                                                handleDelete={handleDelete1}
                                            />
                                        </div>
                                        <div className="resume-wrapper">
                                            <Resume resumeData={formData1} />
                                        </div>
                                    </div>
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                        <Route
                            path="/resume/2"
                            element={
                                isLoggedIn ? (
                                    <div className="form-and-resume">
                                        <div className="form-wrapper">
                                            <Form2
                                                formData={formData2}
                                                handleChange={handleChange2}
                                                handleArrayChange={handleArrayChange2}
                                                addSkill={addSkill2}
                                                addEducation={addEducation2}
                                                addCertificate={addCertificate2}
                                                addLanguage={addLanguage2}
                                                handleAddExperience={handleAddExperience2}
                                                handleNestedArrayChange={handleNestedArrayChange2}
                                                handleSubmit={handleSubmit2}
                                                handleDelete={handleDelete2}
                                                handleFileChange={handleFileChange2}
                                            />
                                        </div>
                                        <div className="resume-wrapper">
                                            <Resume2 resumeData={formData2} />
                                        </div>
                                    </div>
                                ) : (
                                    <Navigate replace to="/login" />
                                )
                            }
                        />
                    </Routes>
                </div>
            </div>
        </Router>
    );
};

export default App;
