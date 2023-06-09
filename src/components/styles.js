import styled from "vue-styled-components";

export const Navbar = styled.nav`
  height: 10vh;
  background-color: #92b5c4;
  display: flex;
  flex-direction: row;
  align-items: center;

  & > img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 20px;
  }
`;

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

  & > h1 {
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

export const OutputContainer = styled.div`
  width: 60%;
`;

export const MainContainer = styled.div`
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 0 3%;
`;
