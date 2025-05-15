import { AuthProvider } from './AuthContext';

   const AuthWrapper = ({ children }) => {
     return <AuthProvider>{children}</AuthProvider>;
   };

   export default AuthWrapper;