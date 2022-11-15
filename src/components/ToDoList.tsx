import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import { categoriesState, categoryState, toDoSelector } from "../atoms";
import ToDo from "./ToDo";
import CreateToDo from "./CreateToDo";
import React from "react";
import CreateCategory from "./CreateCategory";
import { toDoState } from "../atoms";
import styled from "styled-components";

const Container = styled.div`
  max-width: 400px;
`;
const Title = styled.h1`
  margin: 5px;
  font-size: 40px;
`;

const Categories = styled.div`
  text-align: center;
  margin: 0 auto;
`;

const CategoryBtn = styled.button`
  font-family: "Black Han Sans";
  font-size: 20px;
  border: none;
  border-radius: 10px;
  padding: 10px;
  margin: 5px;
  background-color: #333333;
  color: white;
`;

const DeleteBtn = styled.button`
  font-size: 5px;
  border: none;
  padding: 5px;
  border-radius: 5px;
  margin: 0 5px;
  background-color: transparent;
`;

const CategoryName = styled.div`
  text-align: center;
  margin: 10px 5px;
  padding: 10px;
  font-size: 25px;
  color: white;
  background-color: #4a4a4a;
  border-radius: 10px;
`;
function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [categories, setCategories] = useRecoilState(categoriesState);
  const [category, setCategory] = useRecoilState(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const onInput = (e: React.FormEvent<HTMLButtonElement>) => {
    setCategory(e.currentTarget.value as any);
  };

  const onDelete = (i: number) => {
    console.log(i, toDos);
    setToDos((oldToDos) => {
      const newToDos = oldToDos.filter((e) => e.category != i);
      console.log(newToDos, category);
      return newToDos;
    });
    setCategories((old) => {
      const newCategory = [...old.slice(0, i), ...old.slice(i + 1)];
      return newCategory;
    });
  };
  return (
    <Container>
      <Title>To Dos</Title>
      <Categories>
        {categories.map((category, i) => {
          return (
            <CategoryBtn onClick={onInput} key={i} value={i}>
              {category}
              <DeleteBtn onClick={() => onDelete(i)}>❌</DeleteBtn>
            </CategoryBtn>
          );
        })}
      </Categories>

      <CreateCategory />
      <CreateToDo />
      <CategoryName>{categories[category]}</CategoryName>
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </Container>
  );
}

export default ToDoList;
