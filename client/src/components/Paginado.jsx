import React from "react";

export default function Paginado({ allDogs, paged }) {
  const numberPages = [];

  for (let i = 0; i < Math.ceil(allDogs / 8); i++) {
    numberPages.push(i + 1);
  }

  return (
    <nav>
      <ul className="">
        {numberPages?.map((nro) => {
          return (
            <li className="total-amount" key={nro}>
              <a onClick={() => paged(nro)}>{nro}</a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
