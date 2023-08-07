import { Helmet } from 'react-helmet-async';
import { useTheme } from '@mui/material/styles';
// import QuizData from './QuizData';
import React, { useState,useEffect} from 'react';
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
  const [newTab, setNewTab] = useState(false);

  const totalScore = question.length;

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
      setNewTab(true);
    }
  };
  const resetAll = () => {
    setCurrentQuestion(0);
    setClicked(0);
    setScore(0);
    setResult(false);
    setNewTab(false)
  };

 
  return (
    <>
      <Helmet>
        <title> Quiz Questions </title>
      </Helmet>
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h3" gutterBottom>
            Quiz Question's
          </Typography>
        </Stack>
      </Container>
      {newTab ? (
        <Grid container sx={{ mb: 5 }}>
          <Grid item xs={11}>
            <Card direction="row">
              <Grid sx={{ m: 4 }}>
                <Typography>{score > 5 ? "Well Played" : "Good"}</Typography>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      ) : (
        <Grid container sx={{ mb: 12 }}>
          <Grid item xs={11}>
            <Card direction="row">
              <Grid sx={{ m: 4 }}>
                <Typography sx={{ fontWeight: 'bold' }}>
                  {currentQuestion + 1}. {question[currentQuestion].question}
                </Typography>
                <Typography>
                  {question[currentQuestion].options.map((value, i) => {
                    return (
                      <Typography sx={{ display: 'inline-flex', justifyItems: 'center' }} key={i}>
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
      <Typography>
        {result ? (
          <Grid container sx={{ mb: 12 }}>
            <Grid item xs={11}>
              <Card direction="row" alignItems="center" justifyContent="space-between">
                <Grid sx={{ m: 4 }}>
                  <Typography>
                    {' '}
                    Your Score is : <b>{score}</b>
                  </Typography>
                  <Typography>
                    {' '}
                    Totall Question is : <b>{totalScore}</b>
                  </Typography>
                  <Button onClick={resetAll}>TryAgain</Button>
                </Grid>
                <Typography sx={{ mb: 2, m: 4 }}>
                  <Typography>
                    Right <span style={{ color: 'rgb(24, 125, 235)', fontWeight: 'bold' }}>Answer</span> is this
                  </Typography>
                  {question.map((value, i) => {
                    return (
                      <Typography sx={{}} key={i}>
                        <Typography>
                          Question No. {i + 1}.&nbsp;&nbsp;&nbsp;{value.answer}{value.options === answer}
                        </Typography>
                      </Typography>
                    );
                  })}
                </Typography>
              </Card>
            </Grid>
          </Grid>
        ) : null}
      </Typography>
    </>
  );
}
