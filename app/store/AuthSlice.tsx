import {createSlice, PayloadAction} from '@reduxjs/toolkit';


interface CounterState {
  value: null

}

const initialState: CounterState = {
  value: null,

};



export const AuthSlice = createSlice({
  name: 'AuthSlice',
  initialState,
  reducers: {

    addUser:(state,action:PayloadAction<any>)=>{
      state.value=action.payload
    },
    ClearUser:(state)=>{
    state.value=null
    }
   
 

  },

});

export const {addUser,ClearUser} = AuthSlice.actions;



export default AuthSlice.reducer;