import { FormEvent, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';

import logoImg from "../assets/images/logo.svg"

import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import { useAuth } from '../hooks/useAuth';
import { database } from '../services/firebase';

// estilização
import '../styles/room.scss';

type FirebaseQuestions = Record<string, {
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}>

type Question = {
  id: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  isAnswered: boolean,
  isHighlighted: boolean
}

type RoomParams = {
  id: string;
}

export function Room() {
  const { user } = useAuth();
  const params = useParams<RoomParams>();
  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [title, setTitle] = useState('');

  const roomId = params.id;

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on('value', room => {
      const databaseRoom = room.val();
      const FirebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
      const parsedQuestions = Object.entries(FirebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isHighlighted,
          isAnswered: value.isAnswered
        }
      });

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)
    })
  }, [roomId]);

  async function handleCreateNewQuestion(event: FormEvent) {
    event.preventDefault();
    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      toast.error("Você precisa fazer login!")
    }

    const question = {
      content: newQuestion,
      author: {
        name: user?.name,
        avatar: user?.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    }

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion('');
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>
      {/* separator */}

      <main>
        <div className="container">
          <div className="room-title">
            <h1>Sala {title}</h1>
            {/* Como aqui não vou utilizar um else, posso substituir "? :" por
              "&&"
            */}
            {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
          </div>
          {/* separator */}

          <form onSubmit={handleCreateNewQuestion}>
            <textarea
              placeholder="O que você quer perguntar?"
              onChange={event => setNewQuestion(event.target.value)}
              value={newQuestion}
            />
            {/* separator */}

            <div className="form-footer">
              {user ? (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              ) : (
                <span>
                  Para enviar uma pergunta, <button>faça seu login</button>
                </span>
              )}

              {/* separator */}
              <div className="submitButton">
                <Button type="submit" disabled={!user}>Enviar sua Pergunta</Button>
              </div>

            </div>
          </form>

          {JSON.stringify(questions)}
        </div>
      </main>
    </div>
  );
}