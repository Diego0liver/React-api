import Logotem from './img/temperatura.png'
import Cima from './img/seta-para-cima.png'
import Baixo from './img/seta-para-baixo.png'
import Termo from './img/ter.png'
import Vento from './img/vento.png'
import LigarLoc from './img/casa.png'
import IconLigar from './img/localizacao.png'
import axios from 'axios';
import { Fragment, useEffect, useState } from 'react';
import './App.css';


function App() {
  const [loc, setLoc]  = useState(false);
  const [tempo, setTempo] = useState(false);

  let getTempo = async (lat, long) =>{
    let res = await axios.get("http://api.openweathermap.org/data/2.5/weather", {
      params:{
        lon: long,
        lat: lat,
        appid: '419fd77c383a5473b5d28079ca713a69',
        lang: 'pt',
        units: 'metric',
     

      }
    })
    setTempo(res.data)
    console.log(res.data)
  }



  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      getTempo(position.coords.latitude, position.coords.longitude);
      setLoc(true)
    })
  }, [])

  if(loc === false){
    return(
      //Aviso que aparece se caso a localizacao nao estiver ligada
      <Fragment>
        <div className='center m-5'>
          <div className='m-5 cont'>
          <h3 className='m-5 title' >
          
          Ligar a localizacao 📍</h3>
          <img className='imgLigarLoc' alt='loc' src={LigarLoc}></img>
          </div>
          <h5 className='textDesc'>Por favor ligar a localizacao para podermos<br />
          informar melhor sobre como esta o clima em sua regiao</h5>
        </div>
         
        </Fragment>
    )
  }else if(tempo === false){
  return(
    <Fragment><div className='tamanho'>
      <h1>Carregando clima</h1></div>
    </Fragment>
  )
  
  }else{
  return (
      <Fragment>
        <div  className='conteiner-card'>
        <div className='card tamanho '>
        <h3 className='card-header header-card'>Clima em sua regiao e <br /> {tempo['weather'][0]['description']}
        <img alt='time' className='img-time' src='http://openweathermap.org/img/wn/04n.png'></img></h3>
        
        
        <ul className='list-group list-group-flush '>
         
          <li className='list-group-item'> <img alt='temp' src={Logotem} height='30px' width='30px'>
            </img> Temperatura atual:<br />
          <div className='m-2 badge bg-primary rounded-pill' > {tempo['main']['temp']}°C</div></li>
          <div className='d-flex '>
          <li className='list-group-item '>Temperatura maxima :<img alt='cima' src={Cima} height='30px' width='30px'></img>
          <div className='m-2 badge bg-primary rounded-pill'> {tempo['main']['temp_min']}°C</div></li>
          <li className='list-group-item'>Temperatura minima :<img alt='cima' src={Baixo} height='30px' width='30px'></img>
          <div className='m-2 badge bg-primary rounded-pill'> {tempo['main']['temp_max']}°C</div></li>
          </div>
         
          <li className='list-group-item'>Sensacao termica <img alt='cima' src={Termo} height='30px' width='30px'></img><br />
          <div className=' badge bg-primary rounded-pill'>{tempo['main']['feels_like']}°C</div></li>
          <li className='list-group-item'>Umidade <img alt='cima' src={Vento} height='30px' width='30px'></img><br />
            <div className='badge bg-primary rounded-pill'>{tempo['main']['humidity']}°C</div></li>
          
        </ul>
        </div></div>
      </Fragment>
  );
}}

export default App;
