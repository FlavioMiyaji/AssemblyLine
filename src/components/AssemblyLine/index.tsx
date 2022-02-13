import { useState } from "react";

import { Container, Header, Stages, Stage, Task } from "./styles";

type Props = {
  stages: string[];
}

interface IStage {
  name: string;
  tasks: string[];
}

export function AssemblyLine({ stages }: Props) {
  const [newTask, setNewTask] = useState("");
  const list: IStage[] = stages.map(name => ({ name, tasks: [] }));

  const handleTask = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTask(event.target.value);
    event.stopPropagation();
  }

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
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
        {list.map((stage) => (
          <Stage data-testid="stage" key={stage.name}>
            <h5>{stage.name}</h5>
            <div data-testid="tasks">
              {stage.tasks.map((task) => (
                <Task data-testid="task">
                  {task}
                </Task>
              ))}
            </div>
          </Stage>
        ))}
      </Stages>
    </Container>
  )
};