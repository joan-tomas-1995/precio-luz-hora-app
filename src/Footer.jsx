import React from "react";

const Footer = () => {
  return (
    <div className="flex flex-col w-full h-[10vh] justify-center items-center text-xs">
      <p className="text-center text-[#444] m-2">
        Los datos mostrados son extraidos de la API de{" "}
        <a
          className="text-blue-600 hover:underline"
          href="https://www.ree.es/es/apidatos"
          target="_blank">
          Red Electrica Española
        </a>
      </p>

      <p className="text-center text-[#444]">
        Web creada por{" "}
        <a
          className="text-blue-600 hover:underline"
          href="https://joantomasmiralles.es/ "
          target="_blank">
          Joan Tomás
        </a>
      </p>
    </div>
  );
};

export default Footer;
