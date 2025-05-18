Test scenarios implemented:  

1. **Course Search & Filtering**
   - Search for courses on a specific topic (e.g., "JavaScript")
   - Apply filters for ratings and/or price
   - Verify the results match the applied filters

2. **Course Details Page**
   - Navigate to a specific course page
   - Verify key elements are present (title, instructor, price, ratings)
   - Test the "Add to Cart" functionality

3. **Shopping Cart**
   - Add a course to the cart
   - Verify the course appears in the cart
   - Test the remove from cart functionality

----


1. Clone the repo
2. Create a .env file with EMAIL and PASSWORD parameters for your account
3. npm install to install dependencies
4. npx playwright test to run the tests

Shopping cart scenario is impossible due to platfrom settings

Original task could be found here https://gist.github.com/olkeene/34d7922f2ee5a8a150a905d06dda7555#file-home_assessment-md