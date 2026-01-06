
import { Injectable, signal } from '@angular/core';
import { GoogleGenAI } from "@google/genai";

export interface AssistantMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  type: 'text' | 'analysis' | 'approval_request' | 'execution_log';
  meta?: {
    riskLevel?: 'LOW' | 'MEDIUM' | 'HIGH';
    resourceId?: string;
    actionType?: string;
    costImpact?: string;
    status?: 'PENDING' | 'APPROVED' | 'DENIED' | 'EXECUTED';
  };
}

@Injectable({
  providedIn: 'root'
})
export class DevOpsService {
  // Initialize Gemini Client
  // Note: In a real deployment, ensure process.env.API_KEY is populated via your build system or environment
  private ai = new GoogleGenAI({ apiKey: process.env['API_KEY'] });

  messages = signal<AssistantMessage[]>([
    {
      id: 'init-1',
      role: 'system',
      content: 'DevOps Assistant v2.4 Online. Connected to AWS Organization (org-0a1b2c).',
      timestamp: new Date(),
      type: 'text'
    }
  ]);

  isLoading = signal(false);

  // System Prompt to define the AI's behavior and JSON schema
  private readonly SYSTEM_INSTRUCTION = `
    You are a Sovereign Infra Architect AI (SRE) managing a high-scale AWS environment.
    Your goal is to assist the user with DevOps tasks, debugging, and infrastructure scaling.
    
    CRITICAL: You must ALWAYS respond with a valid JSON object. Do not wrap it in markdown code blocks.
    
    The JSON object must follow this schema:
    {
      "content": "The main text response to the user",
      "type": "text" | "analysis" | "approval_request" | "execution_log",
      "meta": {
        "riskLevel": "LOW" | "MEDIUM" | "HIGH" (optional, for approval_request),
        "resourceId": "string" (optional, e.g., i-12345),
        "actionType": "string" (optional, e.g., aws:ec2:StopInstances),
        "costImpact": "string" (optional, e.g., +$0.50/hr),
        "status": "PENDING" (always PENDING for new requests)
      }
    }

    Logic for "type":
    - Use "text" for general chat or questions.
    - Use "analysis" when explaining a root cause of a bug or infrastructure issue.
    - Use "approval_request" when the user asks to perform an action (scale, restart, deploy, delete).
    - Use "execution_log" ONLY when showing raw logs or code output.

    Tone: Professional, concise, "hacker" aesthetic.
    Context: The user is running a SaaS on AWS with EKS, RDS, and Redis.
  `;

  async sendCommand(command: string) {
    // 1. Add User Message to UI
    this.addMessage({
      role: 'user',
      content: command,
      type: 'text'
    });

    this.isLoading.set(true);

    try {
      // 2. Prepare History for Context
      const history = this.messages().map(m => ({
        role: m.role === 'user' ? 'user' : 'model',
        parts: [{ text: m.content }]
      }));

      // 3. Call Gemini
      const response = await this.ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          ...history,
          { role: 'user', parts: [{ text: command }] }
        ],
        config: {
          systemInstruction: this.SYSTEM_INSTRUCTION,
          responseMimeType: 'application/json',
          // Thinking budget optional for speed, removing to ensure fast response for UI demo
          // thinkingConfig: { thinkingBudget: 0 } 
        }
      });

      const responseText = response.text;
      
      if (responseText) {
        const parsedData = JSON.parse(responseText);
        
        // 4. Add AI Response to UI
        this.addMessage({
          role: 'assistant',
          content: parsedData.content,
          type: parsedData.type,
          meta: parsedData.meta
        });
      }

    } catch (error) {
      console.error('Gemini API Error:', error);
      this.addMessage({
        role: 'system',
        content: 'Error connecting to Control Plane (Gemini API). Please check your API Key configuration.',
        type: 'text'
      });
    } finally {
      this.isLoading.set(false);
    }
  }

  approveAction(messageId: string) {
    this.messages.update(msgs => 
      msgs.map(m => m.id === messageId && m.meta ? 
        { ...m, meta: { ...m.meta, status: 'APPROVED' } } : m
      )
    );
    
    // Simulate Execution of the approved action
    setTimeout(() => {
      this.addMessage({
        role: 'system',
        content: `> Initiating Terraform State Lock...\n> Applying Change Set: ${Math.random().toString(16).substring(2,8)}\n> AWS API Response: 200 OK\n> Resource state updated.`,
        type: 'execution_log'
      });
    }, 800);
  }

  denyAction(messageId: string) {
    this.messages.update(msgs => 
      msgs.map(m => m.id === messageId && m.meta ? 
        { ...m, meta: { ...m.meta, status: 'DENIED' } } : m
      )
    );
    
    this.addMessage({
      role: 'assistant',
      content: 'Operation aborted by user. State rollbacked.',
      type: 'text'
    });
  }

  private addMessage(msg: Partial<AssistantMessage>) {
    this.messages.update(prev => [...prev, {
      id: Math.random().toString(36).substring(7),
      timestamp: new Date(),
      role: msg.role || 'assistant',
      content: msg.content || '',
      type: msg.type || 'text',
      meta: msg.meta
    }]);
  }
}
