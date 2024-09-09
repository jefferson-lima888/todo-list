// eslint-disable-next-line no-unused-vars
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "./TodoItem";

describe("TodoItem Component", () => {
  const mockTodo = {
    todoF: "Test Task",
    key: "123",
    completed: false,
  };

  const mockOnUpdate = jest.fn();
  const mockOnDelete = jest.fn();

  test("renders todo item with correct text", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const taskText = screen.getByText(/Test Task/i);
    expect(taskText).toBeInTheDocument();

    const statusText = screen.getByText(/Incomplete/i);
    expect(statusText).toBeInTheDocument();
  });

  test("calls onUpdate when update button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const updateButton = screen.getByRole("button", { name: /Atualizar/i });
    fireEvent.click(updateButton);

    expect(mockOnUpdate).toHaveBeenCalledTimes(1);
    expect(mockOnUpdate).toHaveBeenCalledWith(mockTodo.key, mockTodo.todoF);
  });

  test("calls onDelete when delete button is clicked", () => {
    render(
      <TodoItem
        todo={mockTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /Deletar/i });
    fireEvent.click(deleteButton);

    expect(mockOnDelete).toHaveBeenCalledTimes(1);
    expect(mockOnDelete).toHaveBeenCalledWith(mockTodo.key);
  });

  test("renders 'Completed' when todo is marked as completed", () => {
    const completedTodo = { ...mockTodo, completed: true };
    render(
      <TodoItem
        todo={completedTodo}
        onUpdate={mockOnUpdate}
        onDelete={mockOnDelete}
      />
    );

    const statusText = screen.getByText(/Completed/i);
    expect(statusText).toBeInTheDocument();
  });
});
