import React, { useRef } from 'react';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { Link } from 'react-router-dom';
import { FaUser, FaGraduationCap, FaBriefcase, FaCogs, FaAward, FaGlobeAmericas, FaPhone, FaEnvelope, FaLinkedin, FaGithub, FaMapMarkerAlt, FaDownload, FaArrowLeft } from 'react-icons/fa';
import './Resume.css';

const Resume = ({ resumeData }) => {
    const resumeRef = useRef();

    const handleDownload = () => {
        const input = resumeRef.current;
        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
        });
    };

    return (
        <div className="resume-page">
            <div className="button-container">
                <Link to="/home" className="home-button">
                    <FaArrowLeft /> Home
                </Link>
            </div>
            <div id="resume" className="resume-container" ref={resumeRef}>
                <header className="resume-header">
                    <h1>{resumeData.name || 'Your Name'}</h1>
                    <h2>{resumeData.title || 'Your Title'}</h2>
                </header>
                <div className="resume-content">
                    <aside className="resume-sidebar">
                        <section className="resume-section">
                            <h3><FaUser /> Contact</h3>
                            {resumeData.contact ? (
                                <ul className="contact-list">
                                    <li><FaPhone /> {resumeData.contact.phone}</li>
                                    <li><FaEnvelope /> {resumeData.contact.email}</li>
                                    {resumeData.contact.linkedin && (
                                        <li><FaLinkedin /> <a href={resumeData.contact.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                                    )}
                                    {resumeData.contact.github && (
                                        <li><FaGithub /> <a href={resumeData.contact.github} target="_blank" rel="noopener noreferrer">GitHub</a></li>
                                    )}
                                    <li><FaMapMarkerAlt /> {resumeData.contact.address}</li>
                                </ul>
                            ) : (
                                <p>No contact information available.</p>
                            )}
                        </section>
                        <section className="resume-section">
                            <h3><FaCogs /> Skills</h3>
                            <ul className="skills-list">
                                {resumeData.skills?.map((skill, index) => (
                                    <li key={index}>{skill}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="resume-section">
                            <h3><FaAward /> Certificates</h3>
                            <ul>
                                {resumeData.certificates?.map((cert, index) => (
                                    <li key={index}>{cert}</li>
                                ))}
                            </ul>
                        </section>
                        <section className="resume-section">
                            <h3><FaGlobeAmericas /> Languages</h3>
                            <ul className="languages-list">
                                {resumeData.languages?.map((lang, index) => (
                                    <li key={index}>{lang}</li>
                                ))}
                            </ul>
                        </section>
                    </aside>
                    <main className="resume-main">
                        <section className="resume-section">
                            <h3><FaUser /> Profile</h3>
                            <p>{resumeData.profileText || 'No profile available.'}</p>
                        </section>
                        <section className="resume-section">
                            <h3><FaGraduationCap /> Education</h3>
                            <ul className="education-list">
                                {resumeData.education?.map((edu, index) => (
                                    <li key={index}>
                                        <h4>{edu.degree}</h4>
                                        <p>{edu.institution}</p>
                                        <p>{edu.startYear} - {edu.endYear}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                        <section className="resume-section">
                            <h3><FaBriefcase /> Work Experience</h3>
                            <ul className="experience-list">
                                {resumeData.experience?.map((exp, index) => (
                                    <li key={index}>
                                        <h4>{exp.position}</h4>
                                        <p>{exp.company}</p>
                                        <p>{exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</p>
                                        <p>{exp.internships}</p>
                                    </li>
                                ))}
                            </ul>
                        </section>
                    </main>
                </div>
            </div>
            <div className="download-button-container">
                <button className="download-button" onClick={handleDownload}>
                    <FaDownload /> Download Resume
                </button>
            </div>
        </div>
    );
};

export default Resume;