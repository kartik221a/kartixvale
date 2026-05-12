"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Eye,
  MousePointerClick,
  Mail,
  Users,
  MessageSquare,
  Download,
  LogOut,
  BarChart3,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface AdminData {
  summary: {
    totalPageViews: number;
    totalButtonClicks: number;
    totalEmailSignups: number;
    totalSubscribers: number;
    totalContactMessages: number;
  };
  chartData: { date: string; views: number }[];
  recentEvents: {
    id: string;
    eventType: string;
    page: string | null;
    metadata: string | null;
    createdAt: string;
  }[];
  recentSubscribers: {
    id: string;
    email: string;
    source: string;
    createdAt: string;
  }[];
}

export default function AdminPage() {
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [data, setData] = useState<AdminData | null>(null);

  const fetchData = useCallback(async (authToken: string) => {
    try {
      const res = await fetch("/api/admin/analytics", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to fetch analytics data");
    }
  }, []);

  useEffect(() => {
    const savedToken = localStorage.getItem("admin_token");
    if (savedToken) {
      setToken(savedToken);
      fetchData(savedToken);
    }
  }, [fetchData]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Verify password by trying to fetch data
    const res = await fetch("/api/admin/analytics", {
      headers: { Authorization: `Bearer ${password}` },
    });

    if (res.ok) {
      setToken(password);
      localStorage.setItem("admin_token", password);
      fetchData(password);
    } else {
      setError("Invalid password");
    }
    setLoading(false);
  };

  const handleLogout = () => {
    setToken("");
    setData(null);
    localStorage.removeItem("admin_token");
  };

  const handleExportCSV = async () => {
    try {
      const res = await fetch("/api/admin/emails?format=csv", {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("Export failed");
      const csv = await res.text();
      const blob = new Blob([csv], { type: "text/csv" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "subscribers.csv";
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      setError("Failed to export CSV");
    }
  };

  // Login screen
  if (!token) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center p-4">
        <Card className="w-full max-w-md card-dark border-border">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-12 rounded-full bg-blood/20 flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blood-light" />
              </div>
            </div>
            <CardTitle className="font-serif text-2xl text-foreground">
              Admin Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Kartix Vale — Analytics & Subscribers
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black/50 border-border text-foreground placeholder:text-muted-foreground"
              />
              {error && (
                <p className="text-sm text-blood-light">{error}</p>
              )}
              <Button
                type="submit"
                disabled={loading || !password}
                variant="blood"
                className="w-full"
              >
                {loading ? "Verifying..." : "Login"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Dashboard
  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      {/* Header */}
      <header className="border-b border-border bg-[#0d0d0d]">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="font-serif text-xl md:text-2xl text-foreground">
              Kartix Vale — Admin
            </h1>
            <p className="text-xs text-muted-foreground">Dashboard</p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="border-border text-muted-foreground hover:text-foreground"
          >
            <LogOut className="h-4 w-4 mr-1" />
            Logout
          </Button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Summary Cards */}
        {data && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <Card className="card-dark border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Eye className="h-4 w-4 text-blood-light" />
                  <span className="text-xs text-muted-foreground">Page Views</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.summary.totalPageViews}
                </p>
              </CardContent>
            </Card>
            <Card className="card-dark border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MousePointerClick className="h-4 w-4 text-gold" />
                  <span className="text-xs text-muted-foreground">Clicks</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.summary.totalButtonClicks}
                </p>
              </CardContent>
            </Card>
            <Card className="card-dark border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Mail className="h-4 w-4 text-midnight-light" />
                  <span className="text-xs text-muted-foreground">Signups</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.summary.totalEmailSignups}
                </p>
              </CardContent>
            </Card>
            <Card className="card-dark border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="h-4 w-4 text-green-500" />
                  <span className="text-xs text-muted-foreground">Subscribers</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.summary.totalSubscribers}
                </p>
              </CardContent>
            </Card>
            <Card className="card-dark border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="h-4 w-4 text-blue-400" />
                  <span className="text-xs text-muted-foreground">Messages</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {data.summary.totalContactMessages}
                </p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Chart + Export */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="card-dark border-border lg:col-span-2">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-foreground">
                Page Views (Last 7 Days)
              </CardTitle>
            </CardHeader>
            <CardContent>
              {data && data.chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={data.chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#222" />
                    <XAxis
                      dataKey="date"
                      stroke="#8a8a8a"
                      fontSize={12}
                      tickFormatter={(v) => v.split("-").slice(1).join("/")}
                    />
                    <YAxis stroke="#8a8a8a" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#111",
                        border: "1px solid #222",
                        borderRadius: "8px",
                        color: "#e8e4e0",
                      }}
                    />
                    <Bar dataKey="views" fill="#DC143C" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-[300px] flex items-center justify-center text-muted-foreground">
                  No chart data yet. Visit the main site to generate page views.
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="card-dark border-border">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-foreground">
                Export
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={handleExportCSV}
                variant="blood"
                className="w-full"
              >
                <Download className="h-4 w-4 mr-2" />
                Export Emails as CSV
              </Button>
              <p className="text-xs text-muted-foreground text-center">
                Download all subscriber emails in CSV format
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Subscribers & Events */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="card-dark border-border">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-foreground">
                Recent Subscribers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {data?.recentSubscribers.length ? (
                  data.recentSubscribers.map((sub) => (
                    <div
                      key={sub.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-border/50"
                    >
                      <div>
                        <p className="text-sm text-foreground">{sub.email}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                      <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                        {sub.source}
                      </Badge>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No subscribers yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="card-dark border-border">
            <CardHeader>
              <CardTitle className="font-serif text-lg text-foreground">
                Recent Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {data?.recentEvents.length ? (
                  data.recentEvents.map((event) => (
                    <div
                      key={event.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-black/30 border border-border/50"
                    >
                      <div>
                        <div className="flex items-center gap-2">
                          <Badge
                            variant="outline"
                            className={`text-xs ${
                              event.eventType === "page_view"
                                ? "border-blood/30 text-blood-light"
                                : event.eventType === "email_signup"
                                ? "border-green-500/30 text-green-400"
                                : "border-gold/30 text-gold"
                            }`}
                          >
                            {event.eventType}
                          </Badge>
                          {event.page && (
                            <span className="text-xs text-muted-foreground">
                              {event.page}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(event.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No events yet
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {error && (
          <p className="text-sm text-blood-light text-center">{error}</p>
        )}
      </div>
    </div>
  );
}
