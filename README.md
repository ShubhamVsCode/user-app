# User Management Dashboard | [Live Demo](https://user-app-nine-cyan.vercel.app/)

This is a user management dashboard built with Next.js, TypeScript, Tailwind CSS for styling, and Redux for state management. The dashboard allows an admin to perform CRUD (Create, Read, Update, Delete) operations on user details. It interacts with the backend API to handle user data.

## Features

1. **Dashboard Overview**: The dashboard displays key metrics on the first page, including the total number of users and the number of users created today.

2. **User List**: The main section of the dashboard displays all the users and their details in a card format. Each user card shows their name, age, and phone number. Users can be edited or deleted from this list.

3. **Create User**: The navbar provides a link to a form for creating a new user. The form includes robust validation to ensure all required fields are filled. After successful creation, a toast message appears to confirm the success, and the form resets for further entries.

4. **Create Multiple Users**: The navbar also includes a link to a page where the admin can upload a CSV file containing user data. The dashboard will then autofill the form for each user in the CSV file, allowing the admin to create multiple users at once.

5. **Edit User**: Clicking on the edit button on a user card allows the admin to modify the user's details. Form validation ensures that valid data is submitted before making updates.

6. **Delete User**: Clicking on the delete button on a user card opens a dialog box to *confirm* the deletion. Upon confirmation, the user is deleted. Additionally, an *"undo"* option is available for a brief period, allowing the admin to undo the deletion if needed.

7. **Search Users**: The top navbar includes a search bar that allows the admin to search for users by their name.

8. **Sort Users**: The top navbar also includes options to sort the users based on name, age, or creation date in ascending or descending order.

## Live Demo

Check out the live demo of the User Management Dashboard [here](https://user-app-nine-cyan.vercel.app/).

## Installation

1. Clone the repository: `git clone https://github.com/shubhamvscode/user-app.git`
2. Navigate to the project folder: `cd user-app`
3. Install dependencies: `npm install`
4. Start the development server: `npm run dev`

Please note that the dashboard relies on the backend API provided in the API documentation. Make sure to follow the API documentation to set up the backend and have the endpoints ready for interaction with the dashboard.

## Dependencies

- Next.js 13.4
- TypeScript
- Tailwind CSS
- Redux for state management
- Axios for API communication
- React Hook Form for form validation with Zod
- React Papaparse (for parsing CSV files during multiple user creation)
- Toast library *("react-hot-toast")*

## Contributing

If you wish to contribute to this project, please fork the repository and create a pull request with your changes. We welcome contributions and improvements to enhance the dashboard further.

## License

This project is licensed under the [MIT License](LICENSE.md).

---

Thank you for using our user management dashboard! If you encounter any issues or have any suggestions, feel free to open an issue or reach out to us. We hope this dashboard proves to be a valuable tool for managing user details efficiently. Happy user management!
