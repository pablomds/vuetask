import axiosInstance from "@/utils/axios";

export const getUserTodos = async () => {
    try {
        const { data: todos } = await axiosInstance.get('/todos');
        return todos
    } catch (error) {
        console.log('error on fetchUserTodos()', error)
        return error
    }
};

export const createTodo = async (data: any):Promise<number | void> => {
    try {
        const { data: todo } = await axiosInstance.post('/todos', data);
        return todo.id
    } catch (error) {
        console.log(error)
    }
}

export const updateTodo = async (data: any):Promise<void | unknown> => {
    try {
        await axiosInstance.patch('/todos/update', data)
    } catch (error) {
        return error
    }
};

export const deleteTodo = async (data: any):Promise<void> => {
    try {
        await axiosInstance.delete('/todos', {
            data: data
        })
    } catch (error) {
        console.log("error on deleteTodo()", error)
    }
};