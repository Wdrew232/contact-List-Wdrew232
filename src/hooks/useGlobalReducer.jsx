// Import necessary hooks and functions from React
import { useContext, useReducer, createContext } from "react";
import storeReducer, { initialStore } from "../store"; // ✅ Ensure correct import path

// Create a context to hold the global state of the application
// We will call this global state the "store" to avoid confusion while using local states
const StoreContext = createContext();

// Define a provider component that encapsulates the store and wraps it in a context provider
export function StoreProvider({ children }) {
    // ✅ Fix: Pass `initialStore` as an object, not a function
    const [store, dispatch] = useReducer(storeReducer, initialStore);

    // Provide the store and dispatch method to all child components
    return (
        <StoreContext.Provider value={{ store, dispatch }}>
            {children}
        </StoreContext.Provider>
    );
}

// Custom hook to access the global state and dispatch function
export default function useGlobalReducer() {
    const context = useContext(StoreContext);
    
    // ✅ Add defensive check to prevent accessing undefined context
    if (!context) {
        throw new Error("useGlobalReducer must be used within a StoreProvider");
    }

    return context;
}
