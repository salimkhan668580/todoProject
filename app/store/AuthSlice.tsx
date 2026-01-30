import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface CounterState {
  value: string;

}

const initialState: CounterState = {
  value: ""

};



export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {

    addUser:(state,action:PayloadAction<any>)=>{
      state.value=action.payload
    },
    ClearUser:(state)=>{
    state.value=""
    }
   
 

  },

});

export const {addUser,ClearUser} = AuthSlice.actions;



export default AuthSlice.reducer;