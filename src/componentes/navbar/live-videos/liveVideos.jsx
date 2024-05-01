import '../live-videos/liveVideos.css'
import { Activo, Navbar, Submenu } from '../navbar'


export function LiveVideos (){
    
 
    return(
        <div >
          
        <h2 className='h2-envivo'><Activo/>  Videos en vivo  </h2>
        <div className="lives-content">

<div className='live'>
     live 1 
    </div>
    <div className='live'>
      live 2 
    </div>
    <div className='live'>
      live 3
    </div>
    <div className='live'>
      live 4
    </div>
    <div className='live'>
      live 5
    </div>
    <div className='live'>
      live 6
    </div>

        </div>
        </div>
    )
}