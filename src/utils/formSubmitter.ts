
import { supabase } from "@/integrations/supabase/client";
import { FormData } from "./cadastroTypes";
import { gamesList } from "./cadastroTypes";

/**
 * Submete o formulário para o Supabase
 * @param formData Dados do formulário
 * @param uploadedDocumentFile Arquivo de documento opcional
 * @returns Promise<void>
 */
export const submitForm = async (formData: FormData, uploadedDocumentFile: File | null): Promise<void> => {
  // Verify if user is authenticated
  const { data: sessionData } = await supabase.auth.getSession();
  
  if (!sessionData.session) {
    // No session, register user first
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: `${formData.cpf.replace(/\D/g, '')}${formData.nome.charAt(0).toUpperCase()}`, // Simple password generation
      options: {
        data: {
          full_name: formData.nome,
        }
      }
    });
    
    if (authError) throw new Error(authError.message);
    if (!authData.user) throw new Error("Falha ao criar usuário");
    
    // Update user profile
    await supabase
      .from('user_profiles')
      .update({ 
        full_name: formData.nome,
        cpf: formData.cpf
      })
      .eq('id', authData.user.id);
      
    // Create user address
    await supabase.from('user_addresses').insert({
      user_id: authData.user.id,
      street: formData.enderecoRua,
      number: formData.enderecoNumero,
      neighborhood: formData.enderecoBairro || null,
      city: formData.enderecoCidade,
      state: formData.enderecoEstado,
      postal_code: formData.enderecoCEP
    });
    
    // Add game interests
    for (const gameId of formData.interesses) {
      const { data: gameData } = await supabase
        .from('games')
        .select('id')
        .eq('name', gamesList.find(game => game.id === gameId)?.name)
        .single();
        
      if (gameData) {
        await supabase.from('user_games').insert({
          user_id: authData.user.id,
          game_id: gameData.id
        });
      }
    }
    
    // Add social media
    const socialMediaEntries = [
      { platform: 'twitter', username: formData.twitter },
      { platform: 'instagram', username: formData.instagram },
      { platform: 'facebook', username: formData.facebook },
      { platform: 'tiktok', username: formData.tiktok }
    ].filter(entry => entry.username);
    
    for (const entry of socialMediaEntries) {
      if (entry.username) {
        await supabase.from('user_social_media').insert({
          user_id: authData.user.id,
          platform: entry.platform,
          username: entry.username
        });
      }
    }
    
    // Add gaming profile if provided
    if (formData.perfilFuria) {
      await supabase.from('user_gaming_profiles').insert({
        user_id: authData.user.id,
        platform: 'FURIA',
        username: formData.perfilFuria.split('/').pop() || formData.perfilFuria,
        profile_url: formData.perfilFuria
      });
    }
    
    // Upload document if provided
    if (uploadedDocumentFile) {
      const fileExt = uploadedDocumentFile.name.split('.').pop();
      const filePath = `${authData.user.id}/${Date.now()}.${fileExt}`;
      
      const { error: uploadError } = await supabase.storage
        .from('user-documents')
        .upload(filePath, uploadedDocumentFile);
        
      if (uploadError) throw new Error(uploadError.message);
      
      // Add document record
      await supabase.from('user_documents').insert({
        user_id: authData.user.id,
        document_type: 'ID',
        file_path: filePath
      });
    }
  }
};
