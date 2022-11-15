import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { categoriesState } from "../atoms";
import styled from "styled-components";

export interface IForm {
  newCategory: string;
}

const NewCategory = styled.form`
  display: flex;
  justify-content: center;
  margin: 5px;
`;
const NewCategoryInput = styled.input`
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

function CreateCategory() {
  const [categories, setCategories] = useRecoilState(categoriesState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ newCategory }: IForm) => {
    if (newCategory !== undefined) {
      setCategories((oldCategory) => [...oldCategory, newCategory]);

      setValue("newCategory", "");
    }
  };
  return (
    <NewCategory onSubmit={handleSubmit(handleValid)}>
      <NewCategoryInput
        {...register("newCategory", { required: "New Category" })}
        placeholder="New Category"
      />
      <AddBtn>+</AddBtn>
    </NewCategory>
  );
}

export default CreateCategory;
