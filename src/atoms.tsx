import { atom, selector } from "recoil";
import { recoilPersist } from "recoil-persist";

export interface IForm {
  newCategory?: string;
  toDo: string;
}

export interface IToDo {
  text: string;
  id: number;
  category: number;
}
const { persistAtom } = recoilPersist({
  key: "todoLocal",
  storage: localStorage,
});

export const categoryState = atom<number>({
  key: "category",
  default: 0,
});

export const categoriesState = atom<string[]>({
  key: "categories",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoState = atom<IToDo[]>({
  key: "toDo",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export const toDoSelector = selector({
  key: "toDoSelector",
  get: ({ get }) => {
    const toDos = get(toDoState);
    const category = get(categoryState);
    return toDos.filter((toDo) => toDo.category === category);
  },
});
