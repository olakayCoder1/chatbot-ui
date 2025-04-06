// // Define interfaces for the knowledge base structure
// interface KnowledgeBase {
//     disbursement: DisbursementInfo;
//     renewal: RenewalInfo;
//     repayment: RepaymentInfo;
//     paymentTracking: PaymentTrackingInfo;
//     wrongDefaultReading: WrongDefaultReadingInfo;
//     wrongPayments: WrongPaymentsInfo;
//   }
  
//   interface DisbursementInfo {
//     process: string;
//     requirements: string;
//     fees: string;
//     groupLoans: string;
//     disbursementMethod: string;
//     firstTimers: string;
//   }
  
//   interface RenewalInfo {
//     eligibility: string;
//     process: string;
//     restrictions: string;
//     requirements: string;
//     groupRules: string;
//   }
  
//   interface RepaymentInfo {
//     methods: string;
//     schedule: string;
//     verification: string;
//     monitoring: string;
//   }
  
//   interface PaymentTrackingInfo {
//     process: string;
//     requirements: string;
//     resolution: string;
//   }
  
//   interface WrongDefaultReadingInfo {
//     causes: string;
//     resolution: string;
//   }
  
//   interface WrongPaymentsInfo {
//     causes: string;
//     resolution: string;
//   }
  
//   // Define type for keywords object
//   type Keywords = {
//     [key: string]: string[];
//   }
  
//   // Define type for suggestions
//   type SuggestionMap = {
//     [key: string]: string[];
//   }
  
//   class NEATSupportBot {
//     private knowledgeBase: KnowledgeBase;
//     private greeting: string;
//     private keywords: Keywords;
    
//     constructor() {
//       // Knowledge base derived from the provided SOPs
//       this.knowledgeBase = {
//         // Loan Disbursement
//         disbursement: {
//           process: "Loans are processed and disbursed through the Central Processing Centre (CPC) within 24 hours of receiving a properly submitted application.",
//           requirements: "All loan applications must pass through appropriate channels (Relationship Officer, Branch Manager, and RICO) and be certified by the RICO.",
//           fees: "New customers must pay N2,000.00 registration fees. All applicants must pay 4% of loan amount in charges (Legal, Insurance, Management, and processing fee of 1% each). SME loans require a 5% processing fee.",
//           groupLoans: "Group Loans are disbursed to groups of 5-20 people. Groups should be 80% female and 20% male. Savings of the group may be used to compensate for defaults.",
//           disbursementMethod: "Loans are disbursed directly to customers' accounts with commercial banks.",
//           firstTimers: "First-time customers are subject to starting amount limitations for the loan product."
//         },
        
//         // Loan Renewal
//         renewal: {
//           eligibility: "Customers can renew loans after fully paying down their previous loan. For group loans, all members must have completed repayment of their previous loans.",
//           process: "Renewal requests are processed by the Compliance Officer/CPC after review of past loan history and KYC verification.",
//           restrictions: "Renewals are not available for customers with a history of bad loans. Groups unable to manage their members' character in the previous loan cycle won't be considered.",
//           requirements: "Repayment history must show at least 85% of payments were made on the exact due date. KYC information must be updated if there are changes.",
//           groupRules: "There must not be more than two defaults in a renewing customer group. For groups with more than two defaults, there must be enough savings to cover the defaulters before any member can renew."
//         },
        
//         // Loan Repayment
//         repayment: {
//           methods: "Repayments should be made directly to the company account through the customer's virtual account. Customers can transfer funds or have their Relationship Officer facilitate the payment.",
//           schedule: "Repayments are made weekly or monthly according to Terms & Conditions and customer class. Repayments should not exceed 30% of customer salary (product loan) or 30% of business profit.",
//           verification: "Relationship Officers sign customer's loan card as evidence of repayment. Customers can check their accounts on the app to confirm successful payments.",
//           monitoring: "Branch Managers follow up to confirm all repayments have been credited and update daily collection schedules before 7pm. Daily checking and monitoring is done via the app."
//         },
        
//         // Payment Tracking
//         paymentTracking: {
//           process: "When payments don't reflect in the system, tracking is initiated using the transaction ID, reference ID, or payment ID. The deposit manager is checked first, then the issue is escalated to RICO if needed.",
//           requirements: "Only payments with 'successful' status can be traced internally. Payments with status like 'failed', 'pending', or 'unsuccessful' require the customer to contact their payment source.",
//           resolution: "Issues are forwarded to the accounting department for confirmation and resolution."
//         },
        
//         // Wrong Default Reading
//         wrongDefaultReading: {
//           causes: "Inaccurate default readings can be caused by failed disbursement, app behavior, or incorrect payment date selection.",
//           resolution: "The issue should be reported through the Branch Manager to the Disbursement Officer via email. Required information includes loan ID, customer ID, disbursement date, and first payment date."
//         },
        
