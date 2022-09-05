import React from "react";
import _ from "lodash";

import Weather from "./component/WeatherCard";
import { Config } from "./Config";
import data from "./json/data.json";
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
      city: data,
      weatherData: [],
    };
  }

  componentDidMount() {
    this.tabsClick(0);
  }

  tabsClick = (index) => {
    this.setState({ activeTab: index });
    this.getWeatherData(this.state.city[index].lat, this.state.city[index].lon);
  };

  getWeatherData = (lat, lon) => {
    const params = new URLSearchParams({
      lat,
      lon,
      appid: Config.API_KEY,
      units: "metric",
    });
    fetch(`${Config.API_URL}/data/2.5/forecast?${params.toString()}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        let firstObjHour = null;
        let newWeatherData = _.filter(result.list, function (o) {
          let myDate = new Date(o.dt_txt);
          let hours = myDate.getHours();
          if (firstObjHour === null) firstObjHour = hours;
          if (hours === firstObjHour) return o;
        });
        this.setState({ weatherData: newWeatherData });
      });
  };

  render() {
    return (
      <div className="d-flex justify-content-center align-items-center flex-column mainDiv">
        <div className="d-flex justify-content-center align-items-center my-3">
          {this.state.city.map((data, index) => {
            return (
              <h2
                key={index + "Weather"}
                onClick={() => this.tabsClick(index)}
                className="text-uppercase pointer"
                style={{
                  color: index === this.state.activeTab ? "#5eafe8" : "#4b4c52",
                }}
              >
                {data.name}
              </h2>
            );
          })}
        </div>
        <Weather data={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
