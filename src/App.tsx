// importando a react-dom-router
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// importando a page Home
import { Home } from './pages/Home/index';
// importando a page NewRoom
import { NewRoom } from './pages/NewRoom/index';
// importando a page Room
import { Room } from './pages/Room/index';
// importando a page AdminRoom
import { AdminRoom } from './pages/AdminRoom';


//importando a auth
import { AuthContextProvider } from './contexts/AuthContext';


function App() {
  //O "exact" garante que não dê conflito em outras páginas ao acessar quando
  //tiver um "path" parecido como no ex: "path="/" | path="/rooms/new" ".
  //Porém, vão ter alguns casos que o "exact" não vai funcionar e para não
  //gerar conflito iremos importar o "Switch" do react.
  //Ele garante que assim que uma rota for satisfeita, a nossa aplicação não
  //irá ir para a próxima rota.
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/rooms/new" exact component={NewRoom} />
          <Route path="/rooms/:id" exact component={Room} />

          <Route path="/admin/rooms/:id" component={AdminRoom} />
        </Switch>
      </AuthContextProvider>
    </BrowserRouter>

  );
}

export default App;
