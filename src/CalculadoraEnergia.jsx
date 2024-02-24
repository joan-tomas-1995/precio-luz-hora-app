import React, { useState } from "react";

function CalculadoraEnergia({ precioActual }) {
  const [power, setPower] = useState("");
  const [hours, setHours] = useState("");
  const [price, setPrice] = useState("");
  const [costoEnergia, setCostoEnergia] = useState("");
  const [periodo, setPeriodo] = useState("diario");
  const [aviso, setAviso] = useState("");

  const calcularCosto = () => {
    if (!power || !hours || !price) {
      setAviso("Por favor, complete todos los campos.");
      return;
    }

    const consumoEnergia = (parseFloat(power) / 1000) * parseFloat(hours); // Convertir la potencia a kW
    const costo = consumoEnergia * parseFloat(price);
    let costoTotal = 0;

    switch (periodo) {
      case "diario":
        costoTotal = costo;
        break;
      case "mensual":
        costoTotal = costo * 30;
        break;
      case "anual":
        costoTotal = costo * 365;
        break;
      default:
        costoTotal = costo;
        break;
    }

    setCostoEnergia(costoTotal.toFixed(2));
    setAviso("");
  };

  const usarPrecioActual = () => {
    console.log("precioActual", precioActual);
    setPrice((precioActual / 100).toFixed(3));
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="flex flex-col items-center">
        <h1 className="text-2xl font-bold text-center text-[#333] mb-4">
          Calculadora de Costo de Energía Eléctrica
        </h1>
        <label htmlFor="power">Potencia en vatios (W):</label>
        <input
          className="bg-slate-400 rounded-md m-5"
          type="number"
          id="power"
          value={power}
          onChange={(e) => setPower(e.target.value)}
          min="1"
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="hours">Tiempo de Uso (en horas):</label>
        <input
          className="bg-slate-400 rounded-md m-5"
          type="number"
          id="hours"
          value={hours}
          onChange={(e) => setHours(e.target.value)}
          min="1"
        />
      </div>
      <div className="flex flex-col items-center">
        <label htmlFor="price">Precio por kWh:</label>
        <button
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-xs px-2 py-1.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={usarPrecioActual}>
          Usar Precio Actual
        </button>
        <input
          className="bg-slate-400 rounded-md m-5"
          type="number"
          id="price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          min="0"
        />
      </div>
      <div className="flex flex-col items-center">
        <div className="flex flex-row items-center gap-4 m-4">
          <div>
            <input
              type="radio"
              id="diario"
              name="periodo"
              value="diario"
              checked={periodo === "diario"}
              onChange={() => setPeriodo("diario")}
            />
            <label htmlFor="diario">Diario</label>
          </div>
          <div>
            <input
              type="radio"
              id="mensual"
              name="periodo"
              value="mensual"
              checked={periodo === "mensual"}
              onChange={() => setPeriodo("mensual")}
            />
            <label htmlFor="mensual">Mensual</label>
          </div>
          <div>
            <input
              type="radio"
              id="anual"
              name="periodo"
              value="anual"
              checked={periodo === "anual"}
              onChange={() => setPeriodo("anual")}
            />
            <label htmlFor="anual">Anual</label>
          </div>
        </div>
        <button
          className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
          onClick={calcularCosto}>
          Calcular
        </button>
        {costoEnergia && (
          <p>
            El costo de energía es de: {costoEnergia}€{" "}
            {periodo === "mensual" && "por mes"} {periodo === "anual" && "por año"}
          </p>
        )}
        {aviso && <p className="text-red-500">{aviso}</p>}
      </div>
    </div>
  );
}

export default CalculadoraEnergia;
