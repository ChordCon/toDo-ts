import React from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { categoriesState, IToDo, toDoState } from "../atoms";
import styled from "styled-components";

const List = styled.li`
  margin: 8px;
  list-style: none;
  padding: 5px;
  background-color: #717171;
  border-radius: 10px;
`;

const Text = styled.div`
  margin-bottom: 5px;
  padding: 5px;
  color: white;
`;
const Btns = styled.div`
  display: flex;
  justify-content: end;
  margin-right: 2px;
  padding: 2px;
`;
const Btn = styled.button`
  margin-right: 5px;
  padding: 2px;
  color: white;
  border: 2px solid white;
  border-radius: 5px;
  background-color: transparent;
`;

function ToDo({ text, category, id }: IToDo) {
  const categories = useRecoilValue(categoriesState);
  const setToDos = useSetRecoilState(toDoState);
  const onDelete = () => {
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((todo) => todo.id !== id);
      return newToDos;
    });
  };
  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;
    setToDos((oldToDos) => {
      const targetIndex = oldToDos.findIndex((toDo) => toDo.id === id);
      if (name === "delete") {
        return [
          ...oldToDos.slice(0, targetIndex),
          ...oldToDos.slice(targetIndex + 1),
        ];
      }
      const newToDo = { text, id, category: name as any };
      return [
        ...oldToDos.slice(0, targetIndex),
        newToDo,
        ...oldToDos.slice(targetIndex + 1),
      ];
    });
  };

  return (
    <>
      <List>
        <Text>{text}</Text>
        <Btns>
          {categories.map((c, i) => {
            return (
              i != category && (
                <Btn key={c} name={i.toString()} onClick={onClick}>
                  {c}
                </Btn>
              )
            );
          })}
          <Btn name={"delete"} onClick={onDelete}>
            ❌
          </Btn>
        </Btns>
      </List>
    </>
  );
}
export default ToDo;
