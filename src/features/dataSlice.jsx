import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    projects: [], 
    clients: [], 
 
  },
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    setClients: (state, action) => {
      state.clients = action.payload;
    },
  
  },
});

export const fetchProjects = () => async (dispatch) => {
  try {
    
    const response = await axios.get(
      "https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/newproject/list/"
    );

    dispatch(setProjects(response.data));
    console.log(response)
    
  } catch (error) {
    console.log("Axios error:", error.message);
  }
};
export const fetchClients = () => async (dispatch) => {
  try {
    
    const response = await axios.get(
      "https://databankvanguard-b3d326c04ab4.herokuapp.com/indicators/client/list/"
    );

    dispatch(setClients(response.data));

    console.log(response)
  } catch (error) {
    console.log("Axios error:", error.message);
  }
};



export const {
  setProjects,
setClients,

} = dataSlice.actions;

export default dataSlice.reducer;
