import * as React from 'react';
import Card from '@mui/material/Card';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import Image from 'next/image'
import styled from 'styled-components';
import "animate.css/animate.min.css";
import { AnimationOnScroll } from 'react-animation-on-scroll';
import { newsList } from "../data";

const Container = styled.section`
  margin:40px 0px;
  padding: 0px 0px;
  border: 1px solid #CDDEFF;
  border-radius: 10px;
  letter-spacing: 1px;
  text-align: center;
`;

const Wrapper = styled.div`
  display: inline-block;
  margin: 0px 20px;
  height: 100%;
  width: 30%;
  border: 0.5px solid rgba(28, 56, 121, 0.5);
  border-radius: 3px;

  &:hover {
    animation: pulse;
    animation-duration: 1s;
  }
`;
const Button = styled.button`
  padding: 10px;
  background: rgba(28, 56, 121);
  color: #fff;
  font-size: 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #CDDEFF;
    color: rgba(28, 56, 121);
  }
`;

const Box = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 0 10px;
`;

const InfoContainer = styled.div`
  padding: 5px;
  borderRadius: 3px;
`;

const ImageBox = styled.div`
  justify-content: center;
  text-align: center;
`;

const Title = styled.h1`
  margin: 2px;
  text-align: left;
`;

const Subheader = styled.h5`
  margin: 10px;
  font-size: 20px;
  text-align: left;
`;

const Paragraph = styled.p`
  margin: 5px;
  font-size: 20px;
  text-align: left;
`;

const News = () => {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Container>
        <Card variant="elevation" elevation={20} sx={{m: 2, borderRadius: 2}}>
        <Box>
        <Title>LATEST NEWS</Title>
        <Button>See more news</Button>
        </Box>
        {newsList.map((news) => (
        <Wrapper key={news.id}>
            <ImageBox>
            <Image src={news.img} alt="Picture of the author" width={500}height={220}/>
            </ImageBox>
            <InfoContainer>
              <Title>{news.title}</Title>
              <Subheader>{news.date}</Subheader>
              <Paragraph>{news.desc}</Paragraph>
              <Box style={{justifyContent: "center", cursor: "pointer"}}>
              <FavoriteIcon sx={{m: 1}}/>
              <ShareIcon sx={{m: 1}} />
              </Box>
          </InfoContainer>
          </Wrapper>
          ))}
        </Card>
    </Container>
  );
}

export default News;