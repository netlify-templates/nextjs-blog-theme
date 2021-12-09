function Step5({ onClickNext, step, data, setData, handleInput }) {
  const getGithubToken = async () => {
    const params = {
      client_id: "bb1d942917ee55817ed4",
      scope: "user:read repo public_repo",
    };

    const { code } = await loginWithGithub(params);
    const user = await fetch(`/api/github-auth?code=${code}`);

    const { token } = await user.json();

    return token;
  };

  const handleClick = async () => {
    const token = await getGithubToken();

    const githubUserResponse = await fetch("https://api.github.com/user", {
      headers: { Authorization: `token ${token}` },
    });

    const githubUser = await githubUserResponse.json();

    console.log({ token });
    if (githubUser) {
      setData((prevState) => ({
        ...prevState,
        githubUser,
        githubToken: token,
      }));
    }
  };

  // const createRepo = async () => {
  //   const response = await fetch(
  //     `https://api.github.com/repos/thomkrupa/nextjs-test/generate`,
  //     {
  //       method: "POST",
  //       headers: {
  //         Authorization: `token ${data.githubToken}`,
  //         Accept: "application/vnd.github.v3+json",
  //       },
  //       body: JSON.stringify({
  //         name: data.repoName,
  //         private: true,
  //       }),
  //     }
  //   );

  //   const repo = await response.json();

  //   console.log({ repo });
  // };

  const createRepo = async () => {
    console.log({ data });
    const resposne = await fetch("/api/github-clone", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: JSON.stringify({
        name: data.repoName,
        token: data.githubToken,
      }),
    });

    const repoData = await resposne.json();

    console.log({ repoData });
  };

  return (
    <WizardContent step={step}>
      <WizardPreheader>Howdy, {data.name}</WizardPreheader>

      <WizardTitle>Connect Github</WizardTitle>
      <div className="mb-8">
        {data?.githubUser ? (
          <>
            <div className="grid grid-cols-2 gap-x-4">
              <div>
                <WizardInput value={`@${data?.githubUser.login}`} disabled />
              </div>
              <div>
                <div className="p-4 rounded-xl border border-gray-200 bg-white shadow-md dark:text-white dark:bg-gray-700 dark:border-gray-500">
                  <p>
                    {" / "}
                    <input
                      name="repoName"
                      value={data["repoName"]}
                      onChange={handleInput}
                      className="text-gray-500 bg-transparent text-gray-700 dark:text-white"
                    />
                  </p>
                </div>
              </div>
            </div>
            <div>
              <WizardButton
                as="a"
                href={`/wizard?step=${step + 1}`}
                onClick={onClickNext}
                icon={<ArrowIcon color="text-white" />}
              >
                Preview
              </WizardButton>
            </div>

            <div>
              <WizardButton
                as="button"
                onClick={createRepo}
                icon={<ArrowIcon color="text-white" />}
              >
                Preview
              </WizardButton>
            </div>
          </>
        ) : (
          <button onClick={handleClick}>Connect GitHub</button>
        )}
      </div>
    </WizardContent>
  );
}
