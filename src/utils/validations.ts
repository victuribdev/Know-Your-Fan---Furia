
/**
 * Funções de validação para o formulário de cadastro
 */

/**
 * Valida um CPF brasileiro
 * @param cpf CPF no formato 000.000.000-00 ou sem formatação
 * @returns boolean indicando se o CPF é válido
 */
export const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/[^\d]+/g, '');
  
  if (cpf.length !== 11 || 
      cpf === "00000000000" || 
      cpf === "11111111111" || 
      cpf === "22222222222" || 
      cpf === "33333333333" || 
      cpf === "44444444444" || 
      cpf === "55555555555" || 
      cpf === "66666666666" || 
      cpf === "77777777777" || 
      cpf === "88888888888" || 
      cpf === "99999999999") {
    return false;
  }
  
  // Validação do primeiro dígito
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(cpf.charAt(i)) * (10 - i);
  }
  let remainder = 11 - (sum % 11);
  let digit1 = remainder > 9 ? 0 : remainder;
  
  // Validação do segundo dígito
  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += parseInt(cpf.charAt(i)) * (11 - i);
  }
  remainder = 11 - (sum % 11);
  let digit2 = remainder > 9 ? 0 : remainder;
  
  return (parseInt(cpf.charAt(9)) === digit1 && parseInt(cpf.charAt(10)) === digit2);
};

/**
 * Valida um endereço de email
 * @param email Endereço de email
 * @returns boolean indicando se o email é válido
 */
export const validateEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Valida um número de telefone brasileiro
 * @param telefone Número de telefone com ou sem formatação
 * @returns boolean indicando se o telefone é válido
 */
export const validateTelefone = (telefone: string): boolean => {
  const tel = telefone.replace(/\D/g, '');
  return tel.length >= 10 && tel.length <= 11;
};

/**
 * Valida um CEP brasileiro
 * @param cep CEP com ou sem formatação
 * @returns boolean indicando se o CEP é válido
 */
export const validateCEP = (cep: string): boolean => {
  const cepClean = cep.replace(/\D/g, '');
  return cepClean.length === 8;
};
