import { useEffect, useReducer } from "react";
import axios from "axios";
import { Movie } from "../type";

interface State {
  data: Movie | null;
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
  | { type: ActionType.SUCCESS; payload: Movie };

const reducer = (_: State, action: Action) => {
  switch (action.type) {
    case ActionType.LOADING:
      return {
        data: null,
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

const useMovie = (id: string) => {
  const [{ data, error, loading }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    fetchMovie();
  }, []);
  const fetchMovie = async () => {
    dispatch({ type: ActionType.LOADING });
    try {
      const response = await axios.get(`http://localhost:8080/movie/${id}`);
      dispatch({ type: ActionType.SUCCESS, payload: response.data });
    } catch (error) {
      console.log(error);
      dispatch({ type: ActionType.FAILED, payload: "Something went wrong!" });
    }
  };

  return { data, error, loading };
};

export default useMovie;
