class NEATSupportBot {
    constructor() {
      // Knowledge base derived from the provided SOPs
      this.knowledgeBase = {
        // Loan Disbursement
        disbursement: {
          process: "Loans are processed and disbursed through the Central Processing Centre (CPC) within 24 hours of receiving a properly submitted application.",
          requirements: "All loan applications must pass through appropriate channels (Relationship Officer, Branch Manager, and RICO) and be certified by the RICO.",
          fees: "New customers must pay N2,000.00 registration fees. All applicants must pay 4% of loan amount in charges (Legal, Insurance, Management, and processing fee of 1% each). SME loans require a 5% processing fee.",
          groupLoans: "Group Loans are disbursed to groups of 5-20 people. Groups should be 80% female and 20% male. Savings of the group may be used to compensate for defaults.",
          disbursementMethod: "Loans are disbursed directly to customers' accounts with commercial banks.",
          firstTimers: "First-time customers are subject to starting amount limitations for the loan product."
        },
        
        // Loan Renewal
        renewal: {
          eligibility: "Customers can renew loans after fully paying down their previous loan. For group loans, all members must have completed repayment of their previous loans.",
          process: "Renewal requests are processed by the Compliance Officer/CPC after review of past loan history and KYC verification.",
          restrictions: "Renewals are not available for customers with a history of bad loans. Groups unable to manage their members' character in the previous loan cycle won't be considered.",
          requirements: "Repayment history must show at least 85% of payments were made on the exact due date. KYC information must be updated if there are changes.",
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
          process: "When payments don't reflect in the system, tracking is initiated using the transaction ID, reference ID, or payment ID. The deposit manager is checked first, then the issue is escalated to RICO if needed.",
          requirements: "Only payments with 'successful' status can be traced internally. Payments with status like 'failed', 'pending', or 'unsuccessful' require the customer to contact their payment source.",
          resolution: "Issues are forwarded to the accounting department for confirmation and resolution."
        },
        
        // Wrong Default Reading
        wrongDefaultReading: {
          causes: "Inaccurate default readings can be caused by failed disbursement, app behavior, or incorrect payment date selection.",
          resolution: "The issue should be reported through the Branch Manager to the Disbursement Officer via email. Required information includes loan ID, customer ID, disbursement date, and first payment date."
        },
        
        // Wrong Payments
        wrongPayments: {
          causes: "Wrong payments typically occur when customers use old virtual accounts after loan renewal, or when Relationship Officers mistakenly provide incorrect virtual account numbers.",
          resolution: "Submit complaints to the Head of CPC with customer ID, loan ID, old and new virtual accounts, and payment evidence. The RICO will investigate using deposit history and virtual account statements."
        }
      };
      
      // Default greeting message
      this.greeting = "Welcome to NEAT Financial Support! How can I help you with your loan today?";
      
      // Keywords to help identify query topics
      this.keywords = {
        disbursement: ["disburse", "disbursal", "disbursement", "get loan", "loan application", "apply", "new loan", "request loan", "loan process", "fees", "charges", "group loan"],
        renewal: ["renew", "renewal", "another loan", "second loan", "extend", "extension", "refinance"],
        repayment: ["repay", "repayment", "pay back", "payment", "installment", "schedule", "paying", "pay loan"],
        paymentTracking: ["track", "tracking", "trace", "find payment", "payment not showing", "payment not reflecting", "missing payment"],
        wrongDefaultReading: ["default reading", "wrong default", "incorrect default", "wrong reading"],
        wrongPayments: ["wrong payment", "incorrect payment", "payment to wrong account", "wrong virtual account", "payment error", "wrong account"]
      };
    }
    
    // Main function to handle user queries
    handleQuery(userQuery) {
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
    isGreeting(query) {
      const greetings = ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening"];
      return greetings.some(greeting => query.includes(greeting)) && query.length < 20;
    }
    
    // Identify the topic of the query
    identifyTopic(query) {
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
      
      // Default to general information if no topic is identified
      return "general";
    }
    
    // Generate response based on topic
    generateResponse(topic, query) {
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
        
        case "general":
        default:
          return this.handleGeneralQuery();
      }
    }
    
