# DataForge

DataForge is an enterprise-grade data import, validation, transformation, and reconciliation workbench. It provides operations, finance, and data management teams with a unified interface to ingest messy data, enforce quality standards, and compare records across different systems.

![DataForge Dashboard Placeholder](https://via.placeholder.com/1200x600?text=DataForge+Dashboard+Screenshot) 
*(Replace this with a real screenshot before publishing!)*

## ✨ Features

- **Dashboard:** Real-time metrics and activity feed based on imported datasets.
- **Import Wizard:** Multi-step pipeline for CSV, JSON, and XML files, including field mapping and validation.
- **Validation Engine:** Pure JavaScript rules checking for required fields, data types, unique constraints, and date formats.
- **Reconciliation Workspace:** Compare two datasets (e.g., ledger vs. bank statement) to find matched, mismatched, and missing records.
- **Transformation Pipeline:** Build rules to trim whitespace, change case, and remove empty rows with real-time preview.
- **Dataset Explorer:** Search, filter, sort, and manage datasets.
- **Global Dark Mode:** Full dark theme with persistent user preferences.
- **CSV/JSON Export:** Native browser export functionality for all reports and transformed data.

## 🛠️ Technology Stack

- **Frontend:** React 19, Vite, React Router DOM
- **Styling:** Tailwind CSS v4 (Custom Design System)
- **Animations:** GSAP (Page Transitions), AOS (Scroll Animations)
- **Icons:** Lucide React
- **Modals & Alerts:** SweetAlert2
- **Data Processing:** PapaParse (CSV), fast-xml-parser (XML)
- **Mock Backend:** Custom in-memory service layer (ready to swap for REST API)

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Hassan1569/dataforge.git
   cd dataforge