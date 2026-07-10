# Bike/Car Repair Booking Platform — Project Documentation

## 1. Problem Statement

Getting a bike or car repaired is still an unorganized, word-of-mouth process for most people — no way to compare mechanics, track repair status, or trust reviews before booking. This platform aims to bring an "Urban Company"-style structured booking experience specifically to vehicle repair services, connecting customers with verified mechanics through a transparent, trackable booking flow.

## 2. Objective

To build a full-stack web platform where customers can book vehicle repair services, track their repair status in real time, and rate mechanics — while mechanics manage their job queue and admins oversee platform quality and operations.

## 3. User Roles

### 3.1 Customer
- Register/login
- Browse/search mechanics by service type, rating, distance
- Book a repair (select vehicle type, issue category, preferred time)
- Track live status of booking (Accepted → On the way → In Progress → Completed)
- Pay for service
- Rate & review mechanic post-service

### 3.2 Mechanic
- Register/login (requires admin verification before going live)
- Set availability & service radius
- View and accept/reject incoming job requests
- Update job status in real time
- View earnings history
- View ratings/feedback

### 3.3 Admin
- Verify/approve new mechanic registrations
- View all bookings across the platform
- Handle disputes/complaints
- View analytics: revenue, active mechanics, booking volume, avg. rating
- Suspend/ban mechanics or customers if needed

## 4. Core Features

### MVP (must-have)

| Feature | Description |
|---|---|
| Auth & Role-based access | Separate login/dashboard flows for Customer, Mechanic, Admin |
| Booking flow | Customer selects issue, gets matched with a mechanic, confirms booking |
| Service mode choice | Customer decides: Doorstep (mechanic comes to them) or Garage visit (they go to mechanic) |
| Live status tracking | Real-time job status updates via Socket.io |
| Smart mechanic matching | Rank mechanics by rating + distance + current job load (weighted scoring) |
| Price estimate | Rough price range shown upfront based on issue category, before booking confirmation |
| Ratings & reviews | Post-service rating system tied to mechanic profile |
| Admin dashboard | Mechanic verification, dispute handling, basic analytics |

### Additional Features (Phase 3/4)

| Feature | Description |
|---|---|
| Multi-channel booking | Book via app/site OR call directly — useful for less tech-savvy users |
| Emergency/breakdown mode | SOS-style priority booking for roadside breakdowns, matched to nearest free mechanics only |
| Repair history / vehicle profile | Customer saves vehicle details once; platform builds a repair history log per vehicle |
| Reschedule/cancel booking | With a defined cancellation window/policy |
| Spare parts approval flow | Mechanic flags extra parts needed mid-repair; customer approves added cost before proceeding |
| Favorite/preferred mechanic | Customer marks a mechanic as preferred; future bookings try matching them first |

## 5. Differentiator Hooks

1. **Live status tracking** — real-time booking status bar (like Zomato/Uber), built using Flask-SocketIO. Reuses patterns already proven in Project Triangulation Hunt's dashboard work.
2. **Smart mechanic matching** — instead of naive "nearest mechanic" logic, rank by a weighted score of rating, distance, and current job queue length. Adds a system-design talking point for interviews without needing full ML.
3. **(Stretch) Voice-based issue reporting** — customer describes the issue by voice ("car making a weird noise when I brake"), transcribed and auto-tagged to an issue category using the existing Whisper pipeline. Deferred to a later phase — not required for MVP.

## 6. Tech Stack (Finalized — MERN)

- **Frontend:** React — chosen for component reusability across 3 role-based dashboards (Customer/Mechanic/Admin) and clean pairing with real-time updates
- **Backend:** Node.js + Express — chosen to align with current college MERN coursework, reinforcing classroom learning through a real project, and because MERN is heavily demanded in Indian full-stack job postings
- **Database:** MongoDB — flexible schema, fits evolving booking/review data well
- **Real-time:** Socket.io — powers live booking status tracking (Accepted → On the way → In Progress → Completed)
- **Geolocation:** Browser Geolocation API (real, free) + Leaflet.js + OpenStreetMap (free, no API key) for map pins and straight-line distance calculation used in mechanic matching
- **Payments:** Razorpay/Stripe **sandbox/test mode** — same integration flow as production, no real money, avoids business KYC overhead for a portfolio project
- **Auth:** JWT-based, role-based access control (Customer/Mechanic/Admin)
- **Validation:** Joi or express-validator on backend routes
- **Password security:** bcrypt for hashing

> Note: Flask + Flask-SocketIO was the original consideration (already proven via Project Triangulation Hunt and the Audio Safety project), but MERN was chosen instead to reinforce current college coursework and match market demand. Having Flask and Node projects in the portfolio side-by-side is a deliberate range signal, not indecision.

## 7. Roadmap (4 Phases)

### Phase 1 — Core Setup
- Auth system with 3 roles (Customer, Mechanic, Admin)
- Database schema: Users, Mechanics, Bookings, Reviews
- Basic booking creation flow (no matching logic yet)

