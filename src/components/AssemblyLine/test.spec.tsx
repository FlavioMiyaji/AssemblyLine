/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from "@testing-library/react";

import { AssemblyLine } from "..";

describe("AssemblyLine component", () => {
  // The AssemblyLine component (the container) will accept an array of stages in its props.
  const initStages = [
    "Brainstorming stage",
    "Development stage",
    "Testing stage",
    "Deployment stage",
  ];

  beforeEach(() => {
    // eslint-disable-next-line testing-library/no-render-in-setup
    render(<AssemblyLine stages={initStages} />);
  });

  describe("rendering initial elements", () => {
    it('should have an "new-task"', () => {
      expect(screen.getByText("Add an item:")).toBeTruthy();
      expect(screen.getByTestId("new-task")).toBeTruthy();
      expect(screen.queryAllByTestId("new-task")).toHaveLength(1);
    });

    // The stages must be displayed in order of the input array.
    test("should have all stages", () => {
      initStages.forEach(stage => expect(screen.getByText(stage)).toBeTruthy());
    });

    // Each stage contains a list of tasks.
    it('should not have any "task"', () => {
      expect(screen.queryAllByTestId("task")).toHaveLength(0);
    });
  });

  // Task name will be inputted through an input element <input> using ENTER.
  describe("adding assembly tasks", () => {
    describe('when "typing" is typed into "new-task"', () => {
      let input: HTMLInputElement;

      beforeEach(() => {
        input = screen.getByTestId("new-task");
        fireEvent.change(input, { target: { value: "typing" } })
      });

      it('should display "typing" text inside of "new-task"', () => {
        expect(input.value).toEqual("typing");
      });

      describe('when enter key is pressed on "new-task"', () => {
        beforeEach(() => {
          fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
        });

        it('should respond to Enter keydown, clearing the input on "new-task"', () => {
          expect(input.value).toEqual("");
        });

        it('should have a single task in the first stage after Enter on "new-task"', () => {
          const firstStage = screen.queryAllByTestId("stage")[0];
          const child = screen.getByTestId("task");
          expect(child).toBeTruthy();
          expect(firstStage).toContainElement(child);
        });
      });
    });
  });

  // Tasks can be moved through stages.
  describe("moving assembly tasks", () => {
    describe("starting with 2 tasks", () => {
      beforeEach(() => {
        const input = screen.getByTestId("new-task");

        fireEvent.change(input, { target: { value: "first" } })
        fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });

        fireEvent.change(input, { target: { value: "second" } })
        fireEvent.keyPress(input, { key: "Enter", code: "Enter", charCode: 13 });
      });

      test("tasks should initially be listed within the first stage", () => {
        const tasks = screen.queryAllByTestId("tasks");
        expect(tasks).toHaveLength(initStages.length);

        expect(screen.getByText("first")).toBeTruthy();
        expect(tasks[0]).toContainElement(screen.getByText("first"));

        expect(screen.getByText("second")).toBeTruthy();
        expect(tasks[0]).toContainElement(screen.getByText("second"));
      });

      // On LEFT-CLICK assembly item (or task) should move on top of the next stage.
      test("should move on top of the next stage with a left click", async () => {
        const tasks = screen.queryAllByTestId("tasks");

        fireEvent.click(screen.getByText("first"));
        expect(tasks[1]).toContainElement(screen.getByText("first"));
        expect(tasks[0]).not.toContainElement(screen.getByText("first"));
        expect(tasks[1].children[0]).toEqual(screen.getByText("first"));

        fireEvent.click(screen.getByText("second"));
        expect(tasks[1]).toContainElement(screen.getByText("second"));
        expect(tasks[0]).not.toContainElement(screen.getByText("second"));
        expect(tasks[1].children[0]).toEqual(screen.getByText("second"));
      });

      // On LEFT-CLICK assembly item (or task) should move on top of the next stage.
      test("should move at the bottom of the previous stage with a right click", async () => {
        const tasks = screen.queryAllByTestId("tasks");

        fireEvent.click(screen.getByText("first"));
        fireEvent.click(screen.getByText("second"));

        fireEvent.contextMenu(screen.getByText("first"));
        expect(tasks[1]).not.toContainElement(screen.getByText("first"));
        expect(tasks[0]).toContainElement(screen.getByText("first"));
        expect(tasks[0].children[0]).toEqual(screen.getByText("first"));

        fireEvent.contextMenu(screen.getByText("second"));
        expect(tasks[1]).not.toContainElement(screen.getByText("second"));
        expect(tasks[0]).toContainElement(screen.getByText("second"));
        expect(tasks[0].children[0]).toEqual(screen.getByText("first"));
        expect(tasks[0].children[1]).toEqual(screen.getByText("second"));
      });

      // On LEFT-CLICK an assembly item in the last stage will delete off the assembly line (as the task finished moving through the assembly line).
      test("should delete the task from the last stage with a left click", async () => {
        for (let i = 0; i < initStages.length; i++) {
          fireEvent.click(screen.getByText("first"));
        }
        expect(screen.queryByText("first")).toBeFalsy();
      });

      // RIGHT-CLICK an assembly item in the first stage will delete it from the assembly line (the task is no longer needed)
      test("should delete the task from the firt stage with a right click", async () => {
        for (let i = 0; i < initStages.length - 1; i++) {
          fireEvent.click(screen.getByText("first"));
          fireEvent.click(screen.getByText("second"));
        }
        expect(screen.getByText("first")).toBeTruthy();
        expect(screen.getByText("second")).toBeTruthy();

        const tasks = screen.queryAllByTestId("tasks");
        expect(tasks[initStages.length - 1].children[1]).toEqual(screen.getByText("first"));
        expect(tasks[initStages.length - 1].children[0]).toEqual(screen.getByText("second"));

        for (let i = 0; i < initStages.length; i++) {
          fireEvent.contextMenu(screen.getByText("second"));
        }
        expect(screen.getByText("first")).toBeTruthy();
        expect(screen.queryByText("second")).toBeFalsy();
        expect(tasks[initStages.length - 1].children[0]).toEqual(screen.getByText("first"));
      });
    });
  });
});