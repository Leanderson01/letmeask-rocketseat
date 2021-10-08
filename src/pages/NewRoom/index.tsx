import { Link, useHistory } from 'react-router-dom';
import { FormEvent, useState } from 'react'

import illustrationImg from "../../assets/images/illustration.svg"
import logoImg from "../../assets/images/logo.svg"
import { Button } from "../../components/Button/index";
import { useAuth } from '../../hooks/useAuth';
//  importando o firebase
import { database } from '../../services/firebase';


// webpack, snowpack...

// importando a estilização da minha NewRoom
import '../NewRoom/styles.scss';


export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();
    console.log(newRoom);

    if (newRoom.trim() === '') {
      return;
    }

    const roomRef = database.ref('rooms')
    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)
  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustrationImg} alt="Imagem ilustrando perguntas e respostas" />
        <strong>Toda pergunta tem uma resposta.</strong>
        <p>
          Aprenda e compartilhe conhecimento
          com outras pessoas
        </p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logoImg} alt="letmeask" />
          <img className="user-avatar" src={user?.avatar} alt="user-avatar" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={event => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">
              Criar sala
            </Button>
          </form>
          <p>
            Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  )
}