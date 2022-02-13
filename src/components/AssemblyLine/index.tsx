import { useState } from "react";

import { Container, Header, Stages, Stage, Task } from "./styles";

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

  const moveNext = () => {
    // TODO
  }

  const movePrev = () => {
    // TODO
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
        {stages.map((stage) => (
          <Stage data-testid="stage" key={stage.name}>
            <h5>{stage.name}</h5>
            <div data-testid="tasks">
              {stage.tasks.map((task) => {
                if (!task) return null;
                return (
                  <Task
                    data-testid="task"
                    onClick={() => moveNext()}
                    onContextMenu={() => movePrev()}
                  >
                    {task}
                  </Task>
                );
              })}
            </div>
          </Stage>
        ))}
      </Stages>
    </Container>
  )
};