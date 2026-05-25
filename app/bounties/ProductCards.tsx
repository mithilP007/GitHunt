'use client';

import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Package, TrendingUp, Zap, Heart, ExternalLink, RefreshCw, PlusCircle, ArrowRight, X, Info } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Contributor {
  id: number;
  name: string;
  amount: number;
  decisionMode: 'follow_creator' | 'make_own';
  vote?: 'pending' | 'accept' | 'reject';
}

interface Claim {
  id: number;
  solverName: string;
  prUrl: string;
  prMerged: boolean;
  description: string;
  submittedAt: string;
  rejectedReason?: string;
  rejectedAt?: string;
  disputed?: boolean;
  disputedAt?: string;
  disputeStatus?: 'pending' | 'resolved_solver' | 'resolved_creator';
  hunterForkAccepted?: boolean;
}

interface Bounty {
  id: number;
  title: string;
  description: string;
  reward: number; // Stored as number for math operations
  platform: string;
  difficulty: string;
  tag: 'Common Bounty' | 'Paid Bounty' | 'Sponsored Bounty';
  featured?: boolean;
  repoUrl: string;
  creator: string;
  createdAt: string;
  status: 'active' | 'claimed' | 'accepted' | 'declined' | 'retracted' | 'frozen';
  statusReason?: string;
  claim?: Claim;
  contributors: Contributor[];
}

const defaultBounties: Bounty[] = [
  {
    id: 1,
    title: 'Implement Dark Mode Toggle',
    description: 'Add a dark mode toggle to the user dashboard with smooth transitions',
    reward: 500,
    platform: 'Gitcoin',
    difficulty: 'Intermediate',
    tag: 'Paid Bounty',
    featured: true,
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/2',
    creator: 'mithilP007',
    createdAt: new Date(Date.now() - 864000000).toISOString(),
    status: 'active',
    contributors: [],
  },
  {
    id: 2,
    title: 'Fix API Rate Limiting',
    description: 'Optimize API endpoints to handle higher request volumes',
    reward: 300,
    platform: 'Algora',
    difficulty: 'Beginner',
    tag: 'Common Bounty',
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/1',
    creator: 'other_user',
    createdAt: new Date(Date.now() - 1728000000).toISOString(),
    status: 'active',
    contributors: [],
  },
  {
    id: 3,
    title: 'Build Mobile App UI',
    description: 'Design and implement responsive mobile UI components',
    reward: 800,
    platform: 'IssueHunt',
    difficulty: 'Advanced',
    tag: 'Paid Bounty',
    featured: true,
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/3',
    creator: 'other_user',
    createdAt: new Date(Date.now() - 432000000).toISOString(),
    status: 'active',
    contributors: [],
  },
  {
    id: 4,
    title: 'Add User Authentication',
    description: 'Implement secure user login and registration system',
    reward: 400,
    platform: 'Polar',
    difficulty: 'Intermediate',
    tag: 'Common Bounty',
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/4',
    creator: 'other_user',
    createdAt: new Date(Date.now() - 2592000000).toISOString(),
    status: 'active',
    contributors: [],
  },
  {
    id: 5,
    title: 'Database Optimization',
    description: 'Improve database queries for better performance',
    reward: 1200,
    platform: 'Stripe OpenSource',
    difficulty: 'Advanced',
    tag: 'Sponsored Bounty',
    featured: true,
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/5',
    creator: 'mithilP007',
    createdAt: new Date(Date.now() - 1296000000).toISOString(),
    status: 'active',
    contributors: [],
  },
  {
    id: 6,
    title: 'Write Unit Tests',
    description: 'Add comprehensive unit tests for existing codebase',
    reward: 250,
    platform: 'Gitcoin',
    difficulty: 'Beginner',
    tag: 'Common Bounty',
    repoUrl: 'https://github.com/mithilP007/GitHunt/issues/6',
    creator: 'other_user',
    createdAt: new Date(Date.now() - 3456000000).toISOString(),
    status: 'active',
    contributors: [],
  },
];

