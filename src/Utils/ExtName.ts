const nomes = [
  "Milho_Syn Supremo VIP3",
  "Milho_P30F80",
  "Arroz_resistente a quizalofop",
  "Soja_STS",
  "Feijão-mungo-verde",
  "glyphosate_isopropylammonium",
];

function extrairPrimeiroNome(nome: string): string {
  const partes = nome.split(/[\s_-]/);
  return partes[0];
}

export { extrairPrimeiroNome };
