export interface PessoaInterface {
  nome: string;

  reservarSala(): string;
}

export interface SalaInterface {
  reserva(responsavel: string): string;
}
