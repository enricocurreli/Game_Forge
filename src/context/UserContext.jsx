import { createContext, useEffect, useState } from "react";
import supabase from "../database/supabase";
import routes from "../router/routes";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {


  const [user, setUser] = useState(null);
  
  const [profile, setProfile] = useState(null);

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      const { user } = session; // user fa farte di session
      await setUser(user);
      let { data: profiles} = await supabase.from("profiles").select("*").eq('id', user.id );
      await setProfile(profiles[0]);
    }

    
  };

  useEffect(() => {
    getUser();
  }, []);

  const logout = async () => {
    await supabase.auth.signOut();
    await setUser(null);
    await setProfile(null)
    

  };

  const signUp = async (newUser) => {
    await supabase.auth.signUp(newUser);
    await getUser();
  };

  const login = async (loggedUser) => {
    await supabase.auth.signInWithPassword(loggedUser);
    await getUser();
  };

  const userUpdate = async (newProfile) => {

    await supabase
    .from('profiles')
    .update(newProfile)
    .eq('id', user.id)
    .select();
    await setProfile(newProfile)
    await getUser()
    
  }
  
  const avatarUpdate = async (newFile) => {

    await supabase
    .from('profiles')
    .upsert(newFile)
    .select()
    await getUser();
  }

  return (
    <UserContext.Provider value={{ user, logout, signUp, login, profile, userUpdate, avatarUpdate }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
