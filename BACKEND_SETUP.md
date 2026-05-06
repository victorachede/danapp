# CyberHub - Backend Development Guide

This document provides a comprehensive guide for backend developers to implement the server-side functionality for the CyberHub Nigerian Cyber Cafe App.

## Project Overview

CyberHub is a digital platform for Nigerian cyber cafes offering services like NYSC registration, document handling, printing, and more. The frontend is built with Next.js and Tailwind CSS, and the backend needs to handle authentication, service management, bookings, and payments.

---

## Technology Stack Recommendations

### Database
- **PostgreSQL** (recommended) - Supabase, Neon, or AWS Aurora
- **Alternative**: MongoDB for NoSQL approach

### Authentication
- **JWT (JSON Web Tokens)** or Session-based authentication
- **Recommended**: Supabase Auth or Auth.js for Next.js
- **Alternative**: Custom auth with bcrypt password hashing

### API Framework
- **Node.js/Express** - Simple REST API
- **Next.js API Routes** - Built-in API endpoints
- **Alternative**: Python (Django/FastAPI), Go (Gin)

### Additional Services
- **Payments**: Stripe, Paystack, or Flutterwave for Nigerian transactions
- **File Storage**: Vercel Blob, AWS S3, or Cloudinary
- **Email**: SendGrid, Resend, or AWS SES
- **SMS**: Twilio, Termii (Nigerian service)

---

## Database Schema

### Required Tables