//         // Wrong Payments
//         wrongPayments: {
//           causes: "Wrong payments typically occur when customers use old virtual accounts after loan renewal, or when Relationship Officers mistakenly provide incorrect virtual account numbers.",
//           resolution: "Submit complaints to the Head of CPC with customer ID, loan ID, old and new virtual accounts, and payment evidence. The RICO will investigate using deposit history and virtual account statements."
//         }
//       };
      
//       // Default greeting message
//       this.greeting = "Welcome to NEAT Financial Support! How can I help you with your loan today?";
      
//       // Keywords to help identify query topics
//       this.keywords = {
//         disbursement: ["disburse", "disbursal", "disbursement", "get loan", "loan application", "apply", "new loan", "request loan", "loan process", "fees", "charges", "group loan"],
//         renewal: ["renew", "renewal", "another loan", "second loan", "extend", "extension", "refinance"],
//         repayment: ["repay", "repayment", "pay back", "payment", "installment", "schedule", "paying", "pay loan"],
//         paymentTracking: ["track", "tracking", "trace", "find payment", "payment not showing", "payment not reflecting", "missing payment"],
//         wrongDefaultReading: ["default reading", "wrong default", "incorrect default", "wrong reading"],
//         wrongPayments: ["wrong payment", "incorrect payment", "payment to wrong account", "wrong virtual account", "payment error", "wrong account"]
//       };
//     }
    
//     // Main function to handle user queries
//     public handleQuery(userQuery: string): string {
//       const query = userQuery.toLowerCase();
      
//       // If greeting or initial question
//       if (this.isGreeting(query)) {
//         return this.greeting;
//       }
      
//       // Identify the topic of the query
//       const topic = this.identifyTopic(query);
      
//       // Generate response based on identified topic
//       return this.generateResponse(topic, query);
//     }
    
//     // Check if query is a greeting
//     private isGreeting(query: string): boolean {
//       const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"];
//       return greetings.some(greeting => query.includes(greeting)) && query.length < 20;
//     }
    
//     // Identify the topic of the query
//     public identifyTopic(query: string): string {
//       for (const [topic, keywordList] of Object.entries(this.keywords)) {
//         if (keywordList.some(keyword => query.includes(keyword))) {
//           return topic;
//         }
//       }
      
//       // Check for specific questions that might not contain obvious keywords
//       if (query.includes("how long") && (query.includes("loan") || query.includes("process"))) {
//         return "disbursement";
//       }
      
//       if (query.includes("group") && query.includes("loan")) {
//         return "disbursement";
//       }
      
//       if (query.includes("virtual account")) {
//         return "repayment";
//       }
      
//       if (query.includes("old account") || query.includes("new account")) {
//         return "wrongPayments";
//       }
      
//       // Default to general information if no topic is identified
//       return "general";
//     }
    
//     // Generate response based on topic
//     private generateResponse(topic: string, query: string): string {
//       switch (topic) {
//         case "disbursement":
//           return this.handleDisbursementQuery(query);
        
//         case "renewal":
//           return this.handleRenewalQuery(query);
        
//         case "repayment":
//           return this.handleRepaymentQuery(query);
        
//         case "paymentTracking":
//           return this.handlePaymentTrackingQuery(query);
        
//         case "wrongDefaultReading":
//           return this.handleWrongDefaultReadingQuery(query);
        
//         case "wrongPayments":
//           return this.handleWrongPaymentsQuery(query);
        
//         case "general":
//         default:
//           return this.handleGeneralQuery();
//       }
//     }
    
//     // Handle disbursement queries
//     private handleDisbursementQuery(query: string): string {
//       const info = this.knowledgeBase.disbursement;
      
//       if (query.includes("process") || query.includes("how") || query.includes("steps")) {
//         return `${info.process} ${info.requirements}`;
//       }
      
//       if (query.includes("fee") || query.includes("cost") || query.includes("charge") || query.includes("pay for")) {
//         return `${info.fees}`;
//       }
      
//       if (query.includes("group") || query.includes("members")) {
//         return `${info.groupLoans}`;
//       }
      
//       if (query.includes("first time") || query.includes("new customer")) {
//         return `${info.firstTimers} New customers must also pay a registration fee of N2,000.00.`;
//       }
      
//       if (query.includes("account") || query.includes("bank") || query.includes("receive")) {
//         return `${info.disbursementMethod}`;
//       }
      
//       // General disbursement info if query isn't specific
//       return `Loan Disbursement Process: ${info.process}\n\nRequirements: ${info.requirements}\n\nFees: ${info.fees}\n\nDisbursement Method: ${info.disbursementMethod}`;
//     }
    
//     // Handle renewal queries
//     private handleRenewalQuery(query: string): string {
//       const info = this.knowledgeBase.renewal;
      
//       if (query.includes("eligible") || query.includes("qualify") || query.includes("can i")) {
//         return `${info.eligibility} ${info.restrictions}`;
//       }
      
//       if (query.includes("process") || query.includes("how") || query.includes("steps")) {
//         return `${info.process}`;
//       }
      
