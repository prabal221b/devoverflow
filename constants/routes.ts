const ROUTES = {
  HOME: "/",
  SIGN_IN: "/sign-in",
  SIGN_UP: "/sign-up",
  TAGS: "/tags",
  COLLECTION: "/collection",
  COMMUNITY: "/community",
  ASK_QUESTION: "/ask-question",
  PROFILE: (id: string) => `/profile/${id}`,
  TAG: (id: string) => `/tags/${id}`,
  QUESTION: (id: string) => `/questions/${id}`,
  EDIT_QUESTION: (id: string) => `/questions/${id}/edit`,
  SIGN_IN_WITH_OAUTH: `signin-with-oauth`,
};
export default ROUTES;
