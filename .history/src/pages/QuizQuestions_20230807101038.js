import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
// import QuizData from './QuizData';
import React, { useState } from 'react';
import { Grid, Card, Stack, Button, Container, Typography } from '@mui/material';
import { Data } from './Data';
import './Quiz.css';

export default function QuizQuestion() {
  const theme = useTheme();
  const [question, setQuestion] = useState(Data);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [clicked, setClicked] = useState(0);
  const [result, setResult] = useState(false);
  const [answer, setAnswer] = useState(false);

  const changeQuestion = () => {
    if (clicked === question[currentQuestion].answer) {
      setScore(score + 1);
    }
    if (currentQuestion < question.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setClicked(0);
    } else {
      setResult(true);
      setAnswer(true);
    }
  };
  const resetAll = () => {
    setCurrentQuestion(0);
    setClicked(0);
    setScore(0);
    setResult(false);
  };

  console.log(score);
  return (
    <>
      <Helmet>
        <title> User | Minimal UI </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Quiz Question's
          </Typography>
        </Stack>
      </Container>
      {result ? (
        <Grid container spacing={3} sx={{ mb: 12 }}>
          <Grid item xs={8}>
            <Card direction="row" alignItems="center" justifyContent="space-between">
              <Grid spacing={5} sx={{ m: 4 }}>
                <div> Your Score is : {score}</div>
                <Button onClick={resetAll}>TryAgain</Button>
              </Grid>
              <Typography sx={{ mb: 2, m: 4 }}>
                <Typography>
                  Right <span style={{ color: 'rgb(24, 125, 235)', fontWeight: 'bold' }}>Answer</span> is this
                </Typography>
                {question.map((value, i) => {
                  return (
                    <Typography sx={{}}>
                      <Typography>
                        {i + 1}. {value.answer}
                      </Typography>
                    </Typography>
                  );
                })}
              </Typography>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container spacing={3} sx={{ mb: 12, }}>
          <Grid item xs={8}>
            <Card direction="row" alignItems="center" justifyContent="space-between">
              <Grid spacing={5} sx={{ m: 4 }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {currentQuestion + 1}. {question[currentQuestion].question}
                </Typography>
                <Typography>
                  <br/>
                  {question[currentQuestion].options.map((value, i) => {
                    return (
                      <Typography sx={{ display: 'inline-flex', justifyItems: 'center' }}>
                        <Button
                          variant="dark"
                          className={`${clicked === i + 1 ? 'checked' : null}`}
                          onClick={() => setClicked(i + 1)}
                        >
                          {value}
                        </Button>
                      </Typography>
                    );
                  })}
                </Typography>
                <br/>
                <Button
                  onClick={() => {
                    changeQuestion();
                  }}
                >
                  SUBMIT
                </Button>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      )}
    </>
  );
}
