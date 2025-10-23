import { useState } from 'react';
import githubImage from '../../images/GitHub.png';
import BSImage1 from '../../images/Projects/bazar_sol_1.png';
import BSImage2 from '../../images/Projects/bazar_sol_2.png';
import BSImage3 from '../../images/Projects/bazar_sol_3.png';
import RZImage1 from '../../images/Projects/rentazac1.png';
import RZImage2 from '../../images/Projects/rentazac2.png';
import RZImage3 from '../../images/Projects/rentazac3.png';
import cargasI1 from '../../images/Projects/cargas1.png';
import cargasI2 from '../../images/Projects/cargas2.png';
import cargasI3 from '../../images/Projects/cargas3.png';
import cosiap1 from '../../images/Projects/COSIAP1.png';
import cosiap2 from '../../images/Projects/COSIAP2.png';
import cosiap3 from '../../images/Projects/COSIAP3.png';
import cosiap4 from '../../images/Projects/COSIAP4.png';
import pbienestar1 from '../../images/Projects/PuntoBienestar1.jpeg';
import pbienestar2 from '../../images/Projects/PuntoBienestar2.jpeg';
import pbienestar3 from '../../images/Projects/PuntoBienestar3.jpeg';

const MyProjects = () => {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [activeImage, setActiveImage] = useState(null);


  const bazar_sol_description = `
    School project inspired by a modern e-commerce site. In this site, the main idea is to give the administrator the
    possibility of having control of the stock for a clothing store. The admin can upload new products to stock and adjust the prices and descriptions of each product.
    The customer user can see all the products in the catalog, and add their favorite products to a private favorites list. Additionally, they can add products to a shopping cart and reserve them for later.  
  `;

  const bazar_Sol_link = 'https://github.com/AdalbertoCV/Bazar_Sol';
  
  const [bazarSolIndex, setBazarSolIndex] = useState(0);
  const bazarSolImages = [BSImage1, BSImage2, BSImage3];

  const rentaZac_description = `
    School project for the student community of the city of Zacatecas. The main idea of the website is to give an alternative to landlords and students to see and
    post houses for rent on a trusted site instead of creating ads on social media. This website is offered as a good solution to the problem of thousands of students looking for a place to rent to continue their studies. 
  `;

  const rentazac_link = 'https://github.com/Viky-Gomez/RentaZac';

  const [RentaZacIndex, setRentaZacIndex] = useState(0);
  const RentaZacImages = [RZImage1, RZImage2, RZImage3];

  const cargas_description = `
    This website was developed as part of my social service in the LABSOL Network. The platform is designed to assist academic program coordinators at the Faculty of Electrical Engineering of Universidad Autónoma de Zacatecas in managing semester schedules, assigning professors, and organizing comprehensive course information. Its primary goal is to prevent scheduling conflicts between professors and class groups, as well as to streamline the process, making schedule management more efficient and automated.
  `;

  const cargas_link = 'https://labsol.cozcyt.gob.mx/git/devops-lab/sistema-de-cargas-uaie';

  const [CargasIndex, setCargascIndex] = useState(0);
  const CargasImages = [cargasI1, cargasI2, cargasI3];

  const cosiap_description = `
    As an Intern Developer at LABSOL Network, my team was tasked with developing a project for the Consejo Zacatecano de Ciencia, Tecnología e Innovación (COZCYT). This platform enables administrators to efficiently manage applications for economic grants submitted by students, researchers, professors, and entrepreneurs in Zacatecas City. Prior to the development of this system, the application process was cumbersome and manual, requiring applicants to submit all documentation in paper form. The new platform automates this process, streamlining the workflow and allowing applicants to upload their documents digitally, making the application process more convenient and accessible.
  `;

  const cosiap_link = 'https://labsol.cozcyt.gob.mx/git/RafaUC/cosiap';

  const [CosiapIndex, setCosiapcIndex] = useState(0);
  const CosiapImages = [cosiap1, cosiap2, cosiap3, cosiap4];

  const pbienestar_description = `This project consists of an appointment scheduling system for a professional psychological care clinic. It enables administrators to manage specialists' profile status and review appointment details for informed decision-making, ensuring optimal patient care. Additionally, the system automates email notifications for patients, specialists, and administrators, providing real-time updates on appointment changes. It also integrates with the Google Calendar API, allowing users to save appointments to their accounts and receive automated reminders. The system features secure authentication using JSON Web Token (JWT), ensuring protected access to user accounts and sensitive information.
  `;

  const [pbienestarIndex, setPbienestarIndex] = useState(0);
  const pbienestarImages = [pbienestar1, pbienestar2, pbienestar3];

  const nextSlide = (images, setIndex) => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const previousSlide = (images, setIndex) => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageClick = (image) =>{
    setActiveImage(image);
    setIsFullScreen(true);
  };

  const closeFullScreen = () =>{
      setIsFullScreen(false);
      setActiveImage(null);
  };

  return (
    <div className="main-card">
      <div className="experience-header">
        <span className="experience-badge">Featured Projects & Portfolio</span>
      </div>

    {/* Card for Punto Bienestar */}
    <div className="info-card">
        <div className="header-container">
          <h3>Appointment Scheduling System</h3>
        </div>
        <p>{pbienestar_description}</p>
        <div className="carousel-container">
          <button
            className="carousel-button left"
            onClick={() => previousSlide(pbienestarImages, setPbienestarIndex)}
          >
            ◀
          </button>
          <img
            className="carousel-image"
            onClick={() => handleImageClick(pbienestarImages[pbienestarIndex])}
            src={pbienestarImages[pbienestarIndex]}
            alt={`Punto Bienestar ${pbienestarIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <button
            className="carousel-button right"
            onClick={() => nextSlide(pbienestarImages, setPbienestarIndex)}
          >
            ▶
          </button>
        </div>
      </div>
    {/* Card for Cosiap */}
    <div className="info-card">
        <div className="header-container">
          <h3>Sistema de Apoyos COZCyT</h3>
          <a href={cosiap_link} target="_blank" rel="noopener noreferrer">
            <img className="logo-image" src={githubImage} alt="GitHub" />
          </a>
        </div>
        <p>{cosiap_description}</p>
        <div className="carousel-container">
          <button
            className="carousel-button left"
            onClick={() => previousSlide(CosiapImages, setCosiapcIndex)}
          >
            ◀
          </button>
          <img
            className="carousel-image"
            onClick={() => handleImageClick(CosiapImages[CosiapIndex])}
            src={CosiapImages[CosiapIndex]}
            alt={`Cosiap ${CosiapIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <button
            className="carousel-button right"
            onClick={() => nextSlide(CosiapImages, setCosiapcIndex)}
          >
            ▶
          </button>
        </div>
      </div>

    {/* Card for Cargas UAIE */}
    <div className="info-card">
        <div className="header-container">
          <h3>Sistema de Cargas UAIE</h3>
          <a href={cargas_link} target="_blank" rel="noopener noreferrer">
            <img className="logo-image" src={githubImage} alt="GitHub" />
          </a>
        </div>
        <p>{cargas_description}</p>
        <br></br>
        <br></br>
        <br></br>
        <div className="carousel-container">
          <button
            className="carousel-button left"
            onClick={() => previousSlide(CargasImages, setCargascIndex)}
          >
            ◀
          </button>
          <img
            className="carousel-image"
            onClick={() => handleImageClick(CargasImages[CargasIndex])}
            src={CargasImages[CargasIndex]}
            alt={`Cargas ${CargasIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <button
            className="carousel-button right"
            onClick={() => nextSlide(CargasImages, setCargascIndex)}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Card for Bazar Sol */}
      <div className="info-card">
        <div className="header-container">
          <h3>Bazar Sol</h3>
          <a href={bazar_Sol_link} target="_blank" rel="noopener noreferrer">
            <img className="logo-image" src={githubImage} alt="GitHub" />
          </a>
        </div>
        <p>{bazar_sol_description}</p>
        <div className="carousel-container">
          <button
            className="carousel-button left"
            onClick={() => previousSlide(bazarSolImages, setBazarSolIndex)}
          >
            ◀
          </button>
          <img
            className="carousel-image"
            onClick={() => handleImageClick(bazarSolImages[bazarSolIndex])}
            src={bazarSolImages[bazarSolIndex]}
            alt={`Bazar Sol ${bazarSolIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <button
            className="carousel-button right"
            onClick={() => nextSlide(bazarSolImages, setBazarSolIndex)}
          >
            ▶
          </button>
        </div>
      </div>

      {/* Card for RentaZac */}
      <div className="info-card">
        <div className="header-container">
          <h3>RentaZac</h3>
          <a href={rentazac_link} target="_blank" rel="noopener noreferrer">
            <img className="logo-image" src={githubImage} alt="GitHub" />
          </a>
        </div>
        <p>{rentaZac_description}</p>
        <br></br>
        <br></br>
        <div className="carousel-container">
          <button
            className="carousel-button left"
            onClick={() => previousSlide(RentaZacImages, setRentaZacIndex)}
          >
            ◀
          </button>
          <img
            className="carousel-image"
            onClick={() => handleImageClick(RentaZacImages[RentaZacIndex])}
            src={RentaZacImages[RentaZacIndex]}
            alt={`RentaZac ${RentaZacIndex + 1}`}
            style={{ maxWidth: '100%', height: 'auto' }} 
          />
          <button
            className="carousel-button right"
            onClick={() => nextSlide(RentaZacImages, setRentaZacIndex)}
          >
            ▶
          </button>
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

export default MyProjects;
