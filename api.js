const API = "https://back-node-production-9647.up.railway.app/tasks";

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