import '../../App.css'
import image from '../../images/AboutMe.jpg'
import linkedinLogo from '../../images/linkedin.png'
import mailLogo from '../../images/Mail.jpg'
import GitHubLogo from '../../images/GitHub.png'
import YoutubeLogo from '../../images/Youtube.png'
import pythonLogo from '../../images/python.png'
import JavaLogo from '../../images/java.png'
import JavascriptLogo from '../../images/javascript.png'
import DjangoLogo from '../../images/Django.png'
import restFrameworkLogo from '../../images/rest-framework.png'
import ReactLogo from '../../images/react.png'
import cssLogo from '../../images/css.jpg'
import dockerLogo from '../../images/docker.jpg'
import gitLogo from '../../images/git.jpg'
import LinuxLogo from '../../images/linux.png'
import oracle from '../../images/oracle.png'
import mysql from '../../images/mysql.png'
import miro from '../../images/miro.png'
import springboot from '../../images/springboot.png'
import sqlite from '../../images/sqlite.jpg'
import html from '../../images/html.png'
import postman from '../../images/postman.png'
import UAZLogo from '../../images/UAZ.jpg'
import jwt from '../../images/jwt.png'
import someceImage from '../../images/Achievements/constancia1.png';
import ICPImage from '../../images/Achievements/constancia2.png';
import { useState } from 'react'


