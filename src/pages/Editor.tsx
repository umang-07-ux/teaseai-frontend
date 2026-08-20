import { useState } from "react";
import { Play, Pause, SkipBack, SkipForward, Download, Scissors, LayoutDashboard, Keyboard, Settings2 } from "lucide-react";
import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const transcriptData = [
  { id: 1, clipId: "clip1", text: "Welcome back to the channel. Today we're looking at something incredible.", highlight: false },
  { id: 2, clipId: "clip1", text: "This is the most powerful tool I've ever used in my workflow.", highlight: true, markerColor: "cyan" },
  { id: 3, clipId: "clip2", text: "Let's dive right into how you can set it up.", highlight: false },
  { id: 4, clipId: "clip2", text: "The automation here saves me literally hours every single week.", highlight: true, markerColor: "indigo" },
  { id: 5, clipId: "clip3", text: "And that's the secret to scaling your content.", highlight: false },
  { id: 6, clipId: "clip3", text: "If you want to see more, hit that subscribe button.", highlight: true, markerColor: "cyan" },
];

const clips = [
  { id: "clip1", label: "Clip 1", time: "00:00:15:00 - 00:01:00:00", duration: "45s", score: 94 },
  { id: "clip2", label: "Clip 2", time: "00:02:30:00 - 00:03:00:00", duration: "30s", score: 88 },
  { id: "clip3", label: "Clip 3", time: "00:05:00:00 - 00:06:15:00", duration: "75s", score: 82 },
];

