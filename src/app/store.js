import {configureStore} from '@reduxjs/toolkit'
import taskReducer from '../app/features/tasks/taskSlice'



export const  store = configureStore({

    reducer: {
        task:  taskReducer
    }

})
