import React from "react";
import { Row, Col } from "react-bootstrap";
import {
  TiWeatherSunny,
  TiWeatherPartlySunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherWindyCloudy,
} from "react-icons/ti";

const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
class WeatherCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getIcon = (weatherDescription) => {
    switch (weatherDescription) {
      case "Clear":
        return TiWeatherSunny;
      case "Clouds":
        return TiWeatherPartlySunny;
      case "Drizzle":
        return TiWeatherStormy;
      case "Rain":
        return TiWeatherShower;
      case "Thunderstorm":
        return TiWeatherDownpour;
      case "Snow":
        return TiWeatherSnow;
      default:
        return TiWeatherWindyCloudy;
    }
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Row className="rowHeight">
          {this.props.data.map((item, index) => {
            let myDate = new Date(item.dt_txt);
            let WeatherIcon = this.getIcon(item.weather[0].main);
            return index === 0 ? (
              <Col
                xl={12}
                lg={12}
                md={12}
                sm={12}
                className="p-0"
                key={index + "WeatherCard"}
              >
                <div className="d-flex flex-column justify-content-center align-items-center border-5 border-bottom border-white col-12-height">
                  <span className="text-capitalize days-font">Today</span>
                  <div className="d-flex mt-2  align-items-center">
                    <WeatherIcon size={140} color="#2e4269" />
                    <div className="d-flex mt-1  flex-column">
                      <span className="temperature-font">
                        {Math.round(item.main.temp)}°
                      </span>
                      <span className="cloud-font">{item.weather[0].main}</span>
                    </div>
                  </div>
                </div>
              </Col>
            ) : (
              <Col
                xl={3}
                lg={3}
                md={6}
                sm={12}
                className="p-0 nextDays-weather"
                key={index + "WeatherCardData"}
              >
                <div
                  className="d-flex flex-column align-items-center justify-content-center nextDay-maiDiv"
                  style={{
                    borderRight:
                      this.props.data.length === index + 1
                        ? "0px"
                        : "5px solid white",
                  }}
                >
                  <span className="text-capitalize nextDay-day">
                    {days[myDate.getDay()]}
                  </span>
                  <WeatherIcon size={60} color="#2e4269" />
                  <span className="text-capitalize nextDay-temperature">
                    {Math.round(item.main.temp)}°
                  </span>
                </div>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

export default WeatherCard;
