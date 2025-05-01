
import { FormData, ValidationErrors } from './cadastroTypes';
import { validateCPF, validateEmail, validateTelefone, validateCEP } from './validations';

/**
 * Valida o estado atual do formulário com base na etapa atual
 * @param formData Dados do formulário
 * @param currentStep Etapa atual do formulário
 * @returns Objeto com erros de validação e booleano indicando se a etapa é válida
 */
export const validateFormStep = (formData: FormData, currentStep: number): { isValid: boolean, errors: ValidationErrors } => {
  const errors: ValidationErrors = {};
  let isValid = true;
  
  switch (currentStep) {
    case 0: // Informações Pessoais
      if (!formData.nome || formData.nome.length < 3) {
        errors.nome = "Nome deve ter pelo menos 3 caracteres";
        isValid = false;
      }
      
      if (!formData.cpf) {
        errors.cpf = "CPF é obrigatório";
        isValid = false;
      } else if (!validateCPF(formData.cpf)) {
        errors.cpf = "CPF inválido";
        isValid = false;
      }
      
      if (!formData.email) {
        errors.email = "E-mail é obrigatório";
        isValid = false;
      } else if (!validateEmail(formData.email)) {
        errors.email = "E-mail inválido";
        isValid = false;
      }
      
      if (formData.telefone && !validateTelefone(formData.telefone)) {
        errors.telefone = "Telefone inválido";
        isValid = false;
      }
      break;
    
    case 1: // Endereço
      if (!formData.enderecoRua) {
        errors.enderecoRua = "Rua é obrigatória";
        isValid = false;
      }
      
      if (!formData.enderecoNumero) {
        errors.enderecoNumero = "Número é obrigatório";
        isValid = false;
      }
      
      if (!formData.enderecoCidade) {
        errors.enderecoCidade = "Cidade é obrigatória";
        isValid = false;
      }
      
      if (!formData.enderecoEstado || formData.enderecoEstado.length !== 2) {
        errors.enderecoEstado = "Estado deve ser a sigla (ex: SP)";
        isValid = false;
      }
      
      if (!formData.enderecoCEP) {
        errors.enderecoCEP = "CEP é obrigatório";
        isValid = false;
      } else if (!validateCEP(formData.enderecoCEP)) {
        errors.enderecoCEP = "CEP inválido";
        isValid = false;
      }
      break;
    
    case 2: // Interesses
      if (formData.interesses.length === 0) {
        errors.interesses = "Selecione pelo menos um jogo";
        isValid = false;
      }
      
      if (!formData.bio || formData.bio.trim().length < 10) {
        errors.bio = "Conte um pouco mais sobre você (mínimo 10 caracteres)";
        isValid = false;
      }
      break;
    
    case 3: // Redes Sociais
      // Redes sociais são opcionais
      isValid = true;
      break;
    
    case 4: // Documentos
      if (!formData.aceitaTermos) {
        errors.aceitaTermos = "Você deve aceitar os termos";
        isValid = false;
      }
      break;
    
    default:
      isValid = false;
  }
  
  return { isValid, errors };
};
