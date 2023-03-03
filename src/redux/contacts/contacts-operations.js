import { createAsyncThunk } from "@reduxjs/toolkit";

import * as api from "../../components/Api";

export const fetchContacts = createAsyncThunk(
    "contacts/fetchAll",
    async(_, thunkAPI) => {
        try {
            const data = await api.getAllContacts();
            return data;
        }
        catch({response}) {
            return thunkAPI.rejectWithValue(response.data);
        }
    }
)

export const addContact = createAsyncThunk(
    "contacts/addContact",
    async(data, {rejectWithValue}) => {
        try {
            const result = await api.handleAddContact(data);
            return result;
        }
        catch({response}) {
            return rejectWithValue(response.data);
        }
    },
    {
            condition: ({name}, {getState}) => {
            const {contacts} = getState();
           const normalizedName = name.toLowerCase();
            const result = contacts.items.find(({name }) => {
                return name.toLowerCase() === normalizedName;
            })
            if(result){
                alert(`Contact is already ixist`);
                return false;
            }
        }
    }
)

export const deleteContact = createAsyncThunk(
    "contacts/deleteContact",
    async(id, {rejectWithValue}) => {
        try {
            await api.handleDeleteContact(id);
            return id;
        }
        catch({response}) {
            return rejectWithValue(response.data);
        }
    }
)