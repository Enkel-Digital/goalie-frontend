// Import AuthType Enum
import AuthType from "./AuthType";
import firebase from "firebase/app";
import "firebase/auth";

/**
 * @function requiredAuth
 * @param {object} route Vue JS route "to" object
 * @returns {object} Object of booleans of the final auth requirement
 */
function requiredAuth(route) {
  // Defaults to the lowest auth requirement of "public" route
  let maxAuth = 1;

  // This project's router uses a multi parent and multi child router setup,
  // Which means both the parent and child routes will be matched.
  // This loops through all matched routes to find the route with the highest auth requirements
  // And the final auth requirement, will be the highest auth requirement amongst all matched routes
  for (const matchedRoute of route.matched)
    if (matchedRoute?.meta?.Auth_requirements > maxAuth)
      maxAuth = matchedRoute.meta.Auth_requirements;

  return {
    public: maxAuth === AuthType.public,
    public_only: maxAuth === AuthType.public_only,
    private: maxAuth === AuthType.private,
  };
}

/**
 * Checks if user's current auth status matches required auth status for the route being accessed
 * @function AuthChecker
 * @returns {null}
 */
function AuthChecker(to, from, next) {
  // Get current user from firebase
  const currentUser = firebase.auth().currentUser;

  // Get AuthStatus required for accessing the route.
  const AuthType_required_is = requiredAuth(to);

  /**
   * @notice Call the next middleware provided by vue router with a route to go to.
   * @notice Hard coded routes based on authentication status or proceed to route user requested for.
   */
  // If route is auth protected and user not logged in, redirect to welcome page
  if (AuthType_required_is.private && !currentUser) next({ name: "welcome" });
  // If route is public only and user is logged in, redirect to default private route of home
  else if (AuthType_required_is.public_only && currentUser)
    next({ name: "home" });
  // Else, just continue navigation as per user request.
  else next();
}

export default AuthChecker;
