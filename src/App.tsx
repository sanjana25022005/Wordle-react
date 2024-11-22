import { useState } from 'react'; // React and useState for component state management
import GuessForm from './GuessForm'; // Custom form for guessing the word
import CreateForm from './CreateForm'; // Form for creating a new game
import RegistrationForm from './RegistrationForm'; // Form for user registration
import './App.css'; // CSS styling

// Type definitions
import {
  Attempt,
  CreateGameResponse,
  GameCreationHandler,
  GuessHandler,
  GuessResponse,
  RegisterResponse,
  RegistrationHandler,
} from './types';



function Header({ title }: { title: string }) {
  return <h1>{title}</h1>;
}

function AttemptHistory({ attempts }: { attempts: Array<Attempt> }) {
  return (
    <ol>
      {attempts.map((attempt) => (
        <li key={attempt.guess}>
          {attempt.guess} {attempt.feedback}
        </li>
      ))}
    </ol>
  );
}

function App() {
  const [userid, setUserid] = useState('');
  const [attempts, setAttempts] = useState<Array<Attempt>>([]);
  const [registered, setRegistered] = useState(false);
  const [created, setCreated] = useState(false);


  function resetAttempts() {
    setAttempts([]);
  }


  const submitGuess: GuessHandler = async (guess) => {
    const response = await fetch('https://we6.talentsprint.com/wordle/game/guess', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',

      },
      body: JSON.stringify({
        id: userid,
        guess: guess,
      }),
      mode: 'cors',
      credentials: 'include'
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit guess');
    }
  
    const data: GuessResponse = await response.json();
    setAttempts([...attempts, { guess: guess, feedback: data.feedback }]);
    return data;
  };
  

  const register: RegistrationHandler = async (username) => {
    const response = await fetch('https://we6.talentsprint.com/wordle/game/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      
      },
      body: JSON.stringify({
        mode: 'wordle',
        name: username,
      }),
      mode: 'cors',
      credentials: 'include'
    });
  
    if (!response.ok) {
      throw new Error('Failed to register');
    }
  
    const data: RegisterResponse = await response.json();
    setRegistered(true);
    setUserid(data.id); // Save the returned user ID
    resetAttempts();
    return data;
  };

 

  const createGame: GameCreationHandler = async (createGameRequest) => {
    const response = await fetch('https://we6.talentsprint.com/wordle/game/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
  
      },
      body: JSON.stringify(createGameRequest),
      mode: 'cors',
      credentials: 'include'
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      //console.log(response.json());
      throw new Error(errorData.message || 'Failed to create game');
  
    }
  
    const data: CreateGameResponse = await response.json();
    setCreated(true);
    resetAttempts();
    return data;
  };
  

  return (
    <div>
      <Header title="Wordle" />
      <AttemptHistory attempts={attempts} />
      <Header title={registered ? 'Create a New Game' : 'Register Yourself'} />
      {registered ? (
        <CreateForm userid={userid} createGame={createGame} />
      ) : (
        <RegistrationForm register={register} setUserid={setUserid} />
      )}
      {created ? (
        <GuessForm submitGuess={submitGuess} />
      ) : registered ? (
        'Create a game first'
      ) : (
        'Register first'
      )}
    </div>
  );
}

export default App;






/*import { useState } from 'react'
import GuessForm from './GuessForm'
import './App.css'
import { Attempt, CreateGameResponse, GameCreationHandler, GuessHandler, GuessResponse, RegisterResponse, RegistrationHandler } from './types'
import registerResponse from './register_response.json'
import createResponse from './create_response.json'
import guessResponses from './guess_responses.json'
import CreateForm from './CreateForm'
import RegistrationForm from './RegistrationForm'

function Header({ title }: { title: string }) {
  return (<h1>{title}</h1>);
}
function AttemptHistory({ attempts }: { attempts: Array<Attempt> }) {
  return (
    <ol>
      {
        attempts.map((attempt) => (<li key={attempt.guess}> {attempt.guess} {attempt.feedback} </li>))
        //equivalent to probably in the Python world
        //<li key={attempt.guess}> {attempt.guess} {attempt.feedback} for attempt in attempts </li>
      }
    </ol>
  )
}

function App() {
  const [userid, setUserid] = useState('');
  const [attempts, setAttempts] = useState<Array<Attempt>>([]);
  const [registered, setRegistered] = useState(false);
  const [created, setCreated] = useState(false);
  const mockRegisterResponse: RegisterResponse = registerResponse;
  const mockCreateResponse: CreateGameResponse = createResponse;
  const mockGuessResponses: GuessResponse[] = guessResponses;

  function resetAttempts() {
    setAttempts([]);
  }
  
  const submitGuess: GuessHandler = (guess) => {

    const serverResponse = mockGuessResponses[attempts.length];
    setAttempts([...attempts, {guess: guess, feedback: serverResponse.feedback}]);
    //equivalent to
    //var attemptCopy;
    //i = 0;
    //for(i = 0; i < attempts.length; i++) {
    // attemptCopy[i] = attempts[i];
    //}
    //attemptCopy[i] = {guess: guess, feedback: serverResponse.feedback};
    //setAttempts(attemptCopy);

    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(serverResponse);
      }, 200);
    });
  }

  const register: RegistrationHandler = (username) => {
    console.log(username);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockRegisterResponse);
      }, 200);
      setRegistered(true);
      resetAttempts();
    })
  }

  const createGame: GameCreationHandler = (createGameRequest) => {
    console.log(createGameRequest);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockCreateResponse);
      }, 200);
      setCreated(true);
      resetAttempts();
    })
  }


  return (
    <div>
      <Header title="Wordle" />
      <AttemptHistory attempts={attempts} />
      <Header title={registered ? "Create a New Game" : "Register Yourself"} />
      {
        registered ? 
        <CreateForm userid={userid} createGame={createGame} /> :
        <RegistrationForm register={register} setUserid={setUserid} />
      }

      {
        created ?
        <GuessForm submitGuess={submitGuess} /> :
        registered ?
        "Create a game first" :
        "Register first"
      }
      
    </div>
  )
}

export default App*/
