function setRolesToUser(user, context, callback) {
  // Roles should only be set to verified users.
  if (!user.email || !user.email_verified) {
    return callback(null, user, context);
  }

  const namespace = 'http://schemas.microsoft.com/ws/2008/06/identity/claims';
  const assignedRoles = (context.authorization || {}).roles || ["STANDARD"];

  let idTokenClaims = context.idToken || {};
  let accessTokenClaims = context.accessToken || {};

  idTokenClaims[`${namespace}/role`] = assignedRoles;
  accessTokenClaims[`${namespace}/role`] = assignedRoles;

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;

  callback(null, user, context);
}
