import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoForm from "./TodoForm";
import { addDoc, collection } from "firebase/firestore";

// Mock do Firebase
jest.mock("firebase/firestore", () => ({
  getFirestore: jest.fn(),
  collection: jest.fn(),
  addDoc: jest.fn(() => Promise.resolve({ id: "123" })),
}));

describe("TodoForm Component", () => {
  const mockOnAdd = jest.fn();
  const mockOnDeleteAll = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders form inputs and buttons correctly", () => {
    render(<TodoForm onAdd={mockOnAdd} onDeleteAll={mockOnDeleteAll} />);

    // Verifica se o campo de texto está presente
    const inputField = screen.getByLabelText(/Digite sua tarefa/i);
    expect(inputField).toBeInTheDocument();

    // Verifica se o botão "Adicionar" está presente
    const addButton = screen.getByRole("button", { name: /Adicionar/i });
    expect(addButton).toBeInTheDocument();

    // Verifica se o botão "Deletar todos" está presente
    const deleteAllButton = screen.getByRole("button", {
      name: /Deletar todos/i,
    });
    expect(deleteAllButton).toBeInTheDocument();
  });

  test("calls onDeleteAll when delete all button is clicked", () => {
    render(<TodoForm onAdd={mockOnAdd} onDeleteAll={mockOnDeleteAll} />);

    const deleteAllButton = screen.getByRole("button", {
      name: /Deletar todos/i,
    });

    // Clica no botão "Deletar todos"
    fireEvent.click(deleteAllButton);

    // Verifica se a função `onDeleteAll` foi chamada
    expect(mockOnDeleteAll).toHaveBeenCalledTimes(1);
  });
});