    // Handle disbursement queries
    handleDisbursementQuery(query) {
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
      
      // General disbursement info if query isn't specific
      return `Loan Disbursement Process: ${info.process}\n\nRequirements: ${info.requirements}\n\nFees: ${info.fees}\n\nDisbursement Method: ${info.disbursementMethod}`;
    }
    
    // Handle renewal queries
    handleRenewalQuery(query) {
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
      
      // General renewal info if query isn't specific
      return `Loan Renewal Eligibility: ${info.eligibility}\n\nProcess: ${info.process}\n\nRequirements: ${info.requirements}\n\nRestrictions: ${info.restrictions}`;
    }
    
    // Handle repayment queries
    handleRepaymentQuery(query) {
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
      
      // General repayment info if query isn't specific
      return `Loan Repayment Methods: ${info.methods}\n\nSchedule: ${info.schedule}\n\nVerification: ${info.verification}`;
    }
    
    // Handle payment tracking queries
    handlePaymentTrackingQuery(query) {
      const info = this.knowledgeBase.paymentTracking;
      
      if (query.includes("how") || query.includes("process") || query.includes("track")) {
        return `${info.process}`;
      }
      
      if (query.includes("failed") || query.includes("pending") || query.includes("unsuccessful")) {
        return `${info.requirements}`;
      }
      
      // General payment tracking info if query isn't specific
      return `Payment Tracking Process: When your payment doesn't reflect in the system, we can help track it using your transaction ID, reference ID, or payment ID. ${info.requirements} ${info.resolution}`;
    }
    
    // Handle wrong default reading queries
    handleWrongDefaultReadingQuery(query) {
      const info = this.knowledgeBase.wrongDefaultReading;
      
      if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
        return `${info.causes}`;
      }
      
      if (query.includes("fix") || query.includes("solve") || query.includes("resolve")) {
        return `${info.resolution}`;
      }
      
      // General wrong default reading info if query isn't specific
      return `Wrong Default Reading: Default readings can be inaccurate due to ${info.causes} To resolve this issue: ${info.resolution}`;
    }
    
    // Handle wrong payments queries
    handleWrongPaymentsQuery(query) {
      const info = this.knowledgeBase.wrongPayments;
      
      if (query.includes("why") || query.includes("reason") || query.includes("cause")) {
        return `${info.causes}`;
      }
      
      if (query.includes("fix") || query.includes("solve") || query.includes("resolve") || query.includes("what should i do")) {
        return `${info.resolution}`;
      }
      
      // General wrong payments info if query isn't specific
      return `Wrong Payments: ${info.causes}\n\nResolution Process: ${info.resolution}`;
    }
    
    // Handle general queries
    handleGeneralQuery() {
      return "I can help you with information about loan disbursement, loan renewal, repayment procedures, payment tracking, wrong default readings, and payment issues. Please specify what you'd like to know about these topics.";
    }
    
    // Follow-up suggestions based on the current topic
    getFollowUpSuggestions(topic) {
      const suggestions = {
        disbursement: [
          "What are the fees for a new loan?",
          "How do group loans work?",
          "How long does loan disbursement take?"
        ],
        renewal: [
          "Am I eligible for loan renewal?",
          "What's required for loan renewal?",
          "Can I renew if someone in my group defaulted?"
        ],
        repayment: [
          "How do I make a loan repayment?",
          "How can I check if my payment was received?",
          "What is the repayment schedule?"
        ],
        paymentTracking: [
          "My payment isn't showing in the system",
          "How do I track a payment?",
          "What if my payment failed?"
        ],
        wrongDefaultReading: [
          "Why am I showing as defaulted?",
          "How to fix wrong default status?",
          "What causes wrong default readings?"
        ],
        wrongPayments: [
          "I paid to the wrong account",
          "How to resolve wrong payment issues?",
          "Why did my payment go to the wrong account?"
        ],
        general: [
          "Tell me about loan disbursement",
          "How do I renew my loan?",
          "Explain the repayment process"
        ]
      };
      
      return suggestions[topic] || suggestions.general;
    }
  }
  
  export default NEATSupportBot;