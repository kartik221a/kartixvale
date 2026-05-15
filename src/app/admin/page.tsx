"use client";

import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  MessageSquare,
  Download,
  LogOut,
  Shield,
  Mail,
} from "lucide-react";

interface AdminData {
  summary: {
    totalSubscribers: number;
    totalContactMessages: number;
  };
  recentSubscribers: {
    id: string;
    email: string;
    source: string;
    createdAt: string;
  }[];
  recentMessages: {
    id: string;
    name: string;
    email: string;
    message: string;
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
      const res = await fetch("/api/admin/dashboard", {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (!res.ok) throw new Error("Failed to fetch");
      const json = await res.json();
      setData(json);
    } catch {
      setError("Failed to fetch dashboard data");
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

    const res = await fetch("/api/admin/dashboard", {
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
                <Shield className="h-6 w-6 text-blood-light" />
              </div>
            </div>
            <CardTitle className="font-serif text-2xl text-foreground">
              Admin Dashboard
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Kartix Vale — Subscribers & Messages
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
          <div className="grid grid-cols-2 gap-4">
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

        {/* Export */}
        <Card className="card-dark border-border">
          <CardHeader>
            <CardTitle className="font-serif text-lg text-foreground">
              Export
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleExportCSV}
              variant="blood"
              className="w-full sm:w-auto"
            >
              <Download className="h-4 w-4 mr-2" />
              Export Emails as CSV
            </Button>
            <p className="text-xs text-muted-foreground mt-2">
              Download all subscriber emails in CSV format
            </p>
          </CardContent>
        </Card>

        {/* Recent Subscribers & Messages */}
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
                      <div className="flex items-center gap-2 min-w-0">
                        <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        <p className="text-sm text-foreground truncate">{sub.email}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 ml-2">
                        <Badge variant="outline" className="text-xs border-border text-muted-foreground">
                          {sub.source}
                        </Badge>
                        <span className="text-xs text-muted-foreground hidden sm:inline">
                          {new Date(sub.createdAt).toLocaleDateString()}
                        </span>
                      </div>
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
                Recent Messages
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto space-y-2">
                {data?.recentMessages.length ? (
                  data.recentMessages.map((msg) => (
                    <div
                      key={msg.id}
                      className="p-3 rounded-lg bg-black/30 border border-border/50"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm text-foreground font-medium">{msg.name}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(msg.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mb-1">{msg.email}</p>
                      <p className="text-sm text-muted-foreground/80 line-clamp-2">{msg.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground text-center py-8">
                    No messages yet
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