export default function ProductCards() {
  const [bountyList, setBountyList] = useState<Bounty[]>([]);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [activeTagFilter, setActiveTagFilter] = useState<string>('All');
  
  // Pledge modal state
  const [pledgeBounty, setPledgeBounty] = useState<Bounty | null>(null);
  const [pledgeAmount, setPledgeAmount] = useState<string>('');
  const [followCreator, setFollowCreator] = useState<boolean>(true);
  const [isSubmittingPledge, setIsSubmittingPledge] = useState<boolean>(false);
  const [pledgeError, setPledgeError] = useState<string>('');

  useEffect(() => {
    // Load bounties from localStorage, fallback to default
    const savedBounties = localStorage.getItem('githunt_bounties');
    if (savedBounties) {
      try {
        const parsed = JSON.parse(savedBounties);
        // Normalize strings to numbers if legacy formats exist
        const normalized = parsed.map((b: any) => ({
          ...b,
          reward: typeof b.reward === 'number' 
            ? b.reward 
            : parseFloat(String(b.reward).replace(/[^0-9.]/g, '')) || 0,
          contributors: b.contributors || []
        }));
        setBountyList(normalized);
      } catch (e) {
        setBountyList(defaultBounties);
      }
    } else {
      localStorage.setItem('githunt_bounties', JSON.stringify(defaultBounties));
      setBountyList(defaultBounties);
    }

    const savedWish = localStorage.getItem('wishlist');
    if (savedWish) setWishlist(JSON.parse(savedWish));
  }, []);

  const toggleWishlist = (id: number) => {
    const newWishlist = wishlist.includes(id) ? wishlist.filter(i => i !== id) : [...wishlist, id];
    setWishlist(newWishlist);
    localStorage.setItem('wishlist', JSON.stringify(newWishlist));
  };

  const handleOpenPledge = (bounty: Bounty) => {
    setPledgeBounty(bounty);
    setPledgeAmount('');
    setFollowCreator(true);
    setPledgeError('');
  };

  const handleClosePledge = () => {
    setPledgeBounty(null);
  };

  const handleSubmitPledge = (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmittingPledge) return;
    setPledgeError('');

    const trimmedAmount = pledgeAmount.trim();
    if (!trimmedAmount) {
      setPledgeError('Contribution amount is required.');
      return;
    }

    const amt = parseFloat(trimmedAmount);
    if (isNaN(amt) || amt <= 0) {
      setPledgeError('Please enter a valid contribution amount greater than 0.');
      return;
    }

    if (!pledgeBounty) return;

    setIsSubmittingPledge(true);

    setTimeout(() => {
      const updatedList = bountyList.map((b) => {
        if (b.id === pledgeBounty.id) {
          const newContributor: Contributor = {
            id: Date.now(),
            name: 'mithilP007', // the current logged in user
            amount: amt,
            decisionMode: followCreator ? 'follow_creator' : 'make_own',
            vote: 'pending'
          };
          
          return {
            ...b,
            reward: b.reward + amt, // Increase reward pool
            contributors: [...b.contributors, newContributor]
          };
        }
        return b;
      });

      localStorage.setItem('githunt_bounties', JSON.stringify(updatedList));
      setBountyList(updatedList);

      // Log notification
      const savedLogs = localStorage.getItem('githunt_logs') || '[]';
      const logs = JSON.parse(savedLogs);
      const fee = amt * 0.10;
      logs.unshift(`[${new Date().toLocaleTimeString()}] [EscrowBot] Pledged $${amt} + $${fee.toFixed(2)} Fee to "${pledgeBounty.title}". Policy: ${followCreator ? 'Auto-Follow Creator' : 'Independent Voting'}.`);
      localStorage.setItem('githunt_logs', JSON.stringify(logs));

      setIsSubmittingPledge(false);
      setPledgeBounty(null);
    }, 1500);
  };

  const getTagStyle = (tag: string) => {
    switch (tag) {
      case 'Common Bounty':
        return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20 shadow-[0_0_12px_rgba(6,182,212,0.05)]';
      case 'Paid Bounty':
        return 'bg-pink-500/10 text-pink-400 border-pink-500/20 shadow-[0_0_12px_rgba(236,72,153,0.05)]';
      case 'Sponsored Bounty':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20 shadow-[0_0_12px_rgba(245,158,11,0.05)]';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  const filteredBounties = bountyList.filter(
    (b) => (activeTagFilter === 'All' || b.tag === activeTagFilter) && b.status !== 'retracted'
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
        
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/80 border border-slate-800">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></span>
            <Zap className="w-4 h-4 text-pink-400" />
            <span className="text-sm font-semibold text-slate-300">Live Scraped Feed</span>
          </div>
          
          <h1 className="text-5xl font-black text-white leading-none">
            <span>Explore </span>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-pink-300 to-purple-400">
              Open Bounties
            </span>
          </h1>
          
          <p className="text-slate-400 text-sm max-w-xl mx-auto">
            Dynamic issue database synchronized periodically by the GitHunt AI Management Bot. Pledge to support open source projects.
          </p>
        </div>

        {/* Tag Filters Selector */}
        <div className="flex flex-wrap items-center justify-center gap-3 border-b border-slate-800/80 pb-6">
          {['All', 'Common Bounty', 'Paid Bounty', 'Sponsored Bounty'].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveTagFilter(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all duration-300 ${
                activeTagFilter === tag
                  ? tag === 'Common Bounty'
                    ? 'bg-cyan-500 border-cyan-400 text-black shadow-[0_0_15px_rgba(6,182,212,0.2)]'
                    : tag === 'Paid Bounty'
                    ? 'bg-pink-500 border-pink-400 text-white shadow-[0_0_15px_rgba(236,72,153,0.2)]'
                    : tag === 'Sponsored Bounty'
                    ? 'bg-yellow-500 border-yellow-400 text-black shadow-[0_0_15px_rgba(245,158,11,0.2)]'
                    : 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-slate-950 border-slate-850 text-slate-400 hover:text-white hover:border-slate-800'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Grid List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBounties.map((bounty) => (
            <Card
              key={bounty.id}
              className="bg-slate-900/40 border-slate-850 hover:border-pink-500/30 transition-all duration-350 hover:shadow-lg hover:shadow-pink-500/5 group backdrop-blur-xl flex flex-col justify-between"
            >
              <CardHeader className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800 text-pink-400 group-hover:text-pink-300 group-hover:border-pink-500/20 transition-all">
                    <Package className="w-5 h-5 animate-pulse" />
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={`border px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${getTagStyle(bounty.tag)}`}>
                      {bounty.tag}
                    </Badge>
                    <button
                      onClick={() => toggleWishlist(bounty.id)}
                      className="p-1.5 rounded-lg bg-slate-950 border border-slate-850 hover:border-pink-500/30 transition-all"
                    >
                      <Heart className={`w-3.5 h-3.5 ${wishlist.includes(bounty.id) ? 'fill-pink-500 text-pink-500' : 'text-slate-400'}`} />
                    </button>
                  </div>
                </div>
                <div>
                  <CardTitle className="text-lg font-bold text-white group-hover:text-pink-400 transition-colors line-clamp-1">
                    {bounty.title}
                  </CardTitle>
                  <CardDescription className="text-xs text-slate-500 mt-1">
                    {bounty.platform} • {bounty.difficulty} • Creator: @{bounty.creator}
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-4 flex-1 flex flex-col justify-between">
                <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">
                  {bounty.description}
                </p>
                <div className="space-y-1 mt-4">
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Funded Escrow Pool</div>
                  <div className="text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
                    ${bounty.reward.toLocaleString('en-US')}
                  </div>
                  {bounty.contributors && bounty.contributors.length > 0 && (
                    <div className="text-[10px] text-cyan-400 font-semibold">
                      +{bounty.contributors.length} dynamic contributor{bounty.contributors.length > 1 ? 's' : ''} pledged!
                    </div>
                  )}
                </div>
              </CardContent>

              <CardFooter className="pt-2 flex flex-col gap-2.5">
                <button
                  onClick={() => handleOpenPledge(bounty)}
                  className="w-full bg-gradient-to-r from-purple-650 to-pink-650 hover:from-purple-600 hover:to-pink-600 border border-purple-500/20 text-white text-xs font-bold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition duration-300 shadow-md shadow-pink-500/5 hover:scale-[1.01]"
                >
                  <PlusCircle className="w-4 h-4" />
                  <span>Increase Bounty Amount</span>
                </button>
                
                <a
                  href={bounty.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-slate-950 hover:bg-slate-900 border border-slate-800 hover:border-slate-750 text-slate-400 hover:text-white text-xs font-semibold py-2.5 rounded-xl flex items-center justify-center gap-1.5 transition duration-300"
                >
                  <span>View GitHub Issue</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Increase Bounty / Pledge Modal (Glassmorphic Overlay) */}
        {pledgeBounty && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
            <div className="bg-slate-950 border border-slate-800 rounded-2xl w-full max-w-lg overflow-hidden shadow-2xl relative">
              {/* Close Button */}
              <button 
                onClick={handleClosePledge}
                className="absolute top-4 right-4 p-1 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-white transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="p-6 border-b border-slate-900">
                <Badge className="bg-pink-500/10 text-pink-400 border-pink-500/25 px-2 py-0.5 text-[9px] uppercase tracking-wider mb-2 font-bold">
                  Bounty Pledge
                </Badge>
                <h3 className="text-lg font-black text-white line-clamp-1 pr-10">
                  Pledge: {pledgeBounty.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  Increase reward pool to attract solvers faster. Currently ${pledgeBounty.reward}.
                </p>
              </div>

              <form onSubmit={handleSubmitPledge} className="p-6 space-y-5">
                {pledgeError && (
                  <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold">
                    {pledgeError}
                  </div>
                )}

                {/* Amount Input */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-350 uppercase tracking-wider">
                    Contribution Amount (USD)
                  </label>
                  <div className="relative">
                    <span className="absolute left-3.5 top-3.5 font-bold text-slate-500 text-sm">$</span>
                    <input
                      type="number"
                      required
                      value={pledgeAmount}
                      onChange={(e) => setPledgeAmount(e.target.value)}
                      placeholder="e.g. 100"
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-8 pr-4 py-3 text-sm text-white placeholder-slate-650 focus:border-pink-500/50 outline-none transition-all"
                    />
                  </div>
                  <p className="text-[10px] text-slate-500 leading-normal">
                    Note: A 10% fee will be added to the total cost. For a $100 contribution, you will authorize $110.
                  </p>
                </div>

                {/* Cost Summary */}
                {parseFloat(pledgeAmount) > 0 && (
                  <Card className="bg-slate-900/50 border border-slate-900 p-3 text-xs font-semibold text-slate-400 space-y-1.5">
                    <div className="flex justify-between">
                      <span>Pledge Amount</span>
                      <span>${parseFloat(pledgeAmount).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Platform Fee (10%)</span>
                      <span>+${(parseFloat(pledgeAmount) * 0.1).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-white font-bold border-t border-slate-900 pt-1.5">
                      <span className="text-pink-400">Total Authorized Cost</span>
                      <span>${(parseFloat(pledgeAmount) * 1.1).toFixed(2)}</span>
                    </div>
                  </Card>
                )}

                {/* Claim Policy Choice */}
                <div className="space-y-2 border-t border-slate-900 pt-4">
                  <label className="text-xs font-bold text-slate-350 uppercase tracking-wider flex items-center gap-1.5">
                    <span>Claim Approval Decision Policy</span>
                    <Info className="w-3.5 h-3.5 text-purple-400" />
                  </label>
                  
                  <div className="space-y-2.5">
                    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-900 bg-slate-900/25 hover:border-slate-800 transition cursor-pointer select-none">
                      <input
                        type="radio"
                        name="decisionPolicy"
                        checked={followCreator}
                        onChange={() => setFollowCreator(true)}
                        className="mt-0.5 text-pink-500 focus:ring-0 focus:ring-offset-0 bg-slate-950 border-slate-850"
                      />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-200">Follow bounty creator&apos;s decision (Recommended)</p>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          The bounty will pay out automatically once accepted by the bounty creator. Zero hassle.
                        </p>
                      </div>
                    </label>

                    <label className="flex items-start gap-3 p-3 rounded-xl border border-slate-900 bg-slate-900/25 hover:border-slate-800 transition cursor-pointer select-none">
                      <input
                        type="radio"
                        name="decisionPolicy"
                        checked={!followCreator}
                        onChange={() => setFollowCreator(false)}
                        className="mt-0.5 text-pink-500 focus:ring-0 focus:ring-offset-0 bg-slate-950 border-slate-850"
                      />
                      <div className="space-y-0.5">
                        <p className="text-xs font-bold text-slate-200">Make my own claims decisions</p>
                        <p className="text-[10px] text-slate-500 leading-normal">
                          You will receive email notifications of solver claims and can independently accept or reject each claim.
                        </p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Form Actions */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleClosePledge}
                    className="flex-1 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-350 text-xs font-bold py-3.5 rounded-xl transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmittingPledge}
                    className="flex-1 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white text-xs font-bold py-3.5 rounded-xl flex items-center justify-center gap-1.5 transition shadow-lg shadow-pink-500/10"
                  >
                    {isSubmittingPledge ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Authorizing...</span>
                      </>
                    ) : (
                      <>
                        <span>Increase Bounty Amount</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

// Simple inline loader for ease of use
function Loader2({ className }: { className?: string }) {
  return (
    <svg className={`animate-spin ${className}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
  );
}

