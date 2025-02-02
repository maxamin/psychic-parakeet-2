
import Project from "./Projectitem"
import background from '/background.png'

import php from "/php.png"
import mysql from "/mysql.png"
import css from "/css.png"
import js from "/js.png"
import html from "/html.png"
import jquery from "/jquery.png"
import mongo from "/mongo.png"
import node from "/node.png"
import reacticon from "/reacticon.png"
import tailwindCSS from "/tailwindCSS.png"
import vercel from "/vercel.png"



export default function Projects(){
 
    return(
        <div className="projects">
            
        <div className='project-bg'>
            <img className="background" src={background} />
            <div className="projects-container">
            <div className='about-heading'>PROJECTS</div>
           
           <div className="projects-flexbox">

            <Project  className="project" title="LivingWell" src={[php , mysql ,html, css , js ,jquery]} description="LivingWell: Your go-to platform for finding the perfect rental home. Discover, connect, and move in!" link="https://f-aljardan.github.io/LivingWell/" code='https://github.com/f-aljardan/LivingWell.git'/>
            <Project   className="project" title="ToDOList" src={[html , css , node , mongo ]} description="Streamline task management with our simple TodoList app. "   link="https://magnificent-sweatshirt-goat.cyclic.app/"  code="https://github.com/f-aljardan/ToDoList.git" />
            <Project   className="project" title="BloggingWebsite" src={[html , tailwindCSS , node , mongo]} description="Unleash your creativity on our focused blogging website. Share your stories with the world."/>
            <Project    className="project" title="MyPortfolio" src={[reacticon , tailwindCSS]} description="single-page personal portfolio website built with REACT" link="fayaljardan-portfolio.netlify.app" code="https://github.com/f-aljardan/my-portfolio.git"/>
            </div>

            </div>
           
        </div>

    </div>  
    )
}