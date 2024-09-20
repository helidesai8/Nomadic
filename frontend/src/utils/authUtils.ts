// author: Parth Patel
export const getToken = () => {
    const token = localStorage.getItem('token');
    console.log("Token:::",token);
    return token || '';
  };

export const getRole = () => {
    const role = localStorage.getItem('role');
    console.log("Role:::",role);
    return role || '';
  };