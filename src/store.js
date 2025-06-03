export const initialStore = {
  contactList: [],
  singleContact: {},
  todos: [], // Initialize todos for add_task logic
};

export default function storeReducer(store = initialStore, action = {}) {
  switch (action.type) {
    case "set-contact-list":
      return {
        ...store,
        contactList: Array.isArray(action.payload) ? action.payload : [],
      };

    case "SET_CONTACTS":
      return {
        ...store,
        contactList: Array.isArray(action.payload) ? action.payload : [],
      };
  
    case "set-single-contact":
      return {
        ...store,
        singleContact: action.payload || {},
      };

    case "add_task":
      if (!action.payload || typeof action.payload.id === "undefined" || !action.payload.color) {
        console.error("Invalid payload for add_task:", action.payload);
        return store;
      }

      return {
        ...store,
        todos: store.todos.map((todo) =>
          todo.id === action.payload.id ? { ...todo, background: action.payload.color } : todo
        ),
      };

    default:
      console.warn(`Unhandled action type: ${action.type}`);
      return store;
  }
}
