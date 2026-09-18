export interface ATSResult {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  formattingIssues: string[];
}

export function analyzeATS(cvText: string, jobDescription: string): ATSResult {
  // Normalize texts
  const normalize = (text: string) => text.toLowerCase().replace(/[^\w\s]/g, "");
  const normCV = normalize(cvText);
  const normJD = normalize(jobDescription);

  // Extract common tech keywords from JD (Simulated extraction)
  const commonTechStack = ["react", "typescript", "nextjs", "node", "docker", "aws", "postgresql", "git", "javascript", "python", "devops"];
  
  const targetKeywords = commonTechStack.filter(keyword => normJD.includes(keyword));
  const matchedKeywords: string[] = [];
  const missingKeywords: string[] = [];

  targetKeywords.forEach(keyword => {
    if (normCV.includes(keyword)) {
      matchedKeywords.push(keyword);
    } else {
      missingKeywords.push(keyword);
    }
  });

  // Calculate base score
  let score = 0;
  if (targetKeywords.length > 0) {
    score = Math.round((matchedKeywords.length / targetKeywords.length) * 100);
  } else {
    score = 50; // Neutral score if JD has no standard keywords
  }

  // Formatting checks (Heuristics)
  const formattingIssues = [];
  if (cvText.includes("table")) formattingIssues.push("Excessive use of tables detected which may break ATS parsing.");
  if (cvText.length < 500) formattingIssues.push("CV content is very short. Expand on your experiences.");

  return {
    score,
    matchedKeywords,
    missingKeywords,
    formattingIssues
  };
}
