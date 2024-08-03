import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";
import { Person, PersonCard } from "./CharacterList";
import { Movies } from "./Movies";

const EMPTY_PERSON: Person = {
  id: -1,
  name: "No Character Selected",
  gender: "",
  url: "",
};

const UNDEFINED_PERSON: Person = {
  id: -1,
  name: "Character Not Found",
  gender: "",
  url: "",
};

const NO_MATCH_PERSON: Person = {
  id: -1,
  name: "Exact Character Not Found",
  gender: "",
  url: "",
};

export function SearchCharacter() {
  const [name, setName] = useState<string>("");
  const [submittedName, setSubmittedName] = useState<string>("");
  const [filmUrls, setFilmUrls] = useState<string[]>([]);

  const getPeopleByName = async (name: string) => {
    setFilmUrls([]);
    const response = await axios.get(
      `https://swapi.dev/api/people?search=${name}`
    );
    const s = response.data["results"][0];
    if (s === undefined) {
      return UNDEFINED_PERSON;
    }
    // only show exact match if submitted name is in capital letters
    const allCapsRegex = /^[A-Z]+$/;
    if (allCapsRegex.test(name) && name !== s.name) {
      return NO_MATCH_PERSON;
    }
    setFilmUrls(s.films);
    return s;
  };

  const { data: person } = useQuery(
    ["person", submittedName],
    () => getPeopleByName(submittedName),
    {
      enabled: !!submittedName,
    }
  );

  const handleChange = (e: any) => {
    setName(e.target.value);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    setSubmittedName(name);
  };

  return (
    <div className="py-10 border border-white rounded-md bg-transparent p-6 my-20">
      <h2 className="text-2xl font-bold text-white">Search Characters</h2>
      <PersonCard person={person || EMPTY_PERSON} />
      <form
        id="nameForm"
        className="flex flex-col space-y-4"
        onSubmit={handleSubmit}
      >
        <label className="text-lg font-medium text-white">
          Search for a character by name:
        </label>
        <input
          type="text"
          id="name"
          name="name"
          className="border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Yoda"
          required
          onChange={handleChange}
        />
        <button
          type="submit"
          className="px-4 py-2 bg-transparent text-white rounded border border-white"
        >
          Submit
        </button>
        <Movies filmUrls={filmUrls} />
      </form>
    </div>
  );
}
