import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import LoginPage from "./pages/LoginPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import DashboardPage from "./pages/DashboardPage";
import EventsPage from "./pages/EventsPage";
import UsersPage from "./pages/UsersPage";
import CreateUserPage from "./pages/CreateUserPage";
import CreateEventPage from "./pages/CreateEventPage";
import EditEventPage from "./pages/EditEventPage";
import EditUserPage from "./pages/EditUserPage";
import { useAuth } from "./context/AuthContext";
import EventDetailsPage from "./pages/EventDetailsPage";

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>("login");
  const [currentEventId, setCurrentEventId] = useState<string | null>(null);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const { isAuthenticated, logout, user } = useAuth();

  const navigate = (
    page: string,
    params?: { eventId?: string; userId?: string }
  ) => {
    setCurrentPage(page);
    setCurrentEventId(params?.eventId || null);
    setCurrentUserId(params?.userId || null);
    if (window.innerWidth < 768) setIsSidebarOpen(false);
  };

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  useEffect(() => {
    if (
      !isAuthenticated &&
      currentPage !== "login" &&
      currentPage !== "reset-password"
    ) {
      setCurrentPage("login");
    }
  }, [isAuthenticated, currentPage]);

  return (
    <div className="flex flex-col min-h-screen font-sans antialiased bg-gray-100">
      {/* Header at the top */}
      <header className="w-full">
        {isAuthenticated && user && (
          <Header
            onLogout={logout}
            userName={user.username}
            toggleSidebar={toggleSidebar}
          />
        )}
      </header>

      {/* Row flex: Sidebar + Main content */}
      <div className="flex flex-row flex-1 min-h-0">
        {/* Sidebar always visible when authenticated */}
        {isAuthenticated && user && (
          <aside className="w-64">
            <Sidebar
              onNavigate={navigate}
              isSidebarOpen={isSidebarOpen}
              toggleSidebar={toggleSidebar}
            />
          </aside>
        )}

        {/* Main content centered */}
        <main className="flex-1 w-full flex items-start justify-start min-h-0">
          <div className="w-full  mr-10">
            {/* Authenticated pages */}
            {isAuthenticated &&
              user &&
              (() => {
                switch (currentPage) {
                  case "dashboard":
                    return <DashboardPage />;
                  case "events":
                    return <EventsPage onNavigate={navigate} />;
                  case "create-event":
                    return <CreateEventPage onNavigate={navigate} />;
                  case "edit-event":
                    return currentEventId ? (
                      <EditEventPage
                        eventId={currentEventId}
                        onNavigate={navigate}
                      />
                    ) : (
                      <p className="text-red-500 text-center">
                        Event ID missing for editing.
                      </p>
                    );
                  case "event-detail":
                    return currentEventId ? (
                      <EventDetailsPage
                        eventId={currentEventId}
                        onNavigate={navigate}
                      />
                    ) : (
                      <p className="text-red-500 text-center">
                        Event ID missing for detail view.
                      </p>
                    );
                  case "users":
                    return <UsersPage onNavigate={navigate} />;
                  case "create-user":
                    return <CreateUserPage onNavigate={navigate} />;
                  case "edit-user":
                    return currentUserId ? (
                      <EditUserPage
                        userId={currentUserId}
                        onNavigate={navigate}
                      />
                    ) : (
                      <p className="text-red-500 text-center">
                        User ID missing for editing.
                      </p>
                    );
                  default:
                    return <DashboardPage />;
                }
              })()}

            {/* Unauthenticated pages */}
            {!isAuthenticated &&
              (currentPage === "login" || currentPage === "reset-password") && (
                <>
                  {currentPage === "login" && (
                    <LoginPage
                      onLoginSuccess={() => navigate("dashboard")}
                      onNavigate={navigate}
                    />
                  )}
                  {currentPage === "reset-password" && (
                    <ResetPasswordPage onNavigate={navigate} />
                  )}
                </>
              )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default App;
