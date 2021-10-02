import { createContext, useState, useEffect } from 'react'
// importando a react-dom-router
import { BrowserRouter, Route } from 'react-router-dom';
// importando a page Home
import { Home } from "./pages/Home";
// importando a page NewRoom
import { NewRoom } from "./pages/NewRoom";
import { auth, firebase } from './services/firebase';
//importando a auth
import { AuthContextProvider } from './contexts/AuthContext';


function App() {

  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Route path="/" exact component={Home} />
        <Route path="/rooms/new" component={NewRoom} />
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
