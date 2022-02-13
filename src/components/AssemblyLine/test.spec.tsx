import { render, screen } from "@testing-library/react";

import { AssemblyLine } from "..";

describe("AssemblyLine component", () => {
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

    test("should have all stages", () => {
      initStages.forEach(stage => expect(screen.getByText(stage)).toBeTruthy());
    });

    it('should not have any "task"', () => {
      expect(screen.queryAllByTestId("task")).toHaveLength(0);
    });
  });
});