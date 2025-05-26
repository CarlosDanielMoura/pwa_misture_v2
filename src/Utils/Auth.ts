const buscarResultados = async (userId: string) => {
  try {
    const response = await fetch(
      `${API_URL}/ResultadoController.php?status=1&filter=true&userId=${userId}`,
      {
        credentials: "include",
      }
    );

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar resultados:", err);
    throw err;
  }
};

export { buscarResultados };
