import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { PersonCard } from "./CharacterList";

export function SearchCharacter() {
  const [name, setName] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");

  const getPeopleByName = async (name: string) => {
    const response = await axios.get(
      `https://swapi.dev/api/people?search=${name}`
    );
    const s = response.data["results"][0];
    console.log(s);
    return s;
  };

  const {
    data: person,
    isLoading,
    isError,
  } = useQuery(
    ["person", submittedName],
    () => getPeopleByName(submittedName),
    {
      enabled: !!submittedName,
    }
  );

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
  };
  return (
    <div className="bg-transparent p-6 rounded-lg shadow-lg">
      <form
        id="nameForm"
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="text-lg font-medium text-gray-700">
          Enter character name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 p-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Yoda"
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          className="bg-transparent border border-white text-white p-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Submit
        </button>
      </form>
      <PersonCard person={person} />
    </div>
  );
}
