export const getUserIdFromToken = (token) => {
    try {
      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      return tokenPayload.userId || tokenPayload.sub || null;
    } catch (error) {
      return null;
    }
  };