### Phase 2 — Booking Logic & Real-Time Tracking
- Smart mechanic matching (weighted scoring)
- Flask-SocketIO integration for live status updates
- Mechanic accept/reject + status update flow

### Phase 3 — Dashboards & Reviews
- Customer dashboard: booking history, tracking, ratings
- Mechanic dashboard: job queue, earnings, availability toggle
- Admin dashboard: mechanic verification, analytics, dispute view

### Phase 4 — Polish & Stretch Features
- UI/UX polish across all dashboards
- Voice-based issue reporting (stretch, reuses Whisper pipeline)
- Deployment + demo prep

## 8. Directory Structure

```
repair-booking-platform/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/        # API calls
│   │   └── context/          # auth/global state
├── server/                  # Node/Express backend
│   ├── config/               # db connection, env setup
│   ├── models/                # Mongoose schemas
│   ├── routes/
│   ├── controllers/
│   ├── middleware/           # auth, error handling
│   ├── sockets/                # socket.io event handlers
│   └── server.js
├── README.md
├── .env.example
└── .gitignore
```

## 9. Engineering Practices

### Testing
- Jest (or Mocha/Chai) for backend unit tests — prioritize critical paths: auth, booking creation, matching logic, status transitions
- Postman/Thunder Client collection for manual API testing as each route is built
- Test each module after completion, before moving to the next phase — don't let bugs stack up

### Documentation (ongoing, not after-the-fact)
- **README.md** — project overview, tech stack + reasoning, setup instructions, run commands, required env variables
- **API documentation** — endpoint, method, request body, response, noted as each route is built (markdown table is enough; Swagger/OpenAPI optional polish later)
- Inline comments on non-obvious logic — especially the mechanic matching algorithm and socket event handlers, since these are the parts most likely to come up in interview walkthroughs

### Other Standards
- **Environment variables** — no hardcoded DB URLs/API keys; `.env` + `.env.example` with dummy values; `.env` in `.gitignore` from day one
- **Git hygiene** — frequent, meaningful commits; feature branches (`feature/booking-flow`, `feature/live-tracking`)
- **Centralized error handling** — Express error middleware on backend; consistent error/loading states in React (no bare `console.log`)
- **Input validation** — Joi/express-validator on all backend routes
- **UI states** — every API call handled with loading, success, and error states
- **Basic security** — bcrypt password hashing, input sanitization, rate-limiting on auth routes (if time allows)

## 10. Page Map

### Public / Shared
| Page | Key Components |
|---|---|
| **Landing Page** | Navbar (Logo, Services, How it works, Login, Sign up), hero + CTA, service mode preview, "How it works" 3-step visual, service category grid, testimonials strip, footer |
| **Login Page** | Email/phone + password form, Customer/Mechanic role toggle, link to Sign up (Admin login not publicly exposed) |
| **Sign Up Page** | Role selector (Customer/Mechanic); Customer: name, email, phone, password; Mechanic: same + service category, service area, ID proof upload |

### Customer
| Page | Key Components |
|---|---|
| **Customer Dashboard** | Navbar (Book Repair, My Bookings, Profile, Logout), Book Repair CTA, active booking status card, recent bookings preview |
| **Book Repair Page** | Vehicle selector, issue category picker, service mode toggle (Doorstep/Garage), Leaflet map location picker, price estimate + suggested mechanic(s), confirm booking |
| **Live Tracking Page** | Live map (Leaflet), status bar (Accepted → On the way → In Progress → Completed), mechanic info card + call button, cancel option |
| **My Bookings Page** | Tabs: Ongoing/Past/Cancelled, booking cards, rate & review on past bookings |
| **Profile Page** | Personal info edit, saved vehicles, preferred mechanic setting |

### Mechanic
| Page | Key Components |
|---|---|
| **Mechanic Dashboard** | Navbar (Job Requests, My Jobs, Earnings, Profile, Logout), availability toggle, incoming job request cards (accept/reject), active job status updates |
| **Earnings & History Page** | Completed jobs list with amounts, earnings summary (week/month), ratings received |

### Admin
| Page | Key Components |
|---|---|
| **Admin Dashboard** | Navbar (Mechanic Verification, All Bookings, Disputes, Analytics, Logout), pending mechanic approvals, all bookings table with filters, analytics cards (bookings, active mechanics, revenue, avg rating), disputes list |

**Build order recommendation:** Landing → Login/Signup → Customer Dashboard → Book Repair → Live Tracking (core happy path first), then Mechanic pages, then Admin pages.

## 11. Open Decisions
- [ ] Finalize exact price estimate logic (flat ranges per category vs dynamic calculation)
- [ ] Cancellation window policy (e.g. free cancel within X minutes of booking)
- [ ] Whether Admin login is a hidden route or a separate seeded account (no public signup)
