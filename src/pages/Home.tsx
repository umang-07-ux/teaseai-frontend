import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { UploadCloud, Link as LinkIcon, Loader2, CheckCircle2, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function IngestionDashboard() {
  const navigate = useNavigate();
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStep, setProgressStep] = useState(0);
  const [progressValue, setProgressValue] = useState(0);

  const steps = [
    "Initializing TEASEAI Engine...",
    "Uploading to S3...",
    "Deepgram Transcription...",
    "Gemini Narrative Extraction...",
    "Finalizing Teaser Clips..."
  ];

  // Mock Inngest Processing Polling
  useEffect(() => {
    if (!isGenerating) return;

    let currentStep = 0;
    let currentValue = 0;

    const interval = setInterval(() => {
      currentValue += Math.floor(Math.random() * 15) + 5;
      
      if (currentValue >= 100) {
        if (currentStep < steps.length - 1) {
          currentStep++;
          currentValue = 0;
          setProgressStep(currentStep);
          setProgressValue(currentValue);
        } else {
          setProgressValue(100);
          clearInterval(interval);
          // Auto route to editor when complete
          setTimeout(() => {
            navigate("/editor");
          }, 1000);
        }
      } else {
        setProgressValue(currentValue);
      }
    }, 400);

    return () => clearInterval(interval);
  }, [isGenerating, navigate, steps.length]);

  const handleGenerate = () => {
    // Mock /api/upload trigger
    setIsGenerating(true);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden bg-slate-900">
      {/* Background Decor */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-cyan-500/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] rounded-full bg-indigo-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl w-full z-10 flex flex-col items-center gap-8">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center justify-center p-3 bg-slate-800/50 rounded-2xl border border-slate-700/50 mb-4 text-cyan-400">
            <Video className="w-8 h-8 mr-2" />
            <h1 className="text-3xl font-bold tracking-tight">TEASEAI</h1>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-100">
            Enterprise Video Teaser Generation
          </h2>
          <p className="text-lg text-slate-400 max-w-xl mx-auto">
            Upload your raw media or paste a link. Our AI autonomously extracts the highest-converting narrative clips.
          </p>
        </div>

        {!isGenerating ? (
          <Card className="w-full glass-panel border-0 text-slate-200">
            <CardHeader className="text-center">
              <CardTitle>Ingest Media</CardTitle>
              <CardDescription className="text-slate-400">Drag & drop your file or use a YouTube URL</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Drag and Drop Zone */}
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-12 text-center hover:bg-slate-800/50 hover:border-cyan-400/50 transition-colors duration-300 cursor-pointer group">
                <div className="flex flex-col items-center gap-3">
                  <div className="p-4 bg-slate-800 rounded-full group-hover:bg-cyan-500/20 group-hover:text-cyan-400 transition-colors duration-300">
                    <UploadCloud className="w-8 h-8 text-slate-400 group-hover:text-cyan-400" />
                  </div>
                  <h3 className="text-lg font-semibold">Drop your video here</h3>
                  <p className="text-sm text-slate-500">MP4, MOV, or WEBM up to 10GB</p>
                </div>
              </div>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-slate-700" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-slate-900 px-2 text-slate-500">Or import from</span>
                </div>
              </div>

              {/* YouTube Input */}
              <div className="flex gap-3">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500" />
                  <Input 
                    placeholder="Paste YouTube URL..." 
                    className="pl-10 bg-slate-800/50 border-slate-700 focus-visible:ring-cyan-400"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                  />
                </div>
                <Button 
                  onClick={handleGenerate}
                  className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold px-8"
                >
                  Generate Teaser
                </Button>
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card className="w-full glass-panel border-0 text-slate-200">
            <CardHeader className="text-center">
              <CardTitle className="flex justify-center items-center gap-2 text-2xl">
                {progressStep === steps.length - 1 && progressValue === 100 ? (
                  <CheckCircle2 className="w-8 h-8 text-emerald-400" />
                ) : (
                  <Loader2 className="w-8 h-8 animate-spin text-cyan-400" />
                )}
                Processing Media
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8 py-8">
              <div className="space-y-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-cyan-400">{steps[progressStep]}</span>
                  <span className="text-slate-400">{progressValue}%</span>
                </div>
                <Progress value={progressValue} className="h-2 bg-slate-800" />
              </div>

              <div className="space-y-3">
                {steps.map((step, index) => (
                  <div key={index} className="flex items-center gap-3 text-sm">
                    {index < progressStep ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : index === progressStep ? (
                      <Loader2 className="w-5 h-5 animate-spin text-cyan-400" />
                    ) : (
                      <div className="w-5 h-5 rounded-full border-2 border-slate-700" />
                    )}
                    <span className={index <= progressStep ? "text-slate-200" : "text-slate-600"}>
                      {step}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </main>
  );
}
