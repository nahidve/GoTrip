/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Article } from "../types/article";
import { GeneratedContent } from "../types/generatedContent";
import { PublishingJob } from "../types/publishing";
import { ActivityLog, DashboardStats } from "../types/dashboard";

// Initialize mock RSS Articles matching GoTrip editorial standard
export let mockArticles: Article[] = [
  {
    id: "ART-201",
    title: "Hidden Amalfi Cave Passages: The Untold Riva Guide",
    city: "Amalfi Coast",
    publishedDate: "2026-06-08 09:12",
    status: "pending",
    score: 95,
    sourceUrl: "https://rss.luxurytraveler.com/amalfi-secrets",
  },
  {
    id: "ART-202",
    title: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    city: "Kyoto",
    publishedDate: "2026-06-08 14:45",
    status: "approved",
    score: 98,
    sourceUrl: "https://rss.imperialvoyager.jp/bamboo-tea",
  },
  {
    id: "ART-203",
    title: "Alpine Stealth Chalets: Elevated Escapes in Swiss Valleys",
    city: "Saint Moritz",
    publishedDate: "2026-06-07 11:20",
    status: "pending",
    score: 89,
    sourceUrl: "https://rss.alpine-vanguard.ch/chalets",
  },
  {
    id: "ART-204",
    title: "Whitsundays Reef Landing Keys: Restricted Coral Hails",
    city: "Queensland",
    publishedDate: "2026-06-06 18:30",
    status: "rejected",
    score: 62,
    sourceUrl: "https://rss.reefmonolith.com/restricted-keys",
  },
  {
    id: "ART-205",
    title: "Paris Atelier Hidden Courtyards: Private Masterclass Entries",
    city: "Paris",
    publishedDate: "2026-06-08 07:05",
    status: "pending",
    score: 91,
    sourceUrl: "https://rss.editorialateliers.fr/courtyards",
  },
  {
    id: "ART-206",
    title: "Santorini Sunset Monoliths: Cliffside Suites Without Registry",
    city: "Santorini",
    publishedDate: "2026-06-05 16:15",
    status: "approved",
    score: 97,
    sourceUrl: "https://rss.cycladicstealth.gr/sunset-monoliths",
  },
];

// Initialize mock Generated Content
export let mockGeneratedContent: GeneratedContent[] = [
  {
    id: "GEN-501",
    articleId: "ART-202",
    articleTitle: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    blogContent:
      "# The Whispering Arbour: Kyoto's Sovereign Bamboo Coordinates\n\nThere is a boundary where Kyoto's public tourist grids end and sovereign silence begins. Beneath the towering canopies of Arashiyama’s restricted outer gardens, a centuries-old tea pavilion requires a digital keyset. We dispatched our senior curator along with a local tea master to map the exact custom coordinate grid...",
    linkedinPost:
      "🗺️ Beyond Kyoto's travel grids lies the Arashiyama Outer sanctuary—requiring dedicated reservation access. Read our curator's complete digital coordinate breakdown. #GoTripVanguard #KyotoSecrets #LuxuryTravel",
    instagramPost:
      "Sovereign sanctuaries, Kyoto. We mapped the Arashiyama outer coordinates for our Platinum tier holders. Private tea keys are active in the GoTrip Dispatch center. 🎍🍵 #gotrip #vanguardtravel #outerkyoto #privatecabin",
    newsletter:
      "Alexander V., we have unlocked Kyoto's outer tea chambers. Secure your private tea master dispatch in your active client ledger for October.",
    status: "approved",
    createdAt: "2026-06-08T15:30:00Z",
  },
  {
    id: "GEN-502",
    articleId: "ART-201",
    articleTitle: "Hidden Amalfi Cave Passages: The Untold Riva Guide",
    blogContent:
      "# Deep Amalfi: Architecting the Cavallino Cliffside Marine Routes\n\nTo see Amalfi is to rule its shoreline by private watercraft. Beneath the limestone monoliths of Positano rests the Cavallino cliff passage, an ancient grotto accessible only to Riva skippers carrying a verified dispatch beacon. Here is how we customize each voyage...",
    linkedinPost:
      "⚓ Amalfi Coast: mapped purely by water, navigated only by elite Riva skippers. Explore how our Amalfi Active Odyssey routes bypass standard commercial ports. #GoTripAmalfi #OceanVanguard #PrivateSkipper",
    instagramPost:
      "Rule the Positano shoreline. Standard coordinates do not apply here. Accessible strictly by private Riva watercraft. ⚓🐟 #gotrip #amalfi #oceanvanguard #luxuryhangar",
    newsletter:
      "Dear member, your Amalfi yacht docking has been customized. Review Julian's latest Positano yacht coordinates in your active dashboard.",
    status: "awaiting_approval",
    createdAt: "2026-06-08T10:00:00Z",
  },
  {
    id: "GEN-503",
    articleId: "ART-205",
    articleTitle:
      "Paris Atelier Hidden Courtyards: Private Masterclass Entries",
    blogContent:
      "# The Parisian Cloister: Accessing Restricted High-Fashion Ateliers\n\nBehind massive, unmarked 17th-century doors in Le Marais lies the secret pulse of Paris couture. Standard travellers see only the facade; GoTrip Vanguard holders enter through active dispatch connections. Here is our review of the secret masterclass led by former atelier veterans...",
    linkedinPost:
      "🏛️ Paris Couture is a closed system—unless you carry the proper credentials. We've compiled access pathways within Le Marais. #ParisSecrets #GoTripVanguard #PrivateAtelier",
    instagramPost:
      "Behind closed 17th-century doors. The heartbeat of Parisian couture begins. Accessible via the GoTrip dispatch keys. 🏛️🧵 #gotrip #pariscouture #privateatelier",
    newsletter:
      "Paris custom updates: your private Marais masterclass coordinates have been loaded into your cabin dashboard. Review scheduling details.",
    status: "awaiting_approval",
    createdAt: "2026-06-08T08:15:00Z",
  },
];

