module.exports=[93695,(a,b,c)=>{b.exports=a.x("next/dist/shared/lib/no-fallback-error.external.js",()=>require("next/dist/shared/lib/no-fallback-error.external.js"))},83249,a=>{"use strict";async function b(a,b){let c=await fetch("https://damno.next.erxes.io/gateway/graphql",{method:"POST",headers:{"Content-Type":"application/json","x-app-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRQb3J0YWxJZCI6ImtaMDRwYVlSNmh0dHdKWENHRWVjOCIsImlhdCI6MTc4MjIxNTM5Mn0.LBd4utfh3xzpTFqi1s64jn1loW3W_zIXuBAffgaKrZM","x-client-portal-id":"kZ04paYR6httwJXCGEec8"},body:JSON.stringify({query:a,variables:b}),next:{revalidate:60}});if(!c.ok)throw Error(`CMS fetch failed: ${c.status} ${c.statusText}`);let d=await c.json();if(d.errors?.length)throw Error(d.errors[0].message);return d.data??{}}a.s(["cmsFetch",0,b])},30253,a=>{a.v("/_next/static/media/favicon.0x3dzn~oxb6tn.ico"+(globalThis.NEXT_CLIENT_ASSET_SUFFIX||""))},43811,a=>{"use strict";let b={src:a.i(30253).default,width:256,height:256};a.s(["default",0,b])},37675,a=>{"use strict";var b=a.i(39804),c=a.i(83249),d=a.i(50256);a.i(76835);var e=a.i(83447);let f=`
  query CpPosts($language: String, $status: PostStatus, $limit: Int) {
    cpPosts(language: $language, status: $status, limit: $limit) {
      _id
      slug
    }
  }
`,g=`
  query CpPost($slug: String, $language: String) {
    cpPost(slug: $slug, language: $language) {
      _id
      title
      excerpt
      publishedDate
      content
    }
  }
`;async function h(){try{return(await Promise.all(d.routing.locales.map(async a=>((await (0,c.cmsFetch)(f,{language:a,status:"published",limit:100})).cpPosts??[]).map(b=>({locale:a,slug:b.slug??""}))))).flat().filter(a=>a.slug)}catch(a){return console.error("[blog/[slug]] generateStaticParams failed:",a),[]}}async function i(a,b){try{return(await (0,c.cmsFetch)(g,{slug:a,language:b})).cpPost}catch(b){console.error(`[blog/${a}] CMS fetch failed:`,b);return}}async function j(){return h()}async function k({params:a}){let{locale:b,slug:c}=await a,d=await i(c,b);return d?{title:`${d.title} | ДАМНО ҮНЭЛГЭЭ`,description:d.excerpt??void 0}:{}}async function l({params:a}){let{locale:c,slug:d}=await a,f=await i(d,c);return f||(0,e.notFound)(),(0,b.jsx)("article",{className:"min-h-screen pt-28 pb-20",children:(0,b.jsxs)("div",{className:"mx-auto max-w-[800px] px-6 lg:px-8",children:[(0,b.jsxs)("header",{className:"mb-10",children:[(0,b.jsx)("h1",{className:"text-3xl md:text-4xl lg:text-5xl font-bold mb-4",children:f.title}),f.publishedDate&&(0,b.jsx)("time",{className:"text-muted",children:new Date(f.publishedDate).toLocaleDateString(c)})]}),f.content&&(0,b.jsx)("div",{className:"prose prose-invert max-w-none",dangerouslySetInnerHTML:{__html:f.content}})]})})}a.s(["default",0,l,"dynamic",0,"force-static","generateMetadata",0,k,"generateStaticParams",0,j])},161,a=>{a.n(a.i(37675))}];

//# sourceMappingURL=%5Broot-of-the-server%5D__0jxbp~g._.js.map