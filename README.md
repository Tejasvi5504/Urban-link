# Urban Link

Urban Link is a modern web application designed for efficient management and tracking of city projects and services. It features role-based access for officers and civilians, a clean dashboard, and a responsive user interface.

## Features

- **Role-Based Authentication:**  
  Separate login/register flows for officers (with department selection and email) and civilians (with user ID).
- **Project Dashboard:**  
  View ongoing, pending, completed, and all projects with status tabs.
- **Department Management:**  
  Officers can log in by selecting their department from a dropdown.
- **Responsive UI:**  
  Built with React, Next.js, and Tailwind CSS for a seamless experience on all devices.
- **Custom Branding:**  
  Uses the Urban Link logo and a consistent color scheme across all pages.

## Getting Started

### Prerequisites

- Node.js (v18 or above recommended)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/urban-link.git
   cd urban-link
   ```

2. **Install dependencies:**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Add your logo:**
   Place your logo image in the `public` folder as `logo.png` (or update the path in `LoginModal.jsx`).

4. **Run the development server:**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open in your browser:**
   ```
   http://localhost:3000
   ```

## Project Structure

```
src/
  app/
    projects/
      page.tsx         # Project dashboard page
  components/
    LoginModal.jsx     # Login/Register modal for officers and civilians
public/
  logo.png             # Project logo
```

## Customization

- **Departments:**  
  Edit the `departments` array in `LoginModal.jsx` to add or remove city departments.
- **Color Scheme:**  
  Update Tailwind CSS classes in components to match your branding.
- **Authentication:**  
  Integrate with your backend or Clerk for real authentication and user management.

## Contributing

Pull requests are welcome! For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](LICENSE)

---

**Developed by [Your Name/Team]**