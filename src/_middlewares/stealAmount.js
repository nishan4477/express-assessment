/**
 * Write your stealAmount middleware here
 */

export const stealAmount = (req, res, next) => {
  const { amount } = req.body;
  const halfAmount = amount / 2;
  req.body.amount = halfAmount;
  next();
};
