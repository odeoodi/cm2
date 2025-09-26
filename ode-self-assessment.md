# Self Assessment CM 2 #

- The backend code was surprisingly easy to do, because we had done the same things in our own project in the beginning of this week. 
- We tested that the code works with Postman.

## LLM Assessed code: ##
Your userController.js is solid and functional. It covers a good range of user-related operations — registration, login, and full CRUD. That said, there are some improvements and best practices you should consider for security, code clarity, error handling, and code structure.

🔍 Assessment & Feedback
✅ What’s Good

✅ Uses bcrypt for password hashing (secure).

✅ Uses jsonwebtoken for stateless auth (standard practice).

✅ Validation with validator for email and password.

✅ Checks for required fields during signup and login.

✅ Uses async/await with try/catch properly.

✅ Clean and organized structure with clear function names.

✅ Uses mongoose.Types.ObjectId.isValid() to validate Mongo IDs.

🛠️ Suggestions for Improvement
🔐 1. Security: Don't expose email in response

In signupUser and loginUser, you return { email, token }.

❌ Problem: Email exposure is unnecessary; a malicious actor can infer valid accounts by brute-forcing emails.

✅ Fix:

res.status(200).json({ token });

🔒 2. User info leakage on GET routes

Your getAllUsers and getUserById expose all user fields including hashed passwords.

❌ Major security risk.

✅ Fix: Exclude sensitive fields (e.g. password) with .select():

const users = await User.find({}).select("-password");


Same for getUserById.

🧱 3. Separation of Concerns: Signup vs CreateUser

You have both signupUser and createUser.

⚠️ signupUser is secure and validates input, while createUser does a blind .create({ ...req.body }).

❗If createUser is used for admin purposes, it must validate and hash password too.

✅ Suggestion:

Rename to createUserAdmin and add validation.

Or, don’t expose createUser route publicly.

🧹 4. Cleanup and Optimization

The userSchema comment at the top can be removed (or moved to the userModel.js if needed).

Typo: //console.err(err); → should be removed or fixed.
