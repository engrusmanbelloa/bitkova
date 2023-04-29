import * as React from 'react'
import Button from '@mui/joy/Button'
import Stack from '@mui/joy/Stack'
import Modal from '@mui/joy/Modal'
import ModalClose from '@mui/joy/ModalClose'
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog'
import { useState, useEffect } from "react"
import styled from "styled-components"
import {mobile, ipad} from "../responsive"

const ModalButton = styled(Button)`
  height: 50px;
  width: 99%;
  margin-top: 50px;
  font-size: 20px;
  font-weight: 600;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background: rgba(28, 56, 121, 1);
  color: #fff;
  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121, 1);
  }
  ${ipad({height: 35, fontSize: 16, marginTop: 40})}
  ${mobile({width: "70%", marginLeft: "80%"})}
`;

const ModalCloseBTN = styled(ModalClose)`
  margin: 5px;
  color: #FFF;
  background: rgba(28, 56, 121, 1);
`;

const ModalDiv = styled(Modal)`
  background: rgba(28, 56, 121, 0.5);
`;

const ModalDialogDiv = styled(ModalDialog)`
  display: flex;
  flex-direction: column;
  background: rgba(28, 56, 121, 0.3);
`;

const ModalOptionsBtn = styled.button`
  margin: 5px auto;
  height: 40px;
  width: 70%;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5;
  letter-spacing: 1.5;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  color: #FFFFFF;
  background: rgba(28, 56, 121, 1);
  ${ipad({})}
  ${mobile({})}
`;

const AddModal = (props) => {
    const [size, setSize] = useState(undefined)
    const {modalOptions, onOptionClick, isAdmin} = props

    const handleOptionClick = (option) => {
      onOptionClick(option)
      setSize(undefined)
  }

    return (
        <>
        <Stack direction="row" alignItems="center" spacing={1}>
            <ModalButton variant="outlined" color="neutral" size="md" onClick={() => setSize('md')}>
                Create
            </ModalButton>
        </Stack>
        <ModalDiv open={!!size} onClose={() => setSize(undefined)}>
            <ModalDialogDiv aria-labelledby="size-modal-title" aria-describedby="size-modal-description" size={size}>
                <ModalCloseBTN/>
                {modalOptions && modalOptions.map((option) =>(
                  (option === "Add Team" && !isAdmin) ? null :
                  <ModalOptionsBtn key={option} onClick={() => handleOptionClick(option)}>{option}</ModalOptionsBtn>
                ))}
            </ModalDialogDiv>
        </ModalDiv>
        </>
    )
}

export default AddModal