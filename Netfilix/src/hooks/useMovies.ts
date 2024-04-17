import { useEffect, useReducer, useState } from "react";
import axios from "axios";
import { Movie } from "../type";

interface State {
  data: Movie[] | null;
  error: string | null;
  loading: boolean;
}
const initialState: State = {
  data: null,
  error: null,
  loading: false,
};

enum ActionType {
  LOADING,
  FAILED,
  SUCCESS,
}

type Action =
  | { type: ActionType.LOADING }
  | { type: ActionType.FAILED; payload: string }
  | { type: ActionType.SUCCESS; payload: Movie[] };

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        ...state,
        error: null,
        loading: true,
      };
    case ActionType.FAILED:
      return {
        data: null,
        error: action.payload,
        loading: false,
      };
    case ActionType.SUCCESS:
      return {
        data: action.payload,
        error: null,
        loading: false,
      };
    default:
      return initialState;
  }
};

const useMovies = (offset: number) => {
  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    fetchMovieLists();
  }, [offset]);

  const fetchMovieLists = async () => {
    if (count && data && data.length >= count) return;
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(
        `http://localhost:8080/movies/list?offset=${offset}`
      );
      console.log(response);
      const respondData = data
        ? [...data, ...response.data.movies]
        : response.data.movies;
      setCount(response.data.count);
      console.log("offset: ", offset);
      dispatch({ type: ActionType.SUCCESS, payload: respondData });
    } catch (error) {
      console.log(error);
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong!" });
    }
  };

  return { data, error, loading };
};

export default useMovies;
