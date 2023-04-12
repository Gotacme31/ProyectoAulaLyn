const API = "http://192.168.155.119:3000/tasks";

export const saveTask = async (newTask) => {
    const res = await fetch(API, {
      method: "POST", 
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTask),
    });
    return await res.json();
  };