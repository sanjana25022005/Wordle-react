import { ChangeEvent, FormEvent, useState } from "react";
import { CreateGameRequest, GameCreationHandler } from "./types";

interface CreateFormProps {
  userid: string;
  createGame: GameCreationHandler;
}

export default function CreateForm({ userid, createGame }: CreateFormProps) {

  const [overwrite, setOverwrite] = useState(false); // Using boolean state for overwrite
  const [error, setError] = useState<Error | null>(null);

  // Handle radio button change
  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setOverwrite(e.target.value === 'true');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const createGameRequest: CreateGameRequest = { id: userid, overwrite: overwrite };
      await createGame(createGameRequest); // Call the createGame function with request
    } catch (err) {
      if (err instanceof Error) {
        setError(err); // Handle error and set it
      } else {
        setError(new Error("An unknown error occurred"));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Overwrite?</label>
        <div>
          <label>
            Yes
            <input
              type="radio"
              name="overwrite"
              value="true"
              checked={overwrite}
              onChange={handleRadioChange}
            />
          </label>
          <label>
            No
            <input
              type="radio"
              name="overwrite"
              value="false"
              checked={!overwrite}
              onChange={handleRadioChange}
            />
          </label>
        </div>
      </div>
      <button type="submit">Create Game!</button>
      {error && <p className="error">{error.message}</p>}
    </form>
  );
}




/*import { ChangeEvent, FormEvent, useState } from "react";
import { CreateGameRequest, GameCreationHandler } from "./types";

interface CreateFormProps {
  userid: string;
  createGame: GameCreationHandler;
}

export default function CreateForm({ userid, createGame }: CreateFormProps) {
  const [overwrite, setOverwrite] = useState(''); // Input field for overwrite status
  const [error, setError] = useState<Error | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const createGameRequest: CreateGameRequest = { 
        id: userid, 
        overwrite: overwrite.toLowerCase() === 'true' // Parse input into boolean 
      };
      await createGame(createGameRequest);
      setOverwrite(''); // Clear the input field after submission
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error("An unknown error occurred"));
      }
    }
  }

  function handleTextInputChange(e: ChangeEvent<HTMLInputElement>) {
    setOverwrite(e.target.value);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={overwrite}
        onChange={handleTextInputChange}
        placeholder="Enter true or false for overwrite"
      />
      <button type="submit">Create Game!</button>
      {error && <p className="error">{error.message}</p>}
    </form>
  );
}*/






/*import { ChangeEvent, FormEvent, useState } from "react"
import { CreateGameRequest, GameCreationHandler } from "./types";

interface CreateFormProps {
  userid: string;
  createGame: GameCreationHandler;
}

export default function CreateForm({ userid, createGame }: CreateFormProps) {

  const [overwrite, setOverwrite] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  function handleRadioChange(e: ChangeEvent<HTMLInputElement>) {
    setOverwrite(e.target.value === 'true');
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    try {
      const createGameRequest: CreateGameRequest = { id: userid, overwrite: overwrite };
      await createGame(createGameRequest);
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(Error("an unknown error occurred"));
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      Overwrite?
      <label>Yes<input type="radio" name="overwrite" value="true" checked={overwrite} onChange={handleRadioChange} /></label>
      <label>No<input type="radio" name="overwrite" value="false" checked={!overwrite} onChange={handleRadioChange} /></label>
      <button type="submit">Create Game!</button>
      {error?.message}
    </form>
  )
}
  */