import React from 'react'
import styled from 'styled-components';

const Top = styled.div`
  justify-content: center;
  align-items: center;
  display: flex; 
  color: #fff;
`;

const Button = styled.button`
  flex:1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
  font-size: 20px;
  font-weight: 600;
  margin: 0 10px 0 0;

  &:hover {
    background-color: #CDDEFF;
  }
`;
const SeeAll = () => {
  return (
    <div>
        <Top>
            <Button>See All</Button>
        </Top>
    </div>
  )
}

export default SeeAll;