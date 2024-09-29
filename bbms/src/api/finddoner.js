
import { useQuery } from "@tanstack/react-query"
import { supabase } from '../lib/supabase';

export const useDonors = (filters) => {
    return useQuery({
        queryKey: ['donors', filters], // Keep the query key as is
        queryFn: async () => {
            const { bloodGroup, donationDate, name } = filters;

            // Build the query
            let query = supabase.from('profiles').select('*');

            if (bloodGroup) {
                query = query.eq('blood_type', bloodGroup);
            }

            if (donationDate) {
                query = query.eq('last_donation_date', donationDate);
            }

            if (name) {
                query = query.ilike('f_name', `%${name}%`); // Case-insensitive search
            }

            const { data, error } = await query;

            if (error) {
                throw new Error(error.message);
            }

            return data;
        }
    });
};