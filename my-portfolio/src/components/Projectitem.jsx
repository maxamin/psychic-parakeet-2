
import code from "/code.svg"
import link from "/anchor-link.svg"

export default function Projectitem(props){
    let countKey = 0 ;


    const imgs = (props.src).map((img)=>
        <img  key={countKey++} src={img} width={30} height={30}/>
    )
   

    return(
        <div className={props.className}>
            <div className="project-title">{props.title}</div>
            <div className="project-tech">{imgs}</div>
            <div className="project-description">{props.description}</div>
            <div className="sources"> <a className='inside-sources' href={props.link}  target='_blank' ><img src={link}    />link</a> <a className='inside-sources' href={props.code}  target='_blank'><img src={code} />code</a> </div>
        </div>
    )
}