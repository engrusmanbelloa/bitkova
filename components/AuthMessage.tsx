import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`
const pulse = keyframes`
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
`
const AuthMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px auto;
    padding: 10px;
    max-width: 300px;
    background: ${(props) => props.theme.palette.primary.main};
    border-radius: 8px;
    box-shadow: 0 10px 10px ${(props) => props.theme.mobile.offWhite};
    animation: ${fadeIn} 0.5s ease-out;
    position: relative;
    overflow: hidden;
`
const AuthTitle = styled.p`
    color: ${({ theme }) => theme.palette.common.white};
    margin: 0 auto;
    text-align: center;
`
const AuthButton = styled.button`
    background: ${({ theme }) => theme.palette.common.white};
    color: #667eea;
    border: none;
    border-radius: 8px;
    padding: 12px 32px;
    font-size: 15px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
        background: #f8f9ff;
    }

    &:active {
        transform: translateY(0);
    }
`

interface AuthMessageProps {
    onAction?: () => void
    actionText?: string
    message?: string
}

export default function AuthMessage({
    onAction,
    actionText = "Sign In",
    message,
}: AuthMessageProps) {
    return (
        <AuthMessageContainer>
            <AuthTitle>{message}</AuthTitle>
            {onAction && <AuthButton onClick={onAction}>{actionText}</AuthButton>}
        </AuthMessageContainer>
    )
}
