
import github from '/github.png'
import linkedin from "/Group.png"

export default function Nav(){
    return(
        <nav className='nav'>

            <div className='nav-links'>
            <a href="#Home" className="nav-items">Home</a>
            <a href="#about" className="nav-items">About</a>
            <a href="#Projects" className="nav-items">Projects</a>
            <a  href="#Contact" className="nav-items">Contact</a>

            </div>
           
            <div className='nav-social'>
            <a href="https://www.linkedin.com/in/fay-aljardan-b33a1826a" target='_blank'><img src={linkedin} width={30} height={30}/></a>
            <a href="https://github.com/f-aljardan" target='_blank'><img src={github} width={30} height={30}/></a>
     
            </div>

           
               </nav>
    )
}
