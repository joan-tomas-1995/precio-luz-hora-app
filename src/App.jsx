import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Footer from "./Footer";
import { Loading } from "./Loading";
import { ArrowUp, ArrowDown } from "./arrows";
import FAQ from "./Faq";
import Chart from "chart.js/auto";
import CalculadoraEnergia from "./CalculadoraEnergia";

const LightPrice = () => {
  const [data, setData] = useState(null);
  const [date, setDate] = useState(null);
  const [currentHour, setCurrentHour] = useState(null);
  const [sizeArrow, setSizeArrow] = useState(30);
  const [chartInstance, setChartInstance] = useState(null);
  const [precioActual, setPrecioActual] = useState(0);

  useEffect(() => {
    function changeWidth() {
      if (window.innerWidth <= 450) {
        setSizeArrow(20);
      } else {
        setSizeArrow(30);
      }
    }
    changeWidth();

    window.addEventListener("resize", changeWidth);
    return () => {
      window.removeEventListener("resize", changeWidth);
    };
  }, []);

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

  const getPriceColorChart = (price) => {
    const averagePrice = calculateAveragePrice();
    if (price > averagePrice * 1.2) {
      return "rgba(255, 99, 71, 0.9)";
    } else if (price > averagePrice) {
      return "rgba(255, 205, 0, 0.7)";
    } else {
      return "rgba(144, 238, 144, 0.7)";
    }
  };

  useEffect(() => {
    if (data) {
      if (chartInstance) {
        chartInstance.destroy();
      }

      const ctx = document.getElementById("price-chart").getContext("2d");

      const labels = data.included[0].attributes.values.map(
        (value) => new Date(value.datetime).getHours() + ":00"
      );
      const prices = data.included[0].attributes.values.map((value) => value.value);

      const backgroundColors = prices.map((price) => {
        //console.log("price: ", getPriceColorChart(price));
        return getPriceColorChart(price);
      });

      const newChartInstance = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "€/kWh",
              data: prices,
              backgroundColor: backgroundColors,
              borderColor: "black",
              borderWidth: 1,
              fill: {
                target: "origin",
                above: "rgb(230, 230, 230, 0.30)",
                below: "rgb(0, 0, 255)",
              },
            },
          ],
        },
        options: {
          maintainAspectRatio: false,
          responsive: true,
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                color: "white",
              },
            },
            x: {
              ticks: {
                color: "white",
              },
            },
          },
        },
      });

      setChartInstance(newChartInstance);
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const currentData = filterByTime(
        data.included[0].attributes.values,
        currentHour,
        currentHour + 1
      );
      if (currentData.length > 0) {
        setPrecioActual(currentData[0].value);
      }
    }
  }, [currentHour, data]);

  return (
    <div className="w-auto h-auto flex flex-col justify-center items-center">
      <div className="text-2xl m-4 text-center bg-[#e6e6e6] rounded-md p-4 md:p-6 text-[#333] ">
        <h1 className="p-0  text-sm md:text-2xl md:p-2">
          Precios de la luz hoy: <br /> {date}{" "}
          <p className="p-2">
            Precio medio: {(calculateAveragePrice() / 1000).toFixed(3)} €/kWh
          </p>
        </h1>
      </div>
      <div className="text-md m-8 text-center w-[90%] sm:w-[47%] bg-[#e6e6e6] rounded-md p-4 md:p-6 text-[#333]">
        ¿Buscas el precio de la luz por hora para hoy? Conoce cuándo es más económico usar
        electricidad con nuestro desglose del precio luz hora y nuestro grafico de barras.
        Mantente al día con el precio hora luz hoy y planifica tu consumo para ahorrar.
        Descubre el precio luzhora más bajo y aprovecha las tarifas reducidas. Entiende
        mejor el término luzhora y cómo afecta tu factura. Con nuestras actualizaciones
        sobre el precio de la hora luz hoy, toma decisiones inteligentes y reduce tus
        gastos en electricidad.
      </div>
      <div className="chart-container md:w-[70%] w-[100%] md:h-[400px] h-[150%] flex flex-col justify-center items-center p-4">
        <canvas id="price-chart" />
      </div>
      <div className="w-screen max-w-4xl grid grid-cols-2 md:gap-4 px-4 justify-center items-center">
        {data ? (
          <>
            <div className="flex flex-col ">
              <h2 className="text-sm md:text-xl mb-2 text-center m-2 bg-[#e6e6e6] rounded-md p-2 text-[#333]">
                {" "}
                0:00 a 12:00
              </h2>
              {filterByTime(data.included[0].attributes.values, 0, 12).map(
                (value, index) => (
                  <div
                    className={`text-lg md:text-xl flex flex-row m-2 bg-[#e6e6e6] rounded-md p-2 md:p-4 text-[#333]  justify-center${
                      currentHour === new Date(value.datetime).getHours()
                        ? " shadow-blue"
                        : ""
                    } ${getPriceColor(value.value)}`}
                    key={index}>
                    <p
                      key={index}
                      className="flex flex-col md:flex-row justify-between items-center md:gap-24">
                      <p>
                        {new Date(value.datetime).getHours()}:00 -{" "}
                        {new Date(value.datetime).getHours() + 1}:00
                      </p>
                      <span className="flex flex-row font-bold">
                        {(Math.round((value.value / 1000) * 1000) / 1000).toFixed(3)}{" "}
                        €/kWh
                      </span>{" "}
                    </p>
                    <span className="flex justify-center	align-middle">
                      {expensivePrice === value.value ? (
                        <ArrowUp sizeArrow={sizeArrow} />
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="flex justify-center align-middle">
                      {cheapestPrice === value.value ? (
                        <ArrowDown sizeArrow={sizeArrow} />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="flex flex-col">
              <h2 className="text-sm md:text-xl mb-2 text-center m-2 bg-[#e6e6e6] rounded-md p-2 text-[#333]">
                12:00 a 24:00
              </h2>
              {filterByTime(data.included[0].attributes.values, 12, 24).map(
                (value, index) => (
                  <div
                    className={`text-lg md:text-xl flex flex-row m-2 bg-[#e6e6e6] rounded-md p-2 md:p-4 text-[#333]  justify-center	${
                      currentHour === new Date(value.datetime).getHours()
                        ? " shadow-blue"
                        : ""
                    } ${getPriceColor(value.value)} 
                    
                     `}
                    key={index}>
                    <p
                      key={index}
                      className="flex flex-col md:flex-row justify-between items-center md:gap-24">
                      {/* ESTE ES EL CODIGO BUENO */}
                      <p>
                        {new Date(value.datetime).getHours()}:00 -{" "}
                        {new Date(value.datetime).getHours() + 1}:00
                      </p>
                      <span className="flex flex-row font-bold">
                        {(Math.round((value.value / 1000) * 1000) / 1000).toFixed(3)}{" "}
                        €/kWh
                      </span>{" "}
                    </p>
                    <span className="flex justify-center	align-middle">
                      {expensivePrice === value.value ? (
                        <ArrowUp sizeArrow={sizeArrow} />
                      ) : (
                        ""
                      )}
                    </span>
                    <span className="flex justify-center	align-middle">
                      {cheapestPrice === value.value ? (
                        <ArrowDown sizeArrow={sizeArrow} />
                      ) : (
                        ""
                      )}
                    </span>
                  </div>
                )
              )}
            </div>
          </>
        ) : (
          <p className="w-auto h-auto flex flex-col justify-center items-center">
            <Loading />
          </p>
        )}
      </div>
      <div className="bg-[#e6e6e6] rounded-md p-4 md:p-6 m-8 w-[90%] sm:w-[47%] mx-auto">
        <h2 className="text-2xl font-bold text-center text-[#333] mb-4">
          Tarificación Regulada del kWh
        </h2>
        <p className=" text-[#333] mb-4">
          El costo del kWh en el marco regulado es ajustado por las autoridades
          gubernamentales basado en el valor diario del mercado eléctrico. Este precio se
          modifica cada hora, todos los días del año, siguiendo las tendencias de oferta y
          demanda de energía.
        </p>
        <h3 className="text-xl font-semibold text-[#333] mb-2">
          Características Principales:
        </h3>
        <ul className="list-disc list-inside text-[#333] mb-4 [&>li]:m-4">
          <li>
            Se determinan 24 precios distintos cada día, reflejando la variabilidad en el
            costo de la energía.
          </li>
          <li>
            La tarifa de electricidad es susceptible a fluctuaciones, lo que significa que
            en algunos meses podrías pagar más a pesar de tener un consumo menor.
          </li>
          <li>
            No se proporcionan descuentos ni ofertas promocionales en esta modalidad de
            tarifas.
          </li>
          <li>
            Se brinda acceso al bono social para aquellos consumidores en situación de
            vulnerabilidad.
          </li>
        </ul>
        <p className="text-[#333] mb-4">
          Este tipo de tarifa es especialmente beneficioso para usuarios considerados
          vulnerables, quienes pueden acceder al bono social de luz y obtener descuentos
          significativos en sus facturas eléctricas. La estructura tarifaria diaria y
          horaria permite una transparencia en la facturación, permitiendo a los usuarios
          vulnerables y a aquellos que pueden adaptar su consumo, la oportunidad de
          ahorrar en sus facturas mensuales.
        </p>
      </div>
      <div className="bg-[#e6e6e6] rounded-md p-4 md:p-6 m-8 w-[90%] sm:w-[47%] mx-auto text-black">
        <CalculadoraEnergia precioActual={precioActual} />
      </div>
      <div className="w-[90%] sm:w-[47%] m-4">
        <FAQ />
      </div>
      <Footer />
    </div>
  );
};

export default LightPrice;
