import styled from "styled-components";
import {NavLink} from "react-router-dom";

export const SidebarContainer = styled.div`
  width: var(--sidebar-width);
  z-index: 99;
  background: #fff;
  bottom: 0;
  margin-top: 0;
  position: fixed;
  top: var(--navbar-height);
  box-shadow: 0 2px 4px rgba(0,0,0,.08);
  height: calc(100vh - var(--navbar-height));
  display: flex;
  flex-direction: column;
`

export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: auto;
  max-height: calc(100vh - var(--navbar-height));
  scrollbar-color: #d3d3d3 #fff;
  scrollbar-width: thin;
  
  &::-webkit-scrollbar {
    width: 8px;
    
  }

  &::-webkit-scrollbar-thumb {
    background-color: #d3d3d3;
    border-radius: 4px;
  }
`

export const MenuItem = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 20px 24px;
  color: #383c40;
  border-left: 2px solid transparent;
  transition: .2s ease;
  
  &:hover, &.active {
    color: var(--primary);
    border-color: var(--primary);
    background-color: #3051d312;
  }
`

MenuItem.Title = styled.div`
  font-size: 16px;
  margin-left: 16px;
  transition: .2s ease;
  font-weight: 600;
`