//       if (query.includes("group") || query.includes("members")) {
//         return `${info.groupRules} ${info.eligibility}`;
//       }
      
//       if (query.includes("requirement") || query.includes("need")) {
//         return `${info.requirements}`;
//       }
      
//       // General renewal info if query isn't specific
//       return `Loan Renewal Eligibility: ${info.eligibility}\n\nProcess: ${info.process}\n\nRequirements: ${info.requirements}\n\nRestrictions: ${info.restrictions}`;
//     }
    
//     // Handle repayment queries
//     private handleRepaymentQuery(query: string): string {
//       const info = this.knowledgeBase.repayment;
      
//       if (query.includes("how") || query.includes("make payment") || query.includes("pay")) {
//         return `${info.methods}`;
//       }
      
//       if (query.includes("schedule") || query.includes("when") || query.includes("due") || query.includes("late")) {
//         return `${info.schedule}`;
//       }
      
//       if (query.includes("confirm") || query.includes("verify") || query.includes("check")) {
//         return `${info.verification} ${info.monitoring}`;
//       }
      
//       if (query.includes("virtual account")) {
//         return `Repayments should be made directly to the company account through your assigned virtual account. If you're unsure of your virtual account number, please contact your Relationship Officer.`;
//       }
      
//       // General repayment info if query isn't specific
//       return `Loan Repayment Methods: ${info.methods}\n\nSchedule: ${info.schedule}\n\nVerification: ${info.verification}`;
//     }
    
//     // Handle payment tracking queries
//     private handlePaymentTrackingQuery(query: string): string {
//       const info = this.knowledgeBase.paymentTracking;
      
//       if (query.includes("how") || query.includes("process") || query.includes("track")) {
//         return `${info.process}`;
//       }
      
//       if (query.includes("failed") || query.includes("pending") || query.includes("unsuccessful")) {
//         return `${info.requirements}`;
//       }
      
//       // General payment tracking info if query isn't specific
//       return `Payment Tracking Process: When your payment doesn't reflect in the system, we can help track it using your transaction ID, reference ID, or payment ID. ${info.requirements} ${info.resolution}`;
//     }
    
//     // Handle wrong default reading queries
//     private handleWrongDefaultReadingQuery(query: string): string {
//       const info = this.knowledgeBase.wrongDefaultReading;
      
//       if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
//         return `${info.causes}`;
//       }
      
//       if (query.includes("fix") || query.includes("solve") || query.includes("resolve")) {
//         return `${info.resolution}`;
//       }
      
//       // General wrong default reading info if query isn't specific
//       return `Wrong Default Reading: Default readings can be inaccurate due to ${info.causes} To resolve this issue: ${info.resolution}`;
//     }
    
//     // Handle wrong payments queries
//     private handleWrongPaymentsQuery(query: string): string {
//       const info = this.knowledgeBase.wrongPayments;
      
//       if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
//         return `${info.causes}`;
//       }
      
//       if (query.includes("fix") || query.includes("solve") || query.includes("resolve") || query.includes("what should i do")) {
//         return `${info.resolution}`;
//       }
      
//       // General wrong payments info if query isn't specific
//       return `Wrong Payments: ${info.causes}\n\nResolution Process: ${info.resolution}`;
//     }
    
//     // Handle general queries
//     private handleGeneralQuery(): string {
//       return "I can help you with information about loan disbursement, loan renewal, repayment procedures, payment tracking, wrong default readings, and payment issues. Please specify what you'd like to know about these topics.";
//     }
    
//     // Follow-up suggestions based on the current topic
//     public getFollowUpSuggestions(topic: string): string[] {
//       const suggestions: SuggestionMap = {
//         disbursement: [
//           "What are the fees for a new loan?",
//           "How do group loans work?",
//           "How long does loan disbursement take?"
//         ],
//         renewal: [
//           "Am I eligible for loan renewal?",
//           "What's required for loan renewal?",
//           "Can I renew if someone in my group defaulted?"
//         ],
//         repayment: [
//           "How do I make a loan repayment?",
//           "How can I check if my payment was received?",
//           "What is the repayment schedule?"
//         ],
//         paymentTracking: [
//           "My payment isn't showing in the system",
//           "How do I track a payment?",
//           "What if my payment failed?"
//         ],
//         wrongDefaultReading: [
//           "Why am I showing as defaulted?",
//           "How to fix wrong default status?",
//           "What causes wrong default readings?"
//         ],
//         wrongPayments: [
//           "I paid to the wrong account",
//           "How to resolve wrong payment issues?",
//           "Why did my payment go to the wrong account?"
//         ],
//         general: [
//           "Tell me about loan disbursement",
//           "How do I renew my loan?",
//           "Explain the repayment process"
//         ]
//       };
      
//       return suggestions[topic] || suggestions.general;
//     }
//   }
  
//   export default NEATSupportBot;

