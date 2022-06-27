import useAuth from 'src/hooks/useAuth';

const FirstLogin = () => {
  const { user,logout } = useAuth();

  return( 
    <h2 onClick={logout}>Première connexion</h2>

  );
};

export default FirstLogin;
