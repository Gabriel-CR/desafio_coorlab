import styled from "vue-styled-components";

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
