import { defineStore } from 'pinia';

interface Todo {
  task: string;
  id: number;
  is_finished: boolean;
  updated_at: string; 
  created_at: string;
}

type FilterType = 'all' | 'finished' | 'unfinished';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as FilterType,
    nextId: 0,
  }),
  getters: {
    finishedTodos: (state): Todo[] => state.todos.filter(todo => todo.is_finished),
    unfinishedTodos: (state): Todo[] => state.todos.filter(todo => !todo.is_finished),
    filteredTodos(): Todo[] {
      if (this.filter === 'finished') {
        return this.finishedTodos;
      } else if (this.filter === 'unfinished') {
        return this.unfinishedTodos;
      }
      return this.todos;
    },
  },
  actions: {
    addTodos(todoList: Todo[]):void {
      this.todos = todoList;
    },
    addTodo({ id, task } : { id: number, task: string }): void {
      this.todos.push({ task, id, is_finished: false, updated_at: new Date().toISOString(), created_at: new Date().toISOString() });
    },
    updateTodo({ id, task } : { id: number, task: string }): void {
      this.todos = this.todos.map(todo => 
        todo.id === id ? { ...todo, task, updated_at: new Date().toISOString() } : todo
      );
    },
    updateTodoIsFinished(id: number, is_finished: boolean) {
      this.todos = this.todos.map(todo => 
        todo.id === id ? { ...todo, is_finished } : todo
      );
    }    
  },
});
