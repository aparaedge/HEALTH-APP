import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const CardContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Card = styled.div`
  width: 100%;
  max-width: 350px;
  height: 190px;
  color: black;
  background-color: white;
  border-radius: 10px;
  box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.2);
  padding: 30px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const IconContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

const Icon = styled.i`
  font-size: 100px;
  box-shadow: 0px 5px 15px rgba(0, 0, 0, 0.2);
`;

const Price = styled.label`
  font-size: 20px;
  font-weight: 900;
`;

const Inputs = styled.div`
  margin-top: 20px;
  width: 100%;
`;

const Span = styled.span`
  padding: 5px 0;
  display: block;
`;

const Select = styled.select`
  border: none;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 20px 20px 0 0;
  margin-bottom: 10px;
  &:focus {
    outline: none;
  }
`;

const Input = styled.input`
  border: none;
  width: 100%;
  padding: 10px 15px;
  box-sizing: border-box;
  border-radius: 0 0 20px 20px;
  &:focus {
    outline: none;
  }
`;

const CardComp = ({ iconClass, price, dimensions, count }) => {
  return (
    <CardContainer>
      <Card>
        <IconContainer>
          <Icon className={iconClass} />
        </IconContainer>
        <Price>Price: {price}</Price>
        <Inputs>
          <Span>Dimension:</Span>
          <Select>
            {dimensions.map((dimension, index) => (
              <option key={index}>{dimension}</option>
            ))}
          </Select>
          <Span>Count</Span>
          <Input type="number" value={count} />
        </Inputs>
      </Card>
    </CardContainer>
  );
};

CardComp.propTypes = {
  iconClass: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  dimensions: PropTypes.arrayOf(PropTypes.string).isRequired,
  count: PropTypes.number.isRequired,
};

export default CardComp;
