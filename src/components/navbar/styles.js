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
