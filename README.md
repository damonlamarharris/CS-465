Module 8 README – CS 465: Travlr Getaways SPA Deployment \& Integration

CS 465 Module 8 Journal
12/16/2025
Damon Harris

Architecture
Throughout this course, I worked with three different types of frontend development: traditional Express HTML pages, dynamic JavaScript interactions, and a modern Angular single-page application (SPA). Each approach taught me something different about building a full-stack application.
The Express HTML pages focused on server-rendered content for the customer-facing side. They were simple, fast, and easy to structure using Handlebars templates. JavaScript enhanced these pages with lightweight interactivity when needed. In contrast, the Angular SPA for the admin side provided a much richer experience. Angular handled routing, UI rendering, state management, and API communication all on the client side, which made the application feel smoother and more responsive. Working with both approaches side by side helped me understand when to use server-rendered pages versus a client-rendered SPA, depending on the project’s needs.
The backend used a NoSQL MongoDB database because MongoDB stores data as flexible JSON-like documents, which is perfect for the evolving structure of trip data in this project. NoSQL also integrates easily with Node.js, making it easier to pass data between the frontend and backend without needing strict schemas like a relational database would require.

Functionality
One of the core technologies throughout this course was JSON, which is different from JavaScript, even though they look similar. JavaScript is a full programming language, while JSON is only a structured data format used to store and transfer information. JSON became the bridge between the frontend and the backend. Angular sent and received JSON through the API, and Express returned JSON from the MongoDB database. This consistency made it easier to move data through the entire stack.
During development, I refactored several parts of the codebase to improve functionality and efficiency. For example, I reorganized Express controllers to remove duplication, simplified API responses, and improved error handling. On the Angular side, reusable components like the TripCard and TripForm made the admin interface cleaner and more maintainable. Once those components were built, I could reuse them across the SPA without rewriting the same markup or logic, which saved time and kept the UI consistent.
Testing
Testing the full application required verifying multiple layers at once. At the backend, I tested API endpoints to ensure I could successfully send GET, POST, PUT, and DELETE requests and receive the correct JSON responses. Once authentication was added, additional tests were needed because protected routes behave differently depending on login state.
This project helped me understand how methods and endpoints fit together in a RESTful API and how security changes the flow. When authentication was introduced, I had to verify login tokens, ensure the login route worked, and confirm that unauthorized users were blocked. It reinforced how critical it is to test not only functionality, but also the security rules that protect the application.

Reflection
This course has had a major impact on my progress toward becoming a stronger and more marketable software developer. Before this project, I understood pieces of the MEAN stack but had never built a full application that tied them all together. Now I feel confident working across the entire stack: frontend, backend, database, routing, API design, and security.
I improved my skills in JavaScript, Express, Angular, MongoDB, API testing, and debugging. I also gained professional skills, including writing documentation, building reusable components, managing project folder structures, and pushing updates to GitHub. Completing a full-stack application that includes authentication has given me real-world experience that I can showcase in my portfolio, and I feel better prepared for full-stack development roles in the future.

