export const validateUserInfo = (req, res, next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const occupation = req.body.occupation;
  const avatarURL = req.body.avatarURL;

  if (!firstName)
    return res
      .status(400)
      .json({ success: false, message: "First Name is required" });
  if (!lastName)
    return res
      .status(400)
      .json({ success: false, message: "last Name is required" });
  if (!email)
    return res
      .status(400)
      .json({ success: false, message: "email is required" });
  if (!occupation)
    return res
      .status(400)
      .json({ success: false, message: "occupation is required" });
  if (!avatarURL)
    return res
      .status(400)
      .json({ success: false, message: "Please upload a photo" });
  next();
};
