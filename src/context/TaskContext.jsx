import { createContext, useContext, useState, useEffect } from "react";

const TaskContext = createContext();
const STORAGE_VERSION = "1.0";

export const TaskProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    const loadInitialData = () => {
      try {
        const storedVersion = localStorage.getItem("taskTrackerVersion");
        if (storedVersion !== STORAGE_VERSION) {
          localStorage.clear();
          localStorage.setItem("taskTrackerVersion", STORAGE_VERSION);
          return;
        }

        const storedUser = localStorage.getItem("taskTrackerUser");
        const storedTasks = localStorage.getItem("taskTrackerTasks");
        const storedDarkMode = localStorage.getItem("taskTrackerDarkMode");

        if (storedUser) {
          const parsedUser = JSON.parse(storedUser);
          if (parsedUser.email && parsedUser.username) {
            setUser(parsedUser);
          }
        }

        if (storedTasks) {
          const parsedTasks = JSON.parse(storedTasks);
          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        }

        if (storedDarkMode) {
          setDarkMode(storedDarkMode === "true");
        }
      } catch (error) {
        console.error("Error loading data:", error);
        localStorage.clear();
        localStorage.setItem("taskTrackerVersion", STORAGE_VERSION);
      } finally {
        setIsInitialized(true);
      }
    };

    loadInitialData();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (user) {
      localStorage.setItem("taskTrackerUser", JSON.stringify(user));
    }
  }, [user, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("taskTrackerTasks", JSON.stringify(tasks));
  }, [tasks, isInitialized]);

  useEffect(() => {
    if (!isInitialized) return;
    localStorage.setItem("taskTrackerDarkMode", darkMode.toString());
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode, isInitialized]);

  const login = (email, username) => {
    setUser({ email, username });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("taskTrackerUser");
  };

  const addTask = (
    title,
    description,
    priority = "medium",
    dueDate = null,
    category = ""
  ) => {
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
      priority,
      dueDate,
      category,
      createdAt: new Date().toISOString(),
    };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updates) => {
    setTasks(
      tasks.map((task) => (task.id === id ? { ...task, ...updates } : task))
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTaskCompletion = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && task.completed) ||
      (filter === "pending" && !task.completed);

    return matchesFilter;
  });

  return (
    <TaskContext.Provider
      value={{
        user,
        tasks: filteredTasks,
        allTasks: tasks,
        filter,
        searchTerm,
        darkMode,
        isInitialized,
        login,
        logout,
        addTask,
        updateTask,
        deleteTask,
        toggleTaskCompletion,
        setFilter,
        setSearchTerm,
        setDarkMode,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTasks must be used within a TaskProvider");
  }
  return context;
};
