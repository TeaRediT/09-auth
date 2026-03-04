import { User } from "@/types/user";
import { nextServer } from "./api";

export type RegisterUser = Omit<User, "avatar">;

interface CheackSessionRequest {
  success: boolean;
}

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string,
): Promise<NoteList> => {
  const { data } = await axios.get<NoteList>(`/api/notes`, {
    params: {
      ...(query === "" ? null : { search: query }),
      ...(tag === "all" ? null : { tag }),
      page,
      perPage: 12,
      sortBy: "created",
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const { data } = await axios.get<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
  );

  return data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
  const { data } = await axios.post<Note>(
    `https://notehub-public.goit.study/api/notes`,
    note,
  );

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `https://notehub-public.goit.study/api/notes/${id}`,
  );

  return data;
};

export const register = async (user: RegisterUser): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/register", user);
  return data;
};

export const login = async (user: RegisterUser): Promise<User> => {
  const { data } = await nextServer.post<User>("/auth/login", user);
  return data;
};

export const logout = async (): Promise<void> => {
  await nextServer.post("/auth/logout");
};

export const cheackSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get<CheackSessionRequest>("/auth/session");
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async () => {};
