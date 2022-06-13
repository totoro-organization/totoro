import useAuth from 'src/hooks/useAuth';
import { useNavigate } from 'react-router';

const FirstLogin = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  if (user.memberships.organization) {
     navigate("/first-login");
  }

  return <h2>Première connexion</h2>;
};

export default FirstLogin;
