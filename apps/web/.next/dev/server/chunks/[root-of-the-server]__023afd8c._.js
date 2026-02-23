module.exports = [
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[project]/Documents/devdashboard/apps/web/app/lib/analytics/flattenContributions.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "flattenContributions",
    ()=>flattenContributions
]);
function flattenContributions(weeks) {
    return weeks.flatMap((week)=>week.contributionDays);
}
}),
"[project]/Documents/devdashboard/apps/web/app/lib/analytics/streakCalculator.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "calculateStreaks",
    ()=>calculateStreaks
]);
function calculateStreaks(days) {
    const sorted = [
        ...days
    ].sort((a, b)=>new Date(a.date).getTime() - new Date(b.date).getTime());
    let longestStreak = 0;
    let running = 0;
    for (const day of sorted){
        if (day.contributionCount > 0) {
            running++;
            longestStreak = Math.max(longestStreak, running);
        } else {
            running = 0;
        }
    }
    let currentStreak = 0;
    for(let i = sorted.length - 1; i >= 0; i--){
        if (sorted[i].contributionCount > 0) {
            currentStreak++;
        } else {
            break;
        }
    }
    return {
        currentStreak,
        longestStreak
    };
}
}),
"[project]/Documents/devdashboard/apps/web/app/lib/github/fetchContribution.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "fetchContributions",
    ()=>fetchContributions
]);
async function fetchContributions(token) {
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            query: `
        query {
          viewer {
            contributionsCollection {
              contributionCalendar {
                totalContributions
                weeks {
                  contributionDays {
                    date
                    contributionCount
                  }
                }
              }
            }
          }
        }
      `
        })
    });
    const json = await res.json();
    const calendar = json.data.viewer.contributionsCollection.contributionCalendar;
    return {
        totalContributions: calendar.totalContributions,
        weeks: calendar.weeks
    };
}
}),
"[externals]/util [external] (util, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}),
"[externals]/url [external] (url, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("url", () => require("url"));

module.exports = mod;
}),
"[externals]/http [external] (http, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("http", () => require("http"));

module.exports = mod;
}),
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/assert [external] (assert, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("assert", () => require("assert"));

module.exports = mod;
}),
"[externals]/querystring [external] (querystring, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("querystring", () => require("querystring"));

module.exports = mod;
}),
"[externals]/buffer [external] (buffer, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}),
"[externals]/zlib [external] (zlib, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("zlib", () => require("zlib"));

module.exports = mod;
}),
"[externals]/https [external] (https, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("https", () => require("https"));

module.exports = mod;
}),
"[externals]/events [external] (events, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("events", () => require("events"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[project]/Documents/devdashboard/apps/web/app/lib/auth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "authOptions",
    ()=>authOptions
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$providers$2f$github$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/node_modules/next-auth/providers/github.js [app-route] (ecmascript)");
;
const authOptions = {
    providers: [
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$providers$2f$github$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["default"])({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt ({ token, account }) {
            if (account) {
                token.accessToken = account?.access_token;
            }
            return token;
        },
        async session ({ session, token }) {
            session.accessToken = token.accessToken;
            return session;
        }
    }
};
}),
"[project]/Documents/devdashboard/apps/web/app/lib/withAuth.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "withAuth",
    ()=>withAuth
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/node_modules/next-auth/index.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/app/lib/auth.ts [app-route] (ecmascript)");
;
;
function withAuth(handler) {
    return async (req)=>{
        const session = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$node_modules$2f$next$2d$auth$2f$index$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["getServerSession"])(__TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$auth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["authOptions"]);
        if (!session?.accessToken) {
            return Response.json({
                error: "Unauthorized"
            }, {
                status: 401
            });
        }
        return handler(req, session);
    };
}
}),
"[project]/Documents/devdashboard/apps/web/app/api/analytics/overview/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$analytics$2f$flattenContributions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/app/lib/analytics/flattenContributions.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$analytics$2f$streakCalculator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/app/lib/analytics/streakCalculator.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$github$2f$fetchContribution$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/app/lib/github/fetchContribution.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$withAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Documents/devdashboard/apps/web/app/lib/withAuth.ts [app-route] (ecmascript)");
;
;
;
;
const GET = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$withAuth$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["withAuth"])(async (_, session)=>{
    const calendar = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$github$2f$fetchContribution$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["fetchContributions"])(session.accessToken);
    const days = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$analytics$2f$flattenContributions$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["flattenContributions"])(calendar.weeks);
    const streaks = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Documents$2f$devdashboard$2f$apps$2f$web$2f$app$2f$lib$2f$analytics$2f$streakCalculator$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["calculateStreaks"])(days);
    return Response.json({
        totalContributions: calendar.totalContributions,
        ...streaks,
        days
    });
});
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__023afd8c._.js.map