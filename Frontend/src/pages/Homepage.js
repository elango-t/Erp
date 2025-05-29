import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Box, Button } from '@mui/material';
import styled from 'styled-components';
import Students from '../assets/students.jpg';
import { LightPurpleButton } from '../components/buttonStyles';

const Homepage = () => {
    return (
        <StyledContainer>
            <Grid container spacing={0} justifyContent="center" alignItems="center">
                <Grid item xs={12} md={6}>
                    <StyledPaper elevation={3}>
                        <StyledTitle>
                            Welcome to
                            <br />
                            College
                            <br />
                            ERP
                        </StyledTitle>
                        <StyledText>
                            Our College ERP System streamlines management and class organization, allowing for easy addition of students and faculty. Seamlessly track attendance, assess performance, and provide feedback. Effortlessly access records, view marks, and facilitate communication between students, faculty, and administration.
                        </StyledText>
                        <StyledBox>
                            <StyledLink to="/choose">
                                <LightPurpleButton variant="contained" fullWidth>
                                    Login
                                </LightPurpleButton>
                            </StyledLink>
                            <StyledText>
                                Don't have an account?{' '}
                                <Link to="/Adminregister" style={{ color: '#550080' }}>
                                    Sign up
                                </Link>
                            </StyledText>
                        </StyledBox>
                    </StyledPaper>
                </Grid>
            </Grid>
        </StyledContainer>
    );
};

export default Homepage;

const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background: url(${Students}) no-repeat center center fixed;
  background-size: cover;
`;

const StyledPaper = styled.div`
  padding: 24px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  max-width: 600px;
  margin: 20px;
`;

const StyledBox = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  padding: 24px;
`;

const StyledTitle = styled.h1`
  font-size: 3rem;
  color: #252525;
  font-weight: bold;
  text-align: center;
`;

const StyledText = styled.p`
  margin-top: 30px;
  margin-bottom: 30px;
  text-align: center;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  width: 100%;
`;
