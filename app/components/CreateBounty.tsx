'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Sparkles, DollarSign, Code, AlertCircle, CheckCircle2, Loader2, ArrowRight, Github, Info, Clipboard } from 'lucide-react';

interface CreateBountyProps {
  onBountyCreated?: (bounty: any) => void;
}

export default function CreateBounty({ onBountyCreated }: CreateBountyProps) {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [repoUrl, setRepoUrl] = useState('');
  const [reward, setReward] = useState('');
  const [difficulty, setDifficulty] = useState('Intermediate');
  const [platform, setPlatform] = useState('Algora');
  const [description, setDescription] = useState('');
  const [additionalInfo, setAdditionalInfo] = useState('');
  
  const [isImporting, setIsImporting] = useState(false);
  const [importLog, setImportLog] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [createMode, setCreateMode] = useState<'import' | 'manual'>('import');

  // Auto fee calculations
  const bountyAmount = parseFloat(reward) || 0;
  const platformFee = bountyAmount * 0.10;
  const totalCost = bountyAmount + platformFee;

  const handleImportIssue = () => {
    if (isImporting) return;
    
    const trimmedRepoUrl = repoUrl.trim();
    if (!trimmedRepoUrl) {
      setError('Please paste a GitHub issue URL first!');
      return;
    }
    if (!trimmedRepoUrl.includes('github.com')) {
      setError('Please enter a valid GitHub issue URL (e.g., github.com/owner/repo/issues/123)');
      return;
    }

    setError('');
    setIsImporting(true);
    setImportLog('Connecting to GitHub API...');

    setTimeout(() => {
      setImportLog('Fetching issue headers & authorization...');
    }, 600);

    setTimeout(() => {
      setImportLog('Analyzing Markdown AST & file requirements...');
    }, 1200);

    setTimeout(() => {
      // Mock prefill values based on URL characteristics
      let issueTitle = 'Fix rendering latency on infinite-scroll viewports';
      let issueDesc = `Our infinite scroll list triggers major layout shifts when appending next-page chunks.

We need to:
1. Implement virtualized list windowing using react-window or custom IntersectionObserver hooks.
2. Thottle scroll events.
3. Keep layout dimensions locked during chunk insertion.

Acceptance criteria:
- Average layout shift score (CLS) must remain below 0.05.
- Scrolling FPS must hover consistently around 60fps.`;
      let issuePlatform = 'Polar';
      let issueDiff = 'Intermediate';

      if (repoUrl.includes('react') || repoUrl.includes('facebook')) {
        issueTitle = '[React DOM] Optimize streaming SSR backpressure queue';
        issueDesc = `Streaming HTML responses under heavy network throttling build up extreme memory buffers in react-dom/server.

We need someone to:
- Profile memory footprint of react-dom streaming SSR.
- Implement an elastic backpressure flush queue with configurable byte high-water marks.
- Backport changes into standard streaming router connectors.`;
        issueDiff = 'Advanced';
        issuePlatform = 'Algora';
      } else if (repoUrl.includes('auth') || repoUrl.includes('login')) {
        issueTitle = 'Prevent duplicate session token generation in OAuth callback';
        issueDesc = `During fast double-clicking on the OAuth login callback route, two session tokens are created in the database under the same provider account, creating active race conditions.

Required fix:
- Implement database transaction locks on user record creation during callback redirect handler.`;
        issueDiff = 'Beginner';
        issuePlatform = 'Gitcoin';
      }

      setTitle(issueTitle);
      setDescription(issueDesc);
      setPlatform(issuePlatform);
      setDifficulty(issueDiff);
      
      setIsImporting(false);
      setImportLog('');
    }, 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (loading) return;
    setError('');

    const trimmedTitle = title.trim();
    const trimmedRepoUrl = repoUrl.trim();
    const trimmedDescription = description.trim();

    if (!trimmedTitle || !trimmedRepoUrl || !reward.trim() || !trimmedDescription) {
      setError('Please fill in all required fields with non-empty characters (Bounty Title, Issue URL, Reward, and Description).');
      return;
    }

    if (isNaN(bountyAmount) || bountyAmount <= 0) {
      setError('Please specify a valid reward amount greater than 0.');
      return;
    }

    setLoading(true);

    // Simulate smart contract escrow deployment
    setTimeout(() => {
      const newBounty = {
        id: Date.now(),
        title,
        description,
        repoUrl,
        reward: bountyAmount, // save as number
        platform,
        difficulty,
        tag: bountyAmount >= 1000 ? 'Sponsored Bounty' : bountyAmount >= 400 ? 'Paid Bounty' : 'Common Bounty',
        featured: true,
        creator: 'mithilP007',
        createdAt: new Date().toISOString(),
        additionalInfo,
        status: 'active', // Await bounty hunter submissions
        contributors: [],
      };

      try {
        const savedBounties = localStorage.getItem('githunt_bounties');
        const currentBounties = savedBounties ? JSON.parse(savedBounties) : [];
        
        // Merge
        localStorage.setItem('githunt_bounties', JSON.stringify([newBounty, ...currentBounties]));

        // Push a simulated notification log
        const savedLogs = localStorage.getItem('githunt_logs') || '[]';
        const currentLogs = JSON.parse(savedLogs);
        currentLogs.unshift(`[${new Date().toLocaleTimeString()}] [EscrowBot] Bounty "${title}" deployed. Funded: $${bountyAmount} + $${platformFee.toFixed(2)} Fee. Status: Awaiting solvers.`);
        localStorage.setItem('githunt_logs', JSON.stringify(currentLogs));

      } catch (e) {
        console.error(e);
      }

      setLoading(false);
      setSuccess(true);
      if (onBountyCreated) {
        onBountyCreated(newBounty);
      }
      
      // Navigate to My Bounties dashboard after a short success display
      setTimeout(() => {
        router.push('/my-bounties');
      }, 1500);
    }, 2000);
  };

  return (
    <div className="py-8 px-4 max-w-4xl mx-auto">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/30 mb-6">
          <Sparkles className="w-4 h-4 text-pink-400 animate-pulse" />
          <span className="text-xs text-pink-300 font-bold tracking-wider uppercase">Bounty Escrow Hub</span>
        </div>
        <h2 className="text-4xl font-extrabold mb-4 leading-none">
          <span className="text-white">Create a </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-pink-400">
            Smart Bounty
          </span>
        </h2>
        <p className="text-slate-400 text-sm max-w-xl mx-auto">
          Fund open-source tasks in escrow. Your funds are secured and paid out automatically when pull requests are accepted.
        </p>
      </div>

      <Card className="bg-slate-900/40 border-slate-800 backdrop-blur-xl relative overflow-hidden shadow-2xl">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl" />

        <CardHeader className="border-b border-slate-800/80 pb-6">
          <CardTitle className="text-xl font-bold text-white flex items-center gap-2">
            <Github className="w-5 h-5 text-pink-400" />
            <span>Escrow Specifications</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs">
            Import from GitHub issues, calculate escrow funding fees, and publish to developers.
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-6">
          {success ? (
            <div className="flex flex-col items-center justify-center py-16 text-center animate-fade-in">
              <div className="w-20 h-20 rounded-full bg-green-500/10 border border-green-500/30 flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12 text-green-400 animate-bounce" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">Bounty Escrow Deployed!</h3>
              <p className="text-slate-400 max-w-sm text-xs leading-relaxed">
                Escrow address funded with <strong>${totalCost.toFixed(2)}</strong> (including 10% platform fee). Solvers have been notified.
              </p>
              <div className="mt-8 flex items-center gap-2 text-xs text-pink-400 animate-pulse">
                <span>Redirecting to My Bounties dashboard</span>
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30 flex items-center gap-3 text-red-400 text-xs">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Creation Mode Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-350 uppercase tracking-wider block">
                  Creation Mode Selection
                </label>
                <div className="grid grid-cols-2 gap-4 p-1 rounded-xl bg-slate-950 border border-slate-900">
                  <button
                    key="import"
                    type="button"
                    onClick={() => {
                      setCreateMode('import');
                      setRepoUrl('');
                      setTitle('');
                      setDescription('');
                      setError('');
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      createMode === 'import'
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    <span>🔗 Import from GitHub URL</span>
                  </button>
                  <button
                    key="manual"
                    type="button"
                    onClick={() => {
                      setCreateMode('manual');
                      setRepoUrl(`https://github.com/mithilP007/GitHunt/issues/manual-${Math.floor(100 + Math.random() * 900)}`);
                      setTitle('Custom Feature: Optimize Responsive Landing Elements');
                      setDescription(`Improve viewport constraints and loading states on mobile views.
                      
Requirements:
1. Implement clean Tailwind CSS configurations.
2. Clean layout transitions.
3. Fully functional mockup.`);
                      setError('');
                    }}
                    className={`py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
                      createMode === 'manual'
                        ? 'bg-gradient-to-r from-pink-600 to-purple-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    <span>✍️ Create Manually (Easy Add)</span>
                  </button>
                </div>
              </div>

              {/* GitHub Issue URL Input with Scraper Action */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex justify-between items-center">
                  <span>GitHub Issue URL</span>
                  <span className="text-pink-500">*</span>
                </label>
                
                {createMode === 'import' ? (
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative flex-1">
                      <Code className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                      <input
                        type="text"
                        value={repoUrl}
                        onChange={(e) => setRepoUrl(e.target.value)}
                        placeholder="e.g. github.com/facebook/react/issues/234"
                        className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={handleImportIssue}
                      disabled={isImporting}
                      className="bg-slate-900 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 text-slate-200 text-xs font-bold px-5 py-3 rounded-lg flex items-center justify-center gap-2 transition"
                    >
                      {isImporting ? (
                        <>
                          <Loader2 className="w-3.5 h-3.5 animate-spin text-pink-400" />
                          <span>Crawling...</span>
                        </>
                      ) : (
                        <>
                          <Clipboard className="w-3.5 h-3.5" />
                          <span>Import Issue</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="relative">
                    <Code className="absolute left-3.5 top-3.5 w-4.5 h-4.5 text-slate-500" />
                    <input
                      type="text"
                      value={repoUrl}
                      onChange={(e) => setRepoUrl(e.target.value)}
                      placeholder="e.g. github.com/facebook/react/issues/234"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-11 pr-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                    />
                    <p className="text-[10px] text-pink-400 font-semibold mt-2 flex items-center gap-1">
                      <span>✨</span> Manual Entry: Mock issue URL prefilled for convenience. Bypasses rigorous validator crawling.
                    </p>
                  </div>
                )}
                
                {createMode === 'import' && isImporting && (
                  <p className="text-[10px] text-pink-400 font-mono mt-1 animate-pulse flex items-center gap-1.5">
                    <span>⚡</span> {importLog}
                  </p>
                )}
              </div>

              {/* Bounty Title */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <span>Bounty Title</span>
                  <span className="text-pink-500">*</span>
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Import an issue or enter a title (e.g., Implement Dark Mode)"
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                />
              </div>

              {/* Reward & Platform Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                    <span>Reward (USD)</span>
                    <span className="text-pink-500">*</span>
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3.5 top-3.5 w-4 h-4 text-slate-500" />
                    <input
                      type="number"
                      value={reward}
                      onChange={(e) => setReward(e.target.value)}
                      placeholder="e.g. 500"
                      className="w-full bg-slate-950/60 border border-slate-800 rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Difficulty</label>
                  <select
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                  >
                    <option value="Beginner">Beginner</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">Platform Hub</label>
                  <select
                    value={platform}
                    onChange={(e) => setPlatform(e.target.value)}
                    className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none"
                  >
                    <option value="Algora">Algora</option>
                    <option value="Gitcoin">Gitcoin</option>
                    <option value="Polar">Polar</option>
                    <option value="IssueHunt">IssueHunt</option>
                    <option value="Opire">Opire</option>
                  </select>
                </div>
              </div>

              {/* Dynamic Fee Calculation Breakdown Card */}
              {bountyAmount > 0 && (
                <Card className="bg-slate-950/80 border border-slate-850 p-4 relative overflow-hidden">
                  <div className="absolute top-0 right-0 bg-pink-500/10 text-pink-400 border-l border-b border-pink-500/20 px-3 py-1 text-[10px] font-bold tracking-wider rounded-bl-lg">
                    10% ESCROW FEE CALCULATOR
                  </div>
                  <h4 className="text-xs font-bold text-slate-300 mb-3 uppercase tracking-wider flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-pink-400" />
                    <span>Cost Breakdown</span>
                  </h4>
                  <div className="space-y-2 text-xs font-semibold">
                    <div className="flex justify-between text-slate-400">
                      <span>Bounty Amount Pledged</span>
                      <span>${bountyAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 border-b border-slate-850 pb-2">
                      <span>BountyHub Service Fee (10%)</span>
                      <span>+${platformFee.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold text-sm pt-1">
                      <span className="text-pink-400">Total Charged to Escrow</span>
                      <span>${totalCost.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </Card>
              )}

              {/* Issue Description */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <span>Issue Description & Acceptance Criteria</span>
                  <span className="text-pink-500">*</span>
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={5}
                  placeholder="Explain what the developer needs to do and how the work will be verified."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none resize-none font-mono text-xs leading-relaxed"
                />
              </div>

              {/* Additional Information */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-1">
                  <span>Additional Information / Custom Requirements</span>
                  <span className="text-slate-500">(Optional)</span>
                </label>
                <textarea
                  value={additionalInfo}
                  onChange={(e) => setAdditionalInfo(e.target.value)}
                  rows={2.5}
                  placeholder="Provide any repository forks, branch configurations, or test coverage targets..."
                  className="w-full bg-slate-950/60 border border-slate-800 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 focus:ring-1 focus:ring-pink-500/50 transition-all outline-none resize-none"
                />
              </div>

              {/* Publish Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white font-bold py-4 rounded-lg shadow-lg shadow-pink-500/20 hover:shadow-pink-500/40 transition-all duration-300 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin text-white" />
                    Deploying Multi-Sig Escrow Contract...
                  </>
                ) : (
                  <>
                    <span>Create Bounty & Fund Escrow</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </Button>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
