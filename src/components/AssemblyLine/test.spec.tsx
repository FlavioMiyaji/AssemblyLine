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
});