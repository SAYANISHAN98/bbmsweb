import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"





export const useBloodStock=()=>{
    return useQuery({
        queryKey:['bloodstock'],
        queryFn:async()=>{
            const {data,error}=await supabase.from('bloodstock').select('*');
            if(error){
                console.log(error.message)
                throw new Error(error.message)

              
            }
         console.log('sss')
            return data
        }
    })
}