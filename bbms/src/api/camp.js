import { supabase } from "../lib/supabase";


export const insertCamp = async (camp) => {
    const { data, error } = await supabase
      .from('camps') // replace 'camps' with your actual table name
      .insert([camp]);
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  };