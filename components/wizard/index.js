import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { GradientBackground } from "../Layout";

import { Step1, Step2, Step3, Step4, Step5 } from "./Steps";
import SEO from "../SEO";

export const WizardContext = React.createContext({});

export default function Wizard(props) {
  const router = useRouter();

  const { data, setData } = useContext(WizardContext);
  const [step, setStep] = useState(0);

  useEffect(() => {
    const { step: queryStep } = router.query;

    if (queryStep) {
      setStep(parseInt(queryStep));
    } else {
      if (!data.isDone) {
        setStep(0);
      }
    }
  }, [router.query.step]);

  useEffect(() => {
    if (step >= 4) {
      setData((prevData) => ({ ...prevData, isDone: true }));
    } else {
      setData((prevData) => ({ ...prevData, isDone: false }));
    }
  }, [step]);

  const onClickNext = (e, nextStep) => {
    e.preventDefault();
    router.push(`/?step=${nextStep || step + 1}`);
  };

  const onClickBack = (e) => {
    e.preventDefault();
    router.push(`/?step=${step - 1}`);
  };

  const handleInput = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setData((prevState) => ({ ...prevState, [name]: value }));
  };

  const steps = [Step1, Step2, Step3, Step4, Step5];
  const Step = steps[data.isDone ? 4 : step];

  return (
    <>
      <SEO
        title="Create new blog"
        description="Use this simple wizard to create a new blog. Based on Next.js, Tailwind 3.0 and MDX. Deploy straight to Netlify."
      />
      <div className="w-full h-full min-h-screen flex flex-col items-center justify-center px-4">
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
      {!data.isDone && (
        <GradientBackground
          variant="large"
          className="fixed top-20 opacity-40 dark:opacity-60"
        />
      )}
    </>
  );
}
