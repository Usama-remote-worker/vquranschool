"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2, AlertCircle, Video, ArrowLeft, ShieldAlert, CreditCard } from "lucide-react";
import Link from "next/link";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function ClassroomPage() {
  const { id } = useParams();
  const { data: session } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(false);
  const [jitsiLoaded, setJitsiLoaded] = useState(false);

  useEffect(() => {
    const checkAccess = async () => {
      try {
        const res = await fetch('/api/students/class-check');
        const data = await res.json();

        if (data.allowed) {
          setAllowed(true);
        } else {
          setError(data.reason);
        }
      } catch (err) {
        setError("Failed to verify access. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'student') {
      checkAccess();
    } else if (session?.user?.role === 'teacher' || session?.user?.role === 'admin') {
      setAllowed(true);
      setLoading(false);
    }
  }, [session]);

  useEffect(() => {
    if (allowed && !jitsiLoaded) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = () => setJitsiLoaded(true);
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [allowed, jitsiLoaded]);

  useEffect(() => {
    if (jitsiLoaded && allowed) {
      const domain = "meet.jit.si";
      const options = {
        roomName: `Lisan-Academy-${id}`,
        width: "100%",
        height: "100%",
        parentNode: document.querySelector("#jitsi-container"),
        userInfo: {
          displayName: session?.user?.name || "Student",
        },
        configOverwrite: {
          startWithAudioMuted: true,
          disableDeepLinking: true,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
            'fms', 'hangup', 'chat', 'recording',
            'livestreaming', 'etherpad', 'sharedvideo', 'settings', 'raisehand',
            'videoquality', 'filmstrip', 'feedback', 'stats', 'shortcuts',
            'tileview', 'videobackgroundblur', 'download', 'help', 'mute-everyone',
            'security'
          ],
        },
      };

      const api = new window.JitsiMeetExternalAPI(domain, options);

      return () => {
        api.dispose();
      };
    }
  }, [jitsiLoaded, allowed, id, session]);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50">
        <Loader2 className="w-12 h-12 animate-spin text-blue-600 mb-4" />
        <p className="text-slate-600 font-medium text-lg">Verifying your secure classroom access...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 text-center">
        <Card className="max-w-md w-full shadow-xl border-t-4 border-t-red-500">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <ShieldAlert className="w-8 h-8 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-slate-900">Access Restricted</CardTitle>
            <CardDescription className="text-slate-600 text-lg mt-2">
              {error}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button asChild className="w-full h-12 text-lg bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/student/pricing">
                <CreditCard className="w-5 h-5 mr-2" /> Upgrade Your Plan
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full h-12 text-lg">
              <Link href="/dashboard/student">
                <ArrowLeft className="w-5 h-5 mr-2" /> Back to Dashboard
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen bg-slate-900 overflow-hidden">
      {/* Header bar */}
      <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center justify-between px-6 shrink-0">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-lg">
            <Video className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-white text-lg tracking-tight">Live Classroom: {id}</span>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-slate-300 hover:text-white hover:bg-slate-700">
          <Link href="/dashboard/student">
            <ArrowLeft className="w-4 h-4 mr-2" /> Exit Class
          </Link>
        </Button>
      </div>

      {/* Classroom Area */}
      <div className="flex-grow relative bg-slate-950">
        {!jitsiLoaded && allowed && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <Loader2 className="w-10 h-10 animate-spin text-blue-500 mb-2" />
            <p className="text-slate-400">Loading secure video link...</p>
          </div>
        )}
        <div id="jitsi-container" className="w-full h-full" />
      </div>
    </div>
  );
}
