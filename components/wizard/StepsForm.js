import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GradientBackground } from "../Layout";

import { Step1, Step2, Step3, Step4, Step5 } from "./Steps";

export default function StepsForm(props) {
  const router = useRouter();

  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  useEffect(() => {
    const { step: queryStep } = router.query;

    if (queryStep) {
      setStep(parseInt(queryStep));
    } else {
      setStep(0);
    }
  }, [router.query.step]);

  const onClickNext = (e) => {
    e.preventDefault();
    router.push(`/wizard?step=${step + 1}`);
  };

  const onClickBack = (e) => {
    e.preventDefault();
    router.push(`/wizard?step=${step - 1}`);
  };

  const handleInput = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const Step = steps[step];

  return (
    <>
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center">
        <Step
          onClickNext={onClickNext}
          onClickBack={onClickBack}
          handleInput={handleInput}
          data={data}
          step={step}
          setData={setData}
          {...props}
        />
      </div>
      <GradientBackground
        variant="large"
        className="fixed left-0 top-20 opacity-40 dark:opacity-60"
      />
    </>
  );
}
