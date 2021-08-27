import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  getAllQuestions,
  selectAllQuestions,
} from "../features/quiz/quizSlice";
import { Pane, Heading, majorScale } from "evergreen-ui";
import Head from "../components/common/Head";
import Layout from "../components/common/Layout";
import Spinner from "../components/common/Spinner";
import Option from "../components/quiz/Option";

const Quiz: NextPage = () => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const dispatch = useAppDispatch();
  const { questions, isPending, isError } = useAppSelector(selectAllQuestions);

  useEffect(() => {
    dispatch(getAllQuestions());
  }, []);

  const handleSelectOption = () => {
    goToNextQuestion();
  };

  const goToNextQuestion = () => {
    if (isHasNextQuestion(currentQuestionIndex)) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const isHasNextQuestion = (currentQuestionIdx: number) => {
    return currentQuestionIdx < questions.length - 1;
  };

  return (
    <>
      <Head pageName="Quiz" description="" />
      <Layout>
        {isPending ? <Spinner /> : null}
        {!isPending && questions.length !== 0 ? (
          <Pane
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
          >
            <Heading size={900} margin={majorScale(5)} width={800}>
              {questions[currentQuestionIndex].questions.questionText}
            </Heading>
            <Pane
              display="flex"
              flexDirection="column"
              alignItems="center"
              justifyContent="center"
            >
              {questions[currentQuestionIndex].listOptions.map((option) => (
                <Option
                  width={800}
                  margin={majorScale(2)}
                  onClick={handleSelectOption}
                  key={option.content}
                >
                  {option.content}
                </Option>
              ))}
            </Pane>
          </Pane>
        ) : null}
      </Layout>
    </>
  );
};

export default Quiz;
