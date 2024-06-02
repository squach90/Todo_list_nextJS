"use client";

import { useState, useEffect, SetStateAction } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Section } from "./Section";

export const Todo = () => {
  const [task, setTask] = useState('');
  const [tasksArray, setTasksArray] = useState<string[]>([]);

  // Charger les tâches depuis localStorage lorsque le composant est monté
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasksArray');
    console.log("Tâches chargées depuis localStorage:", storedTasks);
    if (storedTasks) {
      try {
        const parsedTasks = JSON.parse(storedTasks);
        console.log("Tâches après parsing:", parsedTasks);
        setTasksArray(parsedTasks);
      } catch (e) {
        console.error("Erreur de parsing JSON:", e);
      }
    }
  }, []);

  // Sauvegarder les tâches dans localStorage chaque fois que tasksArray change
  useEffect(() => {
    console.log("Sauvegarde des tâches dans localStorage", tasksArray);
    localStorage.setItem('tasksArray', JSON.stringify(tasksArray));
  }, [tasksArray]);

  const inputChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setTask(e.target.value);
  };

  const inputSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (task.trim()) {
      setTasksArray((prevTasksArray) => [...prevTasksArray, task]);
      setTask('');
    }
  };

  const handleDelete = (index: number) => {
    setTasksArray((prevTasksArray) => prevTasksArray.filter((_, i) => i !== index));
  };

  useEffect(() => {
    console.log("État de tasksArray après le chargement:", tasksArray);
  }, [tasksArray]);

  return (
    <Section>
      <div>
        <h1 className="mb-4">To-do List in Next.js</h1>
        <form onSubmit={inputSubmit} className="flex mb-4 gap-4">
          <Input
            className="gap-4 shadow-md"
            type="text"
            value={task}
            onChange={inputChange}
            placeholder="Enter a task"
          />
          <Button
            variant="ghost"
            className="items-center shadow-md"
            type="submit"
          >
            Add task
          </Button>
        </form>
        <ul className="flex flex-col gap-4 items-center">
          {tasksArray.length > 0 ? (
            tasksArray.map((task, index) => (
              <li className="gap-4 lg:gap-4 flex items-center" key={index}>
                <div>{task}</div>
                <Button
                  variant="ghost"
                  className="shadow-md gap-6 p-2 bg-red-600"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </Button>
              </li>
            ))
          ) : (
            <li>Aucune tâche</li>
          )}
        </ul>
      </div>
    </Section>
  );
};
