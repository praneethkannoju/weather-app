import React from "react";
import _ from "lodash";
import moment from "moment";

import WeatherCard from "./component/WeatherCard";
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

  getWeatherData = async (lat, lon) => {
    const params = new URLSearchParams({
      lat,
      lon,
      appid: Config.API_KEY,
      units: "metric",
    });
    await fetch(`${Config.API_URL}/data/2.5/forecast?${params.toString()}`)
      .then((res) => {
        return res.json();
      })
      .then((result) => {
        let firstObjHour = null;
        let newWeatherData = _.filter(result.list, function (data) {
          // let myDate = new Date(data.dt_txt);
          // let hours = myDate.getHours();
          let hours = moment(data.dt_txt).hours();
          if (firstObjHour === null) {
            firstObjHour = hours;
          }
          if (hours === firstObjHour) {
            return data;
          }
        });
        this.setState({ weatherData: newWeatherData });
      });
  };

  render() {
    return (
      <div className="d-flex align-items-center flex-column mainDiv">
        <div className="d-flex align-items-center my-3">
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
        <WeatherCard data={this.state.weatherData} />
      </div>
    );
  }
}

export default App;
