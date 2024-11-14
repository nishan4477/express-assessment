/**
 * Write your stealAmount middleware here
 */

export const stealAmount = (req, res, next) => {
  if (req.body.amount && req.body.secure !== true) {
    req.body.amount = req.body.amount / 2;
  }
  next();
};
