import React from 'react';
import homeImg from '../../img/home-img.jpg';

function Home() {
  return (
    <div className='col s12 m8 offset-m2 l6 offset-l3'>
      <div className='card-panel grey lighten-5 z-depth-1'>
        <h4 className='center-align'>Welcome to MyTalki!</h4>
        <div className='row valign-wrapper'>
          <div className='col s8'>
            <span className='flow-text'>
              Any landing text you want adipisicing elit. Quod neque facilis adipisci cumque molestiae vero corrupti
              aliquid eum inventore et cupiditate nesciunt minima, saepe vel necessitatibus, sed aperiam quasi
              recusandae ad est eius placeat. Nulla quidem culpa sit nemo, pariatur fugit praesentium fuga porro elit.
              Voluptatem enim assumenda veritatis, laboriosam debitis.
            </span>
          </div>
          <div className='col s4'>
            <img src={homeImg} alt='' className='responsive-img' />
          </div>
        </div>
        <p className='flow-text'>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, excepturi mollitia enim assumenda iure
          voluptas nisi laboriosam minima a obcaecati.
        </p>
      </div>
    </div>
  );
}

export default Home;
