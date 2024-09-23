'use client'
import styled from "styled-components"
import {mobile, ipad} from "../responsive"

const SetUpdate = styled.div`
  font-size: 18px;
  margin: 10px auto;
  font-weight: 400;
  color: #fff;
  width: 10%;
  padding: 10px;
  border-radius: 5px;
  border: 0.5px solid;
  box-shadow: 5px 5px #CDDEFF;
  text-align: center;
  background: rgba(28, 56, 121, 1);
  ${ipad({width: "80%"})}
  ${mobile({})}
`;

export default function IsLoading() {
  return (
    <SetUpdate>Loading</SetUpdate>
  )
}