// Define interfaces for the knowledge base structure
interface KnowledgeBase {
  disbursement: DisbursementInfo;
  renewal: RenewalInfo;
  repayment: RepaymentInfo;
  paymentTracking: PaymentTrackingInfo;
  wrongDefaultReading: WrongDefaultReadingInfo;
  wrongPayments: WrongPaymentsInfo;
  appIssues: AppIssuesInfo;
  loanAppraisal: LoanAppraisalInfo;
  compliance: ComplianceInfo;
}

interface DisbursementInfo {
  process: string;
  requirements: string;
  fees: string;
  groupLoans: string;
  disbursementMethod: string;
  firstTimers: string;
}

interface RenewalInfo {
  eligibility: string;
  process: string;
  restrictions: string;
  requirements: string;
  groupRules: string;
}

interface RepaymentInfo {
  methods: string;
  schedule: string;
  verification: string;
  monitoring: string;
}

interface PaymentTrackingInfo {
  process: string;
  requirements: string;
  resolution: string;
}

interface WrongDefaultReadingInfo {
  causes: string;
  resolution: string;
}

interface WrongPaymentsInfo {
  causes: string;
  resolution: string;
}

interface AppIssuesInfo {
  reporting: string;
  requirements: string;
  resolution: string;
}

interface LoanAppraisalInfo {
  process: string;
  responsibilities: string;
  requirements: string;
  keyControls: string;
}

interface ComplianceInfo {
  savingsWithdrawal: string;
  groupToIndividual: string;
  liquidation: string;
  performanceTracking: string;
}

// Define type for keywords object
type Keywords = {
  [key: string]: string[];
}

// Define type for suggestions
type SuggestionMap = {
  [key: string]: string[];
}

class NEATSupportBot {
  private knowledgeBase: KnowledgeBase;
  private greeting: string;
  private keywords: Keywords;
  
