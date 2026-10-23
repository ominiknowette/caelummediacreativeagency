export type Service = {id:string;title:string;description:string;price:number;pricePrefix?:string;billing:string;features:string[];note?:string;href:string;cta:string};
export type Package = {id:string;title:string;price:number;billing:string;description:string;pieces:string;features:string[];ideal:string;note?:string};
export const whatsappMessage = (message:string) => `https://wa.me/2349074161293?text=${encodeURIComponent(message)}`;
export const bookingHref = '/contact';
export const packageWhatsAppHref = (title:string) => whatsappMessage(`Hello Caelum Media, I would like to enquire about ${title} and discuss my brand.`);
export const brand = {
  name:'Caelum Media',
  positioning:'Strategy • Content • Growth',
  heroCopy:'We help businesses strengthen their digital presence through social media management, content creation, brand strategy and growth marketing.',
  aboutDraft:'Caelum Media helps founders, startups and growing businesses strengthen their identity, connect with the right audience and grow their online presence through strategic content and digital marketing.',
  aboutParagraphs:[
    'Caelum Media is a creative agency helping businesses build strong brands through strategic content and digital marketing. We work with founders, startups, and growing businesses to strengthen their identity, connect with the right audience, and grow their online presence.',
    'Our services include social media management, content creation, brand strategy, branding, brand launches, and digital marketing. We combine creativity with strategy to create purposeful content that communicates your value, builds trust, and supports your business goals.',
    'Based in Nigeria, we serve clients worldwide remotely and offer on-site services when agreed travel expenses are covered. Our mission is to help brands stand out.',
  ],
  linkDescription:'Strategic content and digital marketing for founders, startups and growing businesses.',
  logo:'/brand/caelum-media-logo.png',
  email:'caelummediacreativeagency@gmail.com',
  phoneDisplay:'0907 416 1293',
  phoneInternational:'+234 907 416 1293',
  phoneHref:'tel:+2349074161293',
  whatsapp:'https://wa.me/2349074161293',
  schedulingUrl:'',
  social:{instagram:'https://www.instagram.com/caelum_media/',facebook:'https://www.facebook.com/share/19ja5EDJzP/?mibextid=wwXIfr'},
  media:[
    {src:'/carousel/phone-tripod.webp',alt:'Illustrative photo of a creator filming herself with a phone on a tripod',type:'image',position:'center'},
    {src:'/carousel/cafe-creator.webp',alt:'Illustrative photo of a woman using her phone and notebook at a café',type:'image',position:'center'},
    {src:'/carousel/lifestyle-shoot.webp',alt:'Illustrative behind-the-scenes photo of a lifestyle shoot with a camera and model',type:'image',position:'center'},
    {src:'/carousel/talking-head.webp',alt:'Illustrative photo of a creator recording a talking-head video on her phone',type:'image',position:'center'},
    {src:'/carousel/content-planning.webp',alt:'Illustrative photo of a woman planning content with a laptop, phone and notebook',type:'image',position:'center'},
    {src:'/carousel/street-style.webp',alt:'Illustrative street-style portrait of a woman in a casual outfit',type:'image',position:'center'},
    {src:'/carousel/client-review.webp',alt:'Illustrative photo of two women reviewing content together on a laptop',type:'image',position:'center'},
  ] as {src:string;alt:string;type:'image'|'video';position?:string;poster?:string}[],
};
export const testimonials: {quote:string;name:string;rating?:number}[] = [];
// Internal records retained for client confirmation; never render these as current Classic inclusions.
export const pendingCommercialDetails = {
  managementSummary: { price:250000, contentPieces:15, dailyStories:'up to 4 per day', communityManagement:true, sponsoredAdsManagement:true },
  contentBankPlanningMix: {videoPercent:70,otherPercent:30,guaranteedPerTier:false},
};
export const money=(amount:number)=>`₦${new Intl.NumberFormat('en-NG').format(amount)}`;
export const services:Service[]=[
  {id:'social-media-management',title:'Social Media Management',description:'Strategic content and consistent execution for an active, considered social presence.',price:250000,pricePrefix:'From',billing:'/month',features:['Content strategy and planning','Captions, hooks and calls to action','Posting and scheduling on agreed platforms','Monthly performance reporting'],note:'External production requirements and ad spend are quoted separately where applicable.',href:'/social-media-management-packages',cta:'VIEW FULL PACKAGES'},
  {id:'content-bank',title:'Content Bank',description:'A custom collection of ready-to-post content built around your brand, audience and goals.',price:300000,pricePrefix:'From',billing:' one-time',features:['Strategic content planning','Reels, graphics, carousels and photos','Brand-aligned editing','Content organised and ready to post'],note:'Models, locations, props, transport and paid promotions may cost extra.',href:'/content-bank-packages',cta:'VIEW FULL PACKAGES'},
  {id:'growth-marketing',title:'Growth Marketing',description:'A full-service marketing solution shaped around your goals, audience and stage of growth.',price:1200000,billing:'/month',features:['Social media management','Content and campaign strategy','Influencer and paid ads management','Email marketing and reporting'],note:'Ad spend, influencer fees and third-party production costs are excluded.',href:'/contact?service=growth-marketing',cta:'BOOK A CALL'},
];
export const managementPackages:Package[]=[
  {id:'classic',title:'The Classic Package',price:250000,billing:'/month',pieces:'12 branded pieces monthly',description:'Built for brands that need consistent content, structured execution and an active presence online.',features:['Instagram and TikTok','12 branded content pieces monthly: Reels, graphics and carousels','1 dedicated content shoot day monthly','Up to 6 hours of product, lifestyle or brand content production','3 posts per week','Captions, hooks and CTAs','Optimised content scheduling','Monthly content calendar','Content strategy, planning and creative direction','Content creation and production','Posting, scheduling and content execution','Monthly performance report and analytics'],ideal:'Brands that want to stay active, visible and consistent online without managing content creation and social media execution internally.',note:'External production costs such as models, locations and transport are separate where applicable.'},
  {id:'business-development',title:'The Business Development Package',price:600000,billing:'/month',pieces:'35 branded pieces monthly',description:'For businesses ready for higher-volume content, stronger visibility and a structured strategy.',features:['Instagram and TikTok','35 branded pieces monthly: Reels, graphics, carousels and Stories','3 dedicated content shoot days monthly, up to 6 hours each','Product, lifestyle and talking-head content','4 posts per week','Active Story management and daily Story strategy','Conversion-focused Stories: polls, tags, reminders, offers and sales triggers','Captions, hooks and CTAs','Optimised content scheduling and execution','Brand strategy and creative direction','Consistent brand voice and visual identity','Sponsored ads management; ad spend excluded','Weekly content planning and monthly calendar','Basic social media audit and audience clarity','UGC creator sourcing and coordination','Influencer seeding and collaboration management','Monthly performance report and growth insights'],ideal:'Brands that want more content volume and a more strategic content and marketing system.',note:'Ad spend, creator fees, seeding products, models, locations, transport and other third-party costs are excluded.'},
];
export const contentBankPackages:Package[]=[
  {id:'growth',title:'Growth Content Bank',price:300000,billing:' one-time',pieces:'20 custom pieces',description:'Content created around your brand, audience and goals.',features:['20 Reels, graphics, carousels and photo pieces','Content strategy and planning session','Monthly content calendar','Content concepts and creative direction','Hooks, captions, CTAs and relevant hashtags','1 dedicated batch shoot day','Brand-aligned video editing and graphic design','1 round of revisions','Organised, ready-to-post delivery'],ideal:'Brands managing their own social channels that need a strategic bank of content.'},
  {id:'scale',title:'Scale Content Bank',price:400000,billing:' one-time',pieces:'30 custom pieces',description:'A larger content collection built around your brand and offers.',features:['30 Reels, graphics, carousels and photo pieces','Full strategy and planning session','Full monthly content calendar','1–2 dedicated batch shoot days','Creative direction and tailored concepts','Hooks, captions, CTAs and relevant hashtags','Brand-aligned editing and design','2 rounds of revisions','Priority content turnaround','Organised, ready-to-post delivery'],ideal:'Brands seeking more variety and volume without weekly production.'},
  {id:'authority',title:'Authority Content Bank',price:550000,billing:' one-time',pieces:'40 custom pieces',description:'Strategic content designed to strengthen brand authority.',features:['40 Reels, graphics, carousels and photo pieces','Full strategy and monthly planning session','1–2 dedicated batch shoot days','Full monthly content calendar','Creative direction and concepts','Hooks, captions, CTAs and sales copy','Content planned for reach, engagement and conversion','Brand-aligned editing and visual design','2 rounds of revisions','Priority content delivery','Bonus BTS clips and additional Story content','Organised, ready-to-post delivery'],ideal:'Brands ready to increase content volume and make content a stronger marketing asset.'},
  {id:'full',title:'Full Content Bank',price:800000,billing:' one-time',pieces:'60+ custom pieces',description:'A complete month of strategic, ready-to-use content.',features:['60+ Reels, graphics, carousels, photos and Story pieces','Full content strategy and planning','Full monthly content calendar','1–2 dedicated batch shoot days','Creative direction and concepts for the month','Hooks, captions, CTAs and relevant hashtags','Brand-aligned editing and design','BTS content for brand storytelling','2 rounds of revisions','Priority content turnaround','Organised, ready-to-post delivery','Bonus Story content set','Launch support content where applicable'],ideal:'Brands wanting a large content system without ongoing social media management.'},
];
export const brandStrategy=[
  {id:'brand-discovery-session',title:'Brand Discovery Session',price:30000,duration:'90 minutes'},
  {id:'brand-audit-consultation',title:'Brand Audit / Consultation',price:50000},
  {id:'brand-strategy-document',title:'Brand Strategy Document',price:50000},
  {id:'brand-positioning-strategy',title:'Brand Positioning Strategy',price:70000},
  {id:'brand-messaging',title:'Brand Messaging',price:60000},
  {id:'brand-content-pillars',title:'Brand Content Pillars',price:40000},
  {id:'personal-branding',title:'Personal Branding',price:35000},
  {id:'competitor-analysis',title:'Competitor Analysis',price:35000},
  {id:'brand-launch-strategy',title:'Brand Launch Strategy',price:80000},
];
export const faqs=[
  {q:'Which service is right for my business?',a:'Social Media Management covers ongoing execution. Content Bank provides ready-to-post content as a one-time package. Growth Marketing brings a broader set of marketing services together. Contact us to discuss your goals.'},
  {q:'What is the difference between Content Bank and social media management?',a:'Content Bank delivers an organised collection of content for you to post. Social Media Management is a monthly service that includes ongoing planning, posting and reporting.'},
  {q:'Is advertising spend included?',a:'No. Ad spend is billed separately from management fees.'},
  {q:'Are models, locations and transportation included?',a:'External production requirements such as models, locations and transportation are billed separately where applicable.'},
  {q:'Which platforms do you manage?',a:'The listed management packages cover Instagram and TikTok. Other platform needs can be discussed during your enquiry.'},
  {q:'How many revisions are included?',a:'Growth Content Bank includes one round. Scale, Authority and Full Content Bank include two rounds. Revision allowances for other services will be agreed during scoping.'},
  {q:'How do I get started?',a:'Choose a service or package and contact Caelum Media on WhatsApp or by email. Online form enquiries will become available once a delivery destination is configured.'},
];
