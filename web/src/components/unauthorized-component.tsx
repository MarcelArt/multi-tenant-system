import { LogOut, ShieldBan } from "lucide-react";
import { Button } from "./ui/button";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "./ui/empty";
import { useNavigate } from "@tanstack/react-router";
import useAuth from "@/hooks/useAuth";

export function UnauthorizedComponent() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const onLogout = () => {
    localStorage.removeItem('refreshToken');
    logout();
    navigate({ to: '/login' });
  }

	return (
		<Empty className="from-muted/50 to-background h-full bg-linear-to-b from-30% rounded-none">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <ShieldBan />
        </EmptyMedia>
        <EmptyTitle>Not Authorized</EmptyTitle>
        <EmptyDescription>
          You do not have permission to access this resource. Please contact your administrator if you believe this is a mistake.
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <Button variant="outline" size="sm" onClick={onLogout}>
          <LogOut />
          Log out
        </Button>
      </EmptyContent>
    </Empty>
	);
}