  constructor() {
    // Knowledge base derived from the provided SOPs
    this.knowledgeBase = {
      // Loan Disbursement
      disbursement: {
        process: "Loans are processed and disbursed through the Central Processing Centre (CPC) within 24 hours of receiving a properly submitted application.",
        requirements: "All loan applications must pass through appropriate channels (Relationship Officer, Branch Manager, and RICO) and be certified by the RICO. The RICO independently validates loan requests and sends to HOP for approval/disbursement. Applications are submitted to Branch Manager directly by the Relationship Officer.",
        fees: "New customers must pay N2,000.00 registration fees. All applicants must pay 4% of loan amount in charges (Legal, Insurance, Management, and processing fee of 1% each). SME loans require a 5% processing fee.",
        groupLoans: "Group Loans are disbursed to groups of 5-20 people. Groups should be 80% female and 20% male. Savings of the group may be used to compensate for defaults. All members must be familiar with each other, and the BM must confirm this during verification.",
        disbursementMethod: "Loans are disbursed directly to customers' accounts with commercial banks.",
        firstTimers: "First-time customers are subject to starting amount limitations for the loan product. Loans are only disbursed to customers with a shop or point of business (not accessible to hawkers). Customer must have been at their place of business for a minimum of one year."
      },
      
      // Loan Renewal
      renewal: {
        eligibility: "Customers can renew loans after fully paying down their previous loan. For group loans, all members must have completed repayment of their previous loans. The customer must maintain a minimum savings balance of ₦9,600 for individual loans.",
        process: "Renewal requests are processed by the Compliance Officer/CPC after review of past loan history and KYC verification. The Branch Manager reviews the customer's credit history, performance in terms of repayment, progress in business, and record keeping.",
        restrictions: "Renewals are not available for customers with a history of bad loans. Groups unable to manage their members' character in the previous loan cycle won't be considered.",
        requirements: "Repayment history must show at least 85% of payments were made on the exact due date. KYC information must be updated if there are changes. For higher loan amounts, proof of business growth is required.",
        groupRules: "There must not be more than two defaults in a renewing customer group. For groups with more than two defaults, there must be enough savings to cover the defaulters before any member can renew."
      },
      
      // Loan Repayment
      repayment: {
        methods: "Repayments should be made directly to the company account through the customer's virtual account. Customers can transfer funds or have their Relationship Officer facilitate the payment.",
        schedule: "Repayments are made weekly or monthly according to Terms & Conditions and customer class. Repayments should not exceed 30% of customer salary (product loan) or 30% of business profit.",
        verification: "Relationship Officers sign customer's loan card as evidence of repayment. Customers can check their accounts on the app to confirm successful payments.",
        monitoring: "Branch Managers follow up to confirm all repayments have been credited and update daily collection schedules before 7pm. Daily checking and monitoring is done via the app."
      },
      
      // Payment Tracking
      paymentTracking: {
        process: "When payments don't reflect in the system, tracking is initiated using the transaction ID, reference ID, or payment ID. The deposit manager is checked first, then the issue is escalated to RICO if needed. The first step is to search on deposit manager, go to deposit history approved and search such transaction. If found, take note of who payment is credited to. If not found, relate matter to the RICO for further tracing.",
        requirements: "Only payments with 'successful' status can be traced internally. Payments with status like 'failed', 'pending', or 'unsuccessful' require the customer to contact their payment source.",
        resolution: "Issues are forwarded to the accounting department for confirmation and resolution. The RICO relates the issue forward via official mails to the accountant once the issue has been identified."
      },
      
      // Wrong Default Reading
      wrongDefaultReading: {
        causes: "Inaccurate default readings can be caused by failed disbursement, app behavior, or incorrect payment date selection.",
        resolution: "The issue should be reported through the Branch Manager to the Disbursement Officer via email. Required information includes loan ID, customer ID, disbursement date, and first payment date."
      },
      
      // Wrong Payments
      wrongPayments: {
        causes: "Wrong payments typically occur when customers use old virtual accounts after loan renewal, or when Relationship Officers mistakenly provide incorrect virtual account numbers. After renewal, an old virtual account may be allocated to another customer while a new virtual account is allocated to the renewing customer.",
        resolution: "Submit complaints to the Head of CPC with customer ID, loan ID, old and new virtual accounts, and payment evidence (payment teller information). The RICO identifies where the problem is coming from using the deposit history approved and the virtual accounts statements on the drive. The head of CPC works on it, corrects the situation, or channels it to the respective third parties involved and provides feedback."
      },
      
      // App Issues
      appIssues: {
        reporting: "Irrespective of any issue observed with the app, send your complaint directly to the Head of Technology with details of what's experienced. This includes virtual account related matters, whether customer is having more than one or not having at all, inability to create customer or loan, etc.",
        requirements: "Include customer's ID, staff ID, loan ID, payment ID, withdrawal ID, deposit ID and any other ID or relevant information where needed. Take a screenshot and/or few seconds screen record of the issue and send to the Head of Technology. Customer IDs are the customer's app registration number starting with NT... Staff ID is the complainer's app ID. Loan ID is the customer's loan registration number starting with NTL...",
        resolution: "The head of CPC channels the complaint to the tech team depending on what was reported."
      },
      
      // Loan Appraisal
      loanAppraisal: {
        process: "The loan appraisal process begins with the Relationship Officer receiving the customer's loan application/request. The RO visits the customer's business location and home for verification. The Branch Manager then visits the customer's business location without pre-notification to verify details. All information is forwarded to the RICO for final approval.",
        responsibilities: "ROs must verify customer's business and take photographs of the shop with goods on display. BMs must confirm the shop/house belongs to the customer, assess the business, and confirm loan details. RICOs validate the loan request after BM approval.",
        requirements: "Customers must have a shop or point of business (no loans for hawkers), must have been at their place of business for at least one year, and the loan amount should not exceed 50% of the business value.",
        keyControls: "All loan requests are independently verified by the branch manager. Photographs of shops with goods and meetings with customers are required. Loan amount should be ≤ 50% of business value, and weekly repayment should be ≤ 30% of weekly profit margin. Staff should not demand or accept gifts from customers."
      },
      
      // Compliance Information
      compliance: {
        savingsWithdrawal: "Customers requesting savings withdrawal or card closure must have their data filled in a template Excel sheet for verification. The approval process includes verification of customer details and ensuring accurate recording in the app and Excel templates.",
        groupToIndividual: "Customers who wish to leave a group and become individual borrowers must complete and submit the forfeiture form if there are defaulters in the group. They must forfeit ₦9,600 from their savings as part of the transition process. If there are no defaulting members, no forfeiture is required.",
        liquidation: "Active customers are required to liquidate their loans every week as soon as their payment date is due. The Compliance Unit ensures the liquidation process is followed strictly, verifying each payment is recorded accurately in the app.",
        performanceTracking: "Residence Internal Control Officers (RICOs) pick the figures of their branch Relationship Officers and Branch Managers once a month. These figures include defaults and are used to track performance through the RO and BM Monthly Default Report."
      }
    };
    
    // Default greeting message
    this.greeting = "Welcome to NEAT Financial Support! How can I help you with your loan today?";
    
    // Keywords to help identify query topics
    this.keywords = {
      disbursement: ["disburse", "disbursal", "disbursement", "get loan", "loan application", "apply", "new loan", "request loan", "loan process", "fees", "charges", "group loan", "first loan", "first time", "start"],
      renewal: ["renew", "renewal", "another loan", "second loan", "extend", "extension", "refinance", "new cycle"],
      repayment: ["repay", "repayment", "pay back", "payment", "installment", "schedule", "paying", "pay loan", "virtual account"],
      paymentTracking: ["track", "tracking", "trace", "find payment", "payment not showing", "payment not reflecting", "missing payment"],
      wrongDefaultReading: ["default reading", "wrong default", "incorrect default", "wrong reading", "showing default", "false default"],
      wrongPayments: ["wrong payment", "incorrect payment", "payment to wrong account", "wrong virtual account", "payment error", "wrong account", "old account"],
      appIssues: ["app", "application", "tech", "technology", "app issue", "app error", "app problem", "virtual account issue", "can't create", "unable to register"],
      loanAppraisal: ["appraisal", "verification", "verify", "check business", "business visit", "requirements", "qualify", "approval process", "shop visit"],
      compliance: ["compliance", "withdraw savings", "card closure", "leave group", "individual loan", "switch to individual", "forfeiture", "liquidate", "RICO", "performance"]
    };
  }
  