// Initialize mock Publishing Queue Jobs
export let mockPublishingJobs: PublishingJob[] = [
  {
    id: "PUB-701",
    contentId: "GEN-501",
    articleTitle: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    platform: "BLOG",
    status: "PUBLISHED",
    attempts: 1,
    createdAt: "2026-06-08 16:00",
    publishedAt: "2026-06-08 16:02",
    previewUrl: "https://gotrip.luxury/dispatch/kyoto-bamboo-shrine",
    bodyPreview:
      "# The Whispering Arbour: Kyoto's Sovereign Bamboo Coordinates...",
  },
  {
    id: "PUB-702",
    contentId: "GEN-501",
    articleTitle: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    platform: "LINKEDIN",
    status: "PUBLISHED",
    attempts: 1,
    createdAt: "2026-06-08 16:00",
    publishedAt: "2026-06-08 16:03",
    previewUrl: "https://linkedin.com/posts/gotrip-vanguard-kyoto",
    bodyPreview:
      "🗺️ Beyond Kyoto's travel grids lies the Arashiyama Outer sanctuary...",
  },
  {
    id: "PUB-703",
    contentId: "GEN-501",
    articleTitle: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    platform: "INSTAGRAM",
    status: "FAILED",
    attempts: 3,
    createdAt: "2026-06-08 16:00",
    lastError:
      "API Token expired: instagram_business_profile permission revoked",
    bodyPreview:
      "Sovereign sanctuaries, Kyoto. We mapped the Arashiyama outer coordinates...",
  },
  {
    id: "PUB-704",
    contentId: "GEN-501",
    articleTitle: "Kyoto's Outer Bamboo Shrines: Private Tea Coordinates",
    platform: "NEWSLETTER",
    status: "DRAFT",
    attempts: 0,
    createdAt: "2026-06-08 15:30",
    bodyPreview:
      "Alexander V., we have unlocked Kyoto's outer tea chambers. Secure your...",
  },
  {
    id: "PUB-705",
    contentId: "GEN-502",
    articleTitle: "Hidden Amalfi Cave Passages: The Untold Riva Guide",
    platform: "BLOG",
    status: "PENDING",
    attempts: 0,
    createdAt: "2026-06-09 07:15",
    bodyPreview:
      "# Deep Amalfi: Architecting the Cavallino Cliffside Marine Routes...",
  },
];

