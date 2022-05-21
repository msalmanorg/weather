import React, { useEffect, useState } from 'react';
import './style.css';

const Temp = () => {
    const [inputValue, setInputValue] = useState('Gujranwala');

    const [weatherInfo, setWeatherInfo] = useState([])

    const [weatherIcon, setWeatherIcon] = useState('');

    const Logic = async () => {

        if (inputValue === '') {
            alert("Please enter a name of city in the input field !");
        } else {

            let url = `https://api.openweathermap.org/data/2.5/weather?q=${inputValue}&units=metric&appid=95ac8e4b5368169947788e4df54fa8ee`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                const { temp, humidity, pressure } = data.main;
                const { main: weatherMood } = data.weather[0];
                const { name } = data;
                const { speed } = data.wind;
                const { country, sunset } = data.sys;


                setWeatherInfo([temp, humidity, pressure, weatherMood, name, speed, country, sunset])


            } catch (error) {
                alert("Please enter the correct name ! ");
                setInputValue("")

            }
        }

    }

    let WM = weatherInfo[3];

    useEffect(() => {

        switch (WM) {
            case 'Clouds':
                setWeatherIcon("wi-day-cloudy")
                break;
            case 'Haze':
                setWeatherIcon("wi-fog")
                break;
            case 'Clear':
                setWeatherIcon("wi-day-sunny")
                break;
            case 'Mist':
                setWeatherIcon("wi-day-cloudy-windy")
                break;
            case 'Rain':
                setWeatherIcon("wi-day-rain")
                break;
            default:
                setWeatherIcon("wi-day-sunny")
                break;
        }

    }, [WM])

    useEffect(() => {
        Logic();
    }, [])

    // Calling a function on Enter key
    const useOnKey = (callback, targetKey) => {

        useEffect(() => {

            const keyPress = (e) => {
                if (e.key === targetKey) {
                    callback();
                }
            }

            window.addEventListener("keydown", keyPress);
            return () => {
                window.removeEventListener("keydown", keyPress)
            }

        }, [callback, targetKey])


    }

    useOnKey(Logic, 'Enter');

    let sec = new Date(1000 * weatherInfo[7]);
    let secStr = `${sec.getHours() > 12 ? (sec.getHours() - 12) : sec.getHours()} : ${sec.getMinutes()} ${sec.getHours() > 12 ? 'PM' : 'AM'}`

    return (
        <>
            <div className="wrap">
                <div className="search">
                    <input type="text"
                        className="searchTerm"
                        placeholder="Search..."
                        id="search"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        autoFocus={true}
                    />
                    <button className="searchButton" type='button' onClick={Logic} >Search</button>
                </div>

            </div>

            <article className="widget">

                <div className="weatherIcon">
                    <i className={`wi ${weatherIcon}`}></i>
                </div>

                <div className="weatherInfo">
                    <div className="temperature">
                        <span>{weatherInfo[0]}&deg;</span>
                    </div>

                    <div className="description">
                        <div className="weatherCondition">{weatherInfo[3]}</div>
                        <div className="place">{weatherInfo[4]} , {weatherInfo[6]}</div>
                    </div>
                </div>
                <div className="date">
                    {
                        new Date().toLocaleString()
                       
                    }
                </div>

                <div className="extra-temp">
                    <div className="temp-info-minmax">

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-sunset"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {secStr} <br />
                                Sunset
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-humidity"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherInfo[1]} <br />
                                Humidity
                            </p>
                        </div>

                    </div>
                    <div className="weather-extra-info">

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-rain"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherInfo[2]} <br />
                                Pressure
                            </p>
                        </div>

                        <div className="two-sided-section">
                            <p>
                                <i className={"wi wi-strong-wind"}></i>
                            </p>
                            <p className="extra-info-leftside">
                                {weatherInfo[5]} <br />
                                Wind
                            </p>
                        </div>
                    </div>

                </div>




            </article>



        </>
    )
}

export default Temp