## Todo

<!-- - brand categories should come from database -->
<!-- - error handling form -->
<!-- - login or dashboard on site page -->
<!-- - if a brand is deleted, delete the logo as well from storage and associated banners as well -->

<!-- - card analytics for metadata and vouchers -->

<!-- - take all the breadcrumbs to constants -->
<!-- - css -->
  <!-- - onhover hightlights -->
  <!-- - view details -->
  <!-- - Add remove highlight & FAQ -->

<!-- - pagination -->

## Good to have

- testing
- JSON to form

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

- brand name: input text

filters:

- brand category: multi select with search
- brand status (active/inactive/verified): select
- voucher min expiration date: date number
- voucher min discount percentage: input number
- Toggle columns: checkboxlist - !brandname
- Rows per page: select

pagination

table representation:

- Brand Logo & Name
- Brand Category
- Brand Status
- Voucher Highlight - Titles
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

- brand name: should be a select and the select should also contain the brand name which is added in the first section
- banner image: file input
- discount_percentage: number
- expiration_date: timestamp
- FAQs: text input for question and textarea for answer with add FAQ button to dynamically add text input for question and textarea for answer
- highlights
  - description: textarea
  - title and text: text input for title and textarea for text with add highlight button to dynamically add text input for title and textarea for text
