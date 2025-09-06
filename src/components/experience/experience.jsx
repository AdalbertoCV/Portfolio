import labsolLogo from '../../images/Labsol.png'
import freelance from '../../images/freelance.png'
import radii from '../../images/radii.png'

const Experience = () =>{
    const infoLabsol = `
        I was part of the Free Software Laboratory (COZCyT) team from September 2023 to November 2024. During my time at LABSOL, I was the leader of two projects carried out for Autonomous University of Zacatecas and The Zacatecan Council of Science, Technology and Innovation. Through the execution of these two projects, I significantly strengthened my knowledge of full-stack web development, requirements analysis, software design, software testing, project management, and teamwork.
    `;

    const infoFreelance = `I am always looking for development projects to provide my clients and employers with high-quality service. I strive to ensure that the products I deliver meet the highest standards. Since January 2025, I have been working on several projects, offering my services as a freelance programmer.
    `;

    const infoRadii = `Radii Manufacturing is a startup focused on automating manufacturing processes to take projects from design to finished parts. With an AI-powered platform and a centralized network of manufacturers, Radii is emerging as one of the most promising startups in Latin America.`;

    const labsolLink = 'https://labsol.cozcyt.gob.mx/';

    const radiiLink = 'https://www.radii.com.mx/es';

    return (
        <div className="main-card">
        <div className="info-card">
                <h3>Radii Manufacturing (Jul 2025 - now)</h3>
                <p>{infoRadii}</p>
                <a href={radiiLink} target="_blank" rel="noopener noreferrer"><img className='education-image' src={radii} alt='Radii logo'></img></a>
            </div>
            <div className="info-card">
                <h3>Freelance Programmer (Jan 2025 - Jul 2025)</h3>
                <p>{infoFreelance}</p>
                <img className='education-image' src={freelance} alt='Freelance img'></img>
            </div>
            <div className="info-card">
                <h3>Labsol Network (Sep 2023 - Nov 2024)</h3>
                <p>{infoLabsol}</p>
                <a href={labsolLink} target="_blank" rel="noopener noreferrer"><img className='education-image' src={labsolLogo} alt='Labsol Logo'></img></a>
            </div>
        </div>
    );
};

export default Experience;