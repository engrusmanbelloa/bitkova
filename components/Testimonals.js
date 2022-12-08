import React from 'react';
import Avatar from '@mui/material/Avatar';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Rating from '@mui/material/Rating';
import styled from 'styled-components';
import { testimonials } from "../data";

const Container = styled.section`
  margin: 0px 0px 20px;
  padding: 0px 20px;
  border: 1px solid #CDDEFF;
  border-radius: 10px;
  letter-spacing: 1px;
  text-align: center;
`;

const Wrapper = styled.div`
  margin: auto;
  display: inline-grid;
  border-radius: 10px;
`;

const Button = styled.button`
  flex:1;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  height: 30px;
  width: 100%;
  font-size: 25px;
  font-weight: 600;
  margin: 0 10px 0 0;

  &:hover {
    background-color: #CDDEFF;
  }
`;

const CardBox = styled.div`
  margin: 20px 30px;
  border: 0.5px solid rgba(28, 56, 121, 0.5);
  border-radius: 10px;

  &:hover {
    animation: pulse;
    animation-duration: 1s;
  }
`;

const Title = styled.h4`
  margin: 2px;
  text-align: center;
  font-size: 14px;
`;

const Comment = styled.p`
  font-size: 12px;
  margin: 5px;
  text-align: center
`;

const Review = styled.div`
  margin-top: 10px;
  text-align: center
`;

export const Testimonals = ()=> {

  const [value, setValue] = React.useState(3);
  
  return (
    <Container>
    <Button>Testimonals</Button>
    {testimonials.map((review) => (
    <Wrapper key={review.id}>
    <CardBox>
    <Card variant="elevation" elevation={15} sx={{width: 230,}}>
      <CardMedia
        sx={{width: 250, padding: 10}}
        image={review.bg}
        alt="Picture of the author"
      />
      <Avatar sx={{width: 150, height: 150, margin: "auto", marginTop: -15}} src={review.img} />
      <CardContent>
          <Title>{review.name}</Title>
          <Comment>{review.comment}</Comment>
          <Review>
          <Rating
            name="half-rating"
            value={review.value}
          />
          </Review>
      </CardContent>
    </Card>
    </CardBox>
    </Wrapper>
    ))}
    </Container>
  );
};

export default Testimonals;