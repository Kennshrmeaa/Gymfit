# GymFit PH Enhancement Tasks

## 1. Workout Program Completion & Reset System ✅ Plan Approved
- [ ] Update data.js: Add program fields to ensureUserFields()
- [ ] Update workout.js: Add weekly completion check in completeWorkout()
- [ ] Update workout.js: Create showProgramCompleteModal() with user choices
- [ ] Test: Complete all 4 days → verify week increment + modal

## 2. Gmail OTP Authentication
- [ ] Create otp.js: EmailJS integration, generateOTP(), sendOTP()
- [ ] Update index.html: Add EmailJS CDN + public key
- [ ] Update auth.js: Modify doSignup() → 2-step OTP flow
- [ ] Test: Signup → receive OTP → verify → account created

## 3. GCash Payment Processing
- [ ] Create payment.js: GCash form, screenshot upload (base64), simulate processing
- [ ] Update auth.js: doSubscribe() → GCash flow with form/confirmation
- [ ] Update index.html: Add payment modal HTML
- [ ] Test: Subscribe GCash → fill form → upload → premium activated

## 4. Integration & Testing
- [ ] Update app.js/nav.js: Ensure modals integrate with nav
- [ ] Test full flows end-to-end
- [ ] Demo with browser_action

**Next step: Implement data.js fields first (foundation).**
