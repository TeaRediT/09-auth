import { User } from "@/types/user";
import { nextServer } from "./api";
import { CreateNote, Note, NoteList } from "@/types/note";

export type RegisterUser = Pick<User, "username" | "email">;

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string,
): Promise<NoteList> => {
  const { data } = await nextServer.get<NoteList>(`/notes`, {
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
  const { data } = await nextServer.get<Note>(`/notes/${id}`);

  return data;
};

export const createNote = async (note: CreateNote): Promise<Note> => {
  const { data } = await nextServer.post<Note>(`/notes`, note);

  return data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const { data } = await nextServer.delete<Note>(`/notes/${id}`);

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

export const checkSession = async (): Promise<boolean> => {
  const { data } = await nextServer.get("/auth/session");
  return data.success;
};

export const getMe = async (): Promise<User> => {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
};

export const updateMe = async (user: RegisterUser): Promise<User> => {
  const { data } = await nextServer.patch<User>("/users/me", user);
  return data;
};
