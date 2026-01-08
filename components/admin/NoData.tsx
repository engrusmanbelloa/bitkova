import React from "react"
import styled from "styled-components"
import { mobile, ipad } from "@/responsive"

const Container = styled.div``
const Wraper = styled.div`
    margin: auto;
    text-align: center;
`
const NotAvailable = styled.img`
    width: 500px;
    height: 200px;
    margin: 10px auto;
    border-radius: 8px;
    object-fit: cover;
    ${mobile(
        (props: any) => `
        width: ${props.theme.widths.mobileWidth};
    `,
    )}
`
const Text = styled.p`
    font-size: 14px;
    color: #666;
    margin-top: 20px auto;
`
interface CommentProp {
    comment: String
}

export default function NoDataAvailable({ comment }: CommentProp) {
    return (
        <Container>
            <Wraper>
                <NotAvailable src="/notavailable.png" alt="not available" />
                <Text>{comment}</Text>
            </Wraper>
        </Container>
    )
}
