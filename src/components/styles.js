import styled from "vue-styled-components";

export const NavbarStyle = styled.nav`
  height: 10vh;
  background-color: #92b5c4;
  display: flex;
  align-items: center;
  padding: 0 4%;
  
  & > img {
    width: 50px;
    height: 50px;
    margin: 0 20px 0 20px;
  }

  & > b {
    font-size: 2rem;
  }
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

export const OutputContainer = styled.div`
  width: 60%;
  height: 90%;
  padding: 30px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  & > div {
    width: 100%;
    height: 80%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;

    & > h2 {
      font-size: 2rem;
    }

    & > button {
      width: 30%;
      background-color: #6d8790;
      border: none;
      border-radius: 5px;
      padding: 5px;
      color: #f0f0ef;
      font-weight: bold;
      margin-top: 50px;
      margin-left: auto;

      &:hover {
        background-color: #92b5c4;
      }
    }
  }

  h2 {
    font-size: 1.5rem;
    color: #4a4a4a;
  }
`;

export const InfoFrete = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  color: #4a4a4a;

  .info {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: #f0f0ef;
    border-radius: 0 5px 5px 0;
    width: 73%;

    .info-text {
      p {
        margin: 0;
        font-size: 1.5rem;
      }
    }
  }

  .img-container {
    background-color: #92b5c4;
    border-radius: 5px 0 0 5px;
    padding: 20px;
    width: 20%;
    height: 100%;
    margin-right: 40px;

    & > img {
      width: 100%;
    }
  }

  .price {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #f0f0ef;
    border-radius: 5px;
    padding: 10px 20px;
    width: 25%;
    height: 100%;

    p {
      margin-bottom: 5px;
      font-size: 1.5rem;
    }
  }
`;
