import React from "react"
import styled from "styled-components"
const Container = styled.div``
const NotAvailable = styled.img`
    width: 300px;
    height: 200px;
    margin: 10px auto;
    border-radius: 8px;
    object-fit: cover;
    margin-right: 15px;
`
const Text = styled.p`
    font-size: 14px;
    color: #666;
    margin-top: 20px auto;
`

export default function NoDataAvailable() {
    return (
        <Container>
            <NotAvailable src="/notavailable.png" alt="not available" />
            <Text>No Data Available in this Section</Text>
        </Container>
    )
}
