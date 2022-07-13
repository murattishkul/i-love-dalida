import './App.css';
import Button from '@mui/material/Button';
import styled from '@emotion/styled';
import heart from './heart.svg'
import {useEffect, useState, useRef} from 'react';
import Typography from '@mui/material/Typography';
import { Configuration, OpenAIApi } from 'openai';
import Loader from './Loader';
import './some.scss';

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

function getRandomIntButNot(min, max, id){
  let x = getRandomInt(min, max);
  if(x == id) return getRandomIntButNot(min, max, id);
  return x;
}

function App() {
  const configuration = new Configuration({
    apiKey: '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',
  });
  const openai = new OpenAIApi(configuration);

  const [topImage, setTopImage] = useState(img1);
  const [bottomImage, setBottomImage] = useState(img2);
  const [isEven, setIsEven] = useState(0);
  const [compliment, setCompliment] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const topRef = useRef(null);
  const bottomRef = useRef(null);

  const [css, setCss] = useState({
    backgroundImage: `url(${img1})`, 
    backgroundPosition: "center",
    backgroundSize: "cover",
  })
  useEffect(()=>{
    function handleMove(e) {
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
    }
    document.addEventListener('mousemove', handleMove);
    return () => {
      document.removeEventListener('mousemove', handleMove)
    }
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

  const handleClick = async() => {
    let id = getRandomInt(0,7);
    let id2 = getRandomIntButNot(0,7, id);

    let photos = [img1, img2,img3, img4,img5, img6,img7]
    
    console.log(topRef.current.classList)
    // setBottomImage(photos[id]);
    // setTopImage(photos[id2]);
      
    // if(isEven){
    //   bottomRef.current.classList
    //   .remove('topLoL')
    //   bottomRef.current.classList
    //     .add('bottomLol')

    //   topRef.current.classList
    //     .remove('bottomLol')
    //   topRef.current.classList
    //     .add('topLoL')
    // }
    // else {
    //   bottomRef.current.classList
    //   .remove('bottomLol')

    //   bottomRef.current.classList
    //     .add('topLoL')

    //   topRef.current.classList
    //     .remove('topLoL')
    //   topRef.current.classList
    //     .add('bottomLol')
    // }

    // setIsEven(prevState => !prevState)
    setIsLoading(true);
    const response = await openai.createCompletion({
      model: "text-davinci-002",
      prompt: "Write a funny, cute, seducing, teasing compliment to a woman called Dalida, who works in tech and from Kazakhstan and lives in Almaty and loves tennis and loves DJing and loves tall guys and charismatic and empathetic and environmentalist and ecologist and clever and well-educated and loves to read and loves to watch comedy and loves to travel and beautiful and who loves dance and who likes playing on dombra.\n",
      temperature: 1,
      max_tokens: 75,
      top_p: 1,
      frequency_penalty: 1.54,
      presence_penalty: 1.68,
    });

    console.log(response)
    console.log(response.data, response.data.choices[0], response.data.choices[0].text);

    setCompliment(response.data.choices[0].text);

  }

  useEffect(() => {

    let id = getRandomInt(0,7);
    let id2 = getRandomIntButNot(0,7, id);

    let photos = [img1, img2,img3, img4,img5, img6,img7]
    setBottomImage(photos[id]);
    setTopImage(photos[id2]);
      
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

    setIsLoading(false)
  }, [compliment])

  return (
    <div className="App  heart container" id="cf4">
      
      <img ref={topRef} className={`topLoL`} src={topImage} />
      <img ref={bottomRef} className={`bottomLol`} src={bottomImage} />
      
      <header className="App-header heart">
        {compliment && <DalidaCompliment>
          {compliment}
        </DalidaCompliment>}
        { isLoading ? <Loader />:
        <div id="heart">
        <DalidaButton  className="heart"  onClick={handleClick}>
          bro i love dalida
        </DalidaButton>
        </div>
        }
      </header>
    </div>
  );
}

const DalidaCompliment = styled(Typography)`
  font-size: 40px;
  font-family: 'Edu QLD Beginner', cursive;
  text-align: center;
  width: 60%;
  font-weight: 900;
  z-index: 2;
`;

const DalidaButton = styled(Button)`
  border-radius: 20px;
  background: #660033;
  cursor: url(${heart}), auto;    
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Edu QLD Beginner', cursive;
  z-index: 5;
  background: transparent;
  font-weight: 900;
  font-size: 20px;
  max-width: 130px;
  text-align: center;
  min-height: 100px;
}
`;


export default App;
