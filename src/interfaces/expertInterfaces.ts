export interface ExpertRole {
  title: string;
  systemPrompt: string;
  outputFormat: string;
  initialQuestions: string[];
  templatePath: string;
}

export interface ConsultationResult {
  content: string;
  suggestedNextSteps: string[];
} 