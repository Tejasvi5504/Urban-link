export default function UserProfile() {
  // Mock user data since we removed authentication
  const user = {
    firstName: "John",
    lastName: "Doe", 
    emailAddress: "john.doe@example.com"
  }

  return (
    <div className="flex items-center space-x-4 p-4 bg-white rounded-lg shadow">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">
          {user.firstName} {user.lastName}
        </h3>
        <p className="text-sm text-gray-500">{user.emailAddress}</p>
      </div>
      <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-semibold">
        {user.firstName.charAt(0)}{user.lastName.charAt(0)}
      </div>
    </div>
  );
} 