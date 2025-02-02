
import background from '/background.png'
import mongo from "/mongo.png"
import node from "/node.png"
import reacticon from "/reacticon.png"
import mysql from "/mysql.png"
import github from "/github.png"
import flutter from "/flutter.png"
import figma from "/figma.png"
import firebase from "/firebase.png"

export default function About(){
    return (
        <div className='AboutDiv'> 
        <div className='About-bg'>
        <img className="background" src={background}/>

<div className='about-container'>
<div className='about-heading'>ABOUT ME</div>
<div className='about-info1'> <p>An Enthusiastic about Information Technology, with a focus on developing skills in Web development, Cyber Security, and Web3. Eager to join innovative projects and collaborative teams . Let's connect and explore together!</p></div>
<div className='about-heading'>MY SKILLS</div>

<div className='skills-container'>
<div className='skills-container-item'> <img src={reacticon} /></div>
<div className='skills-container-item'><img src={node}/></div>
<div className='skills-container-item'><img src={mongo}/></div>
<div className='skills-container-item'><img src={github}/></div>
<div className='skills-container-item'><img src={mysql}/></div>
<div className='skills-container-item'><img src={flutter}/></div>
<div className='skills-container-item'><img src={figma}/></div>
<div className='skills-container-item'><img src={firebase}/></div>
</div>

</div>
        </div> 
        </div>
    )
}