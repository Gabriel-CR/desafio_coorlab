import styled from "vue-styled-components";

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
