import { createContext, useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
import { getMe } from "../services/users.service";

type User = {
  createdAt?: string;
  email?: string;
  id?: number;
  updatedAt?: string;
  userName?: string;
  user?: object;
};

interface ITask {
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
  task?: ITask;
  setTask: React.Dispatch<React.SetStateAction<ITask>>;
  taskDelete: boolean;
  setTaskDelete: React.Dispatch<React.SetStateAction<boolean>>;
  taskList: ITask[];
  setTaskList: React.Dispatch<React.SetStateAction<ITask[]>>;
  login?: (data: User) => void;
  logout?: () => void;
  gettingUser?: () => void;
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
    task: {} as ITask,
    setTask: () => {},
    taskDelete: false,
    setTaskDelete: () => {},
    taskList: [],
    setTaskList: () => {},
    login: () => {},
    logout: () => {},
    gettingUser: () => {},
  });

export const AuthContext = ({ children }: ContextProviderProps) => {
  const [apiError, setApiError] = useState<string>("");
  const [user, setUser] = useState<User | null>(null);
  const [task, setTask] = useState<ITask>();
  const [taskUser, setTaskUser] = useState<GetTask[]>();
  const [openModal, setOpenModal] = useState(false);
  const [taskDelete, setTaskDelete] = useState<boolean>(false);
  const [taskList, setTaskList] = useState<ITask[]>([]);
  const [loadingSate, setLoadingState] = useState(false);
  // const navigate = useNavigate();

  //   const login: (data: User) => void = (data) =>  {
  // setUser(data);
  // console.log('esto proviene desde login',data?.user)
  // if(data?.user?.id){
  // navigate('/dashboard');
  // }

  // }

  useEffect(() => {
    (async () => {
      try {
        setLoadingState(true);
        const res = await getMe();
        console.log("respuesta api", res?.user);
        setUser(res?.user as User);
      } catch (error) {
        console.log(error);
      }finally{
        setLoadingState(false)
      }
      
    })();
  }, []);

  const logout = () => {
    setUser({});
    // navigate("login");
  };

  if (loadingSate) {
    return (
      <div>
        Loading....
      </div>
    )
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
      }}
    >
      {children}
    </contextComponent.Provider>
  );
};
// eslint-disable-next-line react-refresh/only-export-components
export default contextComponent;
