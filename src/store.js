export const initialStore = () => {
  return {
    contactList: [],
    singleContact: {},
    todos: [], // Initialize todos for add_task logic
  };
};

export default function storeReducer(store, action = {}) {
  switch (action.type) {
    case "set-contact-list":
      return {
        ...store,
        contactList: action.payload,
      };

    case "set-single-contact":
      return {
        ...store,
        singleContact: action.payload,
      };

    case "add_task":
      if (!action.payload || !action.payload.id || !action.payload.color) {
        console.error("Invalid payload for add_task");
        return store;
      }
      const { id, color } = action.payload;
      return {
        ...store,
        todos: (store.todos || []).map((todo) =>
          todo.id === id ? { ...todo, background: color } : todo
        ),
      };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return store;
  }
}
