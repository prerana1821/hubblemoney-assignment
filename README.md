## Todo

- private routes redirect

## Data

brand:

- logo
- name
- description
- category
- status (active/inactive)

voucher management:

- banner image
- FAQs
  - array of question and answer
- highlights
  - description
  - array of title and text

search:

- brand name

filters:

- brand category
- brand status (active/inactive)
- voucher expiration date
- voucher discount percentage

table representation:

- Brand Logo
- Brand Name
- Brand Category
- Brand Status
- Voucher Highlight - titles
- Voucher Expiration Date
- Voucher Discount Percentage

## supabase tables

1. Brands Table:

   Columns:

   - id: primary key
   - name: text
   - description: text
   - category: text (groceries, fashion, beauty, travel)
   - logo_path: text
   - status: text (active/inactive/verified)

2. Vouchers Table:

   Columns:
   id: primary key
   brand_id: foreign key
   banner_path: text
   discount_percentage: number
   expiration_date: timestamp
   faq: json (array of objects - question and answer)
   highlights: json (array of objects - title and text)
