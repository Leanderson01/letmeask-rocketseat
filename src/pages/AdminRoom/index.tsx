import { useHistory, useParams } from 'react-router-dom';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button/index';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode/index';
// import { useAuth } from '../../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

// estilização
import '../Room/styles.scss';
import { database } from '../../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom() {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const { title, questions } = useRoom(roomId);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("Você tem certeza que deseja excluir essa pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  async function handleHighLightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <a href="#"><img src={logoImg} alt="Letmeask" /></a>
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
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

          <div className="question-list">
            {questions.map(question => {
              return (
                <Question
                  key={question.id}
                  content={question.content}
                  author={question.author}
                  isAnswered={question.isAnswered}
                  isHighlighted={question.isHighlighted}
                >
                  <div>
                    {!question.isAnswered && (
                      <>
                        <button
                          type="button"
                          onClick={() => handleCheckAsAnswered(question.id)}
                        >
                          <img src={checkImg} alt="Marcar Pergunta como Respondida" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleHighLightQuestion(question.id)}
                        >
                          <img src={answerImg} alt="Dar Destaque à Pergunta" />
                        </button>
                      </>
                    )}
                    <button
                      type="button"
                      onClick={() => handleDeleteQuestion(question.id)}
                    >
                      <img src={deleteImg} alt="Remover Pergunta" />
                    </button>
                  </div>
                </Question>
              );
            })}
          </div>
        </div>
      </main >
    </div >
  );
}