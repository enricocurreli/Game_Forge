import { createContext, useEffect, useState } from "react";
import supabase from "../database/supabase";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {


  const [user, setUser] = useState(null);
  
  const [profile, setProfile] = useState(null);

  const getUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (session) {
      //! Prendo l'oggetto user da session
      const { user } = session; // user fa farte di session
      await setUser(user);
      //! Recupero tutte le colonne da profiles e voglio recuperare solo le righe in cui la colonna "id" ha il valore uguale a user.id.
      let { data: profiles} = await supabase.from("profiles").select("*").eq('id', user.id );
      await setProfile(profiles[0]);
    }

    
  };

  //?	Use Effect MEMO
  //! E’ un hook di React serve a gestire gli effetti collaterali nei componenti funzionali. Un effetto collaterale può essere qualsiasi operazione che interagisce con l'esterno o modifica qualcosa al di fuori del flusso di rendering di React. Un esempio può essere una chiamata API, interagire con il DOM, eventi o listener (es. addEventListener), interazzione con il database.


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
  

  /* La funzione upsert() è una combinazione di update (aggiorna) e insert (inserisce).
   Se un record con una chiave primaria (o un vincolo univoco) uguale a quella di newFile esiste già, il record verrà aggiornato.
   Se invece non esiste, un nuovo record verrà inserito.*/

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
