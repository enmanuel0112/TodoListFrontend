import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getMe } from "../services/users.service";
import { Spinner } from "../components/Spinner";
import { signOut } from "../services/auth.service";

type User = {
  createdAt?: string;
  email?: string;
  id?: number;
  updatedAt?: string;
  userName?: string;
  user?: object;
};

interface dataTask {
  taskId: number;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
}

type GetTask = {
  taskId: string;
  content: string;
  createdAt: string;
  updatedAt: string;
  isCompleted: boolean;
};

interface AuthContextProps {
  user?: User | null;
  setUser?: React.Dispatch<React.SetStateAction<object | null>>;
  apiError?: string;
  setApiError?: React.Dispatch<React.SetStateAction<string>>;
  taskUser?: GetTask[];
  setTaskUser?: React.Dispatch<React.SetStateAction<GetTask[] | undefined>>;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
  task?: dataTask;
  setTask: React.Dispatch<React.SetStateAction<dataTask | undefined>>;
  taskDelete: boolean;
  setTaskDelete: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: dataTask[];
  setTaskList: React.Dispatch<React.SetStateAction<dataTask[]>>;
  login?: (data: User) => void;
  logout?: () => void;
  gettingUser?: () => void;
  loading?: boolean;
  openSetting: boolean;
  setOpenSetting: React.Dispatch<React.SetStateAction<boolean>>;
  openProfileConfig?: boolean;
  setOpenProfileConfig?: React.Dispatch<React.SetStateAction<boolean>>;
  updateUserName?: string;
  setUpdateUserName?: React.Dispatch<React.SetStateAction<string>>;
  refreshUser?: () => Promise<void>;
}
type ContextProviderProps = {
  children: React.ReactNode;
};
const contextComponent: React.Context<AuthContextProps> =
  createContext<AuthContextProps>({
    user: {},
    setUser: () => {},
    apiError: "",
    setApiError: () => {},
    taskUser: [],
    setTaskUser: () => {},
    openModal: false,
    setOpenModal: () => {},
    task: {} as dataTask,
    setTask: () => {},
    taskDelete: false,
    setTaskDelete: () => {},
    taskList: [],
    setTaskList: () => {},
    login: () => {},
    logout: () => {},
    gettingUser: () => {},
    loading: true,
    openSetting: false,
    setOpenSetting: () => {},
    openProfileConfig: false,
    setOpenProfileConfig: () => {},
    updateUserName  : "",
    setUpdateUserName: () => {},
    refreshUser: async () => {},
  });

export const AuthContext = ({ children }: ContextProviderProps) => {
  const [apiError, setApiError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState<dataTask>();
  const [taskUser, setTaskUser] = useState<GetTask[]>();
  const [openModal, setOpenModal] = useState(false);
  const [taskDelete, setTaskDelete] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<dataTask[]>([]);
  const [loading, setLoading] = useState(true);
  const [openSetting, setOpenSetting] = useState(false);
  const [openProfileConfig, setOpenProfileConfig] = useState(false);
  const [updateUserName, setUpdateUserName] = useState<string>("");

  const refreshUser = async () => {
     try {
        const res = await getMe();
        setUser(res?.user as User);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
  }

  useEffect(() => {
    (async () => {
     await refreshUser();
    })();
  }, [user]);

  const logout = async () => {
    const logoutUser = await signOut();
  setUser(null);
    if (loading) {
      return (
        <>
          <Spinner />
        </>
      );
    
    }

    return logoutUser;
  };

  if (loading) {
    return (
      <>
        <Spinner />
      </>
    );
  }

  return (
    <contextComponent.Provider
      value={{
        apiError,
        setApiError,
        user,
        setUser,
        taskUser,
        setTaskUser,
        openModal,
        setOpenModal,
        task,
        setTask,
        taskDelete,
        setTaskDelete,
        taskList,
        setTaskList,
        logout,
        loading,
        openSetting,
        setOpenSetting,
        openProfileConfig,
        setOpenProfileConfig,
        updateUserName,
        setUpdateUserName,
        refreshUser,
      }}
    >
      {children}
    </contextComponent.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default contextComponent;