// Initialize mock Activity Logs
export let mockActivityLogs: ActivityLog[] = [
  {
    id: "ACT-101",
    type: "system",
    message:
      "RSS Hub synchronized successfully. Scanned 12 high-end travel endpoints.",
    createdAt: "2026-06-09 07:22",
    details:
      "Endpoints tracked: 12 active journals. Found 3 incoming pending candidates.",
  },
  {
    id: "ACT-102",
    type: "approval",
    message:
      "Operator 'Alexander V.' approved article ART-202 'Kyoto's Outer Bamboo Shrines'.",
    createdAt: "2026-06-08 15:28",
    details: "Re-routed for content generation pipeline immediately.",
  },
  {
    id: "ACT-103",
    type: "system",
    message:
      "AI Content Generation complete for 'Kyoto's Outer Bamboo Shrines'.",
    createdAt: "2026-06-08 15:30",
    details:
      "4 outputs generated: Blog post, LinkedIn, Instagram and Newsletter template.",
  },
  {
    id: "ACT-104",
    type: "approval",
    message:
      "Generated content GEN-501 fully approved. Publishing jobs spawned.",
    createdAt: "2026-06-08 15:58",
    details: "Platform tasks allocated: 4 channels synchronized.",
  },
  {
    id: "ACT-105",
    type: "publishing",
    message: "Platform Blog completed publishing job PUB-701.",
    createdAt: "2026-06-08 16:02",
    details:
      "URL: https://gotrip.luxury/dispatch/kyoto-bamboo-shrine. Performance: response 200 OK.",
  },
  {
    id: "ACT-106",
    type: "publishing",
    message: "Platform LinkedIn completed publishing job PUB-702.",
    createdAt: "2026-06-08 16:03",
    details: "Success payload received from LinkedIn API.",
  },
  {
    id: "ACT-107",
    type: "publishing",
    message: "Platform Instagram failed on job PUB-703.",
    createdAt: "2026-06-08 16:05",
    details:
      "Error: OAuth refresh token returned expired standard headers. Retried 3 times.",
  },
];

