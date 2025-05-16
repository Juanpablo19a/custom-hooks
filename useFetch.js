import { useEffect, useState } from "react";

// Objeto para almacenar en caché las respuestas de las solicitudes.
const localCache = {};

export const useFetch = (url) => {
  // Estado inicial del hook, que incluye:
  // - `data`: Los datos obtenidos de la solicitud (inicia como `null`).
  // - `isLoading`: Indica si la solicitud está en proceso (inicia como `true`).
  // - `hasError`: Indica si ocurrió un error (inicia como `false`).
  // - `errorMessage`: Mensaje de error en caso de que ocurra (inicia como `null`).
  const [state, setState] = useState({
    data: null,
    isLoading: true,
    hasError: false,
    errorMessage: null,
  });

  // Efecto que se ejecuta cada vez que cambia la URL.
  useEffect(() => {
    getFetch(); // Llama a la función que realiza la solicitud.
  }, [url]); // Dependencia: se ejecuta cuando cambia `url`.

  // Función para establecer el estado en modo "cargando".
  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  // Función asíncrona que realiza la solicitud a la URL proporcionada.
  const getFetch = async () => {
    // Si la URL ya está en caché, usa los datos almacenados.
    if (localCache[url]) {
      console.log("usando cache");
      setState({
        data: localCache[url], // Obtiene los datos del caché.
        isLoading: false, // Ya no está cargando.
        hasError: false, // No hay error.
        error: null, // No hay mensaje de error.
      });
      return; // Termina la ejecución.
    }

    // Si no hay datos en caché, establece el estado en modo "cargando".
    setLoadingState();

    try {
      // Realiza la solicitud a la URL.
      const resp = await fetch(url);

      // Simula un retraso de 1 segundo para mostrar el estado de carga.
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Si la respuesta no es exitosa (código de estado no 200-299).
      if (!resp.ok) {
        setState({
          data: null, // No hay datos.
          isLoading: false, // Ya no está cargando.
          hasError: true, // Indica que hubo un error.
          error: {
            code: resp.status, // Código de error HTTP.
            message: resp.statusText, // Mensaje de error HTTP.
          },
        });
        return; // Termina la ejecución.
      }

      // Convierte la respuesta a JSON.
      const data = await resp.json();

      // Actualiza el estado con los datos obtenidos.
      setState({
        data: data, // Datos obtenidos.
        isLoading: false, // Ya no está cargando.
        hasError: false, // No hay error.
        error: null, // No hay mensaje de error.
      });

      // Almacena los datos en caché para futuras solicitudes.
      localCache[url] = data;
    } catch (error) {
      // Manejo de errores en caso de que falle la solicitud.
      setState({
        data: null, // No hay datos.
        isLoading: false, // Ya no está cargando.
        hasError: true, // Indica que hubo un error.
        errorMessage: error.message, // Mensaje del error.
      });
    }
  };

  // Retorna el estado actual del hook.
  return {
    data: state.data, // Datos obtenidos.
    isLoading: state.isLoading, // Estado de carga.
    hasError: state.hasError, // Indica si hubo un error.
  };
};
