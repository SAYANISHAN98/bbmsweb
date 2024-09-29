import { useQuery } from "@tanstack/react-query"
import { supabase } from "../lib/supabase"





export const useProfiles=()=>{
    return useQuery({
        queryKey:['profiles'],
        queryFn:async()=>{
            const {data,error}=await supabase.from('profiles').select('*');
            if(error){
                console.log(error.message)
                throw new Error(error.message)

              
            }
         console.log('sss')
            return data
        }
    })
}


export const useProfilesid = (id) => {
    return useQuery({
        queryKey: ['profiles', id], // Use id in the query key to refetch when id changes
        queryFn: async () => {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', id) // Filter by the provided id
                .single(); // Use single to get only one result

            if (error) {
                console.error(error.message);
                throw new Error(error.message);
            }

            return data; // Return the fetched profile data
        },
        enabled: !!id // Only run the query if id is defined
    });
};
