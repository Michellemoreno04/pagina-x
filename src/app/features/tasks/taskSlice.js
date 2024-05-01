import { createSlice } from "@reduxjs/toolkit";


const inicialState = [



]


// esto funciona como un usestate
export  const taskSlice = createSlice({ 

    name: 'tasks',
    initialState: inicialState, // estado
    reducers : { // aqui se crear funciones para actualizar el estado (son funciones que especifican cómo cambia el estado de tu aplicación)

// aqui se pueden hacer las funciones para actualizar el estado (inicialState)
addTask:(state,action) => {     //esto puede ser llamado desde cualquier lado de la aplicacion
   //console.log(state,action.payload)//(action es donde viene la info de otro componente)

},

addLinks: (state,action)=>{
    // console.log(state,action.payload)
}


    }
})

export const {addTask,addLinks} = taskSlice.actions //aqui se exportan las funciones desde taskSlice
export default taskSlice.reducer