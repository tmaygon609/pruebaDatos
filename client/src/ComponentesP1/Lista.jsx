import React from "react";

const Lista = () =>{

    const elementos = [
        {titulo: "Elemento 1", descripcion: "Prueba primer elemento"},
        {titulo: "Elemento 2", descripcion: "Mostarndo el segundo elemento"}
    ];

    return(
        <div className="lista">
            {elementos.map((elemento, index)=>(
                <div key={index}>
                    <h3>{elemento.titulo}</h3>
                    {elemento.descripcion}
                </div>
            ))}
        </div>
    )
};

export default Lista;