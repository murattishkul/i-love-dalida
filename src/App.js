import './App.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import heart from './heart.svg'
import {useEffect, useState, useRef} from 'react';
import img1 from './photos/1.jpg'
import img2 from './photos/2.jpg'
import img3 from './photos/3.jpg'
import img4 from './photos/4.jpg'
import img5 from './photos/5.jpg'
import img6 from './photos/6.jpg'
import img7 from './photos/7.jpg'

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
}

function App() {
  const [topImage, setTopImage] = useState(img1);
  const [bottomImage, setBottomImage] = useState(img2);
  const [isEven, setIsEven] = useState(0);

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const [css, setCss] = useState({
    backgroundImage: `url(${img1})`, 
    backgroundPosition: "center",
    backgroundSize: "cover",
  })
  useEffect(()=>{
    document.addEventListener('mousemove', function(e) {
      let body = document.querySelector('body');
      let circle = document.createElement('span');
      let x = e.offsetX;
      let y = e.offsetY;
      circle.style.left = x + "px";
      circle.style.top = y + "px";
      let size = getRandomInt(1,11); // 0 .. 10
      circle.style.width = 15 + size + "px";
      circle.style.height = 15 + size + "px";
      body.appendChild(circle);
      setTimeout(function() {
        circle.remove();
      }, 500);
    });
  }, [])

  useEffect(() => {
    let id = getRandomInt(1,8);
    console.log(id);
    let photos = [img1, img2,img3, img4,img5, img6,img7]
    setCss({
      backgroundImage: `url(${photos[id]})`, 
      backgroundPosition: "center",
      backgroundSize: "cover",
    })
  }, [])

  const handleClick = () => {
    let id = getRandomInt(0,7);
    let id2 = getRandomInt(0,7);

    let photos = [img1, img2,img3, img4,img5, img6,img7]
    
    setBottomImage(photos[id]);
    setTopImage(photos[id2]);

    console.log(topRef.current.classList)
      
    if(isEven){
      bottomRef.current.classList
      .remove('topLoL')
      bottomRef.current.classList
        .add('bottomLol')

      topRef.current.classList
        .remove('bottomLol')
      topRef.current.classList
        .add('topLoL')
    }
    else {
      bottomRef.current.classList
      .remove('bottomLol')
      bottomRef.current.classList
        .add('topLoL')

      topRef.current.classList
        .remove('topLoL')
      topRef.current.classList
        .add('bottomLol')
    }

    setIsEven(prevState => !prevState)
    
  }

  return (
    <div className="App  heart container" id="cf4">
      
      <img ref={topRef} className={`topLoL`} src={topImage} />
      <img ref={bottomRef} className={`bottomLol`} src={bottomImage} />
      
      <header className="App-header heart">
        <DalidaButton className="heart"  onClick={handleClick}>
          bro i love dalida
        </DalidaButton>
      </header>
    </div>
  );
}

const DalidaButton = styled(Button)`
  border-radius: 20px;
  background: #660033;
  cursor: url(${heart}), auto;    
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export default App;
