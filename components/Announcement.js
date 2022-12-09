import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: rgba(28, 56, 121, 0.9);
  color: white;
  display: flex;
  align-items: center;
  font-weight: 400;
  justify-content: center;
  font-size: 20px;
  letter-spacing: 1.5;
  height: 45px;
`;

const Announcement = () => {
  return <Container>Skill up in blockchain technology with biktkova, learn now!</Container>;
};

export default Announcement;