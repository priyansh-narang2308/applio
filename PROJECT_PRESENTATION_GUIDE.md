# Applio — Project Presentation & Viva Guide

This guide gives you an exact, step-by-step presentation script, live demonstration flow, codebase navigation reference, and anticipated viva/teacher questions with model answers.

---

## 1. The 30-Second Elevator Pitch (Opening Statement)

> _"Good morning/afternoon, Sir/Ma'am. My project is **Applio**, a production-ready, full-stack Job Application Tracker built on the MERN stack (React 19 with Tailwind CSS, Node.js with Express, and MongoDB Atlas)._
>
> _During job hunts, students and developers apply to dozens of companies across different platforms like LinkedIn, Naukri, and company portals. Spreadsheets become chaotic and lack workflow automation. Applio solves this by providing a unified recruitment pipeline with real-time status transitions (`Applied` ➔ `Interview` ➔ `Offer` ➔ `Rejected`), instant data aggregation metrics, multi-parameter search and sorting, and secure JWT authentication."_

---

## 2. How to Run the Application (Before the Demo Starts)

You only need **one single command** run from the root directory:

```bash
npm run dev
```

### What happens behind the scenes:

- Uses `concurrently` defined in root [package.json](file:///Users/priyanshnarang/Desktop/fsf/package.json).
- Concurrently launches:
  - **Backend API**: `http://localhost:5001` (prefixed in blue `[backend]`)
  - **Frontend Dev Server**: `http://localhost:5173` (prefixed in cyan `[frontend]`)
  - Connects to **MongoDB Atlas cloud database**.

Open your browser to: **`http://localhost:5173`**

---

## 3. Step-by-Step Live Demo Script (What to Do & Say)

Follow these 6 steps sequentially during your demonstration:

### Step 1: Protected Dashboard & Authentication Flow

- **What to do:**
  1. Open `http://localhost:5173`. You will land on the clean, minimalist Landing Page.
  2. Click the **"Visit Dashboard"** or **"Open Dashboard"** button without being logged in.
  3. The **Auth Modal** immediately pops up, demonstrating route protection.
  4. Log in using the demo account:
     - **Email:** `demo@applio.dev`
     - **Password:** `password123`
       _(Or create a new account via the "Create Free Account" tab)_.
- **What to say:**
  > _"First, notice that the dashboard is strictly protected. An unauthenticated visitor cannot access the dashboard data. When they click 'Visit Dashboard', our state guard intercepts the action and presents the Auth Modal. Authentication uses JSON Web Tokens (JWT) and passwords are encrypted with bcrypt salts."_

---

### Step 2: Dashboard Overview & Pipeline Metrics

- **What to do:**
  1. Once logged in, the application transitions to the Dashboard page.
  2. Point your cursor at the **5 Metric Cards** at the top:
     - **Total Applications**
     - **Applied**
     - **In Interview**
     - **Offers Received**
     - **Rejected**
- **What to say:**
  > _"At the top of the dashboard, we have 5 summary cards. These cards are not hardcoded numbers; they are dynamically computed on the backend via our aggregation route `/api/applications/stats`. Whenever an application status is updated or added, these counts re-synchronize immediately."_

---

### Step 3: Interactive Status Workflow (Inline Transitions)

- **What to do:**
  1. In the application table, find any application (e.g., _Swiggy_ which is currently `Applied`).
  2. Click on its status dropdown badge and change it directly to **`Interview`**.
  3. Notice how the status pill changes color, and the top metrics cards update without requiring a full page refresh.
- **What to say:**
  > _"One of our core rubric features is the Recruitment Status Workflow. Instead of opening a heavy modal just to update a candidate stage, the user can change status inline directly from the table badge. This triggers a lightweight `PATCH /api/applications/:id/status` request, maintaining high responsiveness."_

---

### Step 4: Adding a New Application

- **What to do:**
  1. Click the black **"+ Add Application"** button in the top-right toolbar.
  2. Fill in the modal form:
     - **Company Name:** Google
     - **Role / Position:** Software Engineer (Frontend)
     - **Job Link:** `https://careers.google.com`
     - **Expected / Offered CTC:** ₹35,00,000 / yr
     - **Application Date:** Today's date
     - **Status:** Interview
     - **Interview Date:** Select a date next week
     - **Notes:** Recruiter reached out on LinkedIn. Preparation focus on Data Structures and React internals.
  3. Click **"Save Application"**.
- **What to say:**
  > _"When creating an application, our form supports conditional fields. For example, selecting the 'Interview' status reveals an 'Interview Date' picker. On submit, this makes a `POST` request to our Express backend, validates the required fields, and persists the document into MongoDB Atlas."_

---

### Step 5: Real-time Search, Status Filtering, and Sorting

- **What to do:**
  1. **Search:** In the search bar, type `Google` or `React`. Notice the table filters down in real time.
  2. **Status Tabs:** Click on the tabs in the sidebar or top filter (e.g., click **"Interview"** or **"Offer"**). Notice only relevant status rows display.
  3. **Sorting:** Click the "Sort by" dropdown:
     - Choose **Company (A-Z)** ➔ Table sorts alphabetically.
     - Choose **Oldest First** ➔ Table re-orders by application date.
     - Choose **Newest First** ➔ Default order.
- **What to say:**
  > _"For managing high volumes of applications, we implemented multi-mode filtering. We have instant client-side keyword search matching both company name and job title, category tabs for fast status isolation, and dynamic sorting by date or company name."_

---

### Step 6: Custom Delete Confirmation Modal

- **What to do:**
  1. Click the trash can icon on the test application you just created (or any application).
  2. Point out that rather than a generic browser `window.confirm()`, a custom modal dialog appears with warning text and Cancel / Delete buttons.
  3. Click **"Delete Application"**.
  4. The record is removed, and the metrics adjust immediately.
- **What to say:**
  > _"For destructive operations like deletion, we implemented a custom modal confirmation dialog rather than standard browser alerts to ensure a clean, professional SaaS user experience. It calls `DELETE /api/applications/:id` and updates the UI state."_

---

## 4. Full API Architecture & Routes Reference

If the teacher asks: _"What routes do you have?"_ or _"Show me your REST API structure"_:

| Method   | Endpoint                       | Description                                                  | Protected?         |
| :------- | :----------------------------- | :----------------------------------------------------------- | :----------------- |
| `POST`   | `/api/auth/register`           | Register new user (hashes password with bcrypt)              | Public             |
| `POST`   | `/api/auth/login`              | Authenticate user, return JWT token & user info              | Public             |
| `GET`    | `/api/auth/me`                 | Fetch logged-in user profile from JWT                        | Yes (Bearer Token) |
| `GET`    | `/api/applications`            | Retrieve applications (supports `search` & `status` filters) | Public/User        |
| `GET`    | `/api/applications/stats`      | Aggregate pipeline metric counts                             | Public/User        |
| `GET`    | `/api/applications/:id`        | Get single application details                               | Public/User        |
| `POST`   | `/api/applications`            | Create and validate a new application record                 | Public/User        |
| `PUT`    | `/api/applications/:id`        | Full update of existing application                          | Public/User        |
| `PATCH`  | `/api/applications/:id/status` | Partial update for inline status transitions                 | Public/User        |
| `DELETE` | `/api/applications/:id`        | Delete an application by MongoDB `_id`                       | Public/User        |

---

## 5. Codebase Navigation: "Show Me Where You Did X"

Be ready to open these exact files when the teacher asks for the code:

### 1. Where is the database connection configured?

- **File:** [backend/config/db.js](file:///Users/priyanshnarang/Desktop/fsf/backend/config/db.js)
- **Explanation:** Mongoose connects to MongoDB Atlas using the connection URI stored securely in `.env`.

### 2. Where are the schemas defined?

- **Application Model:** [backend/models/Application.js](file:///Users/priyanshnarang/Desktop/fsf/backend/models/Application.js)
  - Fields: `company`, `role`, `jobLink`, `salary`, `applicationDate`, `status` (enum: Applied, Interview, Offer, Rejected), `interviewDate`, `notes`, `userId`, `timestamps`.
- **User Model:** [backend/models/User.js](file:///Users/priyanshnarang/Desktop/fsf/backend/models/User.js)
  - Fields: `name`, `email` (unique), `password` (bcrypt hash), `timestamps`.

### 3. Where is the password hashing and JWT token creation?

- **File:** [backend/controllers/authController.js](file:///Users/priyanshnarang/Desktop/fsf/backend/controllers/authController.js#L22-L46)
- **Code highlight:**
  ```javascript
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
  ```

### 4. Where is the pipeline stats aggregation calculated?

- **File:** [backend/controllers/applicationController.js](file:///Users/priyanshnarang/Desktop/fsf/backend/controllers/applicationController.js#L150-L170)
- **Explanation:** Counts total documents, as well as counts matching each specific status (`Applied`, `Interview`, `Offer`, `Rejected`).

### 5. Where is the route protection on frontend?

- **File:** [frontend/src/App.jsx](file:///Users/priyanshnarang/Desktop/fsf/frontend/src/App.jsx#L44-L65)
- **Explanation:** State condition `{currentPage === 'landing' || !user ? <LandingPage ... /> : <Dashboard ... />}` prevents unauthorized access to the dashboard.

### 6. Where is the API communication set up?

- **File:** [frontend/src/services/api.js](file:///Users/priyanshnarang/Desktop/fsf/frontend/src/services/api.js)
- **Explanation:** Centralized Axios instance with an interceptor that attaches the Bearer token from `localStorage`.

---

## 6. Likely Teacher Questions & Model Answers (Viva Q&A)

### Q1: Why did you choose MongoDB instead of a relational database like PostgreSQL or MySQL?

> **Answer:** _"Job applications often have variable fields. For example, some jobs have salary ranges, interview rounds, and notes, while others only have a URL and application date. MongoDB’s document model provides the flexibility to evolve schema fields without requiring complex migrations. Furthermore, MongoDB Atlas provides seamless cloud hosting with native JSON handling that maps directly to our JavaScript/React frontend."_

### Q2: How do you handle password security?

> **Answer:** _"We never store plaintext passwords. In `authController.js`, we generate a cryptographic salt using `bcrypt.genSalt(10)` and hash the password before saving it to MongoDB. During login, `bcrypt.compare()` verifies the entered password against the hash using constant-time comparison to prevent timing attacks."_

### Q3: Why did you use JWT instead of standard session cookies?

> **Answer:** _"JWT is stateless and scalable. The server doesn't need to maintain a memory store or Redis session database. The token contains the signed payload (`userId`), and any request verifies the signature using our `JWT_SECRET`. It also makes frontend-backend separation cleaner, since the client sends the token in the `Authorization: Bearer <token>` header."_

### Q4: How is state managed in the frontend? Did you need Redux?

> **Answer:** _"For this application scope, React’s built-in hooks (`useState`, `useEffect`, and `useMemo`) provide clean, predictable state management without the unnecessary boilerplate of Redux. We use `useMemo` in `Dashboard.jsx` to optimize client-side filtering and sorting so recalculations only trigger when the application list, search term, or sort criteria change."_

### Q5: What is the difference between `PUT` and `PATCH` in your application routes?

> **Answer:** _"We followed RESTful conventions: `PUT /api/applications/:id` is used when editing an entire application record (company, role, notes, salary, etc.), replacing all fields. `PATCH /api/applications/:id/status` is used for partial updates, specifically updating only the status and optional interview date when someone changes the dropdown in the table."_

### Q6: How does your single `npm run dev` command work?

> **Answer:** _"In the root `package.json`, we configured `concurrently`. It runs `npm run dev --prefix backend` and `npm run dev --prefix frontend` simultaneously. It prefixes terminal output with `[backend]` and `[frontend]` in different colors, simplifying development and review."_

---

## 7. Quick Checklist Before You Present

- [ ] Run `npm run dev` in the terminal from project root.
- [ ] Have `http://localhost:5173` open in your browser.
- [ ] Have VS Code open to the project folder `/Users/priyanshnarang/Desktop/fsf`.
- [ ] Test logging in with `demo@applio.dev` / `password123`.
- [ ] Test adding one test application and changing its status to verify everything is working smoothly.
