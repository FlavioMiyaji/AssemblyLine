import { useState } from "react";

import { Container, Header, Stages, Stage, Tasks, Task } from "./styles";

type Props = {
  stages: string[];
}

interface IStage {
  name: string;
  tasks: string[];
}

export function AssemblyLine({ stages: initStages }: Props) {
  const [newTask, setNewTask] = useState("");
  const [stages, setStages] = useState<IStage[]>(initStages.map(name => ({ name, tasks: [] })));

  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    event.stopPropagation();
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== 'Enter') return;
    event.stopPropagation();
    setStages(prev => {
      const state = [...prev];
      state[0] = {
        ...state[0],
        tasks: [newTask, ...state[0].tasks],
      };
      return state;
    });
    setNewTask("");
  }

  const moveNext = (stageIndex: number, taskIndex: number) => {
    setStages(prevState => {
      const state = [...prevState];
      const task = state[stageIndex].tasks[taskIndex];
      // Remove from current stage
      state[stageIndex].tasks = state[stageIndex].tasks.filter((_, i) => i !== taskIndex);
      if (stageIndex < stages.length - 1) {
        // add to next
        const next = stageIndex + 1;
        state[next].tasks = [task, ...state[next].tasks];
      }
      return state;
    });
  }

  const movePrev = (stageIndex: number, taskIndex: number) => {
    setStages(prevState => {
      const state = [...prevState];
      const task = state[stageIndex].tasks[taskIndex];
      // Remove from current stage
      state[stageIndex].tasks = state[stageIndex].tasks.filter((_, i) => i !== taskIndex);
      if (stageIndex > 0) {
        // add to previous
        const prev = stageIndex - 1;
        state[prev].tasks = [...state[prev].tasks, task];
      }
      return state;
    });
  }

  return (
    <Container data-testid="">
      <Header>
        <label form="new-task">Add an item: </label>
        <input
          data-testid="new-task"
          type="text"
          id="new-task"
          name="new-task"
          value={newTask}
          onChange={handleTask}
          onKeyPress={handleEnter}
        />
      </Header>
      <Stages>
        {stages.map((stage, stageIndex) => (
          <Stage data-testid="stage" key={stage.name}>
            <h5>{stage.name}</h5>
            <Tasks data-testid="tasks">
              {stage.tasks.map((task, taskIndex) => {
                if (!task) return null;
                return (
                  <Task
                    data-testid="task"
                    key={task}
                    onClick={(e) => {
                      e.preventDefault();
                      moveNext(stageIndex, taskIndex);
                    }}
                    onContextMenu={(e) => {
                      e.preventDefault();
                      movePrev(stageIndex, taskIndex);
                    }}
                  >
                    {task}
                  </Task>
                );
              })}
            </Tasks>
          </Stage>
        ))}
      </Stages>
    </Container>
  )
};