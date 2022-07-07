import { useSession } from 'src/hooks/useSession';

const FirstLogin = () => {
  const { logout } = useSession();

  return( 
    <h2 onClick={logout}>Première connexion</h2>

  );
};

export default FirstLogin;
