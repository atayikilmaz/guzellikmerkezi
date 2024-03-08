// Ref: https://next-auth.js.org/configuration/nextjs#advanced-usage
import { withAuth, NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { JWT } from "next-auth/jwt"; // Add this import statement

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request: NextRequestWithAuth) {
    // Ensure that the token is of type JWT or null
    const token = request.nextauth?.token as JWT | null;

    // Check if the user has the role "admin"
    if (
      [
        "/admin",
        "/admin/search-name",
        "/admin/booking",
        "/admin/booking/selection",
        "/admin/booking/selection/date-picker",
        "/admin/booking/selection/date-picker/customer-info",
        "/admin/booking/selection/date-picker/customer-info/appointment-info",
        "/admin/prices",
        "/admin/appointments",
        "/admin/promos",
      ].includes(request.nextUrl.pathname) &&
      token?.role !== "admin"
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }

    // Check if the user has the role "admin" or "worker"

    
    // Check if the user has the role "admin" or "worker"
    if (
      [
        
        "/worker/worker-appointments", // Updated path for worker appointments
        "/worker/booking", 
        "/worker/search-name",
        "/worker/booking/selection",
        "/worker/booking/selection/date-picker",
        "/worker/booking/selection/date-picker/customer-info",
        "/worker/booking/selection/date-picker/customer-info/appointment-info",

      ].includes(request.nextUrl.pathname) &&
      !["admin", "worker"].includes(token?.role || "")
    ) {
      return NextResponse.rewrite(new URL("/denied", request.url));
    }
  }
);

export const config = {
  // Don't use a wildcard in the matcher, use exact paths instead
  matcher: [
    "/admin",
    "/admin/search-name",
    "/admin/booking",
    "/admin/booking/selection",
    "/admin/booking/selection/date-picker",
    "/admin/booking/selection/date-picker/customer-info",
    "/admin/booking/selection/date-picker/customer-info/appointment-info",
    "/admin/prices",
    "/admin/appointments",
    "/admin/promos",
    "/worker/worker-appointments", // Updated path for worker appointments
    "/worker",
        "/worker/booking", 
        "/worker/search-name",
        "/worker/booking/selection",
        "/worker/booking/selection/date-picker",
        "/worker/booking/selection/date-picker/customer-info",
        "/worker/booking/selection/date-picker/customer-info/appointment-info",
  ],
};
