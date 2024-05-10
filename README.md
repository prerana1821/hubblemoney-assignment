<div align="center">
  <a href="https://github.com/prerana1821/hubblemoney-assignment">
    <img src="/public/logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Hubble Money Dashboard</h3>

  <p align="center">
      Transforming Shopping Experience: Get discounts, Save, Invest!
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
Welcome to the Brand Metadata and Voucher Management Dashboard! This dashboard provides a comprehensive solution for managing brand metadata and vouchers, facilitating efficient organization and manipulation of essential data. Elevate your brand management game with our all-in-one solution, streamlining metadata and voucher handling for effortless organization and optimization of vital information.
</p>

## Demo
![screencapture-localhost-3000-dashboard-2024-05-10-19_02_43](https://github.com/prerana1821/hubblemoney-assignment/assets/61601706/595cf125-df69-4df7-b363-61c7dcccbb62)

## Features

**Dashboard**:

- **Brand Name Search**: Effortlessly locate brands by their name using the search feature.
- **Brand Category Selection**: Utilize a multi-select option with integrated search functionality to filter brands by category.
- **Brand Status Filtering**: Easily filter brands based on their status (active, inactive, etc.) using a dropdown menu.
- **Minimum Voucher Expiration Date**: Define the minimum expiration date for vouchers with a convenient input field.
- **Minimum Voucher Discount Percentage**: Set the minimum discount percentage for vouchers using a dedicated input field.
- **Column Visibility Toggle**: Customize your table view by toggling the visibility of columns, excluding the brand name, with a checkbox list.
- **Rows per Page Control**: Tailor your viewing experience by selecting the desired number of rows to display per page from a dropdown menu.
- **Pagination**: Seamlessly navigate through multiple pages of brands and vouchers for enhanced usability.
- **URL-Based Filtering**: Leverage URL parameters to effortlessly apply specific filters and configurations, ensuring a personalized experience.

**Brand Management**:

- **View**: Gain insights into brand details and imagery effortlessly.
- **Create**: Introduce new brands into the system with ease, including image upload functionality.
- **Update**: Modify existing brand information seamlessly, including logo updates.
- **Delete**: Remove brands from the database effortlessly, ensuring data cleanliness.

**Voucher Management**:

- **View**: Explore voucher details and associated imagery effortlessly.
- **Create**: Generate new vouchers effortlessly, complete with image upload capabilities.
- **Update**: Modify existing voucher details seamlessly, including banner updates.
- **Delete**: Remove vouchers from the database with ease, maintaining data integrity.

**Data Insights**:

- **Metrics Overview**: Access key metrics such as total brands, active/inactive brands, total vouchers, expired vouchers, and more for comprehensive data insights.

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
