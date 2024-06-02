import { render, fireEvent, screen } from "@testing-library/react";
import TodoList from "./components/TodoList";

describe("TodoList Component", () => {
  test("adds a task", () => {
    render(<TodoList />);
    const input = screen.getByRole("textbox");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Task" } });
    fireEvent.click(addButton);

    expect(screen.getByText("New Task")).toBeInTheDocument();
  });

  test("removes a task", () => {
    render(<TodoList />);
    const input = screen.getByRole("textbox");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Task to be removed" } });
    fireEvent.click(addButton);

    const removeButton = screen.getAllByRole("button")[1];
    fireEvent.click(removeButton);

    expect(screen.queryByText("Task to be removed")).not.toBeInTheDocument();
  });

  test("marks a task as completed", () => {
    render(<TodoList />);
    const input = screen.getByRole("textbox");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Task to be completed" } });
    fireEvent.click(addButton);

    const completeButton = screen.getAllByRole("button")[0];
    fireEvent.click(completeButton);

    expect(screen.getByText("Task to be completed")).toHaveClass(
      "line-through text-green-600"
    );
  });

  test("filters tasks", () => {
    render(<TodoList />);
    const input = screen.getByRole("textbox");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "Active Task" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "Completed Task" } });
    fireEvent.click(addButton);

    const completeButton = screen.getAllByRole("button")[0];
    fireEvent.click(completeButton);

    const filterSelect = screen.getByRole("combobox", { name: "Filter" });
    fireEvent.change(filterSelect, { target: { value: "completed" } });

    expect(screen.getByText("Completed Task")).toBeInTheDocument();
    expect(screen.queryByText("Active Task")).not.toBeInTheDocument();

    fireEvent.change(filterSelect, { target: { value: "active" } });

    expect(screen.getByText("Active Task")).toBeInTheDocument();
    expect(screen.queryByText("Completed Task")).not.toBeInTheDocument();
  });

  test("sorts tasks", () => {
    render(<TodoList />);
    const input = screen.getByRole("textbox");
    const addButton = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "B Task" } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: "A Task" } });
    fireEvent.click(addButton);

    const tasks = screen.getAllByText(/Task/);
    expect(tasks[0].textContent).toBe("A Task");
    expect(tasks[1].textContent).toBe("B Task");

    const sortSelect = screen.getByRole("combobox", { name: "Sort" });
    fireEvent.change(sortSelect, { target: { value: "desc" } });

    const sortedTasks = screen.getAllByText(/Task/);
    expect(sortedTasks[0].textContent).toBe("B Task");
    expect(sortedTasks[1].textContent).toBe("A Task");
  });
});