  // Main function to handle user queries
  public handleQuery(userQuery: string): string {
    const query = userQuery.toLowerCase();
    
    // If greeting or initial question
    if (this.isGreeting(query)) {
      return this.greeting;
    }
    
    // Identify the topic of the query
    const topic = this.identifyTopic(query);
    
    // Generate response based on identified topic
    return this.generateResponse(topic, query);
  }
  
  // Check if query is a greeting
  private isGreeting(query: string): boolean {
    const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"];
    return greetings.some(greeting => query.includes(greeting)) && query.length < 20;
  }
  
  // Identify the topic of the query
  public identifyTopic(query: string): string {
    for (const [topic, keywordList] of Object.entries(this.keywords)) {
      if (keywordList.some(keyword => query.includes(keyword))) {
        return topic;
      }
    }
    
    // Check for specific questions that might not contain obvious keywords
    if (query.includes("how long") && (query.includes("loan") || query.includes("process"))) {
      return "disbursement";
    }
    
    if (query.includes("group") && query.includes("loan")) {
      return "disbursement";
    }
    
    if (query.includes("virtual account")) {
      return "repayment";
    }
    
    if (query.includes("old account") || query.includes("new account")) {
      return "wrongPayments";
    }
    
    if (query.includes("app") && query.includes("issue")) {
      return "appIssues";
    }
    
    if (query.includes("business") && (query.includes("check") || query.includes("verify"))) {
      return "loanAppraisal";
    }
    
    if (query.includes("savings") && query.includes("withdraw")) {
      return "compliance";
    }
    
    // Default to general information if no topic is identified
    return "general";
  }
  
  // Generate response based on topic
  private generateResponse(topic: string, query: string): string {
    switch (topic) {
      case "disbursement":
        return this.handleDisbursementQuery(query);
      
      case "renewal":
        return this.handleRenewalQuery(query);
      
      case "repayment":
        return this.handleRepaymentQuery(query);
      
      case "paymentTracking":
        return this.handlePaymentTrackingQuery(query);
      
      case "wrongDefaultReading":
        return this.handleWrongDefaultReadingQuery(query);
      
      case "wrongPayments":
        return this.handleWrongPaymentsQuery(query);
      
      case "appIssues":
        return this.handleAppIssuesQuery(query);
      
      case "loanAppraisal":
        return this.handleLoanAppraisalQuery(query);
      
      case "compliance":
        return this.handleComplianceQuery(query);
      
      case "general":
      default:
        return this.handleGeneralQuery();
    }
  }
  
  // Handle disbursement queries
  private handleDisbursementQuery(query: string): string {
    const info = this.knowledgeBase.disbursement;
    
    if (query.includes("process") || query.includes("how") || query.includes("steps")) {
      return `${info.process} ${info.requirements}`;
    }
    
    if (query.includes("fee") || query.includes("cost") || query.includes("charge") || query.includes("pay for")) {
      return `${info.fees}`;
    }
    
    if (query.includes("group") || query.includes("members")) {
      return `${info.groupLoans}`;
    }
    
    if (query.includes("first time") || query.includes("new customer")) {
      return `${info.firstTimers} New customers must also pay a registration fee of N2,000.00.`;
    }
    
    if (query.includes("account") || query.includes("bank") || query.includes("receive")) {
      return `${info.disbursementMethod}`;
    }
    
    if (query.includes("hawker") || query.includes("shop") || query.includes("business location")) {
      return `${info.firstTimers}`;
    }
    
    // General disbursement info if query isn't specific
    return `Loan Disbursement Process: ${info.process}\n\nRequirements: ${info.requirements}\n\nFees: ${info.fees}\n\nDisbursement Method: ${info.disbursementMethod}\n\nFirst-time Customers: ${info.firstTimers}`;
  }
  
