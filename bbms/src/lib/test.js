import { supabase } from "./supabase";

const { data: { session } } = await supabase.auth.getSession();
console.log(session);
