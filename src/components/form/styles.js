import styled from "vue-styled-components";

export const FormContainer = styled.form`
  width: 35%;
  height: 90%;
  padding: 20px;
  background-color: #f0f0ef;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 8%;

  .title {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 10px;
    width: 100%;

    & > img {
      width: 50px;
    }

    & > h1 {
      font-size: 2rem;
    }
  }

  h1 {
    font-size: 1.5rem;
    color: #4a4a4a;
  }

  & > button {
    width: 50%;
    background-color: #6d8790;
    border: none;
    border-radius: 5px;
    padding: 5px;
    color: #f0f0ef;
    font-weight: bold;

    &:hover {
      background-color: #92b5c4;
    }
  }
`;

export const InputContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;

  & > label {
    font-size: 1rem;
    font-weight: bold;
    color: #4a4a4a;
  }

  & > input {
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #4a4a4a;

    &::placeholder {
      color: #4a4a4a;
    }
  }

  & > select {
    margin-top: 10px;
    padding: 7px;
    border-radius: 5px;
    border: 1px solid #4a4a4a;
    color: #4a4a4a;
    background-color: #fff;

    /* colocar o background-color do option igual ao do input */
    & > option {
      color: #4a4a4a;
      background-color: #f0f0ef;
      height: 30px;
    }
  }
`;
