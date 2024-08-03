import axios from "axios";
import { useState } from "react";
import { useQuery } from "react-query";

export interface Film {
  title: string;
  director: string;
  release_date: string;
  url: string;
}

export function Movies({ filmUrls }: { filmUrls: string[] }) {
  const [films, setFilms] = useState<Film[]>([]);
  const getFilmsByUrls = async (filmUrls: string[]) => {
    setFilms([]);
    return filmUrls.map(async (filmUrl: string) => {
      const response = await axios.get(filmUrl);
      setFilms((prevFilms) => [...prevFilms, response.data]);
    });
  };
  useQuery(["films", filmUrls], () => getFilmsByUrls(filmUrls));
  if (filmUrls.length == 0) {
    return (
      <div className="py-10 border border-white rounded-md bg-transparent p-6 my-20">
        <h2 className="text-2xl font-bold text-white">Movies</h2>
        <br />
        <p>
          List of movies the searched character is in will be displayed here.
        </p>
      </div>
    );
  }
  return (
    <div className="py-10 border border-white rounded-md bg-transparent p-6 my-20">
      <h2 className="text-2xl font-bold text-white">Movies</h2>
      <br />
      {films.map((film: Film, keyId: number) => (
        <div key={keyId}>{film.title}</div>
      ))}
    </div>
  );
}