const About = () => {
    const [isFullScreen, setIsFullScreen] = useState(false);
    const [activeImage, setActiveImage] = useState(null);

    const handleImageClick = (image) =>{
        setActiveImage(image);
        setIsFullScreen(true);
    };

    const closeFullScreen = () =>{
        setIsFullScreen(false);
        setActiveImage(null);
    };

    const biografia = `
        Software Engineer with a solid academic background and a proactive attitude for joining work teams aimed at developing innovative and high-quality solutions. I possess outstanding knowledge in backend development, frontend development, software design, and requirements analysis. During my studies, I was an excellent student driven by a commitment to continually improve my knowledge of cutting-edge technologies. I am known for my creative spirit and problem-solving approach, effectively using software to achieve solutions.
    `;

    const nombre = 'Adalberto Cerrillo Vázquez';

    const universidad = 'Autonomous University of Zacatecas';
    const infoUniversidad = `
        I obtained my academic training as a Software Engineer at the Academic Unit of Electrical Engineering at the Autonomous University of Zacatecas. It was there that I nurtured my curiosity and creativity in software system development, in addition to acquiring solid knowledge for developing high-quality solutions, always supported by best practices.
    `;

    const uaz_description = `The Autonomous University of Zacatecas Francisco García Salinas (UAZ) is the leading higher education institution in Zacatecas, Mexico. It is organized into academic areas and units focused on teaching, research, extension, and academic management. UAZ serves students from Zacatecas and other states in fields such as biology, humanities, engineering, languages, arts, agriculture, and exact sciences. The university actively promotes science, technology, and innovation.`;

    const email = 'adalc3488@gmail.com';
    const linkedinLink = 'https://www.linkedin.com/in/adalberto-cerrillo-vázquez-a3870628a';
    const GitHubLink = 'https://github.com/AdalbertoCV';
    const YoutubeLink = 'https://www.youtube.com/@acerrillosoftware';

    return (
        <div className='main-card'>
            <div className="experience-header">
                <span className="experience-badge">About Me & Education</span>
            </div>
            <div className="info-card">
                <div className='header-container'>
                <h3>About Me:</h3>
                <a href={`mailto:${email}`} className="email-link"><img src={mailLogo} alt="Mail" className="logo-image" /></a>
                <a href={linkedinLink} target="_blank" rel="noopener noreferrer"><img src={linkedinLogo} alt="LinkedIn" className="logo-image" /></a>
                <a href={GitHubLink} target="_blank" rel="noopener noreferrer"><img src={GitHubLogo} alt="GitHub" className="logo-image" /></a>
                <a href={YoutubeLink} target="_blank" rel="noopener noreferrer"><img src={YoutubeLogo} alt="GitHub" className="logo-image" /></a>
                </div>
                <h2>{nombre} - Backend Developer</h2>
                <p>{biografia}</p>
                <img src={image} alt='About Me' className='about-image' />
            </div>
    
            <div className="info-card">
                <h3>Skills</h3>
                <h2>Technologies & Tools I Work With</h2>
                <br></br>
                <br></br>
                <br></br>
                <div className="skills-grid">
                    <p className='icon-text'> Python <img src={pythonLogo} alt="Python" className="logo-image"/></p>
                    <p className='icon-text'> Java<img src={JavaLogo} alt="Java" className="logo-image" /></p>
                    <p className='icon-text'> JavaScript<img src={JavascriptLogo} alt="JavaScript" className="logo-image" /></p>
                    <p className='icon-text'> Django<img src={DjangoLogo} alt="Django" className="logo-image" /></p>
                    <p className='icon-text'> SpringBoot<img src={springboot} alt="spring" className="logo-image" /></p>
                    <p className='icon-text'> Rest-Framework<img src={restFrameworkLogo} alt="Django Rest Framework" className="logo-image" /></p>
                    <p className='icon-text'> Postman<img src={postman} alt="Postman" className="logo-image" /></p>
                    <p className='icon-text'> React<img src={ReactLogo} alt="React" className="logo-image" /></p>
                    <p className='icon-text'> CSS<img src={cssLogo} alt="CSS" className="logo-image" /></p>
                    <p className='icon-text'> HTML<img src={html} alt="HTML" className="logo-image" /></p>
                    <p className='icon-text'> Docker<img src={dockerLogo} alt="Docker" className="logo-image" /></p>
                    <p className='icon-text'> Git<img src={gitLogo} alt="Git" className="logo-image" /></p>
                    <p className='icon-text'> Linux OS<img src={LinuxLogo} alt="Linux" className="logo-image" /></p>
                    <p className='icon-text'> MySQL<img src={mysql} alt="mysql" className="logo-image" /></p>
                    <p className='icon-text'> SQLite<img src={sqlite} alt="sqlite" className="logo-image" /></p>
                    <p className='icon-text'> Oracle DB<img src={oracle} alt="oracle" className="logo-image" /></p>
                    <p className='icon-text'> Miro<img src={miro} alt="miro" className="logo-image" /></p>
                    <p className='icon-text'> JWT<img src={jwt} alt="jwt" className="logo-image" /></p>
                </div>
            </div>
    
            <div className="info-card">
                <h3>Education:</h3>
                <div className='info-card-text'>
                <h2>{universidad} (2020 - 2024)</h2>
                <p>{infoUniversidad}</p>
                <p>{uaz_description}</p>
                </div>
                <img className="education-image" src={UAZLogo} alt='UAZ'></img>
            </div>
    
            <div className="info-card">
                <h3>Certifications & Achievements:</h3>
                <h4>Internet Computer Certification (2023)</h4>
                <div className="carousel-container">
                  <img
                    className="carousel-image"
                    onClick={() => handleImageClick(ICPImage)}
                    src={ICPImage}
                    alt="ICP"
                    style={{ maxWidth: '100%', height: 'auto' }} 
                  />
                </div>
                <h4>INTERNATIONAL CONGRESS SOMECE 2024</h4>
                <div className="carousel-container">
                  <img
                    className="carousel-image"
                    onClick={() => handleImageClick(someceImage)}
                    src={someceImage}
                    alt="SOMECE"
                    style={{ maxWidth: '100%', height: 'auto' }} 
                  />
                </div>
            </div>
            {isFullScreen && (
                <div className="fullscreen-overlay" onClick={closeFullScreen}>
                    <img src={activeImage} alt="Enlarged project" className="fullscreen-image" />
                </div>
            )}
        </div>
    );    
};

export default About;