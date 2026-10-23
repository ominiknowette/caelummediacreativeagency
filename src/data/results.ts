export type EvidenceStatus = 'screenshot-supported' | 'portfolio-reported' | 'client-reported';
export type ResultMetric = {
  platform: 'TikTok' | 'Instagram' | 'Facebook' | 'YouTube';
  name: string;
  value: number | string;
  display: string;
  period?: string;
  projectName?: string;
  sourceFile: string;
  sourceStatus: EvidenceStatus;
};
export type ResultRecord = {
  slug: string;
  title: string;
  category: 'Audience Growth' | 'Content Performance';
  description: string;
  context: string;
  headline: string;
  supporting?: string;
  metrics: ResultMetric[];
  evidence?: { src: string; alt: string }[];
};

const pdf = 'Rachael Portfolio Documentation';
const analyticsPdf = 'Caelum Media Analytics Documentation';
const brief = 'Client-supplied website update brief, 22 October 2026';
const pdfMetric = (platform:ResultMetric['platform'], name:string, value:number|string, display:string, evidence:string, period?:string):ResultMetric => ({platform,name,value,display,period,sourceFile:`${pdf}; ${evidence}`,sourceStatus:'screenshot-supported'});
const analyticsMetric = (platform:ResultMetric['platform'], name:string, value:number|string, display:string, page:number, period?:string):ResultMetric => ({platform,name,value,display,period,sourceFile:`${analyticsPdf}, page ${page}`,sourceStatus:'screenshot-supported'});
const portfolioMetric = (platform:ResultMetric['platform'], name:string, value:number|string, display:string, page:number, projectName:string, period?:string):ResultMetric => ({platform,name,value,display,period,projectName,sourceFile:`${pdf}, page ${page}`,sourceStatus:'portfolio-reported'});

