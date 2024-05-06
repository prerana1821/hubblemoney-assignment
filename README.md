## Todo

- private routes redirect
- brand categories should come from database

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

## form

1. brand:

- logo: file input
- name: text input
- description: textarea
- category: select (groceries, fashion, beauty, travel)
- status: radio button input of active/inactive/verified

2. voucher management:

<!-- - brand name: should be a select and the select should also contain the brand name which is added in the first section -->
  <!-- - banner image: file input -->
  <!-- - discount_percentage: number -->

- expiration_date: timestamp
- FAQs: text input for question and textarea for answer with add FAQ button to dynamically add text input for question and textarea for answer
- highlights
  <!-- - description: textarea -->
  - title and text: text input for title and textarea for text with add highlight button to dynamically add text input for title and textarea for text
