"use client";
import { Analytics } from "@vercel/analytics/next";
const publicHosts=new Set(["alfordcustombuilders.com", "www.alfordcustombuilders.com"]);
export function SiteAnalytics(){return <Analytics beforeSend={event=>publicHosts.has(window.location.hostname)?event:null}/>;}
