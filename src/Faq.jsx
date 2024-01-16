// Importando React y Tailwind CSS
import React, { useState } from "react";

// Componente FAQ
const FAQ = () => {
  // Array de preguntas y respuestas
  const faqs = [
    {
      index: 0,
      question: "¿Cómo se determinan los precios de la luz?",
      answer:
        '<a style="color:rgb(37 99 235);" href="https://www.certificadosenergeticos.com/como-se-determina-el-precio-de-la-electricidad-en-espana#:~:text=En%20Espa%C3%B1a%2C%20el%20precio%20de,para%20cada%20hora%20del%20d%C3%ADa." target="_blank">Los precios de la electricidad <a/> son influenciados por varios factores como los costos de producción, que incluyen operación y mantenimiento de plantas eléctricas y el precio de los combustibles usados para generar electricidad. La demanda energética también afecta los precios, especialmente durante periodos de alta demanda. Además, las tarifas pueden ser impactadas por regulaciones gubernamentales y la competencia en el mercado. Factores climáticos extremos e innovaciones tecnológicas en la generación y distribución eléctrica también pueden influir en los costos, y por ende, en los precios al consumidor.',
    },
    {
      index: 1,
      question: "¿Cómo puedo ahorrar en mi factura eléctrica?",
      answer:
        "Para ahorrar en tu factura eléctrica, puedes considerar diversas estrategias como: ajustar tu consumo de energía a las horas con tarifas más bajas, utilizar electrodomésticos eficientes en energía, implementar soluciones de energía renovable como paneles solares, y aprovechar los programas de descuento o incentivos ofrecidos por las compañías eléctricas. Además, mantener un uso consciente de la electricidad, como apagar luces y desconectar dispositivos no utilizados, también contribuye al ahorro.",
    },
    {
      index: 2,
      question: "¿Qué es el precio por kilovatio-hora (kWh)?",
      answer:
        '<a style="color:rgb(37 99 235);" href="https://www.factorenergia.com/es/blog/factura-luz/que-es-un-kilovatio-hora-kwh/" target="_blank">El precio por kilovatio-hora (kWh)<a/> refleja el costo de consumir un kilovatio de electricidad durante una hora. Un kWh corresponde a la energía consumida por un dispositivo de 1,000 vatios operando durante una hora. Las compañías eléctricas utilizan el precio por kWh para facturar a los consumidores, permitiéndoles estimar el costo de su consumo energético.',
    },

    {
      index: 3,
      question: "¿Cómo se calculan las tarifas eléctricas?",
      answer:
        '<a style="color:rgb(37 99 235);" href="https://www.factorenergia.com/es/blog/factura-luz/que-es-un-kilovatio-hora-kwh/" target="_blank">Las tarifas eléctricas <a/>se determinan considerando diversos factores como el costo de generación de electricidad, los gastos de operación y mantenimiento de la infraestructura eléctrica, las regulaciones gubernamentales y la demanda de energía en el mercado. Además, pueden adoptarse esquemas de tarificación diferenciada como la tarificación por hora o estacional, donde las tarifas varían según la hora del día o la temporada del año, respectivamente.',
    },
    {
      index: 4,
      question: "¿Qué es la tarificación por hora de la electricidad?",
      answer:
        "La tarificación por hora de la electricidad es un esquema donde las tarifas varían según la hora del día. Durante las horas pico, donde la demanda es alta, las tarifas son más elevadas; mientras que en horas de baja demanda, las tarifas son más bajas. Este esquema incentiva a los consumidores a utilizar electricidad en horarios de menor demanda, contribuyendo así a la gestión eficiente de la red eléctrica y a menudo resultando en facturas eléctricas más bajas.",
    },
    {
      index: 5,
      question: "¿Cómo puedo reducir mi factura eléctrica?",
      answer:
        "'<span style='font-weight:bold;'>Hay  varias maneras de reducir tu factura eléctrica:</span> <br> 1) Utilizar electrodomésticos eficientes en energía.<br>2) Ajustar el termostato para reducir el uso de calefacción y aire acondicionado.<br>3) Apagar las luces y desconectar los dispositivos electrónicos cuando no estén en uso. <br>4) Aprovechar la luz natural durante el día. <br>5) Considerar la instalación de sistemas de energía renovable como paneles solares.'",
    },

    {
      index: 6,
      question: "¿Qué son las tarifas reguladas y las tarifas de mercado?",
      answer:
        'Las tarifas reguladas son establecidas por organismos gubernamentales y están diseñadas para asegurar que los precios de la electricidad sean justos y razonables. Las tarifas de mercado, por otro lado, son determinadas por la oferta y la demanda en el mercado de energía. En algunas áreas, los consumidores pueden elegir entre proveedores de electricidad que ofrecen<a style="color:rgb(37 99 235);" href="https://www.endesa.com/es/blog/blog-de-endesa/luz/pvpc-tarifa-regulada" target="_blank"> tarifas de mercado o tarifas reguladas.</a>',
    },
    {
      index: 7,
      question:
        "¿Qué es la eficiencia energética y cómo puede ayudarme a ahorrar dinero?",
      answer:
        '<a style="color:rgb(37 99 235);" href="https://www.repsol.com/es/sostenibilidad/ejes-sostenibilidad/cambio-climatico/eficiencia-energetica/que-es-la-eficiencia-energetica/index.cshtml#:~:text=El%20concepto%20de%20eficiencia%20energ%C3%A9tica,impactos%20ambientales%20asociados%20a%20ella." target="_blank">La eficiencia energética </a>implica utilizar menos energía para realizar la misma tarea. Puedes ahorrar dinero al mejorar la eficiencia energética de tu hogar o negocio mediante la utilización de electrodomésticos y sistemas de calefacción/aire acondicionado eficientes, mejorando el aislamiento, y adoptando hábitos que reduzcan el consumo de energía.',
    },

    /*     <a style="color:rgb(37 99 235);" href="https://www.kelisto.es/electricidad/consejos-y-analisis/9-consejos-para-ahorrar-en-la-factura-de-la-luz-2973"></a> */
    {
      index: 8,
      question: "¿Qué impacto tiene la electricidad en el medio ambiente?",
      answer:
        'La generación de electricidad puede tener un <a style="color:rgb(37 99 235);" href="https://ecoembesdudasreciclaje.es/medioambiente-electricidad/#:~:text=Impacto%20en%20el%20medioambiente%20de%20la%20electricidad&text=Asimismo%2C%20esto%20aumenta%20el%20consumo,la%20degradaci%C3%B3n%20de%20la%20biodiversidad." target="_blank">impacto significativo en el medio ambiente</a>, especialmente si se produce a partir de fuentes de energía no renovables como el carbón o el gas natural. Estas fuentes pueden emitir gases de efecto invernadero y otros contaminantes. Por otro lado, las fuentes de energía renovables como la solar y la eólica tienen un impacto ambiental mucho menor.',
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div className="w-full max-w-screen-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Preguntas Frecuentes</h2>
      <div className="flex flex-col gap-4 w-full">
        {faqs.map((faq) => (
          <div
            key={faq.index}
            className="bg-[#e6e6e6] p-4 rounded shadow text-[#222] max-w-full">
            <div
              className="cursor-pointer flex justify-between"
              onClick={() => setOpenIndex(openIndex === faq.index ? null : faq.index)}>
              <h3 className="font-bold text-xl">{faq.question}</h3>
              <svg
                className={`transform transition-transform duration-200 ${
                  openIndex === faq.index ? "rotate-180" : ""
                }`}
                width="16"
                height="16"
                viewBox="0 0 10 6">
                <path
                  d="M0 1l5 4 5-4"
                  fill="none"
                  stroke="#000"
                  strokeWidth="2"
                />
              </svg>
            </div>
            {openIndex === faq.index && (
              <div
                className="mt-2 p-4 rounded w-full"
                dangerouslySetInnerHTML={{ __html: faq.answer }}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQ;
