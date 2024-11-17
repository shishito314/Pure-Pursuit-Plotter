import Todo from "./components/todo";
import Form from "./components/form";
import FilterButton from "./components/filter-button";
import { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import DataPanel from "./components/data-panel";
import GraphicPanel from "./components/graphic-panel";
import OutputPanel from "./components/output-panel";

function App(props) {
  // const [tasks, setTasks] = useState(props.tasks);

  // function addTask(name) {
  //   const newTask = { id: `todo-${nanoid()}`, name, completed: false };
  //   setTasks([...tasks, newTask]);
  // }

  // function toggleTaskCompleted(id) {
  //   const updatedTasks = tasks.map((task) => {
  //     if (id == task.id) {
  //       return { ...task, completed: !task.completed };
  //     }
  //     return task;
  //   });
  //   setTasks(updatedTasks);
  // }

  // function deleteTask(id) {
  //   const remainingTasks = tasks.filter((task) => id !== task.id);
  //   setTasks(remainingTasks);
  // }

  // const tasklist = tasks?.map((task) => (
  //   <Todo
  //     id={task.id}
  //     key={task.id}
  //     name={task.name}
  //     completed={task.completed}
  //     toggleTaskCompleted={toggleTaskCompleted}
  //     deleteTask={deleteTask}
  //   />
  // ));

  // const tasksNoun = tasklist.length !== 1 ? "tasks" : "task";
  // const headingText = `${tasklist.length} ${tasksNoun} remaining`;

  // return (
  //   <div className="todoapp stack-large">
  //     <h1>Pure Pursuit Plotter</h1>
  //     <Form addTask={addTask} />
  //     <div className="filters btn-group stack-exception">
  //       <FilterButton />
  //       <FilterButton />
  //       <FilterButton />
  //     </div>
  //     <h2 id="list-heading">{headingText}</h2>
  //     <ul
  //       role="list"
  //       className="todo-list stack-large stack-exception"
  //       aria-labelledby="list-heading"
  //     >
  //       {tasklist}
  //     </ul>
  //   </div>
  // );
  return (
    <div className="app">
      <DataPanel />
      <GraphicPanel />
      <OutputPanel />
    </div>
  );
}

export default App;
