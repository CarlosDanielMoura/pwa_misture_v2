const buscarResultados = async (userId: string) => {
  const BACKEND_URL = "https://mistureapp.com.br";
  const urlOriginal = `${BACKEND_URL}/controller/ResultadoController.php?status=1&filter=true&userId=${userId}`;
  const proxyUrl = `${BACKEND_URL}/proxy.php?url=${encodeURIComponent(urlOriginal)}`;

  try {
    const response = await fetch(proxyUrl, {
      credentials: "include", // pode remover se não usar cookies
    });

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar resultados via proxy:", err);
    throw err;
  }
};

export { buscarResultados };