  // Handle renewal queries
  private handleRenewalQuery(query: string): string {
    const info = this.knowledgeBase.renewal;
    
    if (query.includes("eligible") || query.includes("qualify") || query.includes("can i")) {
      return `${info.eligibility} ${info.restrictions}`;
    }
    
    if (query.includes("process") || query.includes("how") || query.includes("steps")) {
      return `${info.process}`;
    }
    
    if (query.includes("group") || query.includes("members")) {
      return `${info.groupRules} ${info.eligibility}`;
    }
    
    if (query.includes("requirement") || query.includes("need")) {
      return `${info.requirements}`;
    }
    
    if (query.includes("savings") || query.includes("balance")) {
      return `For individual loans, the customer must maintain a minimum savings balance of ₦9,600. ${info.groupRules}`;
    }
    
    if (query.includes("default") || query.includes("missed payment")) {
      return `${info.groupRules} ${info.restrictions}`;
    }
    
    // General renewal info if query isn't specific
    return `Loan Renewal Eligibility: ${info.eligibility}\n\nProcess: ${info.process}\n\nRequirements: ${info.requirements}\n\nRestrictions: ${info.restrictions}\n\nGroup Rules: ${info.groupRules}`;
  }
  
  // Handle repayment queries
  private handleRepaymentQuery(query: string): string {
    const info = this.knowledgeBase.repayment;
    
    if (query.includes("how") || query.includes("make payment") || query.includes("pay")) {
      return `${info.methods}`;
    }
    
    if (query.includes("schedule") || query.includes("when") || query.includes("due") || query.includes("late")) {
      return `${info.schedule}`;
    }
    
    if (query.includes("confirm") || query.includes("verify") || query.includes("check")) {
      return `${info.verification} ${info.monitoring}`;
    }
    
    if (query.includes("virtual account")) {
      return `Repayments should be made directly to the company account through your assigned virtual account. If you're unsure of your virtual account number, please contact your Relationship Officer.`;
    }
    
    if (query.includes("monitor") || query.includes("track payments")) {
      return `${info.monitoring}`;
    }
    
    // General repayment info if query isn't specific
    return `Loan Repayment Methods: ${info.methods}\n\nSchedule: ${info.schedule}\n\nVerification: ${info.verification}\n\nMonitoring: ${info.monitoring}`;
  }
  
  // Handle payment tracking queries
  private handlePaymentTrackingQuery(query: string): string {
    const info = this.knowledgeBase.paymentTracking;
    
    if (query.includes("how") || query.includes("process") || query.includes("track")) {
      return `${info.process}`;
    }
    
    if (query.includes("failed") || query.includes("pending") || query.includes("unsuccessful")) {
      return `${info.requirements}`;
    }
    
    if (query.includes("resolve") || query.includes("solution")) {
      return `${info.resolution}`;
    }
    
    // General payment tracking info if query isn't specific
    return `Payment Tracking Process: When your payment doesn't reflect in the system, we can help track it using your transaction ID, reference ID, or payment ID. ${info.process}\n\nRequirements: ${info.requirements}\n\nResolution: ${info.resolution}`;
  }
  
  // Handle wrong default reading queries
  private handleWrongDefaultReadingQuery(query: string): string {
    const info = this.knowledgeBase.wrongDefaultReading;
    
    if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
      return `${info.causes}`;
    }
    
    if (query.includes("fix") || query.includes("solve") || query.includes("resolve")) {
      return `${info.resolution}`;
    }
    
