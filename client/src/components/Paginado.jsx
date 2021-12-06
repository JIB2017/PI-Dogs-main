import React from "react";
import estilos from "./paginado.module.css"

export default function Paginado({ allDogs, paged, page }) {
  const numberPages = [];

  for (let i = 0; i < Math.ceil(allDogs / 8); i++) {
    numberPages.push(i + 1);
  }

  return (
    <nav>
      <>
        {numberPages?.map((nro) => {
          return (
            <li className={estilos.pagination} key={nro}>
              {page === nro ? <a className={estilos.active} onClick={() => paged(nro)}  >{ nro }</a> : <a onClick={() => paged(nro)}  >{ nro }</a>}
            </li>
          );
        })}
      </>
    </nav>
  );
}
