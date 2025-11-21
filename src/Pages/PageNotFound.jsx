import  { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--bg-1) 0%, var(--bg-2) 100%);
  color: white;
  text-align: center;
  padding: 2rem;
  position: relative;
  overflow: hidden;
`;

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const NotFoundText = styled.h1`
  font-size: 10rem;
  font-family: 'Orbitron', sans-serif;
  font-weight: 700;
  background: linear-gradient(45deg, var(--accent), var(--accent-2));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin: 0;
  line-height: 1;
  position: relative;
  z-index: 1;
  animation: ${float} 6s ease-in-out infinite;
  text-shadow: 0 0 30px rgba(255, 204, 51, 0.2);
`;

const Subtitle = styled.h2`
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  font-size: 1.8rem;
  margin: 1rem 0 2rem;
  color: rgba(255, 255, 255, 0.9);
`;

const BackButton = styled.button`
  background: rgba(255, 255, 255, 0.1);
  border: 2px solid var(--accent);
  color: white;
  padding: 0.8rem 2rem;
  border-radius: 50px;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 100%;
    background: linear-gradient(45deg, var(--accent), var(--accent-2));
    transition: all 0.3s ease;
    z-index: -1;
  }
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(255, 204, 51, 0.3);
    
    &::before {
      width: 100%;
    }
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const PokeBall = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  background: radial-gradient(
    circle at 30% 30%,
    rgba(255, 255, 255, 0.1) 0%,
    transparent 50%
  );
  border-radius: 50%;
  opacity: 0.6;
  z-index: 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: rgba(255, 255, 255, 0.05);
    border-radius: 50%;
  }
  
  &::before {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    box-shadow: inset 0 0 100px rgba(0, 0, 0, 0.5);
  }
  
  &::after {
    width: 80%;
    height: 80%;
    top: 10%;
    left: 10%;
    box-shadow: 0 0 50px rgba(124, 251, 255, 0.1);
  }
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  
  &::before, &::after {
    content: '';
    position: absolute;
    background: white;
    border-radius: 50%;
    opacity: 0.8;
  }
  
  &::before {
    width: 3px;
    height: 3px;
    top: 20%;
    left: 25%;
    box-shadow: 
      30px 100px white,
      50px 200px white,
      80px 150px white,
      120px 80px white,
      200px 40px white,
      250px 120px white,
      300px 80px white,
      350px 150px white;
    animation: twinkle 4s infinite;
  }
  
  &::after {
    width: 2px;
    height: 2px;
    top: 30%;
    left: 15%;
    box-shadow: 
      40px 80px white,
      80px 180px white,
      150px 60px white,
      180px 30px white,
      220px 100px white,
      280px 70px white,
      320px 120px white;
    animation: twinkle 6s infinite 1s;
  }
  
  @keyframes twinkle {
    0%, 100% { opacity: 0.2; }
    50% { opacity: 1; }
  }
`;

const PageNotFound = () => {
  const navigate = useNavigate();
  
  const goBack = () => {
    navigate("/home");
  };
  
  // Add dynamic title
  useEffect(() => {
    document.title = '404 - Page Not Found | Pokémon';
    return ()=> document.title = 'Pokémon';
  }, []);
  
  return (
    <Container>
      <Stars />
      <PokeBall />
      <NotFoundText>404</NotFoundText>
      <Subtitle>Oops! Page Not Found</Subtitle>
      <p style={{
        maxWidth: '500px',
        marginBottom: '2rem',
        color: 'rgba(255, 255, 255, 0.7)',
        lineHeight: '1.6',
        fontFamily: 'Inter, sans-serif'
      }}>
        The page you're looking for seems to have disappeared into the digital void.
        Maybe it's on a Pokémon journey of its own!
      </p>
      <BackButton onClick={goBack}>
        Back to Pokémon
      </BackButton>
    </Container>
  );
};

export default PageNotFound;
