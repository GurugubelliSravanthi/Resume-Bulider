import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Resume1Image from '../Resume1.jpg';
import Resume2Image from '../Resume2.jpg';
import './Home.css';

const Home = () => {
    const [zoomedPicture, setZoomedPicture] = useState(null);
    const [showTooltip, setShowTooltip] = useState(false);
    const tooltipRef = useRef(null);

    const handlePictureClick = (picture) => {
        setZoomedPicture(picture);
    };

    const closeZoomedPicture = () => {
        setZoomedPicture(null);
    };

    const toggleTooltip = (event, show) => {
        setShowTooltip(show);

        if (tooltipRef.current) {
            tooltipRef.current.style.left = `${event.currentTarget.offsetLeft + event.currentTarget.offsetWidth / 2}px`;
            tooltipRef.current.style.top = `${event.currentTarget.offsetTop + event.currentTarget.offsetHeight}px`;
        }
    };

    return (
        <div className="home-page">
            <h1 className="brand-name"><i className="fas fa-fire"></i>Sravs-Resume-Builder</h1>
            
            <div className="pictures">
                <div className="picture-container">
                    <img
                        src={Resume1Image}
                        alt="First Resume"
                        onClick={() => handlePictureClick(Resume1Image)}
                        onMouseEnter={(e) => toggleTooltip(e, true)}
                        onMouseLeave={(e) => toggleTooltip(e, false)}
                    />
                    <Link to="/resume/1">
                        <button className="primary-btn">First Resume</button>
                    </Link>
                </div>
                <div className="picture-container">
                    <img
                        src={Resume2Image}
                        alt="Second Resume"
                        onClick={() => handlePictureClick(Resume2Image)}
                        onMouseEnter={(e) => toggleTooltip(e, true)}
                        onMouseLeave={(e) => toggleTooltip(e, false)}
                    />
                    <Link to="/resume/2">
                        <button className="primary-btn">Second Resume</button>
                    </Link>
                </div>
                {showTooltip && (
                    <div className="tooltip" ref={tooltipRef}>
                        Click to zoom in
                    </div>
                )}
            </div>
            {zoomedPicture && (
                <div className="zoomed-picture" onClick={closeZoomedPicture}>
                    <span className="close-btn" onClick={closeZoomedPicture}>
                        &times;
                    </span>
                    <img src={zoomedPicture} alt="Zoomed" />
                </div>
            )}
        </div>
    );
};

export default Home;