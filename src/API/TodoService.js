import { getDatabase, onValue, ref, get, set, remove, update } from "firebase/database";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAyqXeF0l7K06nV_5_q52uUVPZrqCdVXb0",
  authDomain: "todo-list-c45a8.firebaseapp.com",
  databaseURL: "https://todo-list-c45a8-default-rtdb.firebaseio.com",
  projectId: "todo-list-c45a8",
  storageBucket: "todo-list-c45a8.appspot.com",
  messagingSenderId: "918710893121",
  appId: "1:918710893121:web:8cb55b68919dd6ca4864c0"
};
  const app = initializeApp(firebaseConfig);
  // get database ref
  const database = getDatabase()

  /** If firebase return instead of array object dataToArr function transfer it to an array*/
  const dataToArr = (data) => {
    if(typeof(data) != Array) {
      const todoArr = [];
      for(let td in data) {
        todoArr.push(data[td])
      }
      return todoArr
    } else {
      return data
    }
  }

export default class TodoService {
  /**Get all todos from database */
    static async getAll(callback) {
      onValue(ref(database, '/todos'), (snapshot) => {
        const data = dataToArr(snapshot.val());
        console.log(data);
        callback(data);
      })
    }
/**Add todo to database by index=id , params: todo = new todo*/
    static async addTodo(todo) {
        await set(ref(database, 'todos/' + todo.id), todo)
        this.getAll();
    }
/**Edit todo by index=id, params: todo = edited todo, id = todo.id */
    static async setTodo(todo, id) {
      await update(ref(database, 'todos/' + id), todo)
      this.getAll();
    }

    /**Remove todo by index=id, params: Todoid = todo.id */
    static async removeTodo(todoID) {
      await  remove(ref(database, 'todos/' + todoID))
      this.getAll();

    }
}