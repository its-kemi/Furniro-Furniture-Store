
/* =========================================================
   FURNIRO ROLE SYSTEM
========================================================= */

(function () {
    "use strict";

    const ROLES = Object.freeze({
        USER: 0,
        MANAGER: 1,
        EDITOR: 2,
        ADMIN: 3
    });

    function getRoleName(role) {
        const roleNames = {
            0: "User",
            1: "Manager",
            2: "Editor",
            3: "Admin"
        };

        return roleNames[role] || "User";
    }

    function getCurrentUserRole() {
        try {
            const user = JSON.parse(
                localStorage.getItem("furniroCurrentUser")
            );

            if (!user) {
                return null;
            }

            return Number.isInteger(user.role) &&
                Object.values(ROLES).includes(user.role)
                ? user.role
                : ROLES.USER;

        } catch (error) {
            return null;
        }
    }

    function hasRole(requiredRole) {
        return getCurrentUserRole() === requiredRole;
    }

    window.FurniroRoles = {
        ROLES: ROLES,
        getRoleName: getRoleName,
        getCurrentUserRole: getCurrentUserRole,
        hasRole: hasRole
    };

})();
