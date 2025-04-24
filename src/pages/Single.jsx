import { Link, useParams } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Single = () => {
  const { store } = useGlobalReducer();
  const { theId } = useParams();
  const singleTodo = store?.todos?.find(todo => todo.id === parseInt(theId));

  if (!store || !store.todos) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container text-center">
      {singleTodo ? (
        <>
          <h1 className="display-4">Todo: {singleTodo.title}</h1>
          <hr className="my-4" />
          <Link to="/">
            <span className="btn btn-primary btn-lg" role="button">
              Back home
            </span>
          </Link>
        </>
      ) : (
        <h1>Todo not found</h1>
      )}
    </div>
  );
};