export const results:ResultRecord[] = [
  {
    slug:'amarex-surprises',title:'Amarex Surprises',category:'Audience Growth',context:'TikTok audience growth',
    description:'Social media management and content support for Amarex Surprises. The brand shared that its TikTok audience grew from 147 to 1,872 followers over three months.',
    headline:'147 → 1,872',supporting:'TikTok followers over three months, as shared by Amarex Surprises',
    metrics:[{platform:'TikTok',name:'Followers',value:'147 to 1,872',display:'147 → 1,872',period:'Three months',projectName:'Amarex Surprises',sourceFile:brief,sourceStatus:'client-reported'}],
  },
  {
    slug:'celestial-honours-television',title:'Celestial Honours Television',category:'Audience Growth',context:'Selected experience',
    description:'Social media strategy, content and reporting across TikTok, Facebook and Instagram during Rachael’s earlier role.',
    headline:'1,239 → 3K+',supporting:'TikTok followers in six months',
    metrics:[
      portfolioMetric('TikTok','Followers','1,239 to over 3,000','1,239 → 3K+',4,'Celestial Honours Television','Six months'),
      portfolioMetric('Facebook','Followers','approximately 1,800 to over 3,000','~1,800 → 3K+',4,'Celestial Honours Television'),
      portfolioMetric('Instagram','Followers','403 to 556','403 → 556',4,'Celestial Honours Television'),
    ],
  },
  {
    slug:'spectraevent',title:'Spectraevent',category:'Audience Growth',context:'Selected experience',
    description:'Social media management and content creation documented during Rachael’s work with JIRIAH Brand.',
    headline:'1,283 → 2,433',supporting:'Instagram followers',
    metrics:[
      portfolioMetric('Instagram','Followers','1,283 to 2,433','1,283 → 2,433',7,'Spectraevent'),
      portfolioMetric('TikTok','Followers','1,130 to over 3,100','1,130 → 3.1K+',7,'Spectraevent'),
    ],
  },
  {
    slug:'lovebirdsng',title:'Lovebirdsng',category:'Audience Growth',context:'Selected experience',
    description:'Content creation and social media management documented during Rachael’s work with JIRIAH Brand.',
    headline:'4,246 → ~11.1K',supporting:'Instagram followers',
    metrics:[
      portfolioMetric('Instagram','Followers','4,246 to approximately 11,100','4,246 → ~11.1K',7,'Lovebirdsng'),
      portfolioMetric('TikTok','Followers','2,366 to 4,488','2,366 → 4,488',7,'Lovebirdsng'),
      portfolioMetric('YouTube','Subscribers','38 to 181','38 → 181',7,'Lovebirdsng','One month'),
    ],
  },
  {
    slug:'tiktok-video-1049479',title:'TikTok video performance',category:'Content Performance',context:'TikTok video',
    description:'A short-form TikTok video with more than one million views and 1,549 new followers.',
    headline:'1,049,479',supporting:'video views',
    metrics:[
      analyticsMetric('TikTok','Video views',1049479,'1,049,479',6),
      analyticsMetric('TikTok','New followers',1549,'1,549',6),
      analyticsMetric('TikTok','Likes',189000,'~189K',6),
      analyticsMetric('TikTok','Shares',10000,'~10K',6),
      analyticsMetric('TikTok','Saves',8359,'8,359',6),
      analyticsMetric('TikTok','Total play time','4450h:47m:50s','4,450h 47m 50s',6),
    ],
    evidence:[{src:'/images/results/tiktok-video-1049479-views.png',alt:'TikTok video analytics showing 1,049,479 views, 1,549 new followers and total play time'}],
  },
  {
    slug:'instagram-reel-496687',title:'Instagram Reel performance',category:'Content Performance',context:'Instagram Reel',
    description:'A single Instagram Reel drew 496,687 views, reached 248,084 accounts and received 9,806 interactions.',
    headline:'496,687',supporting:'Reel views · 9,806 interactions',
    metrics:[
      analyticsMetric('Instagram','Reel views',496687,'496,687',17),
      analyticsMetric('Instagram','Reach',248084,'248,084',17),
      analyticsMetric('Instagram','Interactions',9806,'9,806',17),
    ],
    evidence:[{src:'/images/results/instagram-reel-496687-insights.png',alt:'Instagram Reel insights showing 496,687 views, 248,084 reach and 9,806 interactions'},{src:'/images/results/instagram-reel-496687-overview.png',alt:'Second overview screen for the same 496,687-view Instagram Reel'}],
  },
  {
    slug:'tiktok-educational-carousel',title:'Educational TikTok carousel',category:'Content Performance',context:'TikTok photo carousel',
    description:'An educational wedding-planning photo carousel with 90,335 post views and 1,183 saves.',
    headline:'90,335',supporting:'post views · 1,183 saves',
    metrics:[
      analyticsMetric('TikTok','Post views',90335,'90,335',19),
      analyticsMetric('TikTok','Likes',3470,'3,470',19),
      analyticsMetric('TikTok','Shares',850,'850',19),
      analyticsMetric('TikTok','Saves',1183,'1,183',19),
      analyticsMetric('TikTok','New followers',123,'123',19),
    ],
    evidence:[{src:'/images/results/tiktok-carousel-90335-views.png',alt:'TikTok post analytics showing 90,335 views, 1,183 saves and 123 new followers'}],
  },
  {
    slug:'instagram-video-799918',title:'Instagram video performance',category:'Content Performance',context:'Instagram video',
    description:'A separate Instagram video with 799,918 views.',
    headline:'799,918',supporting:'video views',
    metrics:[pdfMetric('Instagram','Video views',799918,'799,918','page 8, xref 309'),pdfMetric('Instagram','Shares',471,'471','page 8, xref 309'),pdfMetric('Instagram','Saves',529,'529','page 8, xref 309')],
    evidence:[{src:'/evidence/instagram-reel-799918-views.png',alt:'Instagram Reel insights showing 799,918 views'}],
  },
  {
    slug:'instagram-views-172182',title:'Instagram views overview',category:'Content Performance',context:'Instagram account overview',
    description:'A 30-day overview showing 172,182 views, with 13% of views attributed to ads.',
    headline:'172,182',supporting:'views · 13% from ads',
    metrics:[pdfMetric('Instagram','Views',172182,'172,182','page 8, xref 312','21 Apr – 20 May'),pdfMetric('Instagram','Share of views from ads',13,'13%','page 8, xref 312','21 Apr – 20 May'),pdfMetric('Instagram','Accounts reached',77353,'77,353','page 8, xref 312','21 Apr – 20 May')],
    evidence:[{src:'/evidence/instagram-172182-views-13-percent-ads.png',alt:'Instagram analytics showing 172,182 views, 13% from ads and 77,353 accounts reached'}],
  },
  {
    slug:'tiktok-account-overview-53k',title:'TikTok account overview',category:'Content Performance',context:'TikTok account activity',
    description:'A 28-day TikTok account snapshot with 53K post views and 6,720 profile views.',
    headline:'53K',supporting:'post views · 28 April–25 May',
    metrics:[analyticsMetric('TikTok','Post views','53K','53K',1,'28 April–25 May'),analyticsMetric('TikTok','Profile views',6720,'6,720',1,'28 April–25 May'),analyticsMetric('TikTok','Likes',1795,'1,795',1,'28 April–25 May'),analyticsMetric('TikTok','Comments',118,'118',1,'28 April–25 May'),analyticsMetric('TikTok','Shares',399,'399',1,'28 April–25 May')],
    evidence:[{src:'/images/results/tiktok-account-53k-views.png',alt:'TikTok 28-day account overview showing 53K post views and 6,720 profile views'}],
  },
  {
    slug:'tiktok-video-11173',title:'TikTok video engagement',category:'Content Performance',context:'TikTok video',
    description:'A short-form TikTok video with 11,173 views and 1,024 likes.',
    headline:'11,173',supporting:'video views',
    metrics:[analyticsMetric('TikTok','Video views',11173,'11,173',7),analyticsMetric('TikTok','Likes',1024,'1,024',7),analyticsMetric('TikTok','Comments',31,'31',7),analyticsMetric('TikTok','Shares',67,'67',7),analyticsMetric('TikTok','Saves',46,'46',7),analyticsMetric('TikTok','New followers',15,'15',7)],
    evidence:[{src:'/images/results/tiktok-video-11173-views.png',alt:'TikTok video analytics showing 11,173 views, 1,024 likes and 15 new followers'}],
  },
];

export const homepageResultSlugs = ['amarex-surprises','tiktok-video-1049479','instagram-reel-496687','tiktok-educational-carousel'];
export const selectedExperience = [
  {name:'Celestial Honours Television',description:'From Rachael’s earlier professional portfolio: social media strategy, content creation and reporting across TikTok, Facebook and Instagram.'},
  {name:'Skep International Investment Ltd',description:'Social media management and content creation.'},
  {name:'The King’s Church',description:'Volunteer social media management and content creation.'},
  {name:'JIRIAH Brand',description:'Social media management, content and reporting for Lovebirdsng and Spectraevent.'},
];
