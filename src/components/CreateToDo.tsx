import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryState, toDoState } from "../atoms";
import styled from "styled-components";

const NewToDo = styled.form`
  display: flex;
  justify-content: center;
  margin: 5px;
`;
const NewToDoInput = styled.input`
  padding: 10px;
  margin-right: 5px;
  width: 85%;
  border: 5px solid black;
  border-radius: 10px;
`;
const AddBtn = styled.button`
  border: none;
  padding: 0 15px;
  background-color: #333333;
  border-radius: 10px;
  font-size: 25px;
  font-weight: 600;
  color: red;
`;

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const category = useRecoilValue(categoryState);
  const setToDos = useSetRecoilState(toDoState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    setValue("toDo", "");
  };
  return (
    <NewToDo onSubmit={handleSubmit(handleValid)}>
      <NewToDoInput
        {...register("toDo", {
          required: "Please write a To Do",
        })}
        placeholder="Write a to do"
      />
      <AddBtn>+</AddBtn>
    </NewToDo>
  );
}

export default CreateToDo;
