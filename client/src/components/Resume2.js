import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { FaUser, FaCogs, FaGlobeAmericas, FaBriefcase, FaGraduationCap, FaAward, FaDownload, FaArrowLeft, FaMapMarkerAlt, FaEnvelope, FaPhone, FaLinkedin, FaGithub } from 'react-icons/fa';
import './Resume2.css';

const Resume2 = ({ resumeData }) => {
    const { name, title, contact, photo, profileText, skills, education, experience, languages, certificates } = resumeData;
    const resumeRef = useRef();

    const handleDownload = () => {
        const input = resumeRef.current;
        const downloadButton = document.querySelector('.button-container');
        downloadButton.style.display = 'none';

        html2canvas(input, { scale: 2 }).then(canvas => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('resume.pdf');
            
            downloadButton.style.display = 'flex';
        });
    };

    return (
        <div>
            <div className="button-container">
                <Link to="/" className="home-button">
                    <FaArrowLeft /> Home 
                </Link>
            </div>
            <div className="resume2" ref={resumeRef}>
                <div className="resume-header">
                    <div className="profile-image">
                        {photo && <img src={photo} alt="Profile" />}
                    </div>
                    <div className="header-text">
                        <h1>{name}</h1>
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="resume-body">
                    <div className="sidebar">
                        <section className="about-me">
                            <h3 className="section-title"><FaUser /> About Me</h3>
                            <p>{profileText}</p>
                        </section>
                        <section className="personal-skills">
                            <h3 className="section-title"><FaCogs /> Skills</h3>
                            {skills.map((skill, index) => (
                                <div key={index} className="skill">
                                    <div className="skill-name">
                                        <span>{skill.name}</span>
                                        <span>{skill.percentage}%</span>
                                    </div>
                                    <div className="skill-bar">
                                        <div className="skill-level" style={{ width: `${skill.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </section>
                        <section className="personal-info">
                            <h3 className="section-title"><FaUser /> Personal Info</h3>
                            <p><FaMapMarkerAlt /> {contact.address}</p>
                            <p><FaEnvelope /> {contact.email}</p>
                            <p><FaPhone /> {contact.phone}</p>
                            <p><FaLinkedin /> {contact.linkedin}</p>
                            <p><FaGithub /> {contact.github}</p>
                        </section>
                        <section className="languages">
                            <h3 className="section-title"><FaGlobeAmericas /> Languages</h3>
                            {languages.map((language, index) => (
                                <div key={index} className="language">
                                    <div className="language-name">
                                        <span>{language.name}</span>
                                        <span>{language.percentage}%</span>
                                    </div>
                                    <div className="language-bar">
                                        <div className="language-level" style={{ width: `${language.percentage}%` }}></div>
                                    </div>
                                </div>
                            ))}
                        </section>
                    </div>
                    <div className="main-content">
                        <section className="work-experience">
                            <h3 className="section-title"><FaBriefcase /> Work Experience</h3>
                            {experience.map((exp, index) => (
                                <div key={index} className="experience-item">
                                    <div className="experience-header">
                                        <div>
                                            <h4 className="experience-title">{exp.position}</h4>
                                            <p className="experience-company">{exp.company}</p>
                                        </div>
                                        <p className="experience-duration">{exp.startMonth} {exp.startYear} - {exp.endMonth} {exp.endYear}</p>
                                    </div>
                                    <p>{exp.location}</p>
                                    <p>{exp.internships}</p>
                                </div>
                            ))}
                        </section>
                        <section className="education">
                            <h3 className="section-title"><FaGraduationCap /> Education</h3>
                            {education.map((edu, index) => (
                                <div key={index} className="education-item">
                                    <div className="education-header">
                                        <div>
                                            <h4 className="education-degree">{edu.degree}</h4>
                                            <p className="education-institution">{edu.institution}</p>
                                        </div>
                                        <p className="education-duration">{edu.startYear} - {edu.endYear}</p>
                                    </div>
                                    <p>Location: {edu.location}</p>
                                    <p>Branch: {edu.branch}</p>
                                    <p>Marks: {edu.cgpa} {edu.cgpaType === 'percentage' ? 'Percentage' : 'CGPA'}</p>
                                </div>
                            ))}
                        </section>
                        <section className="awards">
                            <h3 className="section-title"><FaAward /> Awards</h3>
                            {certificates.map((cert, index) => (
                                <div key={index} className="award-item">
                                    <h6>{cert}</h6>
                                </div>
                            ))}
                        </section>
                    </div>
                </div>
            </div>
            <div className="button-container">
                <button className="download-button" onClick={handleDownload}>
                    <FaDownload /> Download Resume
                </button>
            </div>
        </div>
    );
};

export default Resume2;