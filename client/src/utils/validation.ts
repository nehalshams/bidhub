import { User } from "../types/user.type";


const formValidator = (formData: User) => {
    const { firstName, lastName, email, password } = formData;
  
    // Check if all fields are non-empty
    if (!firstName || !lastName || !email || !password) {
      return false;
    }
  
    // Validate email format using regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return false;
    }
  
    // If all checks pass, return true
    return true;
  };
  

export {
    formValidator
}