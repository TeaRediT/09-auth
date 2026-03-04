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

export const cheackSession = async () => {};

export const getMe = async () => {};
