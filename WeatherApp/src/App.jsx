import { useState } from "react";
import "./App.css";
import { WiHumidity, WiWindy } from "weather-icons-react";

function App() {
   const [city, setCity] = useState('')
   const [weatherDetails, setWeatherDetails] = useState()
   const [loading, setLoading] = useState(false)
   let getData = (e) =>{
    setLoading(true)
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc306e6a6092e94c4d3f6834ecd3a6d1&units=metric`)
    .then((res)=> res.json())
    .then((finalResponse)=>{
      if(finalResponse.cod=='404'){
        setWeatherDetails(undefined)
      }else{
     setWeatherDetails(finalResponse);
      }
      setLoading(false)
    })
    e.preventDefault()
    setCity('')
   }
  return (
    <>
      <div className="md:w-full xl:w-full xl:h-screen md:h-screen flex bg-[seagreen]">
        <div className="xl:w-1/2 lg:w-1/2 md:w-1/2 sm:w-full m-auto  bg-[crimson] px-2 py-7 leading-loose border-none rounded-md shadow-2xl shadow-[#1d402c]">
          <div className="">
            <h1 className="font-bold m-auto text-center shadow-2xl text-[white] text-[30px] border-b-4 border-[seagreen] rounded-lg px-4 sm:w-full md:w-full lg:w-1/2 ">Weather App</h1>
            <form onSubmit={getData} className="w-full flex gap-1 justify-end h-7 mt-7">
              <input
                type="text"
                value={city}
                onChange={(e)=>setCity(e.target.value)}
                placeholder="City name"
                className="bg-white text-black border-none rounded-md px-3 py-3"
              />
              <button className="bg-[seagreen] border-none rounded-md  px-4">
                Search
              </button>
            </form>
          </div>
          <p className={`font-bold text-3xl p-5 ${loading? '' : 'hidden'} `}>Loading.......</p>
           {weatherDetails!==undefined
           ?
           <>
           <h1 className="font-bold text-[40px] text-[seagreen]">{weatherDetails.name} <span className="bg-yellow-300 text-violet-900">{weatherDetails.sys.country}</span></h1>
           <div className="flex justify-center align-middle gap-7">
             <div>
             <img src={`http://openweathermap.org/img/w/${weatherDetails.weather[0].icon}.png`} className="w-36 m-auto"/>
             </div>
             <div className="flex flex-col justify-center align-middle w-32 capitalize font-bold text-2xl">
              <p className="font-normal text-sm">Weather Condition</p>
              <p>{weatherDetails.weather[0].description}</p>
              </div>
           </div>
           <div className="font-bold">
           <p>Temprature: &nbsp; {weatherDetails.main.temp}<sup>o</sup>C </p>
           <p>feels like: &nbsp; {weatherDetails.main.feels_like}<sup>o</sup>C</p>
           <p className="flex gap-5  justify-center">Humidity: &nbsp; {weatherDetails.main.humidity}%  <WiHumidity className="text-[40px]"/> </p>
           <p className="flex gap-5  justify-center">Wind Speed: &nbsp; {weatherDetails.wind.speed} m/s  <WiWindy className="text-[40px]" /> </p>
           
           </div>
           </>
           : 
           <p className="font-bold text-[40px] px-6 py-4 my-9 text-[seagreen]">No data found</p>
           }
          

        </div>
      </div>
    </>
  );
}

export default App;
