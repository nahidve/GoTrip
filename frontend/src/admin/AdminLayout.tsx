/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import AdminSidebar, { AdminTab } from "./components/AdminSidebar";
import AdminDashboard from "./pages/AdminDashboard";
import ArticlesPage from "./pages/ArticlesPage";
import GeneratedContentPage from "./pages/GeneratedContentPage";
import PublishingPage from "./pages/PublishingPage";
import ActivityPage from "./pages/ActivityPage";

export default function AdminLayout() {
  const [currentTab, setCurrentTab] = useState<AdminTab>("dashboard");

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-[#FDFBF7] dark:bg-[#0A0A09] text-black dark:text-[#FDFBF7]">
      {/* 1. CONTROL SIDEBAR */}
      <AdminSidebar currentTab={currentTab} setTab={setCurrentTab} />

      {/* 2. DYNAMIC BROADCAST WINDOW */}
      <main className="flex-1 p-6 md:p-10 lg:p-12 overflow-y-auto">
        {currentTab === "dashboard" && (
          <AdminDashboard setTab={setCurrentTab} />
        )}
        {currentTab === "articles" && <ArticlesPage />}
        {currentTab === "content" && <GeneratedContentPage />}
        {currentTab === "queue" && <PublishingPage />}
        {currentTab === "activity" && <ActivityPage />}
      </main>
    </div>
  );
}
