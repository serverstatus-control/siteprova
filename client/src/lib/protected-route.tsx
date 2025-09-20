import { useAuth } from "@/hooks/use-auth";
import { Loader2 } from "lucide-react";
import { Redirect, Route } from "wouter";
import { UserRole } from "@shared/schema";

// ProtectedRoute component for routes that require authentication
export function ProtectedRoute({
  path,
  component: Component,
  adminOnly = false,
  children,
}: {
  path?: string;
  component?: React.ComponentType;
  adminOnly?: boolean;
  children?: React.ReactNode;
}) {
  const { user, isLoading } = useAuth();

  // Show loading spinner while checking authentication
  if (isLoading) {
    const content = (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
    
    return path ? <Route path={path}>{content}</Route> : content;
  }

  // Redirect to auth page if not authenticated
  if (!user) {
    const content = <Redirect to="/auth" />;
    return path ? <Route path={path}>{content}</Route> : content;
  }

  // Redirect to home if admin-only route and user is not admin
  if (adminOnly && user.role !== UserRole.ADMIN) {
    const content = <Redirect to="/" />;
    return path ? <Route path={path}>{content}</Route> : content;
  }

  // Render the protected component or children
  const content = children || (Component && <Component />);
  return path ? <Route path={path}>{content}</Route> : <>{content}</>;
}