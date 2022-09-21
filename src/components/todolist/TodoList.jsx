import React, { useRef, useState, useEffect } from "react";
import "./todolist.css";
import { useSelector, useDispatch } from "react-redux";
import {
  addItem,
  removeItem,
  clearList,
  setComplete,
  editItem,
} from "../../redux/todolistSlice";
const TodoList = () => {
  const { list } = useSelector((state) => state.todolist);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [showList, setShowList] = useState("all");
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(0);
  const [filteredList, setFilteredList] = useState(list);
  useEffect(() => {
    if (showList === "all") {
      setFilteredList(list);
    } else if (showList === "complete") {
      setFilteredList(list.filter((item) => item.complete));
    } else if (showList === "incomplete") {
      setFilteredList(list.filter((item) => !item.complete));
    }
  }, [list, showList]);
  const addNewTodo = (value) => {
    if (inputRef.current.value !== "") {
      dispatch(addItem({ id: list.length + 1, value: value, complete: false }));
    }
  };

  return (
    <div className="todo-list">
      <div className="inputs">
        <input
          placeholder="Add Task"
          ref={inputRef}
          type="'text'"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              if (inputRef.current.value !== "") {
                if (editMode) {
                  dispatch(
                    editItem({ id: editId, value: inputRef.current.value })
                  );
                  setEditMode(false);
                } else {
                  addNewTodo(inputRef.current.value);
                }
                inputRef.current.value = "";
                inputRef.current.focus();
              }
            }
          }}
        />
        <button
          className={`${editMode ? "edit-mode-btn" : ""}`}
          onClick={() => {
            if (editMode) {
              dispatch(editItem({ id: editId, value: inputRef.current.value }));
              setEditMode(false);
            } else {
              addNewTodo(inputRef.current.value);
            }
            inputRef.current.value = "";
            inputRef.current.focus();
          }}
        >
          {editMode ? (
            <i className="fa-solid fa-pen-to-square"></i>
          ) : (
            <i className="fa-solid fa-plus"></i>
          )}
        </button>
        <select
          className="select"
          onChange={(e) => {
            setShowList(e.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="complete">Complete</option>
          <option value="incomplete">Incomplete</option>
        </select>
      </div>
      {filteredList.length !== 0 && (
        <div className="outputs">
          <p className="tasks-num">Tasks: {filteredList.length}</p>
          <button
            className="clear-btn"
            onClick={() => {
              dispatch(clearList());
            }}
          >
            Clear
          </button>

          {filteredList.map((item) => {
            return (
              <div className="todo-item" key={item.id}>
                <div className="left">
                  <input
                    onClick={(e) => {
                      dispatch(setComplete(item.id - 1));
                      e.target.nextSibling.children[0].classList.toggle("on");
                    }}
                    defaultChecked={item.complete}
                    className="checkBox"
                    type="checkbox"
                    name="complete"
                    id={`checkBox${item.id}`}
                  />

                  <label className="todo-text" htmlFor={`checkBox${item.id}`}>
                    {" "}
                    <div
                      className={`checkBox-visible ${
                        item.complete ? "on" : ""
                      }`}
                    >
                      ✔
                    </div>{" "}
                    {item.value}
                  </label>
                </div>
                <div className="buttons">
                  <button
                    className="btn check-btn"
                    onClick={(e) => {
                      dispatch(setComplete(item.id - 1));
                    }}
                  >
                    <i className="fa-solid fa-check"></i>
                    <p className="btn-text">Done</p>
                  </button>
                  <button
                    className="btn edit-btn"
                    onClick={() => {
                      setEditMode(true);
                      setEditId(item.id);
                      inputRef.current.value = item.value;
                      inputRef.current.focus();
                      inputRef.current.setSelectionRange(
                        0,
                        inputRef.current.value.length
                      );
                    }}
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                    <p className="btn-text">Edit</p>
                  </button>
                  <button
                    className="btn delete-btn"
                    onClick={() => {
                      dispatch(removeItem(item.id));
                    }}
                  >
                    <i className="fa-solid fa-trash"></i>
                    <p className="btn-text">Delete</p>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default TodoList;
