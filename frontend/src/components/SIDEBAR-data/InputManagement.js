import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  brands: [
    { name: "Aark", checked: false },
    { name: "Archetype", checked: false },
    { name: "Astronic", checked: false },
    { name: "Autodromo", checked: false },
    { name: "AVI-8", checked: false },
    { name: "Ballast", checked: false },
    { name: "Bertucci", checked: false },
    { name: "Cadola", checked: false },
    { name: "California Watch", checked: false },
    { name: "Casio", checked: false },
    { name: "CCCP", checked: false },
    { name: "Columbia", checked: false },
    { name: "Diesel", checked: false },
    { name: "DuFa", checked: false },
    { name: "Duxot", checked: false },
    { name: "Dwiss", checked: false },
    { name: "The Electricianz", checked: false },
    { name: "Eone", checked: false },
    { name: "Fossil", checked: false },
    { name: "G-Shock", checked: false },
    { name: "Hawaiian Lifeguard", checked: false },
    { name: "Hoffman", checked: false },
    { name: "Jason Hyde", checked: false },
    { name: "Luminox", checked: false },
    { name: "Mazzucato", checked: false },
    { name: "Mondaine", checked: false },
    { name: "Nove", checked: false },
    { name: "NTH", checked: false },
    { name: "Nubeo", checked: false },
    { name: "Ocean Crawler", checked: false },
    { name: "Peacock", checked: false },
    { name: "ProTek", checked: false },
    { name: "RGMT", checked: false },
    { name: "RZE", checked: false },
    { name: "Shinola", checked: false },
    { name: "Skagen", checked: false },
    { name: "Spinnaker", checked: false },
    { name: "Szanto", checked: false },
    { name: "Thomas Earnshaw", checked: false },
    { name: "Timex", checked: false },
    { name: "TMRW", checked: false },
    { name: "Tsovet", checked: false },
    { name: "Undone", checked: false },
    { name: "Venezianico", checked: false },
    { name: "Villemont", checked: false },
    { name: "Vostok-Europe", checked: false },
    { name: "Xeric", checked: false },
    { name: "Zinvo", checked: false },
    { name: "Zodiac", checked: false },
  ],
  currentInput: [],
};

const inputSlice = createSlice({
  name: "input",
  initialState,
  reducers: {
    setInput: (state, action) => {
      const { name } = action.payload;
      const brand = state.brands.find((brand) => brand.name === name);
      if (brand) {
        brand.checked = true; // Set brand as checked
        state.currentInput.push(brand); // Add brand to currentInput
      }
    },
    removeInput: (state, action) => {
      const { name } = action.payload;
      state.currentInput = state.currentInput.filter(
        (input) => input.name !== name
      );
      const brand = state.brands.find((brand) => brand.name === name);
      if (brand) {
        brand.checked = false; // Unset brand as checked
      }
    },
  },
});

export const { setInput, removeInput } = inputSlice.actions;
export default inputSlice.reducer;
