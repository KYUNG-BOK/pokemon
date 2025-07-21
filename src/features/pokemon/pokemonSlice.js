import {createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { fetchAllPokemon } from './pokemonAPI';
import { act } from 'react';

export const loadPokemon = createAsyncThunk('pokemon/load', async () =>{
    return await fetchAllPokemon();
});

const pokemonSlice = createSlice({
    name: 'pokemon',
    initialState: {
        list: [],
        status: 'idle',
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(loadPokemon.pending, (state) => {
            state.status = 'loading';
        })
        .addCase(loadPokemon.fulfilled, (state, action) => {
            console.log('로딩 성공:', action.payload);
            state.status = 'succeeded';
            state.list = action.payload;
        })  
        .addCase(loadPokemon.rejected, (state) => {
            state.status = 'failed';
        });
    },
});

export default pokemonSlice.reducer;