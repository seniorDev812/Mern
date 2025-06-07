const changePasswordNotification = (user) => {
  return {
    subject: "Password Changed",
    body: `
      <h1>Password Changed</h1>
      <p>Your password has been changed successfully.</p>
      <p>If you didn't make this change, please contact support immediately.</p>
    `,
  };
};

export { changePasswordNotification };
