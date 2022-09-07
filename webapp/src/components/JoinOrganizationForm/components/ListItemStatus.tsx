import { useSession } from "src/hooks/useSession";

function ListItemStatus({ id }) {
    const { user } = useSession();
    const membership = user.memberships.find(
        (membership) => membership.organization.id === id
    );
    // const isUserInOrganization = 

  return (
    <div>
        { membership.status.label === "actived" ? "Déjà membre" : "Demande envoyée" }
    </div>
  )
}

export default ListItemStatus