// Database operations helper functions to mimic actual backend behaviors
export const db = {
  // Articles
  getArticles: () => mockArticles,
  approveArticle: (id: string) => {
    mockArticles = mockArticles.map((art) =>
      art.id === id ? { ...art, status: "approved" } : art,
    );
    // Add activity log
    db.addActivityLog(
      "approval",
      `Article approved: ${id}`,
      `Operator confirmed high score matching for metadata extraction.`,
    );

    // Simulate spawning a generated content element
    const matchingArt = mockArticles.find((a) => a.id === id);
    if (matchingArt && !mockGeneratedContent.some((c) => c.articleId === id)) {
      const newGenId = `GEN-${Math.floor(500 + Math.random() * 499)}`;
      const newGen: GeneratedContent = {
        id: newGenId,
        articleId: id,
        articleTitle: matchingArt.title,
        blogContent: `# Cruising ${matchingArt.city}: A Luxury Sovereign Review\n\nWe recently mapped exclusive, unpublished coordinates matching ${matchingArt.title}. Our dedicated local attachments secured suite upgrades...`,
        linkedinPost: `✈️ Newly uncovered luxury routes in ${matchingArt.city}: '${matchingArt.title}'. Read our elite dispatcher guide. #GoTripVanguard #${matchingArt.city.replace(/\s+/g, "")}`,
        instagramPost: `Coordinates authorized. Destination: ${matchingArt.city}. Explore raw wilderness in a customized private cabin. 🗺️🏖️ #gotrip #luxuryresorts`,
        newsletter: `Alexander V., your custom itinerary guides in ${matchingArt.city} are now locked in your cabin ledger.`,
        status: "awaiting_approval",
        createdAt: new Date().toISOString(),
      };
      mockGeneratedContent = [newGen, ...mockGeneratedContent];
      db.addActivityLog(
        "system",
        `AI Content Generation triggered for ${id}`,
        `Created content draft ${newGenId}`,
      );
    }
  },
  rejectArticle: (id: string) => {
    mockArticles = mockArticles.map((art) =>
      art.id === id ? { ...art, status: "rejected" } : art,
    );
    db.addActivityLog(
      "approval",
      `Article rejected: ${id}`,
      `Operator designated article as low priority grid material.`,
    );
  },

  // Generated Content
  getGeneratedContent: () => mockGeneratedContent,
  approveGeneratedContent: (id: string) => {
    mockGeneratedContent = mockGeneratedContent.map((gc) =>
      gc.id === id ? { ...gc, status: "approved" } : gc,
    );
    db.addActivityLog(
      "approval",
      `Generated content approved: ${id}`,
      `Content templates released. Dispatch queue filled.`,
    );
    // Spawn publishing queue jobs for this approved item
    const gc = mockGeneratedContent.find((c) => c.id === id);
    if (gc) {
      const platforms: Array<"BLOG" | "LINKEDIN" | "INSTAGRAM" | "NEWSLETTER"> =
        ["BLOG", "LINKEDIN", "INSTAGRAM", "NEWSLETTER"];
      platforms.forEach((p) => {
        const jobId = `PUB-${Math.floor(700 + Math.random() * 299)}`;
        const bodyPreview =
          p === "BLOG"
            ? gc.blogContent
            : p === "LINKEDIN"
              ? gc.linkedinPost
              : p === "INSTAGRAM"
                ? gc.instagramPost
                : gc.newsletter;
        const newJob: PublishingJob = {
          id: jobId,
          contentId: id,
          articleTitle: gc.articleTitle,
          platform: p,
          status: p === "BLOG" ? "PENDING" : "DRAFT", // let's set blog to pending and others to draft for visual variety
          attempts: 0,
          createdAt: new Date()
            .toISOString()
            .replace("T", " ")
            .substring(0, 16),
          bodyPreview,
        };
        mockPublishingJobs = [newJob, ...mockPublishingJobs];
      });
    }
  },
  rejectGeneratedContent: (id: string) => {
    mockGeneratedContent = mockGeneratedContent.map((gc) =>
      gc.id === id ? { ...gc, status: "rejected" } : gc,
    );
    db.addActivityLog(
      "approval",
      `Generated content rejected: ${id}`,
      `Content returned to curation queue for regeneration.`,
    );
  },

  // Publishing Queue
  getPublishingJobs: (status?: string) => {
    if (!status) return mockPublishingJobs;
    return mockPublishingJobs.filter((job) => job.status === status);
  },
  queueJob: (id: string) => {
    mockPublishingJobs = mockPublishingJobs.map((job) => {
      if (job.id === id) {
        db.addActivityLog(
          "publishing",
          `Queued publishing job ${id} (${job.platform})`,
          `Moving from DRAFT to PENDING state.`,
        );
        return {
          ...job,
          status: "PENDING" as const,
          attempts: job.attempts + 1,
        };
      }
      return job;
    });
  },
  retryJob: (id: string) => {
    mockPublishingJobs = mockPublishingJobs.map((job) => {
      if (job.id === id) {
        db.addActivityLog(
          "publishing",
          `Retrying publishing job ${id} (${job.platform})`,
          `Resetting attempt threshold.`,
        );
        return { ...job, status: "PENDING" as const, lastError: undefined };
      }
      return job;
    });

    // Simulate completion of retry after a tiny delay
    setTimeout(() => {
      mockPublishingJobs = mockPublishingJobs.map((job) => {
        if (job.id === id) {
          db.addActivityLog(
            "publishing",
            `Job completed on retry: ${id}`,
            `Platform ${job.platform} returned status 200 Success.`,
          );
          return {
            ...job,
            status: "PUBLISHED" as const,
            publishedAt: new Date()
              .toISOString()
              .replace("T", " ")
              .substring(0, 16),
            previewUrl:
              job.platform === "BLOG"
                ? "https://gotrip.luxury/dispatch/recovered-endpoint"
                : "https://social.vanguard.com/feed/view-retry",
          };
        }
        return job;
      });
    }, 1500);
  },

  // Activity Logs
  getActivityLogs: () => mockActivityLogs,
  addActivityLog: (
    type: "system" | "approval" | "publishing",
    message: string,
    details?: string,
  ) => {
    const newLog: ActivityLog = {
      id: `ACT-${Math.floor(100 + Math.random() * 899)}`,
      type,
      message,
      createdAt: new Date().toISOString().replace("T", " ").substring(0, 16),
      details,
    };
    mockActivityLogs = [newLog, ...mockActivityLogs];
  },

  // Statistics compiling
  getStats: (): DashboardStats => {
    return {
      pendingArticles: mockArticles.filter((a) => a.status === "pending")
        .length,
      approvedArticles: mockArticles.filter((a) => a.status === "approved")
        .length,
      rejectedArticles: mockArticles.filter((a) => a.status === "rejected")
        .length,
      awaitingApprovalContent: mockGeneratedContent.filter(
        (c) => c.status === "awaiting_approval",
      ).length,
      approvedContent: mockGeneratedContent.filter(
        (c) => c.status === "approved",
      ).length,
      draftPublishingJobs: mockPublishingJobs.filter(
        (j) => j.status === "DRAFT",
      ).length,
      pendingPublishingJobs: mockPublishingJobs.filter(
        (j) => j.status === "PENDING",
      ).length,
      publishedJobs: mockPublishingJobs.filter((j) => j.status === "PUBLISHED")
        .length,
      failedPublishingJobs: mockPublishingJobs.filter(
        (j) => j.status === "FAILED",
      ).length,
    };
  },
};
