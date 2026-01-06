
import { Injectable, signal } from '@angular/core';
import { delay, of } from 'rxjs';

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
  // In a real app, this URL points to your n8n webhook
  private readonly N8N_WEBHOOK_URL = 'https://n8n.your-domain.com/webhook/devops-assistant';

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

  async sendCommand(command: string) {
    // 1. Add User Message
    this.addMessage({
      role: 'user',
      content: command,
      type: 'text'
    });

    this.isLoading.set(true);

    // 2. Simulate Network/LLM Latency (Mocking n8n response)
    // In production, use: await fetch(this.N8N_WEBHOOK_URL, { method: 'POST', body: JSON.stringify({ command }) ... })
    setTimeout(() => {
      this.handleMockResponse(command);
      this.isLoading.set(false);
    }, 1500);
  }

  approveAction(messageId: string) {
    this.messages.update(msgs => 
      msgs.map(m => m.id === messageId && m.meta ? 
        { ...m, meta: { ...m.meta, status: 'APPROVED' } } : m
      )
    );
    
    // Simulate Execution
    setTimeout(() => {
      this.addMessage({
        role: 'system',
        content: `> Executing Change Set via Terraform Cloud...\n> AWS API: rds:RebootDBInstance\n> Success: Resource restarting.`,
        type: 'execution_log'
      });
    }, 1000);
  }

  denyAction(messageId: string) {
    this.messages.update(msgs => 
      msgs.map(m => m.id === messageId && m.meta ? 
        { ...m, meta: { ...m.meta, status: 'DENIED' } } : m
      )
    );
    
    this.addMessage({
      role: 'assistant',
      content: 'Action cancelled by user. No changes applied to infrastructure.',
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

  // MOCK LOGIC: Matches user intent to demonstrate UI capabilities
  private handleMockResponse(command: string) {
    const cmd = command.toLowerCase();

    if (cmd.includes('cpu') || cmd.includes('alarm')) {
      this.addMessage({
        role: 'assistant',
        content: 'Analysis: CloudWatch Alarm "HighCPU" triggered on instance i-0123456789abcdef0.',
        type: 'analysis',
        meta: { riskLevel: 'LOW' }
      });
      this.addMessage({
        role: 'assistant',
        content: 'Recommended Action: Scale Auto-Scaling Group max_capacity from 4 to 8 to handle surge.',
        type: 'approval_request',
        meta: {
          riskLevel: 'MEDIUM',
          resourceId: 'asg-prod-worker-v2',
          actionType: 'aws:autoscaling:UpdateAutoScalingGroup',
          costImpact: '+$45.00/day estimated',
          status: 'PENDING'
        }
      });
    } else if (cmd.includes('fail') || cmd.includes('pipeline')) {
      this.addMessage({
        role: 'assistant',
        content: 'Investigating CircleCI build #4201... \n\nError found in integration tests: "Connection refused: 5432". The RDS Proxy seems to be enforcing connection limits.',
        type: 'analysis'
      });
       this.addMessage({
        role: 'assistant',
        content: 'Would you like to flush existing connections on the RDS Proxy target group?',
        type: 'approval_request',
        meta: {
          riskLevel: 'HIGH',
          resourceId: 'proxy-prod-db',
          actionType: 'aws:rds:DeregisterDBProxyTargets',
          costImpact: '$0.00',
          status: 'PENDING'
        }
      });
    } else if (cmd.includes('cost') || cmd.includes('bill')) {
       this.addMessage({
        role: 'assistant',
        content: 'Cost Anomaly Detected: ElasticSearch Service usage spiked 40% yesterday ($120).',
        type: 'analysis',
        meta: { riskLevel: 'LOW' }
      });
      this.addMessage({
        role: 'assistant',
        content: 'I can apply a curated Lifecycle Policy to move indices older than 7 days to UltraWarm storage.',
        type: 'approval_request',
        meta: {
          riskLevel: 'LOW',
          resourceId: 'es-domain-logging',
          actionType: 'es:PutLifecyclePolicy',
          costImpact: '-$800.00/mo estimated',
          status: 'PENDING'
        }
      });
    } else {
      this.addMessage({
        role: 'assistant',
        content: 'I can help you with CloudWatch alarms, CI/CD failures, or Cost Anomalies. Try asking "Why is CPU high?" or "Check pipeline failures".',
        type: 'text'
      });
    }
  }
}
