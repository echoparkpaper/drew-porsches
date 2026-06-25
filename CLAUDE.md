# Drew Porsches Car Collection App

Personal car collection management and tracking app for cataloging, valuing, and maintaining 50+ vehicle inventory.

## Project Overview

**Purpose:** Track and manage a comprehensive car collection with detailed specs, photos, maintenance history, and valuations.

**Stack:**
- Frontend & Backend: Next.js 14+ (App Router, TypeScript)
- Database: PostgreSQL (Render Postgres)
- Auth: NextAuth.js (email/password)
- UI: Tailwind CSS + shadcn/ui
- File Storage: Render Blob Storage for photos
- Deployment: Render (backend + frontend)

## Architecture

### Database Schema

**users**
- id (UUID, PK)
- email (unique)
- password_hash
- created_at
- updated_at

**cars**
- id (UUID, PK)
- user_id (FK → users)
- make, model, year
- price (decimal)
- mileage (int)
- condition (enum: excellent, good, fair, poor)
- notes (text)
- valuation (decimal, calculated or manual)
- created_at, updated_at

**car_photos**
- id (UUID, PK)
- car_id (FK → cars)
- photo_url (blob storage path)
- caption (optional)
- uploaded_at

**maintenance_records**
- id (UUID, PK)
- car_id (FK → cars)
- service_date
- description (service type, issue fixed, etc.)
- cost (decimal)
- mileage_at_service
- created_at

**car_tags**
- id (UUID, PK)
- car_id (FK → cars)
- tag (string: "project", "rare", "pristine", custom tags)

### File Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/
│   │   ├── auth/          # NextAuth.js routes
│   │   ├── cars/          # Car CRUD endpoints
│   │   ├── maintenance/   # Maintenance record endpoints
│   │   └── photos/        # Photo upload endpoints
│   ├── auth/              # Auth pages (login, signup)
│   ├── dashboard/         # Main car collection view
│   ├── cars/              # Car detail pages
│   └── layout.tsx
├── components/            # Reusable React components
│   ├── car-form.tsx
│   ├── car-card.tsx
│   ├── maintenance-table.tsx
│   └── photo-gallery.tsx
├── lib/
│   ├── db.ts              # Database query helpers
│   ├── auth.ts            # Auth utilities
│   └── validation.ts      # Input validation schemas
├── types/
│   └── index.ts           # TypeScript type definitions
└── env.ts                 # Environment validation
```

### Key Features

1. **Car Inventory**
   - CRUD operations for cars
   - Bulk import capability
   - Search/filter by make, model, year, condition, tags
   - Valuation tracking

2. **Photos**
   - Upload multiple photos per car
   - Photo gallery view
   - Blob storage integration

3. **Maintenance Tracking**
   - Log service dates, descriptions, costs
   - Track mileage at each service
   - Service history timeline per car

4. **Personal Dashboard**
   - Overview of collection (total cars, total valuation, etc.)
   - Recent additions/updates
   - Quick stats

5. **Mobile-Responsive**
   - Fully responsive design
   - Touch-friendly forms and galleries

## Development Notes

- Use TypeScript for type safety
- Validate all inputs server-side
- Hash passwords with bcrypt before storage
- Use SQL prepared statements (parameterized queries) to prevent injection
- Leverage Next.js server components for data fetching
- Keep client components minimal for performance

## Deployment (Render)

- Web Service: Next.js frontend + API routes
- PostgreSQL: Managed Postgres database
- Blob Storage: For car photos
- Environment variables: Database URL, NextAuth secret, file upload token

## Mobile Strategy

Phase 1: Responsive web design (current)
Phase 2: React Native companion app (if needed)

## Security Considerations

- HTTPS only (Render enforces)
- Secure session handling via NextAuth
- Password hashing with bcrypt
- CSRF protection via Next.js
- Input validation and sanitization
- Photo access control (only authenticated users can view their own photos)

## Future Enhancements

- Export collection as PDF report
- Comparison tool (similar cars in collection)
- Depreciation tracking
- Insurance value estimates
- Integration with market data APIs (NADA, KBB)
- Mobile native app (React Native)