#### 1. Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone_number VARCHAR(20) NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  profile_picture_url VARCHAR(500),
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 2. Services Table
```sql
CREATE TABLE services (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  category VARCHAR(100) NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 3. Bookings/Orders Table
```sql
CREATE TABLE bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  service_id UUID NOT NULL REFERENCES services(id),
  booking_date TIMESTAMP NOT NULL,
  quantity INT DEFAULT 1,
  total_amount DECIMAL(10, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, cancelled
  payment_status VARCHAR(50) DEFAULT 'unpaid', -- unpaid, paid, refunded
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 4. Payments Table
```sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_method VARCHAR(50) NOT NULL, -- card, transfer, mobile_money, cash
  transaction_reference VARCHAR(255),
  payment_gateway VARCHAR(50), -- stripe, paystack, flutterwave, etc.
  status VARCHAR(50) DEFAULT 'pending', -- pending, completed, failed
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 5. Reviews Table
```sql
CREATE TABLE reviews (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  booking_id UUID REFERENCES bookings(id),
  rating INT CHECK (rating >= 1 AND rating <= 5),
  comment TEXT,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

#### 6. Admin Users Table
```sql
CREATE TABLE admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  role VARCHAR(50) DEFAULT 'admin', -- admin, moderator
  permissions TEXT[], -- JSON array of permissions
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

---

## API Endpoints

### Authentication Endpoints

#### POST `/api/auth/register`
Register a new user account.
```json
Request Body:
{
  "full_name": "John Doe",
  "email": "john@example.com",
  "phone_number": "+234803xxx",
  "password": "securepassword"
}

Response (201):
{
  "success": true,
  "user": {
    "id": "uuid",
    "email": "john@example.com",
    "full_name": "John Doe"
  },
  "token": "jwt_token"
}
```

#### POST `/api/auth/login`
Login user with email and password.
```json
Request Body:
{
  "email": "john@example.com",
  "password": "securepassword"
}

Response (200):
{
  "success": true,
  "user": { ... },
  "token": "jwt_token"
}
```

#### POST `/api/auth/logout`
Logout user (invalidate token/session).

#### POST `/api/auth/refresh`
Refresh JWT token.

#### POST `/api/auth/reset-password`
Request password reset.

---

### User Endpoints

#### GET `/api/users/profile`
Get current user profile (requires auth).

#### PUT `/api/users/profile`
Update user profile.

#### GET `/api/users/:id`
Get user profile by ID (public).

#### PUT `/api/users/:id/password`
Change user password.

---

### Services Endpoints

#### GET `/api/services`
Get all available services.
```json
Response (200):
{
  "success": true,
  "services": [
    {
      "id": "uuid",
      "name": "NYSC Registration",
      "description": "...",
      "category": "government",
      "base_price": 2500
    }
  ]
}
```

#### GET `/api/services/:id`
Get specific service details.

#### POST `/api/services` (Admin)
Create new service.

#### PUT `/api/services/:id` (Admin)
Update service details.

#### DELETE `/api/services/:id` (Admin)
Delete service.

---

### Bookings/Orders Endpoints

#### POST `/api/bookings`
Create new booking.
```json
Request Body:
{
  "service_id": "uuid",
  "booking_date": "2024-05-20T10:00:00",
  "quantity": 1,
  "notes": "Optional notes"
}

Response (201):
{
  "success": true,
  "booking": {
    "id": "uuid",
    "status": "pending",
    "total_amount": 2500
  }
}
```

#### GET `/api/bookings`
Get user's bookings (requires auth).

#### GET `/api/bookings/:id`
Get booking details.

#### PUT `/api/bookings/:id`
Update booking (cancel, etc.).

#### DELETE `/api/bookings/:id`
Cancel booking.

---

### Payments Endpoints

#### POST `/api/payments`
Initialize payment for a booking.
```json
Request Body:
{
  "booking_id": "uuid",
  "payment_method": "card", -- card, transfer, mobile_money, cash
  "amount": 2500
}

Response (200):
{
  "success": true,
  "payment": {
    "id": "uuid",
    "status": "pending",
    "checkout_url": "..." // for card payments
  }
}
```

#### POST `/api/payments/webhook`
Handle payment gateway webhooks (Stripe, Paystack, etc.).

#### GET `/api/payments/:id`
Get payment status.

---

### Reviews Endpoints

#### POST `/api/reviews`
Create review for completed service.

#### GET `/api/reviews/service/:serviceId`
Get reviews for a service.

#### GET `/api/reviews/user/:userId`
Get reviews by user.

#### PUT `/api/reviews/:id`
Update review.

#### DELETE `/api/reviews/:id`
Delete review.

---

### Admin Endpoints

#### GET `/api/admin/bookings`
Get all bookings (admin only).

#### GET `/api/admin/analytics`
Get platform analytics.

#### GET `/api/admin/users`
Get all users (admin only).

#### PUT `/api/admin/services/:id`
Update service (pricing, availability).

#### POST `/api/admin/generate-report`
Generate business reports.

---

## Authentication Flow

### JWT-Based Authentication
1. User registers/logs in
2. Backend validates credentials
3. Backend issues JWT token
4. Frontend stores token in secure HTTP-only cookie or localStorage
5. Frontend includes token in Authorization header for subsequent requests
6. Backend validates token on protected routes

### Session-Based Authentication (Alternative)
1. User registers/logs in
2. Backend creates session
3. Frontend stores session ID in secure HTTP-only cookie
4. Backend validates session on protected routes

**Recommended**: JWT with HTTP-only cookies for enhanced security.

---

## Security Considerations

### Password Security
- Hash passwords using **bcrypt** with salt rounds (12+)
- Never store plain text passwords
- Validate password strength (min 8 chars, uppercase, lowercase, numbers, special chars)

### API Security
- Implement **CORS** (whitelist frontend domain)
- Use HTTPS only
- Implement rate limiting (e.g., 100 requests per minute per IP)
- Validate and sanitize all inputs
- Use prepared statements/parameterized queries to prevent SQL injection

### Authorization
- Implement role-based access control (RBAC)
- Verify user permissions before granting access
- Never expose sensitive data (passwords, full payment info)

### Data Protection
- Encrypt sensitive data in transit (HTTPS)
- Store PII securely
- Implement proper logging without exposing sensitive data
- Handle payment data according to PCI DSS standards

---

## Error Handling

All endpoints should return consistent error responses:

```json
{
  "success": false,
  "error": {
    "code": "INVALID_EMAIL",
    "message": "Invalid email format",
    "details": {}
  }
}
```

### Common Error Codes
- `INVALID_INPUT` - Validation error
- `UNAUTHORIZED` - Missing/invalid authentication
- `FORBIDDEN` - User lacks permission
- `NOT_FOUND` - Resource not found
- `CONFLICT` - Resource already exists
- `RATE_LIMITED` - Too many requests
- `SERVER_ERROR` - Internal server error

---

## Deployment Recommendations

### Hosting Options
- **Vercel** (Node.js/Next.js)
- **Heroku** (simple deployment)
- **AWS (EC2, Lambda, RDS)**
- **DigitalOcean** (affordable VPS)
- **Railway** (modern alternative)

### Environment Variables Required
```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret_key
JWT_EXPIRY=7d
CORS_ORIGIN=https://yourdomain.com

# Payment Gateway
STRIPE_SECRET_KEY=sk_...
PAYSTACK_SECRET_KEY=sk_...

# Email Service
SENDGRID_API_KEY=...
RESEND_API_KEY=...

# File Storage
AWS_ACCESS_KEY_ID=...
AWS_SECRET_ACCESS_KEY=...
```

---

## Testing

### Unit Testing
- Test individual functions and business logic
- Use Jest or Mocha/Chai

### Integration Testing
- Test API endpoints with various inputs
- Use Postman, Insomnia, or API testing libraries

### Load Testing
- Test API performance under load
- Use Apache JMeter or k6

---

## Monitoring & Logging

- Implement comprehensive logging (Winston, Bunyan)
- Monitor API performance (response times, error rates)
- Set up error tracking (Sentry)
- Monitor database performance
- Track user behavior for analytics

---

## Future Enhancements

1. **Real-time Notifications**: WebSocket integration for booking updates
2. **Mobile App**: React Native or Flutter app
3. **AI-Powered Recommendations**: Recommend services based on user history
4. **Advanced Analytics**: Detailed business insights and reports
5. **Third-party Integrations**: Calendar sync, automated reminders
6. **Multi-location Support**: Manage multiple cyber cafe locations
7. **Subscription Plans**: Premium membership tiers
8. **Staff Management**: Employee scheduling and task assignment

---

## Support & Resources

- **Next.js Documentation**: https://nextjs.org/docs
- **PostgreSQL**: https://www.postgresql.org/docs/
- **JWT**: https://jwt.io/
- **Stripe API**: https://stripe.com/docs/api
- **Paystack API**: https://paystack.com/docs/api/

---

## Notes for Backend Developer

1. **Start with authentication** - Implement secure login/register first
2. **Database first** - Design and test database schema before API
3. **API documentation** - Use Swagger/OpenAPI for API docs
4. **Error handling** - Implement comprehensive error handling
5. **Testing** - Write tests as you develop
6. **Security** - Never compromise on security
7. **Performance** - Optimize database queries and API responses
8. **Scalability** - Design with future growth in mind

---

**Last Updated**: May 2024
**Frontend Lead**: v0 Team
**Backend Lead**: [To Be Assigned]

For questions or clarifications, reach out to the development team.
