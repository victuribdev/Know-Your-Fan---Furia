
// Funções auxiliares para manipulação de Storage
export const getPublicUrl = (bucketName: string, filePath: string) => {
  return `https://vkzbcqdjvcggscmkbldz.supabase.co/storage/v1/object/public/${bucketName}/${filePath}`;
};
