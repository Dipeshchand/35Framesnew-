// import express from "express";
// import jwt from "jsonwebtoken"

// const router = express.Router();

// router.post("/login",(req,res)=>{
//     const{email, password}= req.body;

//     if(email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD)
//     {
//         return res.status(401).json({error:"Invalid credentails"})
//     }
//     const token = jwt.sign(
//         {email},process.env.JWT_SECRET,{expiresIn:"7d"}
//     );
//     res.json({token});
// });

// export default router;

import express from "express";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Normalize input
  const inputEmail = email.trim().toLowerCase();
  const inputPassword = password.trim();

  const adminEmail = process.env.ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.ADMIN_PASSWORD?.trim();

  // Debug logs (remove later)
  console.log("Entered:", inputEmail, inputPassword);
  console.log("Expected:", adminEmail, adminPassword);

  if (inputEmail !== adminEmail || inputPassword !== adminPassword) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { email: inputEmail },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );

  res.json({ token });
});

export default router;