import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./Quiz.css";
import { data } from "../assets/data";

const getRandomQuestions = (arr, count) => {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Quiz = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [index, setIndex] = useState(0);
  const [questions, setQuestions] = useState(getRandomQuestions(data, 5));
  const [question, setQuestion] = useState(data[0]);
  const [lock, setLock] = useState(false);
  const [score, setScore] = useState(0);
  const [result, setResult] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [flash, setFlash] = useState(null); 

  const option1 = useRef(null);
  const option2 = useRef(null);
  const option3 = useRef(null);
  const option4 = useRef(null);
  const option_array = [option1, option2, option3, option4];

  const showFlash = (type, message) => {
    setFlash({ type, message });
    setTimeout(() => setFlash(null), 3000);
  };

  const checkAns = (e, ans) => {
    if (!lock) {
      if (question.answer === ans) {
        e.target.classList.add("correct");
        setScore((prev) => prev + 1);
      } else {
        e.target.classList.add("wrong");
        option_array[question.answer - 1].current.classList.add("correct");
      }
      setLock(true);
    }
  };

  const handleSubmitScore = async () => {
    if (!user) {
      showFlash("error", "Please login to save your score.");
      return;
    }
    setIsSubmitting(true);
    try {
      await axios.post("http://127.0.0.1:5000/api/submit_score", {
        user_id: user.id,
        score: score * 10,
      });
      showFlash("success", "Score submitted successfully!");
    } catch (error) {
      console.error(error);
      showFlash("error", "Failed to submit score.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const next = () => {
    if (!lock) return;
    if (index === questions.length - 1) {
      setResult(true);
      handleSubmitScore();
      return;
    }
    setIndex(index + 1);
    setQuestion(questions[index + 1]);
    setLock(false);
    option_array.forEach((option) => {
      option.current.classList.remove("wrong", "correct");
    });
  };

  const reset = () => {
    const newQuestions = getRandomQuestions(data, 5);
    setQuestions(newQuestions);
    setQuestion(newQuestions[0]);
    setIndex(0);
    setScore(0);
    setLock(false);
    setResult(false);
  };

  useEffect(() => {
    if (!user) window.location.href = "/login?flash=login_to_play_quiz";
  }, [user]);
  if (!user) return null;

  useEffect(() => {
    setQuestion(questions[0]);
  }, [questions]);

  return (
    <div className="container">
      <h1>Quiz App</h1>
      <hr />

      {flash && (
        <div className={`flash-popup ${flash.type}`}>{flash.message}</div>
      )}

      {result ? (
        <>
          <h2>
            You scored {score} out of {questions.length}
          </h2>
          <button onClick={reset} disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Restart Quiz"}
          </button>
        </>
      ) : (
        <>
          <h2>
            {index + 1}. {question.question}
          </h2>
          <ul>
            <li ref={option1} onClick={(e) => checkAns(e, 1)}>
              {question.option1}
            </li>
            <li ref={option2} onClick={(e) => checkAns(e, 2)}>
              {question.option2}
            </li>
            <li ref={option3} onClick={(e) => checkAns(e, 3)}>
              {question.option3}
            </li>
            <li ref={option4} onClick={(e) => checkAns(e, 4)}>
              {question.option4}
            </li>
          </ul>
          <button onClick={next} disabled={!lock}>
            Next
          </button>
          <div className="index">
            {index + 1} of {questions.length} questions
          </div>
        </>
      )}
    </div>
  );
};

export default Quiz;
