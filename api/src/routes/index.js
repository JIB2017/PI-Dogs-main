const { Router } = require("express");
const axios = require("axios");
const { Dog, Temperament } = require("../db");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();
const { API_KEY } = process.env.REACT_APP_API_KEY;
const URL = process.env.URL;
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

// este va para el 1° y para el 2°
router.get("/dogs", async (request, response, next) => {
  try {
    // me guardo la query
    const name = request.query.name;
    // me guardo la funcion final, creo que esta es una manera de hacerlo, podría invocarla mas tarde. Creo que lo hago para poder filtrarlo
    // mas fácilmente
    const allDogs = await getAll();
    // verifico si la query pasada existe dentro de mi api
    if (name) {
      const dogName = await allDogs.filter((n) =>
        n.name.toLowerCase().includes(name.toLowerCase())
      );
      // pregunto si existe la query solicitada
      if (dogName) {
        response.status(200).send(dogName);
      } else {
        response.status(404).send("No se encontró nada");
      }
      // si no existe simplemente mando a todos los perros de la api
    } else {
      response.status(200).send(allDogs);
    }
  } catch (error) {
    next(error);
  }
});

router.get("/dogs/:id", async (request, response, next) => {
  try {
    // me guardo la query id
    const id = request.params.id;
    // me guardo la funcion final, creo que esta es una manera de hacerlo, podría invocarla mas tarde. Creo que lo hago para poder filtrarlo
    // mas fácilmente
    const allDogs = await getAll();
    // verifico si la query pasada existe dentro de mi api
    if (id) {
      const breedById = await allDogs.filter((n) => n.id == id);
      // pregunto si la query solicitada es válida
      if (breedById) {
        response.status(200).send(breedById);
      } else {
        response.status(404).send("No se encontró nada");
      }
      // si no existe simplemente mando a todos los perros de la api
    }
  } catch (error) {
    next(error);
  }
});

router.get("/temperament", async (request, response, next) => {
  try {
    // const allDogs = await getAll()
    // const temperament = await allDogs.filter()
    const apiInfo = await axios.get("https://api.thedogapi.com/v1/breeds", {
      headers: { "x-api.key": `${API_KEY}` },
    });
    // const temps = apiInfo.data.map((info) => info.temperament);
    // temps.map((el) => el.split(", "));

    // const temp = await Temperament.findOrCreate(temp)
    // response.send(temp);
    const temperament = apiInfo.data.map((element) => element.temperament);
    let temperaments = temperament
      .toString()
      .trim()
      .split(/\s*,\s*/);
    let splittemperament = temperaments.filter((word) => word.length > 0);
    splittemperament.forEach((element) => {
      Temperament.findOrCreate({
        where: { name: element },
      });
    });
    const allTemperaments = await Temperament.findAll();
    response.send(allTemperaments);
  } catch (error) {
    next(error);
  }
});

router.post("/dog", async (request, response, next) => {
  try {
    // agrego los parámetros que quiero recibir por body
    let { name, height, weight, life_span, image, temperaments } = request.body;

    // creo al perro sin su temperamento porque lo tengo que buscar en su table intermedia...
    let dogCreated = await Dog.create({
      name,
      height,
      weight,
      life_span,
      image,
    });
    console.log(temperaments);

    //busco los temperamentos que se me pasaron por body
    let dogTemperament = await Temperament.findAll({
      where: { name: temperaments },
    });
    // agrego los temperamentos al perro creado ;)
    dogCreated.addTemperament(dogTemperament);
  } catch (error) {
    next(error);
  }
  response.status(200).send("Perro creado exitosamente");
});

// Pido información de la Api
const getApiInfo = async () => {
  // Accedo a la api con su header como me piden desde dog
  const apiInfo = await axios.get(`${URL}`);
  // Y lo mapeo con los datos que quiero
  const apiDog = await apiInfo.data.map((info) => {
    return {
      id: info.id,
      name: info.name,
      height: info.height.metric,
      weight: info.weight.metric,
      life_span: info.life_span,
      temperament: info.temperament ? info.temperament : "Adventurous",
      origin: info.origin,
      image: info.image.url,
    };
  });
  console.log(apiDog);
  return apiDog;
};

// Pido información de la base de datos para la tabla intermedia
const getDbInfo = async () => {
  return await Dog.findAll({
    include: {
      model: Temperament,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });
};

// Concateno a ambas
const getAll = async () => {
  const apiInfo = await getApiInfo();
  const dbInfo = await getDbInfo();
  const apiDb = dbInfo.concat(apiInfo);
  return apiDb;
};

module.exports = router;
