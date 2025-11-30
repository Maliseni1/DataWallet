DataWallet

DataWallet is a carrier-agnostic mobile data management platform. It solves the problem of expiring data bundles by allowing users to store, rollover, and gift unused data across multiple networks (ZedMobile, MTN, Airtel).

This project is a high-fidelity prototype built on the bleeding edge of the React ecosystem, demonstrating a unified, multi-tenant architecture.

🚀 Tech Stack

Framework: Next.js 16 (App Router)

UI Library: React 19

Styling: Tailwind CSS v4 (Alpha)

Language: TypeScript

Build System: Webpack (Custom config for v4 compatibility)

✨ Key Features

Multi-Operator Support: Seamlessly switch between ZedMobile, MTN, and Airtel contexts.

Dynamic Theming: The UI instantly adapts to the brand colors of the selected operator (Purple/Indigo for ZedMobile, Yellow for MTN, Red for Airtel).

Mock Backend API: A serverless API route (/api/user/[operatorId]) that simulates database latency and serves operator-specific user data.

Wallet Logic: Demonstrates core concepts like wallet balances, bundle expiry tracking, and auto-renewal toggles.

Error Handling: Robust error states for API failures or missing data.

🛠️ Getting Started

Follow these steps to run the project locally.

Prerequisites

Node.js 18.17.0 or later

Installation

Clone the repository:

git clone [https://github.com/your-username/datawallet.git](https://github.com/your-username/datawallet.git)
cd datawallet


Install dependencies:

npm install


Run the development server:

npm run dev


Open your browser:
Navigate to http://localhost:3000 to view the application.

📂 Project Structure

src/
├── app/
│   ├── api/          # Serverless API Routes
│   │   └── user/     # Dynamic route for fetching user data per operator
│   ├── lib/          # Shared logic and mock database (data.ts)
│   ├── globals.css   # Global styles (Tailwind v4 imports)
│   ├── layout.tsx    # Root layout
│   └── page.tsx      # Main UI (Client Component)


🔮 Future Roadmap

Carrier Integration: Replace mock data with real operator APIs (USSD/REST).

Admin Dashboard: A unified view for operators to track rollover stats and churn reduction.

Auth Layer: User authentication and MSISDN verification.

Payment Gateway: Integration for purchasing new bundles directly from the wallet.
