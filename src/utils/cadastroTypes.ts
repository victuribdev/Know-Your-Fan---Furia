
import { gameAssets } from './gameAssets';

// Lista de jogos com imagens oficiais
export const gamesList = [
  { id: 1, name: "Counter-Strike 2", image: gameAssets["Counter-Strike 2"] },
  { id: 2, name: "League of Legends", image: gameAssets["League of Legends"] },
  { id: 3, name: "Valorant", image: gameAssets["Valorant"] },
  { id: 4, name: "Free Fire", image: gameAssets["Free Fire"] },
  { id: 5, name: "Rainbow Six Siege", image: gameAssets["Rainbow Six Siege"] },
  { id: 6, name: "Apex Legends", image: gameAssets["Apex Legends"] },
];

export interface FormData {
  nome: string;
  cpf: string;
  email: string;
  telefone: string;
  enderecoRua: string;
  enderecoNumero: string;
  enderecoBairro: string;
  enderecoCidade: string;
  enderecoEstado: string;
  enderecoCEP: string;
  interesses: number[];
  bio: string;
  twitter: string;
  instagram: string;
  facebook: string;
  tiktok: string;
  perfilFuria: string;
  aceitaTermos: boolean;
}

export interface ValidationErrors {
  nome?: string;
  cpf?: string;
  email?: string;
  telefone?: string;
  enderecoRua?: string;
  enderecoNumero?: string;
  enderecoCidade?: string;
  enderecoEstado?: string;
  enderecoCEP?: string;
  interesses?: string;
  bio?: string;
  aceitaTermos?: string;
}

export interface Game {
  id: number;
  name: string;
  image: string;
}
