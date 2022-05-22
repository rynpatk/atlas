import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Text } from '@chakra-ui/react';
import supabase from 'supabase';

import { Main, Login } from 'pages';

// development notes:
// supabase portal (development): https://app.supabase.io/project/zvwrqklvkomshwpkxepe
// github repo: https://github.com/rynpatk/atlas
// `npm run deploy` builds and deploys app to gh-pages
// currently deployed at: https://rynpatk.github.io/atlas/

const App = () => {
  const [user, setUser] = useState(null);
  const isAuthenticated = Boolean(user);

  useEffect(() => {
    const session = supabase.auth.session();
    setUser(session?.user ?? null);

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_, session) => {
        const currentUser = session?.user;
        setUser(currentUser ?? null);
      },
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, [user]);

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          exact
          path='/'
          element={isAuthenticated ? <Main user={user} /> : <Login />}
        />
        <Route element={<Text>Oops!</Text>} status={404} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
