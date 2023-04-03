import React, {createContext, useContext, useState, useEffect, useReducer} from "react";
import axios from "axios";

// Initial State
const initialState = {
    user: null,
    fetchingUser: true,
}

// Reducer
const globalReducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.payload,
                fetchingUser: false
            }
        case "RESET_USER":
            return {
                 ...state,
                user: null,
                fetchingUser: false
            }
        default:
            return state;
    }
}

// create context
export const GlobalContext = createContext(initialState);

// create provider
export const GlobalProvider = (props) => {
    const [state, dispatch] = useReducer(globalReducer, initialState);

    useEffect(()=>{
        getCurrentUser();
    }, [])

    // action get current user
    const getCurrentUser = async () => {
        try {
            const res = await axios.get("http://localhost:5001/api/auth/current", { withCredentials: true });

            if (res.data) {
                dispatch({type: "SET_USER", payload: res.data});
            } else {
                dispatch({type: "RESET_USER"})
            }
        } catch (err) {
            console.log(err)
        }
    }

    const value = {
        ...state,
        getCurrentUser,
    }

    return (
        <GlobalContext.Provider value={value}>
            {
                props.children
            }
        </GlobalContext.Provider>
    )
}

export function useGlobalContext() {
    return useContext(GlobalContext);
}

