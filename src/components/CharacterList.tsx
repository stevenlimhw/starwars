import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export interface Person {
  id: number;
  name: string;
  gender: string;
  url: string;
}
const ITEMS_PER_PAGE = 10;

export function CharacterList() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getPeopleByPage = async (page: number, limit: number) => {
    const response = await axios.get(
      `https://swapi.dev/api/people?page=${page}&limit=${limit}`
    );
    console.log(response);
    return response.data["results"];
  };

  const {
    data: people = [],
    isLoading,
    isError,
  } = useQuery(
    ["people", currentPage],
    () => getPeopleByPage(currentPage, ITEMS_PER_PAGE),
    {
      keepPreviousData: true,
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <h1>Star Wars</h1>
      <div className="card">
        <section>
          <h2 className="text-2xl font-bold text-white">Characters</h2>
          {people.map((person: Person, keyId: number) => (
            <PersonCard key={keyId} person={person} />
          ))}
          <div className="flex justify-center mt-4">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-transparent text-white rounded mr-2"
            >
              Previous
            </button>
            <span className="px-4 py-2">{currentPage}</span>
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={people.length < ITEMS_PER_PAGE}
              className="px-4 py-2 bg-transparent text-white rounded ml-2"
            >
              Next
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}

export const PersonCard = ({ person }: { person: Person }) => {
  return (
    <div className="max-w-sm mx-auto border border-white rounded-lg overflow-hidden my-3 w-[90vw]">
      <div className="px-6 py-4 flex justify-between">
        <div className="font-bold text-xl mb-2">{person.name}</div>
        <p className="text-white-700 text-base">{person.gender}</p>
      </div>
    </div>
  );
};
