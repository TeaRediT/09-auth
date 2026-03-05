import { Note, NoteList } from "@/types/note";
import { cookies } from "next/headers";
import { nextServer } from "./api";
import { User } from "@/types/user";

export const fetchNotes = async (
  query: string,
  page: number,
  tag: string,
): Promise<NoteList> => {
  const cookiesStore = await cookies();
  const { data } = await nextServer.get<NoteList>(`/notes`, {
    params: {
      ...(query === "" ? null : { search: query }),
      ...(tag === "all" ? null : { tag }),
      page,
      perPage: 12,
      sortBy: "created",
      headers: {
        Cookie: cookiesStore.toString(),
      },
    },
  });
  return data;
};

export const fetchNoteById = async (id: string): Promise<Note> => {
  const cookiesStore = await cookies();
  const { data } = await nextServer.get<Note>(`/notes/${id}`, {
    headers: {
      Cookie: cookiesStore.toString(),
    },
  });

  return data;
};

export const checkSession = async () => {
  const cookiesStore = await cookies();
  const res = await nextServer.get("/auth/session", {
    headers: { Cookie: cookiesStore.toString() },
  });

  return res;
};

export const getMe = async (): Promise<User> => {
  const cookiesStore = await cookies();
  const { data } = await nextServer.get<User>("/users/me", {
    headers: { Cookie: cookiesStore.toString() },
  });
  return data;
};
