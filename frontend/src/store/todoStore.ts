import { defineStore } from 'pinia';

interface Todo {
  text: string;
  id: number;
  isFinished: boolean;
}

type FilterType = 'all' | 'finished' | 'unfinished';

export const useTodosStore = defineStore('todos', {
  state: () => ({
    todos: [] as Todo[],
    filter: 'all' as FilterType,
    nextId: 0,
  }),
  getters: {
    finishedTodos: (state): Todo[] => state.todos.filter(todo => todo.isFinished),
    unfinishedTodos: (state): Todo[] => state.todos.filter(todo => !todo.isFinished),
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
    addTodo(text: string): void {
      this.todos.push({ text, id: this.nextId++, isFinished: false });
    },
    updateTodo(id: number, text: string, isFinished: boolean): void {
      this.todos = this.todos.map(todo => 
        todo.id === id ? { ...todo, text, isFinished } : todo
      );
    }    
  },
});
