import React, { useContext } from 'react';
import { Context } from "../store/appContext";
import { AddTask } from '../component/AddTask';

export const TodoList = () => {

    const { store, actions } = useContext(Context)

    console.log(store);

    return (
        <main>
            <h1>TodoList</h1>
            <AddTask />
            <ul>
                {
                    store.tasks.map((item) => (
                        <li key={item.id}>
                            {item.label}
                            <i onClick={() => actions.deleteTask(item.id)} className='fa fa-trash ms-5'></i>
                        </li>
                    ))
                }
            </ul>
        </main>
    )
}