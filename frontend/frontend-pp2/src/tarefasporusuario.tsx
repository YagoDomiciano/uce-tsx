import { useEffect, useState } from "react";
import type { Todo } from "./tipos";

function TarefasPorUsuario() {
  const [userId, setUserId] = useState(1);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [carregando, setCarregando] = useState(true);
