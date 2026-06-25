# Drew Porsches - Car Collection Manager

A personal car collection management app built with Next.js, PostgreSQL, and NextAuth.js.

## Features

- **User Authentication**: Email/password login and signup with secure password hashing
- **Car Inventory**: Create, read, update, and delete cars in your collection
- **Detailed Records**: Track make, model, year, mileage, condition, purchase price, and valuation
- **Maintenance Tracking**: Log service history, costs, and mileage for each car
- **Photo Gallery**: Upload and organize photos for each vehicle (framework ready)
- **Dashboard**: View collection stats (total cars, valuation, average mileage)
- **Responsive Design**: Fully responsive for web and mobile browsers

## Tech Stack

- **Frontend & Backend**: Next.js 14 (App Router)
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js
- **UI**: Tailwind CSS
- **Language**: TypeScript
- **Deployment**: Render

## Development Setup

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or Render)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables in `.env.local`:
   ```bash
   DATABASE_URL="postgresql://user:password@localhost:5432/drew_porsches"
   NEXTAUTH_SECRET="generated-secret-key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. Initialize the database (run once):
   ```bash
   npm run init-db
   ```

5. Start the development server:
   ```bash
   npm run dev
   ```

6. Open [http://localhost:3000](http://localhost:3000) in your browser

## Database Schema

The app uses four main tables:

- **users**: User accounts with email and hashed passwords
- **cars**: Vehicle details (make, model, year, mileage, pricing, condition)
- **car_photos**: Photo storage metadata and URLs
- **maintenance_records**: Service history, dates, costs, and mileage
- **car_tags**: Optional tags for organizing vehicles

See [CLAUDE.md](./CLAUDE.md) for full schema details.

## Deployment on Render

1. Create a Render account and a PostgreSQL database
2. Create a new Web Service pointing to this repo
3. Set environment variables:
   - `DATABASE_URL`: Your Render Postgres connection string
   - `NEXTAUTH_SECRET`: A 32-character random secret
   - `NEXTAUTH_URL`: Your Render app URL (e.g., `https://app-name.onrender.com`)
4. Deploy

## Project Structure

```
src/
├── app/                  # Next.js pages and API routes
│   ├── api/             # Backend API endpoints
│   ├── auth/            # Authentication pages (login, signup)
│   ├── cars/            # Car detail and edit pages
│   └── dashboard/       # Main collection view
├── components/          # Reusable React components
├── lib/                 # Database, auth, and utility functions
└── types/               # TypeScript type definitions
```

## Next Steps

- [ ] Photo upload integration (Render Blob Storage)
- [ ] Advanced search and filtering
- [ ] Bulk import from CSV
- [ ] Collection export to PDF
- [ ] Market value API integration
- [ ] Mobile app (React Native)

## License

Private project
