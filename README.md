# AssemblyLine
Write a React component that is an initial prototype of an organizational tool for personal and business use based on the assembly line concept.

# Task 1
## Overview
Oftentimes, processes can be represented as a series of stages. The concept of an assembly line can be a useful way to organize production logic, list of tasks in varying degrees of completion, or track individuals progressing through a series of milestones.
- [x] Write a React component that is an initial prototype of an organizational tool for personal and business use based on the assembly line concept.
- [ ] Complete a written response.

# Functional requirements
- [x] The AssemblyLine component (the container) will accept an array of stages in its props.
- [x] The stages must be displayed in order of the input array.
- [x] Each stage contains a list of tasks.
- [x] Task name will be inputted through an input element <input> using ENTER. 
- [x] Tasks can be moved through stages.

# Expecting behaviour
- [x] On LEFT-CLICK assembly item (or task) should move on top of the next stage.
- [x] On RIGHT-CLICK assembly item (or task) should move at the bottom of the previous stage.
- [x] On LEFT-CLICK an assembly item in the last stage will delete off the assembly line (as the task finished moving through the assembly line).
- [x] RIGHT-CLICK an assembly item in the first stage will delete it from the assembly line (the task is no longer needed)
- [x] Task input only creates one task at a time and only adds a newly created task in the first stage.
- [x] Task should only be moved one stage at a time.

