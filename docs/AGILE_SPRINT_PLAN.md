# Vehicle Rental Platform (VRP)
## Agile Sprint Development Plan

**Project:** Vehicle Rental Platform (VRP)  
**Role:** Django Backend Developer Intern  
**Development Approach:** Agile / Scrum  
**Core Development Period:** 25 Working Days  
**Deployment:** Render.com  

---

## 1. Sprint Overview

The project will be developed in five Agile sprints over 25 working days. Each sprint will focus on a specific set of features and will include implementation, testing, documentation, and GitHub progress tracking.

| Sprint | Days | Focus |
|---|---:|---|
| Sprint 1 | 1–5 | Project Setup + User Authentication |
| Sprint 2 | 6–10 | Vehicle Management |
| Sprint 3 | 11–15 | Booking Management |
| Sprint 4 | 16–20 | Email + Contact + Admin |
| Sprint 5 | 21–25 | Integration + Testing + Bug Fixing |

After the 25-day development period, the project will proceed to deployment and final documentation.

---

# 2. Sprint 1 — Project Setup + User Authentication

**Days:** 1–5

### Goal
Set up the Django backend and implement secure user authentication using JWT.

### Tasks
- Set up Python virtual environment.
- Initialize Django project.
- Configure Django REST Framework.
- Configure PostgreSQL.
- Implement user model.
- Implement user registration.
- Implement JWT login and token refresh.
- Implement protected endpoints.
- Implement user profile APIs.
- Test authentication APIs using Postman.

### Expected Deliverable
A working user authentication system with registration, JWT authentication, and profile management.

---

# 3. Sprint 2 — Vehicle Management

**Days:** 6–10

### Goal
Allow users to list and manage vehicles and allow other users to search and filter available vehicles.

### Tasks
- Implement vehicle model.
- Implement vehicle CRUD APIs.
- Implement vehicle ownership.
- Add 2/3/4 wheeler categories.
- Implement vehicle search.
- Implement vehicle filtering.
- Implement validation and permissions.
- Test vehicle APIs using Postman.

### Expected Deliverable
A functional vehicle management and search system.

---

# 4. Sprint 3 — Booking Management

**Days:** 11–15

### Goal
Implement the vehicle rental and booking workflow.

### Tasks
- Implement booking model.
- Implement booking creation.
- Validate booking dates.
- Check vehicle availability.
- Prevent overlapping bookings.
- Implement booking confirmation.
- Implement booking cancellation.
- Implement booking status management.
- Test booking APIs using Postman.

### Expected Deliverable
A functional booking system with availability and status management.

---

# 5. Sprint 4 — Email + Contact + Administration

**Days:** 16–20

### Goal
Implement communication features and administrative management.

### Tasks
- Configure email functionality.
- Implement booking confirmation emails.
- Implement contact form/API.
- Store contact messages.
- Configure Django Admin.
- Manage users, vehicles, bookings, and contact messages.
- Test email and administrative functionality.

### Expected Deliverable
A functional communication and administration system.

---

# 6. Sprint 5 — Integration + Testing

**Days:** 21–25

### Goal
Integrate all modules, resolve issues, and prepare the application for deployment.

### Tasks
- Integrate all modules.
- Perform complete API testing.
- Test authentication and permissions.
- Test vehicle and booking workflows.
- Fix bugs and validation issues.
- Review security configuration.
- Prepare production settings.
- Perform end-to-end testing.
- Prepare the application for deployment.

### Expected Deliverable
A stable and fully integrated application ready for deployment.

---

# 7. Development Workflow

Each development task will follow:

**Plan → Implement → Test → Commit → Push → Document**

Git and GitHub will be used throughout development to maintain a clear history of project progress.

Meaningful commits will describe the actual work completed.

---

# 8. Final Deliverables

- Working Vehicle Rental Platform
- Django REST APIs
- JWT Authentication
- PostgreSQL Database
- Vehicle Management
- Booking Management
- Email Notifications
- Contact Functionality
- Admin Dashboard
- Postman API Testing
- API Documentation
- GitHub Repository
- Render Deployment
- Project Report