    // General wrong default reading info if query isn't specific
    return `Wrong Default Reading: Default readings can be inaccurate due to ${info.causes}\n\nTo resolve this issue: ${info.resolution}`;
  }
  
  // Handle wrong payments queries
  private handleWrongPaymentsQuery(query: string): string {
    const info = this.knowledgeBase.wrongPayments;
    
    if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
      return `${info.causes}`;
    }
    
    if (query.includes("fix") || query.includes("solve") || query.includes("resolve") || query.includes("what should i do")) {
      return `${info.resolution}`;
    }
    
    if (query.includes("virtual account") || query.includes("old account") || query.includes("new account")) {
      return `${info.causes}\n\nIf you've made a payment to an old account, please ${info.resolution}`;
    }
    
    // General wrong payments info if query isn't specific
    return `Wrong Payments: ${info.causes}\n\nResolution Process: ${info.resolution}`;
  }
  
  // Handle app issues queries
  private handleAppIssuesQuery(query: string): string {
    const info = this.knowledgeBase.appIssues;
    
    if (query.includes("report") || query.includes("how to report")) {
      return `${info.reporting}`;
    }
    
    if (query.includes("what information") || query.includes("what details") || query.includes("what do i need")) {
      return `${info.requirements}`;
    }
    
    if (query.includes("who") || query.includes("contact") || query.includes("responsible")) {
      return `${info.reporting} ${info.resolution}`;
    }
    
    if (query.includes("virtual account") || query.includes("multiple accounts") || query.includes("no account")) {
      return `If you're experiencing issues with virtual accounts (having multiple accounts or no account), ${info.reporting}`;
    }
    
    // General app issues info if query isn't specific
    return `App Issue Reporting: ${info.reporting}\n\nRequired Information: ${info.requirements}\n\nResolution Process: ${info.resolution}`;
  }
  
  // Handle loan appraisal queries
  private handleLoanAppraisalQuery(query: string): string {
    const info = this.knowledgeBase.loanAppraisal;
    
    if (query.includes("process") || query.includes("how") || query.includes("steps")) {
      return `${info.process}`;
    }
    
    if (query.includes("requirements") || query.includes("qualify") || query.includes("eligible")) {
      return `${info.requirements}`;
    }
    
    if (query.includes("visit") || query.includes("verify") || query.includes("check")) {
      return `As part of our loan appraisal process: ${info.process}`;
    }
    
    if (query.includes("business") || query.includes("shop")) {
      return `${info.requirements} The loan amount should be ≤ 50% of your business value, and weekly repayment should be ≤ 30% of your weekly profit margin.`;
    }
    
    if (query.includes("responsibility") || query.includes("role")) {
      return `${info.responsibilities}`;
    }
    
    // General loan appraisal info if query isn't specific
    return `Loan Appraisal Process: ${info.process}\n\nResponsibilities: ${info.responsibilities}\n\nRequirements: ${info.requirements}\n\nKey Controls: ${info.keyControls}`;
  }
  
  // Handle compliance queries
  private handleComplianceQuery(query: string): string {
    const info = this.knowledgeBase.compliance;
    
    if (query.includes("withdraw") || query.includes("savings") || query.includes("card closure")) {
      return `${info.savingsWithdrawal}`;
    }
    
    if (query.includes("group to individual") || query.includes("leave group") || query.includes("switch to individual")) {
      return `${info.groupToIndividual}`;
    }
    
    if (query.includes("liquidate") || query.includes("liquidation")) {
      return `${info.liquidation}`;
    }
    
    if (query.includes("performance") || query.includes("tracking") || query.includes("RICO")) {
      return `${info.performanceTracking}`;
    }
    
    if (query.includes("forfeiture") || query.includes("9600") || query.includes("9,600")) {
      return `For customers who wish to leave a group and become individual borrowers: ${info.groupToIndividual}`;
    }
    
    // General compliance info if query isn't specific
    return `Compliance Information:\n\nSavings Withdrawal and Card Closure: ${info.savingsWithdrawal}\n\nGroup to Individual Transition: ${info.groupToIndividual}\n\nLiquidation: ${info.liquidation}\n\nPerformance Tracking: ${info.performanceTracking}`;
  }
  
  // Handle general queries
  private handleGeneralQuery(): string {
    return "I can help you with information about loan disbursement, loan renewal, repayment procedures, payment tracking, wrong default readings, payment issues, app-related issues, loan appraisal, and compliance matters. Please specify what you'd like to know about these topics.";
  }
  
  // Follow-up suggestions based on the current topic
  public getFollowUpSuggestions(topic: string): string[] {
    const suggestions: SuggestionMap = {
      disbursement: [
        "What are the fees for a new loan?",
        "How do group loans work?",
        "How long does loan disbursement take?",
        "What requirements do I need for my first loan?",
        "Can I get a loan if I'm a hawker without a shop?"
      ],
      renewal: [
        "Am I eligible for loan renewal?",
        "What's required for loan renewal?",
        "Can I renew if someone in my group defaulted?",
        "How much savings do I need to renew my loan?",
        "How is my loan renewal application processed?"
      ],
      repayment: [
        "How do I make a loan repayment?",
        "How can I check if my payment was received?",
        "What is the repayment schedule?",
        "How do I get my virtual account for payments?",
        "What percentage of my income should repayment be?"
      ],
      paymentTracking: [
        "My payment isn't showing in the system",
        "How do I track a payment?",
        "What if my payment failed?",
        "Who can help me trace my missing payment?",
        "What information do I need to track a payment?"
      ],
      wrongDefaultReading: [
        "Why am I showing as defaulted?",
        "How to fix wrong default status?",
        "What causes wrong default readings?",
        "Who should I contact about wrong default reading?",
        "What information is needed to resolve default status?"
      ],
      wrongPayments: [
        "I paid to the wrong account",
        "How to resolve wrong payment issues?",
        "Why did my payment go to the wrong account?",
        "My virtual account changed after renewal",
        "Who should I contact about wrong payments?"
      ],
      appIssues: [
        "How do I report app problems?",
        "Who should I contact about app issues?",
        "What details should I provide for app issues?",
        "I have multiple virtual accounts in the app",
        "I can't create a customer profile in the app"
      ],
      loanAppraisal: [
        "What is the loan appraisal process?",
        "Who visits my business for verification?",
        "What documents do I need for loan approval?",
        "How much can I borrow based on my business?",
        "What are the requirements for loan eligibility?"
      ],
      compliance: [
        "How do I withdraw my savings?",
        "What's the process to move from group to individual loans?",
        "What is the forfeiture requirement?",
        "How is liquidation handled?",
        "What is the role of the RICO in monitoring?"
      ],
      general: [
        "Tell me about loan disbursement",
        "How do I renew my loan?",
        "Explain the repayment process",
        "What should I do if my payment doesn't show up?",
        "How do I report issues with the app?"
      ]
    };
    
    return suggestions[topic] || suggestions.general;
  }
}

export default NEATSupportBot;