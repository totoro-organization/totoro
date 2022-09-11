import { useSession } from "./useSession"

const useOrganizationMembership = () => {
    const { currentApp } = useSession();

    function getRole() {
        if(currentApp.type === "organization") return currentApp.role
    }
    return {
        getRole
    }
}

export default useOrganizationMembership