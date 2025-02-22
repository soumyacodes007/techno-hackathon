import { serve } from "inngest/next";

import { inngest } from "@/lib/inngest/client";
import { generateIndustryInsights } from "@/lib/inngest/function";

export const { GET, POST, PUT } = serve({ // we can write our functions here 
  client: inngest,
  functions: [generateIndustryInsights], // regular interval me data update krta hay 
});


// ek publick api banana hoga jo app ko connect krega 