export default function EditorWorkspace() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState([30]);
  const [playbackSpeed, setPlaybackSpeed] = useState("1x");
  const [aspectRatio, setAspectRatio] = useState("16:9");
  const [activeClip, setActiveClip] = useState("clip1");
  const [isExporting, setIsExporting] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-200 overflow-hidden">
      
      {/* Top Navbar */}
      <header className="h-14 glass-panel border-b border-slate-800 flex items-center justify-between px-6 z-10 shrink-0">
        <div className="flex items-center gap-2 text-cyan-400">
          <Scissors className="w-5 h-5" />
          <h1 className="text-xl font-bold tracking-tight">TEASEAI Editor</h1>
        </div>
        
        <div className="flex items-center gap-4">
          <Dialog>
            <DialogTrigger render={<Button variant="ghost" size="icon" className="text-slate-400 hover:text-white" title="Keyboard Shortcuts" />}>
                <Keyboard className="w-4 h-4" />
            </DialogTrigger>
            <DialogContent className="glass-panel text-slate-200 border-slate-700/50">
              <DialogHeader>
                <DialogTitle>Keyboard Shortcuts</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Essential hotkeys for high-performance editing.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="flex justify-between items-center"><span className="text-slate-400">Play/Pause</span><kbd className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">Space</kbd></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Scrub (Rewind/Play/Forward)</span><kbd className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">J / K / L</kbd></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Mark In / Out</span><kbd className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">I / O</kbd></div>
                <div className="flex justify-between items-center"><span className="text-slate-400">Deselect Clip</span><kbd className="bg-slate-800 px-2 py-1 rounded font-mono text-xs">Esc</kbd></div>
              </div>
            </DialogContent>
          </Dialog>

          <Link to="/">
            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-800">
              <LayoutDashboard className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Panel: Video & Timeline */}
        <section className="flex-[3] flex flex-col p-6 border-r border-slate-800 bg-slate-900/50 gap-4 min-h-0">
          
          <div className="flex justify-between items-center shrink-0">
            <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase">Preview Window</h2>
            <Tabs value={aspectRatio} onValueChange={setAspectRatio} className="w-[200px]">
              <TabsList className="grid w-full grid-cols-3 h-8 bg-slate-950 border border-slate-800">
                <TabsTrigger value="16:9" className="text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-400">16:9</TabsTrigger>
                <TabsTrigger value="9:16" className="text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-400">9:16</TabsTrigger>
                <TabsTrigger value="1:1" className="text-xs data-[state=active]:bg-slate-800 data-[state=active]:text-cyan-400">1:1</TabsTrigger>
              </TabsList>
            </Tabs>
          </div>

          {/* Video Player Placeholder */}
          <div className="flex-1 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden flex items-center justify-center relative shadow-2xl min-h-0">
            <div className={`relative flex items-center justify-center transition-all duration-500 overflow-hidden bg-gradient-to-br from-slate-900 to-slate-950
              ${aspectRatio === "16:9" ? "w-full aspect-video" : 
                aspectRatio === "9:16" ? "h-full aspect-[9/16]" : 
                "h-full aspect-square"}`}
            >
              
              <div className="z-10 text-center space-y-4">
                <Play className="w-16 h-16 text-slate-600 mx-auto opacity-50" />
                <p className="text-slate-500 font-mono text-sm">Remotion Player Stub</p>
              </div>
              
              {/* Highlight Overlay Demo */}
              <div className="absolute top-4 right-4 flex flex-col gap-2 z-20">
                <Badge className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/50 backdrop-blur-md">
                  AI Selected Clip
                </Badge>
              </div>

              {/* Social Safe Area Overlay for 9:16 */}
              {aspectRatio === "9:16" && (
                <div className="absolute inset-4 border-2 border-dashed border-white/20 rounded-[2rem] pointer-events-none z-20 flex flex-col justify-between p-4">
                  <div className="w-full h-[15%] border-b border-dashed border-white/20 flex items-start justify-center text-[10px] text-white/30 font-mono">Top UI Safe Area</div>
                  <div className="w-full h-[25%] border-t border-dashed border-white/20 flex items-end justify-center text-[10px] text-white/30 font-mono pb-2">Bottom UI Safe Area</div>
                </div>
              )}
            </div>
          </div>

          {/* Video Controls & Timeline Container */}
          <div className="shrink-0 flex flex-col gap-2 bg-slate-950 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center justify-between">
              
              {/* Playback Controls */}
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="text-cyan-400 hover:text-cyan-300 hover:bg-cyan-500/10 h-10 w-10"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                </Button>
                <Button variant="ghost" size="icon" className="text-slate-400 hover:text-white h-8 w-8">
                  <SkipForward className="w-4 h-4" />
                </Button>

                <Select value={playbackSpeed} onValueChange={(val) => setPlaybackSpeed(val as string)}>
                  <SelectTrigger className="w-[70px] h-8 bg-slate-900 border-slate-700 text-xs text-slate-300">
                    <SelectValue placeholder="1x" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-900 border-slate-700 text-slate-300">
                    <SelectItem value="0.5x">0.5x</SelectItem>
                    <SelectItem value="1x">1x</SelectItem>
                    <SelectItem value="1.25x">1.25x</SelectItem>
                    <SelectItem value="1.5x">1.5x</SelectItem>
                    <SelectItem value="2x">2x</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* SMPTE Timecode */}
              <div className="font-mono text-sm tracking-wider text-cyan-400">
                00:00:15:04
              </div>
            </div>

            {/* Interactive Multi-Clip Selector */}
            <div className="flex gap-2 mt-2">
              {clips.map(clip => (
                <button
                  key={clip.id}
                  onClick={() => setActiveClip(clip.id)}
                  className={`flex-1 text-left px-3 py-2 rounded-md border text-xs transition-colors duration-200 ${
                    activeClip === clip.id 
                      ? "bg-cyan-500/10 border-cyan-500/50 text-cyan-400" 
                      : "bg-slate-900 border-slate-800 text-slate-500 hover:bg-slate-800"
                  }`}
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold">{clip.label} ({clip.duration})</span>
                    <span className="font-mono">{clip.score} Score</span>
                  </div>
                  <div className="font-mono text-[10px] opacity-70">{clip.time}</div>
                </button>
              ))}
            </div>

            {/* Timeline Scrubber */}
            <div className="h-8 mt-2 relative flex items-center">
              <div className="w-full h-4 bg-slate-900 rounded relative overflow-hidden border border-slate-800">
                {/* Active Clip Region Highlight */}
                {activeClip === "clip1" && <div className="absolute top-0 bottom-0 left-[10%] w-[15%] bg-cyan-500/30 border-l border-r border-cyan-500/50" />}
                {activeClip === "clip2" && <div className="absolute top-0 bottom-0 left-[40%] w-[10%] bg-cyan-500/30 border-l border-r border-cyan-500/50" />}
                {activeClip === "clip3" && <div className="absolute top-0 bottom-0 left-[70%] w-[25%] bg-cyan-500/30 border-l border-r border-cyan-500/50" />}
                
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)] z-10" 
                  style={{ left: `${progress[0]}%` }}
                />
              </div>
              <Slider 
                value={progress}
                onValueChange={(val) => setProgress(val as number[])}
                max={100} 
                step={0.1} 
                className="absolute inset-0 opacity-0 cursor-ew-resize"
              />
            </div>
          </div>
        </section>

        {/* Right Panel: AI Narrative & Transcript */}
        <section className="flex-[2] flex flex-col p-6 gap-6 bg-slate-900/30 overflow-y-auto min-h-0 border-l border-slate-800/50">
          
          <h2 className="text-sm font-semibold tracking-wider text-slate-400 uppercase shrink-0">AI Narrative Analysis</h2>
          
          {/* Granular Metric Breakdown */}
          <div className="space-y-4 shrink-0 bg-slate-950 p-4 rounded-xl border border-slate-800">
            
            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Hook Strength</span>
                <span className="text-emerald-400 font-mono">92%</span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">High emotional spike detected in opening 5s.</p>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-emerald-500 w-[92%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Narrative Coherence</span>
                <span className="text-cyan-400 font-mono">88%</span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">Clear premise established and resolved.</p>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-cyan-500 w-[88%]" />
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-300 font-medium">Pacing & Cadence</span>
                <span className="text-cyan-400 font-mono">90%</span>
              </div>
              <p className="text-xs text-slate-500 leading-snug">Optimal speech rate (145 wpm) for high retention.</p>
              <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-2">
                <div className="h-full bg-cyan-500 w-[90%]" />
              </div>
            </div>

          </div>

          {/* Transcript Window */}
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex justify-between items-center mb-4 shrink-0">
              <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Generated Transcript</h3>
              <Badge variant="outline" className="text-xs text-slate-500 border-slate-700">Auto-Sync Enabled</Badge>
            </div>
            <div className="flex-1 overflow-y-auto pr-4 space-y-3 custom-scrollbar">
              {transcriptData.map((item) => {
                const isActive = item.clipId === activeClip;
                return (
                  <div 
                    key={item.id} 
                    className={`p-3 rounded-lg text-sm leading-relaxed transition-all duration-300 border ${
                      isActive 
                        ? item.highlight 
                          ? "bg-cyan-500/10 border-cyan-500/30 text-cyan-100 shadow-[0_0_15px_rgba(34,211,238,0.05)]"
                          : "bg-slate-800/50 border-slate-700 text-slate-200"
                        : "bg-transparent border-transparent text-slate-500 hover:bg-slate-900/50"
                    }`}
                  >
                    <span className="opacity-50 text-[10px] font-mono mr-3 block mb-1">
                      [00:00:{item.id * 15}:00]
                    </span>
                    {item.text}
                  </div>
                );
              })}
            </div>
          </div>

        </section>
      </main>

      {/* Export & Analytics Bar */}
      <footer className="h-16 glass-panel border-t border-slate-800 flex items-center justify-between px-8 z-10 shrink-0">
        <div className="flex gap-8">
          <div className="flex flex-col">
            <span className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">Original TRT</span>
            <span className="text-sm font-semibold text-slate-300 font-mono">00:12:45:00</span>
          </div>
          <div className="w-px h-8 bg-slate-800" />
          <div className="flex flex-col">
            <span className="text-[10px] text-cyan-400/80 font-medium uppercase tracking-wider">Teaser TRT</span>
            <span className="text-sm font-semibold text-cyan-400 font-mono">00:00:45:00</span>
          </div>
        </div>
        
        <Dialog open={isExporting} onOpenChange={setIsExporting}>
          <DialogTrigger render={<Button className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-8 shadow-[0_0_15px_rgba(34,211,238,0.2)]" />}>
              <Download className="w-4 h-4 mr-2" />
              Download High-Res
          </DialogTrigger>
          <DialogContent className="glass-panel border-slate-700/50 text-slate-200">
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Settings2 className="w-5 h-5 text-cyan-400" />
                Production Export Settings
              </DialogTitle>
              <DialogDescription className="text-slate-400">
                Configure rendering parameters for {activeClip}.
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-6 py-4">
              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-slate-500">Resolution</Label>
                <RadioGroup defaultValue="1080p" className="flex gap-4">
                  <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-md">
                    <RadioGroupItem value="1080p" id="res-1080p" className="text-cyan-400 border-slate-600" />
                    <Label htmlFor="res-1080p" className="text-sm font-mono cursor-pointer">1080p (FHD)</Label>
                  </div>
                  <div className="flex items-center space-x-2 bg-slate-900 border border-slate-800 px-4 py-2 rounded-md">
                    <RadioGroupItem value="4k" id="res-4k" className="text-cyan-400 border-slate-600" />
                    <Label htmlFor="res-4k" className="text-sm font-mono cursor-pointer">4K (UHD)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-slate-500">Subtitles</Label>
                <RadioGroup defaultValue="burned" className="flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="burned" id="sub-burned" className="text-cyan-400 border-slate-600" />
                    <Label htmlFor="sub-burned" className="text-sm cursor-pointer">Burned-in (Hardsub - Ideal for Social)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="srt" id="sub-srt" className="text-cyan-400 border-slate-600" />
                    <Label htmlFor="sub-srt" className="text-sm cursor-pointer">Export separate .SRT file</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-3">
                <Label className="text-xs uppercase tracking-wider text-slate-500">Format</Label>
                <Input value="MP4 (H.264)" disabled className="bg-slate-900 border-slate-800 text-slate-500 font-mono" />
              </div>
            </div>

            <DialogFooter>
              <Button variant="outline" onClick={() => setIsExporting(false)} className="border-slate-700 text-slate-300 hover:bg-slate-800">
                Cancel
              </Button>
              <Button onClick={() => setIsExporting(false)} className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold">
                Start Render Queue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </footer>
    </div>
  );
}
