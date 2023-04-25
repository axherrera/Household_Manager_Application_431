import { NavLink as Link } from "react-router-dom";
import styled from "styled-components";
  
export const Nav = styled.nav`
  background: #c2c2c2;
  height: 5rem;
  display: flex;
  justify-content: space-around;
`;
  
export const NavLink = styled(Link)`
  color: #000000;
  display: flex;
  align-items: center;
  padding: 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
  &.active {
    text-decoration: underline;
  }
`;
  
export const NavMenu = styled.div`
  display: flex;
  align-items: center;
`;