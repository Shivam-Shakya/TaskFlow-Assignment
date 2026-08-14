const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

async function request(endpoint, options = {}) {
  const response = await fetch(
    `${API_URL}${endpoint}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...(options.headers || {}),
      },
      ...options,
    }
  );

  let data = null;

  try {
    data = await response.json();
  } catch {
    data = null;
  }

  if (!response.ok) {
    throw new Error(
      data?.message ||
        "Something went wrong with the server."
    );
  }

  return data;
}

export async function getBoard() {
  return request("/boards/1");
}

export async function createTask(taskData) {
  return request("/tasks", {
    method: "POST",
    body: JSON.stringify(taskData),
  });
}

export async function updateTask(taskId, taskData) {
  return request(`/tasks/${taskId}`, {
    method: "PUT",
    body: JSON.stringify(taskData),
  });
}

export async function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, {
    method: "DELETE",
  });
}

export async function moveTask(
  taskId,
  columnId
) {
  return request(`/tasks/${taskId}/move`, {
    method: "PATCH",
    body: JSON.stringify({
      column_id: columnId,
    }),
  });
}