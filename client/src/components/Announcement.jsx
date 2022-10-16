import styled from "styled-components";

const Container = styled.div`
  height: 30px;
  background-color: #2194ffcc;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 1000;
`;

const Announcement = () => {
  return <Container>Super Deal! Free Shipping on Orders Over ₹500</Container>;
};

export default Announcement;
