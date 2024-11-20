import { supabase } from "../lib/supabase";

import { createContext, useContext, useEffect, useState } from "react";


const AuthContext = createContext({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
});

export default function AuthProvider({ children }) {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSession = async () => {
      try {
        // fetch from data.session
        const {
          data: { session },
        } = await supabase.auth.getSession();

        session && setSession(session.access_token);
        // console.log(session.access_token);
        // console.log(session.user.id);
        setProfile(session.user);
      } catch (error) {
        console.log("Error fetching on Session ID: ", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, []);

  /*
  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();

      setSession(session);

      if (session) {
        // fetch profile
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();
        setProfile(data || null);
        console.log(profile)
      }


      setLoading(false);
    };

    // fetchSession();
    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, );
*/
  return (
    <AuthContext.Provider
      value={{ session, loading, profile, isAdmin: profile?.group === "ADMIN" }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
