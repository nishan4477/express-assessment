import { Router } from "express";

/**
 * PLEASE LEAVE THIS FILE UNCHANGED
 */

const router = Router();

router.post("/", (req, res) => {
  const { amount } = req.body;

  res.status(200).json({ amount });
});

export default router;
