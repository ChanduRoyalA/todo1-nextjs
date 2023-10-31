export { default } from "next-auth/middleware";

export const config = { matcher: ["/dashboard"] }; //need to add all the pages that needs to be protected
