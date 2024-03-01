import { useEffect } from "react";
import Header from "./Header";
import Main from "./components/Main";
import { useReducer } from "react";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./components/StartScreen";
import Question from "./components/Question";

// Lembrando que aqui é um objeto com várias propriedades
// Cada vez que eu precisar de um state, eu o adiciono aqui.
const initialState = {
  questions: [],

  // Status que a nossa aplicação pode ter:
  // 'loading', 'error', 'ready', 'active', 'finished'
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
};

// Temos que passar também o status para essa função/switch case
function reducer(state, action) {
  switch (action.type) {
    case "dataReceived":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      };
    default:
      throw new Error("Action unknown");
  }
}

export default function App() {
  // Destructuring facilitará a renderização condicional no Main
  const [{ questions, status, index, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );

  // Vamos passar a quantidade de perguntas na forma de variável em vez do array inteiro.
  const numQuestions = questions.length;

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("http://localhost:8000/questions");
        const data = await response.json();
        console.log(data);
        // Precisamos despachar esses dados para a action/switch case.
        dispatch({ type: "dataReceived", payload: data });
      } catch (error) {
        dispatch({ type: "dataFailed" });
      }
    }
    fetchData();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "active" && (
          <Question
            question={questions[index]}
            dispatch={dispatch}
            answer={answer}
          />
        )}
      </Main>
    </div>
  );
}
