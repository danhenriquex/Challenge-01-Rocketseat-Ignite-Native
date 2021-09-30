import React, { useState } from "react";
import { StyleSheet, View } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [id, setId] = useState(0);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle.trim()) {
      const newTask = { id: id + 1, title: newTaskTitle, done: false };

      setTasks([...tasks, newTask]);
      setId(id + 1);
    }
  }

  function handleToggleTaskDone(id: number) {
    const taskDone = [...tasks];

    const findTaskDone = taskDone.find((item) => item.id === id);

    if (findTaskDone) {
      findTaskDone.done = !findTaskDone.done;
      setTasks(taskDone);
    }
  }

  function handleRemoveTask(id: number) {
    setTasks((prevState) => prevState.filter((item) => item.id !== id));
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EBEBEB",
  },
});
