import "./App.css";
import TodoList from "./components/todolist/TodoList";
import ReduxLogo from "./images/redux-logo.png";
function App() {
  return (
    <div className="App">
      <nav>
        <div className="image">
          <img src={ReduxLogo} alt="" />
        </div>
        <h1 className="app-title"> Todo List</h1>
        <i className="fa-brands fa-react"></i>
      </nav>
      <TodoList />
    </div>
  );
}

export default App;
