import React from "react";
import { useFormik } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { ref, push, update } from "firebase/database";
import { db } from "../../config/firebase-config";
import { quizSchema } from "../../schemas";

const CreateQuestionnaire = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      question: "",
      correctAnswer: "",
      incorrectAnswers: ["", "", ""],
      points: 0,
    },
    validationSchema: quizSchema,
    onSubmit: async (values) => {
      const questionnaireRef = ref(db, `quizzes/${quizId}/questions`);
      const data = {
        ...values,
        points: +values.points,
        quizId,
      };

      await push(questionnaireRef, data);
      update(ref(db), {
        [`quizzes/${quizId}/id`]: quizId,
      });
      navigate(`/DisplayQuestionnaire/${quizId}`);
    },
  });

  return (
    <form
      className="flex flex-col p-5 gap-5 w-full"
      onSubmit={formik.handleSubmit}
    >
      <div className="flex ">
        <input
          type="text"
          name="question"
          placeholder="Write a Question"
          className="input input-bordered w-full"
          {...formik.getFieldProps("question")}
        />
        {formik.touched.question && formik.errors.question && (
          <p className="text-red-500">{formik.errors.question}</p>
        )}
        <div className="flex w-1/12">
          <input
            name="points"
            type="number"
            placeholder="Points"
            className="input input-bordered w-11/12 ml-3 h-13"
            {...formik.getFieldProps("points")}
          />
          {formik.touched.points && formik.errors.points && (
            <p className="text-red-500">{formik.errors.points}</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-5 pl-5 ">
        <input
          type="text"
          name="correctAnswer"
          placeholder="Write The Correct Answer"
          className="input input-bordered w-full placeholder-green-400"
          {...formik.getFieldProps("correctAnswer")}
        />
        {formik.touched.correctAnswer && formik.errors.correctAnswer && (
          <p className="text-red-500">{formik.errors.correctAnswer}</p>
        )}
        {formik.values.incorrectAnswers.map((_, index) => (
          <div key={index}>
            <input
              type="text"
              name={`incorrectAnswers[${index}]`}
              placeholder="Write The Wrong Answer"
              className="input input-bordered w-full placeholder-red-500"
              {...formik.getFieldProps(`incorrectAnswers[${index}]`)}
            />
            {formik.touched.incorrectAnswers &&
              formik.errors.incorrectAnswers &&
              formik.errors.incorrectAnswers[index] && (
                <p className="text-red-500">
                  {formik.errors.incorrectAnswers[index]}
                </p>
              )}
          </div>
        ))}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default CreateQuestionnaire;
