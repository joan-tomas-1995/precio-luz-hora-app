import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";

const LightPrice = () => {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const [currentHour, setCurrentHour] = useState(null);

  useEffect(() => {
    let now = new Date();
    setDate(now.toLocaleDateString());
    setCurrentHour(now.getHours());

    let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    let endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59);

    let start_date = startOfDay.toISOString();
    let end_date = endOfDay.toISOString();

    let url = `https://apidatos.ree.es/es/datos/mercados/precios-mercados-tiempo-real?start_date=${start_date}&end_date=${end_date}&time_trunc=hour`;

    const fetchData = async () => {
      try {
        const response = await axios.get(url);
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchData();
  }, []);

  const calculateAveragePrice = () => {
    if (data) {
      let sum = data.included[0].attributes.values.reduce(
        (accumulator, value) => accumulator + value.value,
        0
      );
      let average = sum / data.included[0].attributes.values.length;
      return average;
    }
    return 0;
  };

  const filterByTime = (values, startHour, endHour) => {
    return values.filter((value) => {
      const hour = new Date(value.datetime).getHours();
      return hour >= startHour && hour < endHour;
    });
  };

  const getPriceColor = (price) => {
    const averagePrice = calculateAveragePrice();
    if (price > averagePrice * 1.2) {
      return "bg-custom-red";
    } else if (price > averagePrice) {
      return "bg-custom-orange";
    } else {
      return "bg-custom-green";
    }
  };

  var today = new Date();
  var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  let cheapestPrice = Infinity;
  let cheapestHour = null;

  if (data) {
    data.included[0].attributes.values.forEach((value) => {
      const price = value.value;
      const hour = new Date(value.datetime).getHours();

      if (price < cheapestPrice) {
        cheapestPrice = price;
        cheapestHour = hour;
      }
    });
  }

  let expensivePrice = -Infinity;
  let expensierHour = null;

  if (data) {
    data.included[0].attributes.values.forEach((value) => {
      const price = value.value;
      const hour = new Date(value.datetime).getHours();

      if (price > expensivePrice) {
        expensivePrice = price;
        expensierHour = hour;
      }
    });
  }

  return (
    <div className="w-auto h-auto flex flex-col justify-center items-center">
      <h1 className="text-2xl m-8 text-center bg-[#e6e6e6] rounded-md p-6 text-[#333]">
        Precios de la luz por hora hoy: <br /> {date}{" "}
        <p>Precio medio: {(calculateAveragePrice() / 1000).toFixed(3)} €/kWh</p>
      </h1>
      <div className="w-screen max-w-4xl grid grid-cols-2 md:gap-4 px-4">
        {data ? (
          <>
            <div className="flex flex-col">
              <div className="text-sm md:text-xl flex flex-col font-bold text-center m-2 bg-custom-green rounded-md p-2 text-[#333]">
                <p>Hora más barata:</p>
                <span>{(cheapestPrice / 1000).toFixed(3)} €/kWh</span>
                <span>
                  {" "}
                  {cheapestHour}:00 a {cheapestHour + 1}:00 h
                </span>
              </div>
              <h2 className="text-sm md:text-xl mb-2 text-center m-2 bg-[#e6e6e6] rounded-md p-2 text-[#333]">
                {" "}
                de 0:00 a 12:00
              </h2>
              {filterByTime(data.included[0].attributes.values, 0, 12).map(
                (value, index) => (
                  <div
                    className={`text-sm md:text-lg flex flex-col m-2 bg-[#e6e6e6] rounded-md p-4 text-[#333] ${
                      currentHour === new Date(value.datetime).getHours()
                        ? "border-4 border-blue-500"
                        : ""
                    } ${getPriceColor(value.value)}`}
                    key={index}>
                    <p
                      key={index}
                      className="flex flex-col md:flex-row justify-between items-center">
                      <p>
                        {new Date(value.datetime).getHours()}:00 -{" "}
                        {new Date(value.datetime).getHours() + 1}:00
                      </p>
                      <span className="font-bold">
                        {(Math.round((value.value / 1000) * 1000) / 1000).toFixed(3)}{" "}
                        €/kWh
                      </span>{" "}
                    </p>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col">
              <div className="text-sm md:text-xl flex flex-col font-bold text-center m-2 bg-custom-red rounded-md p-2 text-[#333]">
                <p>Hora más cara:</p>
                <span>{(expensivePrice / 1000).toFixed(3)} €/kWh</span>
                <span>
                  {" "}
                  {expensierHour}:00 a {expensierHour + 1}:00 h
                </span>
              </div>
              <h2 className="text-center text-sm md:text-xl mb-2 m-2 bg-[#e6e6e6] rounded-md p-2 text-[#333]">
                de 12:00 a 24:00
              </h2>
              {filterByTime(data.included[0].attributes.values, 12, 24).map(
                (value, index) => (
                  <div
                    className={`text-sm md:text-lg flex flex-col m-2 bg-[#e6e6e6] rounded-md p-4 text-[#333] ${
                      currentHour === new Date(value.datetime).getHours()
                        ? "shadow-blue"
                        : ""
                    } ${getPriceColor(value.value)}`}
                    key={index}>
                    <p
                      key={index}
                      className="flex flex-col md:flex-row justify-between items-center">
                      <p>
                        {new Date(value.datetime).getHours()}:00 -{" "}
                        {new Date(value.datetime).getHours() + 1}:00
                      </p>
                      <span className="font-bold">
                        {(Math.round((value.value / 1000) * 1000) / 1000).toFixed(3)}{" "}
                        €/kWh
                      </span>{" "}
                    </p>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default LightPrice;
