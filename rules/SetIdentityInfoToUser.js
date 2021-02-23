function SetIdentityInfoToUser(user, context, callback) {
  // Set fields with asp .net core compatibility
  let setClaim = function(namespace, name, value, tokens) {
    for(let token of tokens) {
    		token[`${namespace}/${name}`] = value;
    }
  };
  let idTokenClaims = context.idToken || {};
  let accessTokenClaims = context.accessToken || {};
  const claims = [idTokenClaims, accessTokenClaims];
  
  const namespace = "http://schemas.xmlsoap.org/ws/2005/05/identity/claims";
  setClaim(namespace, 'name', (user || {}).name, claims);
  setClaim(namespace, 'email', (user || {}).email, claims);

  context.idToken = idTokenClaims;
  context.accessToken = accessTokenClaims;

  callback(null, user, context);
}
