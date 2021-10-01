import React, { useState } from "react";
import { StyleSheet, View, Alert } from "react-native";

import { Header } from "../components/Header";
import { Task, TasksList } from "../components/TasksList";
import { TodoInput } from "../components/TodoInput";

export interface EditTask {
  taskId: number;
  taskNewTitle: string;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [id, setId] = useState(0);

  function handleAddTask(newTaskTitle: string) {
    const noSpaces = newTaskTitle.trim();

    if (noSpaces) {
      const findExistingTask = tasks.find(
        (taskTitle) => taskTitle.title === noSpaces
      );

      if (findExistingTask) {
        Alert.alert(
          "Task já cadastrada",
          "Você não pode cadastrar uma task com o mesmo nome"
        );
        return;
      }

      const newTask = { id: id + 1, title: noSpaces, done: false };

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
    Alert.alert(
      "Remover item",
      "Tem certeza que você deseja remover esse item?",
      [
        { text: "Não", style: "cancel" },
        {
          text: "Sim",
          onPress: () =>
            setTasks((prevState) => prevState.filter((item) => item.id !== id)),
        },
      ]
    );
  }

  function handleEditTask(taskToEdit: EditTask) {
    const taskDone = [...tasks];

    const findTaskDone = taskDone.find((item) => item.id === id);

    if (findTaskDone) {
      findTaskDone.title = taskToEdit.taskNewTitle;
      setTasks(taskDone);
    }
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList
        tasks={tasks}
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask}
        editTask={handleEditTask}
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
