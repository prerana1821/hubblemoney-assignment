<div align="center">
  <a href="https://github.com/prerana1821/hubblemoney-assignment">
    <img src="/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Hubble Money Dashboard</h3>

  <p align="center">
      Transforming Shopping Experience: Discount, Save, Invest!
    <br />
    <a href="https://hubblemoney-assignment.vercel.app/"><strong>Go to App »</strong></a>
    <br />
    <br />
    <a href="https://github.com/prerana1821/hubblemoney-assignment/pulls">Raise a PR</a>
    ·
    <a href="https://github.com/prerana1821/hubblemoney-assignment/issues">Report Bug</a>
    ·
    <a href="https://github.com/prerana1821/hubblemoney-assignment/issues">Request Feature</a>
  </p>
</div>

<p align="center">
Welcome to the Brand Metadata and Voucher Management Dashboard! This dashboard provides a comprehensive solution for managing brand metadata and vouchers, facilitating efficient organization and manipulation of essential data.
</p>

## Demo

## Features

- **Search by Brand Name**: Quickly search for brands using their name.
- **Filters**:
  - Brand Category: Multi-select option with search functionality to filter brands by category.
  - Brand Status: Dropdown menu to filter brands by status (active, inactive, etc.).
  - Voucher Minimum Expiration Date: Input field to specify the minimum expiration date for vouchers.
  - Voucher Minimum Discount Percentage: Input field to specify the minimum discount percentage for vouchers.
  - Toggle Columns: Checkbox list to toggle visibility of columns in the table view, excluding the brand name.
  - Rows per Page: Dropdown menu to select the number of rows to display per page.
- **Pagination**: Navigate through multiple pages of brands and vouchers.
- **URL-Based Filtering**: Utilize URL parameters to apply specific filters and configurations.
- **Brand Management**:
  - View, create, update, and delete brands easily.
- **Voucher Management**:
  - View, create, update, and delete brand vouchers easily.
- **Data Insights**:
  - View data metrics such as total brands, active/inactive brands, total vouchers, expired vouchers, etc.

## Getting Started

Follow these steps to set up and run the Brand Metadata and Voucher Management Dashboard locally:

1. **Clone the Repository**:

   ```
   git clone https://github.com/prerana1821/hubblemoney-assignment.git
   ```

2. **Navigate to the Project Directory**:

   ```
   cd brand-hubblemoney-assignment
   ```

3. **Install Dependencies**:

   ```
   npm install
   ```

4. **Set Environment Variables**:
   Create a `.env` file in the root directory and define the following environment variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=<your-api-base-url>
   NEXT_PUBLIC_SUPABASE_ANON_KEY=<your-api-anon-key>
   SUPABASE_SERVICE_ROLE_KEY=<your-service-role-key>
   ```

5. **Start the Development Server**:

   ```
   npm start
   ```

6. **Access the Dashboard**:
   Open your web browser and go to `http://localhost:3000` to access the dashboard.

## Built With

- [Next.js 14](https://nextjs.org/)
- [React](https://reactjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Supabase](https://supabase.io/)
- [PostgreSQL](https://www.postgresql.org/)

## Supabase Table Details

### Brands Table

| Parameter     | Type          | Description                                                       |
| :------------ | :------------ | :---------------------------------------------------------------- |
| `id`          | `Primary Key` | Unique identifier for the brand.                                  |
| `name`        | `Text`        | Name of the brand.                                                |
| `description` | `Text`        | Description of the brand.                                         |
| `category`    | `Text`        | Category of the brand (e.g., Groceries, Fashion, Beauty, Travel). |
| `logo_path`   | `Text`        | Path to the logo image of the brand.                              |
| `status`      | `Text`        | Status of the brand (e.g., Active, Inactive, Verified).           |

### Vouchers Table

| Parameter             | Type          | Description                                                             |
| :-------------------- | :------------ | :---------------------------------------------------------------------- |
| `id`                  | `Primary Key` | Unique identifier for the voucher.                                      |
| `brand_id`            | `Foreign Key` | Identifier linking the voucher to its respective brand.                 |
| `banner_path`         | `Text`        | Path to the banner image of the voucher.                                |
| `discount_percentage` | `Number`      | Percentage discount offered by the voucher.                             |
| `expiration_date`     | `Timestamp`   | Expiration date of the voucher.                                         |
| `faq`                 | `JSON`        | Array of objects containing FAQs related to the voucher.                |
| `highlights`          | `JSON`        | Array of objects containing highlights (title and text) of the voucher. |

## Feedback

If you have any questions, suggestions, or feedback, please don't hesitate to reach out to us at [prerananw1@gmail.com](mailto:prerananw1@gmail.com).
