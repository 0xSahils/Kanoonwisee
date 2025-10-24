import React, { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const ArticleDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Scroll to top when component mounts or ID changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [id]);

  // Articles database - in real app, fetch from API or CMS
  const articlesDatabase = {
    // Academy Articles (IDs 1-6)
    1: {
      id: 1,
      title: "Complete Guide to Private Limited Company Registration in India",
      excerpt:
        "Everything you need to know about registering a private limited company, from documentation to timeline and costs.",
      category: "business-law",
      author: "Adv. Rajesh Kumar",
      authorBio:
        "Corporate Law Expert with 15+ years of experience in company registration and business law",
      date: "2024-03-15",
      readTime: "8 min read",
      image: "/academy-business-registration.jpg",
      content: `
        <h2>Why Register as a Private Limited Company?</h2>
        <p>A Private Limited Company is one of the most popular business structures in India, offering limited liability protection and separate legal entity status. This guide covers everything you need to know about the registration process.</p>
        
        <h2>Key Benefits</h2>
        <ul>
          <li><strong>Limited Liability:</strong> Your personal assets are protected from business debts</li>
          <li><strong>Separate Legal Entity:</strong> The company can own property, enter contracts, and sue or be sued in its own name</li>
          <li><strong>Perpetual Succession:</strong> The company continues to exist even if shareholders change</li>
          <li><strong>Easy Fundraising:</strong> Easier to raise capital through equity or debt</li>
          <li><strong>Credibility:</strong> Enhanced business credibility with clients and vendors</li>
        </ul>
        
        <h2>Required Documents</h2>
        <h3>For Directors and Shareholders</h3>
        <ul>
          <li>PAN Card (mandatory)</li>
          <li>Aadhaar Card</li>
          <li>Passport-size photographs</li>
          <li>Proof of residence (utility bill, bank statement)</li>
          <li>Digital Signature Certificate (DSC)</li>
        </ul>
        
        <h3>For the Company</h3>
        <ul>
          <li>Registered office address proof</li>
          <li>NOC from the property owner</li>
          <li>Utility bill of the registered office</li>
        </ul>
        
        <h2>Step-by-Step Registration Process</h2>
        <h3>Step 1: Obtain Digital Signature Certificate (DSC)</h3>
        <p>All directors must obtain a DSC as all online forms need to be digitally signed. This typically takes 2-3 days and costs around ₹1,000-₹2,000.</p>
        
        <h3>Step 2: Apply for Director Identification Number (DIN)</h3>
        <p>Directors need to obtain a DIN from the Ministry of Corporate Affairs. This is now done automatically with company registration.</p>
        
        <h3>Step 3: Name Reservation (RUN)</h3>
        <p>Choose a unique name for your company and apply for approval through the RUN (Reserve Unique Name) service. The name should not be:</p>
        <ul>
          <li>Similar to existing companies</li>
          <li>Offensive or against public interest</li>
          <li>Using restricted words without permission</li>
        </ul>
        
        <h3>Step 4: File SPICe+ Form</h3>
        <p>The SPICe+ (Simplified Proforma for Incorporating Company Electronically) form is an integrated web form that includes:</p>
        <ul>
          <li>Company incorporation</li>
          <li>DIN allotment</li>
          <li>PAN and TAN application</li>
          <li>EPFO registration</li>
          <li>ESIC registration</li>
          <li>Opening of bank account</li>
        </ul>
        
        <h3>Step 5: Draft Memorandum and Articles of Association</h3>
        <p>These documents define the company's objectives, rules, and regulations governing its operations.</p>
        
        <h3>Step 6: Certificate of Incorporation</h3>
        <p>Once all documents are verified, the ROC issues a Certificate of Incorporation along with PAN and TAN.</p>
        
        <h2>Timeline and Costs</h2>
        <h3>Timeline</h3>
        <ul>
          <li>Name Approval: 1-2 days</li>
          <li>Document Preparation: 2-3 days</li>
          <li>Filing and Approval: 7-10 days</li>
          <li><strong>Total: 10-15 working days</strong></li>
        </ul>
        
        <h3>Government Fees</h3>
        <ul>
          <li>Authorized Capital up to ₹1 Lakh: ₹500</li>
          <li>Authorized Capital ₹1-5 Lakhs: ₹1,000</li>
          <li>Authorized Capital ₹5-10 Lakhs: ₹2,000</li>
          <li>Above ₹10 Lakhs: ₹2,000 + 0.02% of capital</li>
        </ul>
        
        <h3>Professional Fees</h3>
        <p>Engaging a professional (CA/CS/Lawyer) typically costs ₹5,000-₹15,000 depending on complexity.</p>
        
        <h2>Post-Incorporation Compliance</h2>
        <ul>
          <li>Open a bank account in the company name</li>
          <li>Register for GST if turnover exceeds ₹40 lakhs</li>
          <li>Register for Professional Tax</li>
          <li>Maintain statutory registers</li>
          <li>File annual returns with ROC</li>
          <li>Conduct board meetings quarterly</li>
          <li>Conduct AGM annually</li>
        </ul>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Choosing a name similar to existing companies</li>
          <li>Not maintaining proper corporate records</li>
          <li>Missing compliance deadlines</li>
          <li>Inadequate authorized capital</li>
          <li>Not understanding director responsibilities</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Registering a Private Limited Company is now simpler with the SPICe+ integrated form. While the process can be completed in 10-15 days, it's important to maintain ongoing compliance to avoid penalties. Consider engaging professionals to ensure smooth registration and operations.</p>
        
        <p><strong>Need Help?</strong> Our team of corporate law experts can assist you with company registration and ongoing compliance. Book a consultation today!</p>
      `,
    },
    2: {
      id: 2,
      title: "Startup Legal Checklist: 10 Essential Steps Before Launch",
      excerpt:
        "Critical legal steps every startup founder must complete before launching their business to avoid future complications.",
      category: "startup-guide",
      author: "Adv. Priya Sharma",
      authorBio: "Startup Law Expert specializing in early-stage company compliance",
      date: "2024-03-12",
      readTime: "6 min read",
      image: "/academy-startup-checklist.jpg",
      content: `
        <h2>Introduction</h2>
        <p>Starting a business is exciting, but it's crucial to get your legal foundation right from the start. This checklist covers the 10 essential legal steps every startup must complete before launching.</p>
        
        <h2>1. Choose the Right Business Structure</h2>
        <p>Decide between:</p>
        <ul>
          <li><strong>Sole Proprietorship:</strong> Simplest but no liability protection</li>
          <li><strong>Partnership:</strong> Shared ownership and responsibility</li>
          <li><strong>LLP:</strong> Limited liability with partnership flexibility</li>
          <li><strong>Private Limited:</strong> Best for raising capital and growth</li>
        </ul>
        
        <h2>2. Register Your Business</h2>
        <p>Complete company registration with the Ministry of Corporate Affairs (MCA) and obtain:</p>
        <ul>
          <li>Certificate of Incorporation</li>
          <li>PAN and TAN</li>
          <li>GST registration (if applicable)</li>
        </ul>
        
        <h2>3. Protect Your Intellectual Property</h2>
        <p>File trademark applications for:</p>
        <ul>
          <li>Company name and logo</li>
          <li>Product names</li>
          <li>Taglines and slogans</li>
        </ul>
        <p>Consider patent protection for unique inventions and processes.</p>
        
        <h2>4. Draft Founders' Agreement</h2>
        <p>A founders' agreement should cover:</p>
        <ul>
          <li>Equity distribution</li>
          <li>Roles and responsibilities</li>
          <li>Decision-making process</li>
          <li>Vesting schedule</li>
          <li>Exit provisions</li>
          <li>Dispute resolution</li>
        </ul>
        
        <h2>5. Create Proper Contracts</h2>
        <p>Prepare templates for:</p>
        <ul>
          <li>Employment agreements</li>
          <li>Consultant contracts</li>
          <li>Non-disclosure agreements (NDAs)</li>
          <li>Service agreements</li>
          <li>Vendor contracts</li>
        </ul>
        
        <h2>6. Ensure Data Privacy Compliance</h2>
        <p>Implement:</p>
        <ul>
          <li>Privacy policy</li>
          <li>Terms of service</li>
          <li>Cookie policy</li>
          <li>Data protection measures</li>
        </ul>
        
        <h2>7. Set Up Accounting Systems</h2>
        <p>Establish:</p>
        <ul>
          <li>Separate business bank account</li>
          <li>Accounting software</li>
          <li>Invoicing system</li>
          <li>Expense tracking</li>
        </ul>
        
        <h2>8. Obtain Required Licenses</h2>
        <p>Identify and obtain industry-specific licenses such as:</p>
        <ul>
          <li>Shop and establishment license</li>
          <li>Food license (FSSAI)</li>
          <li>Professional Tax registration</li>
          <li>Sector-specific permits</li>
        </ul>
        
        <h2>9. Implement Corporate Governance</h2>
        <p>Set up proper corporate governance with:</p>
        <ul>
          <li>Board meetings schedule</li>
          <li>Minute books</li>
          <li>Statutory registers</li>
          <li>Share certificates</li>
        </ul>
        
        <h2>10. Plan for Compliance</h2>
        <p>Create a compliance calendar for:</p>
        <ul>
          <li>ROC annual filings</li>
          <li>GST returns</li>
          <li>Income tax filings</li>
          <li>TDS returns</li>
          <li>PF and ESIC payments</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Completing these legal essentials before launch will save you from costly mistakes and legal complications down the road. Consider engaging legal and financial professionals to ensure proper setup.</p>
        
        <p><strong>Need Expert Guidance?</strong> Our startup law specialists can help you navigate these requirements. Schedule a consultation today!</p>
      `,
    },
    3: {
      id: 3,
      title: "Trademark Registration: Protecting Your Brand Identity",
      excerpt:
        "Step-by-step guide to trademark registration, including costs, timeline, and common mistakes to avoid.",
      category: "ip-law",
      author: "Adv. Meera Patel",
      authorBio: "IP Law Specialist with expertise in trademark and patent law",
      date: "2024-03-08",
      readTime: "7 min read",
      image: "/academy-trademark.jpg",
      content: `
        <h2>Why Trademark Registration Matters</h2>
        <p>Your brand identity is one of your most valuable assets. Trademark registration provides legal protection and exclusive rights to use your brand elements in commerce.</p>
        
        <h2>What Can Be Trademarked?</h2>
        <ul>
          <li>Company names and logos</li>
          <li>Product names and packaging</li>
          <li>Service marks</li>
          <li>Taglines and slogans</li>
          <li>Sounds and colors (in specific contexts)</li>
        </ul>
        
        <h2>Benefits of Trademark Registration</h2>
        <ul>
          <li>Exclusive nationwide rights</li>
          <li>Legal protection against infringement</li>
          <li>Use of ® symbol</li>
          <li>Asset value for the business</li>
          <li>Barrier against competitors</li>
          <li>Enhanced brand credibility</li>
        </ul>
        
        <h2>Trademark Registration Process</h2>
        <h3>Step 1: Trademark Search</h3>
        <p>Conduct a comprehensive search to ensure your trademark is unique:</p>
        <ul>
          <li>Search the IP India trademark database</li>
          <li>Check for phonetically similar marks</li>
          <li>Review similar visual designs</li>
          <li>Consider common law rights</li>
        </ul>
        
        <h3>Step 2: Choose the Right Class</h3>
        <p>Trademarks are classified into 45 classes (34 for goods, 11 for services). Choose the class that best represents your business.</p>
        
        <h3>Step 3: File the Application</h3>
        <p>Submit Form TM-A with:</p>
        <ul>
          <li>Applicant details</li>
          <li>Clear representation of the mark</li>
          <li>Class and goods/services description</li>
          <li>User date (if applicable)</li>
          <li>Priority claim (if any)</li>
        </ul>
        
        <h3>Step 4: Examination</h3>
        <p>The Trademark Office examines your application for:</p>
        <ul>
          <li>Absolute grounds (descriptive, generic)</li>
          <li>Relative grounds (similar existing marks)</li>
          <li>Compliance with formalities</li>
        </ul>
        
        <h3>Step 5: Publication in Journal</h3>
        <p>If accepted, your trademark is published in the Trademark Journal for opposition. Third parties have 4 months to file objections.</p>
        
        <h3>Step 6: Registration Certificate</h3>
        <p>If no opposition is filed or opposition is decided in your favor, you receive the registration certificate.</p>
        
        <h2>Timeline</h2>
        <ul>
          <li>Application filing: 1-2 days</li>
          <li>Examination: 6-12 months</li>
          <li>Publication: 4 months opposition period</li>
          <li>Registration: 1-2 months post-publication</li>
          <li><strong>Total: 12-18 months typically</strong></li>
        </ul>
        
        <h2>Costs</h2>
        <h3>Government Fees (per class)</h3>
        <ul>
          <li>Individual/Startup: ₹4,500</li>
          <li>Small Entities: ₹9,000</li>
          <li>Others: ₹10,000</li>
        </ul>
        
        <h3>Professional Fees</h3>
        <p>Attorney fees typically range from ₹5,000 to ₹15,000 per class depending on complexity.</p>
        
        <h2>Trademark Validity and Renewal</h2>
        <p>Trademarks are valid for 10 years and can be renewed indefinitely for successive 10-year periods.</p>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Not conducting a thorough search</li>
          <li>Choosing descriptive or generic names</li>
          <li>Filing in wrong class</li>
          <li>Not responding to examination reports promptly</li>
          <li>Using ® symbol before registration</li>
          <li>Not monitoring for infringement</li>
        </ul>
        
        <h2>Enforcing Your Trademark</h2>
        <p>Once registered, monitor for infringement and take action:</p>
        <ul>
          <li>Send cease and desist letters</li>
          <li>File opposition against conflicting marks</li>
          <li>Initiate infringement proceedings</li>
          <li>Seek injunctions and damages</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Trademark registration is essential for protecting your brand identity. Start the process early to secure your rights and prevent competitors from using similar marks.</p>
        
        <p><strong>Ready to Protect Your Brand?</strong> Our IP law experts can help you with trademark search, registration, and enforcement. Get started today!</p>
      `,
    },
    4: {
      id: 4,
      title: "GST Compliance for New Businesses: A Beginner's Guide",
      excerpt:
        "Understanding GST registration, filing requirements, and compliance obligations for new business owners.",
      category: "compliance",
      author: "Adv. Anita Singh",
      authorBio: "Tax Law Expert specializing in GST compliance and advisory",
      date: "2024-03-05",
      readTime: "5 min read",
      image: "/academy-gst-compliance.jpg",
      content: `
        <h2>What is GST?</h2>
        <p>Goods and Services Tax (GST) is an indirect tax levied on the supply of goods and services in India. It replaced multiple indirect taxes like VAT, service tax, and excise duty.</p>
        
        <h2>When to Register for GST</h2>
        <p>GST registration is mandatory if:</p>
        <ul>
          <li>Annual turnover exceeds ₹40 lakhs (₹20 lakhs for special category states)</li>
          <li>You're engaged in interstate supply</li>
          <li>You're an e-commerce operator</li>
          <li>You're required to pay GST under reverse charge</li>
          <li>You supply via e-commerce platforms</li>
        </ul>
        
        <h2>GST Registration Process</h2>
        <h3>Documents Required</h3>
        <ul>
          <li>PAN card</li>
          <li>Aadhaar card</li>
          <li>Business registration proof</li>
          <li>Address proof of business premises</li>
          <li>Bank account details</li>
          <li>Digital signature (for companies)</li>
        </ul>
        
        <h3>Registration Steps</h3>
        <ol>
          <li>Visit the GST portal (gst.gov.in)</li>
          <li>Fill Form GST REG-01</li>
          <li>Submit required documents</li>
          <li>Receive ARN (Application Reference Number)</li>
          <li>Get GST certificate within 3-7 working days</li>
        </ol>
        
        <h2>Types of GST Returns</h2>
        <h3>Regular Returns</h3>
        <ul>
          <li><strong>GSTR-1:</strong> Outward supplies (monthly/quarterly)</li>
          <li><strong>GSTR-3B:</strong> Summary return (monthly)</li>
        </ul>
        
        <h3>Annual Returns</h3>
        <ul>
          <li><strong>GSTR-9:</strong> Annual return</li>
          <li><strong>GSTR-9C:</strong> Reconciliation statement (for turnover >₹5 crore)</li>
        </ul>
        
        <h2>GST Rates Structure</h2>
        <ul>
          <li><strong>0%:</strong> Essential items (grains, milk)</li>
          <li><strong>5%:</strong> Necessities (sugar, tea, coffee)</li>
          <li><strong>12%:</strong> Processed foods, computers</li>
          <li><strong>18%:</strong> Most goods and services</li>
          <li><strong>28%:</strong> Luxury items, automobiles</li>
        </ul>
        
        <h2>Input Tax Credit (ITC)</h2>
        <p>ITC allows you to reduce your GST liability by claiming credit for GST paid on purchases:</p>
        <ul>
          <li>Maintain proper tax invoices</li>
          <li>Ensure supplier has filed returns</li>
          <li>File returns on time</li>
          <li>Match purchases with GSTR-2B</li>
        </ul>
        
        <h2>GST Compliance Calendar</h2>
        <table>
          <tr>
            <th>Return</th>
            <th>Due Date</th>
          </tr>
          <tr>
            <td>GSTR-1 (Monthly)</td>
            <td>11th of next month</td>
          </tr>
          <tr>
            <td>GSTR-1 (Quarterly)</td>
            <td>13th of month after quarter</td>
          </tr>
          <tr>
            <td>GSTR-3B</td>
            <td>20th/22nd/24th of next month</td>
          </tr>
          <tr>
            <td>GSTR-9 (Annual)</td>
            <td>31st December</td>
          </tr>
        </table>
        
        <h2>Common GST Mistakes</h2>
        <ul>
          <li>Not maintaining proper invoices</li>
          <li>Missing filing deadlines</li>
          <li>Incorrect HSN/SAC codes</li>
          <li>Not reconciling ITC</li>
          <li>Ignoring reverse charge mechanism</li>
        </ul>
        
        <h2>Penalties for Non-Compliance</h2>
        <ul>
          <li>Late fee: ₹50 per day (₹20 for NIL return)</li>
          <li>Interest: 18% per annum on tax payable</li>
          <li>Penalty: Up to 10% of tax due for evasion</li>
        </ul>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Maintain digital records</li>
          <li>Use GST-compliant accounting software</li>
          <li>Reconcile regularly with GSTR-2B</li>
          <li>File returns on time</li>
          <li>Keep track of compliance calendar</li>
          <li>Consult professionals for complex issues</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>GST compliance is crucial for avoiding penalties and maintaining business credibility. Set up proper systems from day one to ensure smooth compliance.</p>
        
        <p><strong>Need GST Compliance Help?</strong> Our tax experts can assist with registration, filing, and ongoing compliance. Contact us today!</p>
      `,
    },
    5: {
      id: 5,
      title: "Data Protection Laws for Tech Startups",
      excerpt:
        "Navigate data protection regulations and privacy laws that affect technology companies and startups.",
      category: "tech-law",
      author: "Adv. Vikram Joshi",
      authorBio: "Technology Law Expert specializing in data privacy and cybersecurity",
      date: "2024-03-01",
      readTime: "9 min read",
      image: "/academy-data-protection.jpg",
      content: `
        <h2>The Importance of Data Protection</h2>
        <p>In today's digital economy, data is the new currency. Tech startups collect, process, and store massive amounts of personal data. Understanding and complying with data protection laws is not just a legal requirement—it's essential for building trust with users.</p>
        
        <h2>Current Legal Framework in India</h2>
        <h3>Information Technology Act, 2000</h3>
        <p>The IT Act and its amendments provide the basic framework for data protection:</p>
        <ul>
          <li>Section 43A: Compensation for failure to protect sensitive personal data</li>
          <li>Section 72A: Punishment for disclosure of information in breach of contract</li>
          <li>IT Rules 2011: Reasonable security practices</li>
        </ul>
        
        <h3>Digital Personal Data Protection Act, 2023</h3>
        <p>India's comprehensive data protection law establishes:</p>
        <ul>
          <li>Rights of data principals (individuals)</li>
          <li>Obligations of data fiduciaries (companies)</li>
          <li>Data Protection Board oversight</li>
          <li>Cross-border data transfer rules</li>
          <li>Penalties for non-compliance</li>
        </ul>
        
        <h2>Key Compliance Requirements</h2>
        <h3>1. Lawful Processing</h3>
        <p>Process personal data only with valid consent or under specified legal grounds:</p>
        <ul>
          <li>Consent of the data principal</li>
          <li>Contractual necessity</li>
          <li>Legal obligation</li>
          <li>Medical emergency</li>
        </ul>
        
        <h3>2. Purpose Limitation</h3>
        <p>Collect and use data only for specific, legitimate purposes communicated to users.</p>
        
        <h3>3. Data Minimization</h3>
        <p>Collect only necessary data—avoid excessive collection.</p>
        
        <h3>4. Transparency</h3>
        <p>Clearly inform users about:</p>
        <ul>
          <li>What data you collect</li>
          <li>Why you collect it</li>
          <li>How you use it</li>
          <li>Who you share it with</li>
          <li>How long you retain it</li>
        </ul>
        
        <h3>5. Data Security</h3>
        <p>Implement reasonable security measures:</p>
        <ul>
          <li>Encryption of data at rest and in transit</li>
          <li>Access controls and authentication</li>
          <li>Regular security audits</li>
          <li>Incident response procedures</li>
          <li>Employee training</li>
        </ul>
        
        <h2>User Rights You Must Honor</h2>
        <ul>
          <li><strong>Right to Access:</strong> Provide users access to their data</li>
          <li><strong>Right to Correction:</strong> Allow users to correct inaccurate data</li>
          <li><strong>Right to Erasure:</strong> Delete data upon request (with exceptions)</li>
          <li><strong>Right to Data Portability:</strong> Provide data in portable format</li>
          <li><strong>Right to Grievance Redressal:</strong> Establish complaint mechanism</li>
        </ul>
        
        <h2>Essential Documents</h2>
        <h3>Privacy Policy</h3>
        <p>A comprehensive privacy policy must include:</p>
        <ul>
          <li>Data collection practices</li>
          <li>Purpose of processing</li>
          <li>Data sharing and transfers</li>
          <li>Retention periods</li>
          <li>Security measures</li>
          <li>User rights</li>
          <li>Contact information</li>
        </ul>
        
        <h3>Terms of Service</h3>
        <p>Clear terms governing user relationship with your platform.</p>
        
        <h3>Cookie Policy</h3>
        <p>Disclosure of cookie usage and tracking technologies.</p>
        
        <h3>Data Processing Agreements</h3>
        <p>Contracts with third-party vendors who process user data.</p>
        
        <h2>Special Considerations for Startups</h2>
        <h3>Children's Data</h3>
        <p>Extra protection required for users under 18:</p>
        <ul>
          <li>Verifiable parental consent required</li>
          <li>Age-appropriate privacy notices</li>
          <li>Limited data collection</li>
        </ul>
        
        <h3>Cross-Border Transfers</h3>
        <p>Transferring data outside India requires:</p>
        <ul>
          <li>User consent for certain categories</li>
          <li>Adequate safeguards</li>
          <li>Compliance with destination country laws</li>
        </ul>
        
        <h3>Data Breach Response</h3>
        <p>Establish procedures for:</p>
        <ul>
          <li>Detecting breaches</li>
          <li>Containing incidents</li>
          <li>Notifying authorities (within specified time)</li>
          <li>Informing affected users</li>
          <li>Documenting incidents</li>
        </ul>
        
        <h2>Penalties for Non-Compliance</h2>
        <p>Under DPDPA 2023, penalties can be severe:</p>
        <ul>
          <li>Up to ₹250 crores for serious violations</li>
          <li>Up to ₹50 crores for other breaches</li>
          <li>Additional penalties for repeat offenses</li>
        </ul>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Conduct privacy impact assessments</li>
          <li>Implement privacy by design</li>
          <li>Appoint a Data Protection Officer</li>
          <li>Maintain data processing records</li>
          <li>Train employees on data protection</li>
          <li>Regular compliance audits</li>
          <li>Use privacy-friendly technologies</li>
          <li>Minimize third-party sharing</li>
        </ul>
        
        <h2>International Considerations</h2>
        <p>If operating globally, consider compliance with:</p>
        <ul>
          <li>GDPR (European Union)</li>
          <li>CCPA (California, USA)</li>
          <li>Other regional laws</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Data protection compliance is an ongoing process, not a one-time task. Build privacy into your product from the start and stay updated with evolving regulations.</p>
        
        <p><strong>Need Privacy Law Guidance?</strong> Our technology law experts can help you build compliant products and navigate data protection requirements. Schedule a consultation!</p>
      `,
    },
    6: {
      id: 6,
      title: "Employment Law Basics for Growing Companies",
      excerpt:
        "Essential employment law knowledge for companies hiring their first employees and scaling teams.",
      category: "business-law",
      author: "Adv. Sneha Gupta",
      authorBio: "Employment Law Specialist with expertise in HR compliance",
      date: "2024-02-28",
      readTime: "6 min read",
      image: "/academy-employment-law.jpg",
      content: `
        <h2>Introduction</h2>
        <p>As your startup grows, hiring employees comes with legal responsibilities. Understanding employment law basics is crucial to avoid disputes, penalties, and litigation.</p>
        
        <h2>Types of Employment</h2>
        <h3>Full-Time Employees</h3>
        <p>Regular employees with fixed working hours and benefits.</p>
        
        <h3>Part-Time Employees</h3>
        <p>Work fewer hours than full-time with proportional benefits.</p>
        
        <h3>Contractual Employees</h3>
        <p>Hired for specific projects or fixed duration.</p>
        
        <h3>Interns</h3>
        <p>Training-based engagement, may be paid or unpaid.</p>
        
        <h3>Consultants/Freelancers</h3>
        <p>Independent contractors, not employees under law.</p>
        
        <h2>Essential Documents</h2>
        <h3>Offer Letter</h3>
        <p>Should include:</p>
        <ul>
          <li>Job title and description</li>
          <li>Compensation details</li>
          <li>Joining date</li>
          <li>Reporting structure</li>
          <li>Conditional terms</li>
        </ul>
        
        <h3>Employment Agreement</h3>
        <p>Comprehensive contract covering:</p>
        <ul>
          <li>Roles and responsibilities</li>
          <li>Compensation and benefits</li>
          <li>Working hours</li>
          <li>Leave policy</li>
          <li>Confidentiality obligations</li>
          <li>Non-compete clauses</li>
          <li>Termination provisions</li>
          <li>Dispute resolution</li>
        </ul>
        
        <h3>Non-Disclosure Agreement (NDA)</h3>
        <p>Protects confidential business information.</p>
        
        <h3>Non-Compete Agreement</h3>
        <p>Restricts employee from joining competitors (must be reasonable).</p>
        
        <h2>Statutory Compliance</h2>
        <h3>PF (Provident Fund)</h3>
        <p>Mandatory for establishments with 20+ employees:</p>
        <ul>
          <li>Employee contribution: 12% of basic salary</li>
          <li>Employer contribution: 12% of basic salary</li>
          <li>Registration with EPFO required</li>
        </ul>
        
        <h3>ESI (Employee State Insurance)</h3>
        <p>Mandatory for establishments with 10+ employees earning up to ₹21,000/month:</p>
        <ul>
          <li>Employee contribution: 0.75% of wages</li>
          <li>Employer contribution: 3.25% of wages</li>
        </ul>
        
        <h3>Professional Tax</h3>
        <p>State-level tax on salaried individuals (varies by state).</p>
        
        <h3>Shop and Establishment Act</h3>
        <p>Registration within 30 days of starting operations.</p>
        
        <h2>Leave Entitlements</h2>
        <h3>Earned Leave</h3>
        <p>Minimum 1 day per 20 days worked under Factories Act.</p>
        
        <h3>Casual Leave</h3>
        <p>Typically 7-12 days per year (company policy).</p>
        
        <h3>Sick Leave</h3>
        <p>Usually 7-12 days per year (company policy).</p>
        
        <h3>Maternity Leave</h3>
        <p>26 weeks for first two children, 12 weeks for subsequent (under Maternity Benefit Act).</p>
        
        <h3>Paternity Leave</h3>
        <p>Not mandatory by law, but many companies offer 5-15 days.</p>
        
        <h2>Termination and Severance</h2>
        <h3>Notice Period</h3>
        <p>Typical notice periods:</p>
        <ul>
          <li>Junior roles: 1 month</li>
          <li>Senior roles: 2-3 months</li>
          <li>Must be specified in employment contract</li>
        </ul>
        
        <h3>Severance Pay</h3>
        <p>Under Industrial Disputes Act:</p>
        <ul>
          <li>15 days' wages for each completed year of service</li>
          <li>Applies to retrenchment of workmen</li>
        </ul>
        
        <h3>Full and Final Settlement</h3>
        <p>Must include:</p>
        <ul>
          <li>Unpaid salary</li>
          <li>Unused leave encashment</li>
          <li>Gratuity (if applicable)</li>
          <li>Bonus (if applicable)</li>
          <li>Reimbursements</li>
        </ul>
        
        <h2>Workplace Policies</h2>
        <h3>Prevention of Sexual Harassment (POSH)</h3>
        <p>Mandatory for all organizations:</p>
        <ul>
          <li>Form Internal Complaints Committee (10+ employees)</li>
          <li>Display policy prominently</li>
          <li>Conduct awareness programs</li>
          <li>Submit annual reports</li>
        </ul>
        
        <h3>Code of Conduct</h3>
        <p>Guidelines for professional behavior and ethics.</p>
        
        <h3>Work from Home Policy</h3>
        <p>Increasingly important post-pandemic.</p>
        
        <h2>Common Mistakes to Avoid</h2>
        <ul>
          <li>Misclassifying employees as consultants</li>
          <li>Not providing written contracts</li>
          <li>Ignoring statutory compliance</li>
          <li>Unclear termination procedures</li>
          <li>Not implementing POSH committee</li>
          <li>Delayed salary payments</li>
          <li>Improper full and final settlements</li>
        </ul>
        
        <h2>Best Practices</h2>
        <ul>
          <li>Maintain detailed employment records</li>
          <li>Use HR management software</li>
          <li>Regular compliance audits</li>
          <li>Clear employee handbook</li>
          <li>Regular communication of policies</li>
          <li>Proper onboarding and offboarding</li>
          <li>Document all warnings and actions</li>
        </ul>
        
        <h2>Dispute Resolution</h2>
        <p>Address disputes through:</p>
        <ul>
          <li>Internal grievance mechanism</li>
          <li>Mediation</li>
          <li>Arbitration (if specified in contract)</li>
          <li>Labor courts (as last resort)</li>
        </ul>
        
        <h2>Conclusion</h2>
        <p>Employment law compliance protects both the company and employees. Set up proper systems and policies from the beginning to avoid costly disputes.</p>
        
        <p><strong>Need Employment Law Support?</strong> Our HR law specialists can help you create compliant employment contracts and policies. Get in touch today!</p>
      `,
    },
    // Constitutional Law Articles (IDs 7-10 for backwards compatibility)
    7: {
      id: 7,
      title:
        "Understanding Your Rights Under Article 21 of Indian Constitution",
      excerpt:
        "A comprehensive guide to fundamental rights and personal liberty under Indian law.",
      category: "constitutional",
      author: "Adv. Priya Sharma",
      authorBio:
        "Senior Advocate at Supreme Court of India with 15+ years experience in Constitutional Law",
      date: "2024-01-15",
      readTime: "8 min read",
      image: "/article-constitution.png",
      content: `
        <h2>Introduction to Article 21</h2>
        <p>Article 21 of the Indian Constitution is one of the most fundamental and widely interpreted provisions in Indian jurisprudence. It states: "No person shall be deprived of his life or personal liberty except according to procedure established by law."</p>
        
        <h2>Historical Context</h2>
        <p>The framers of the Indian Constitution drew inspiration from various sources while drafting Article 21. The provision has its roots in the Fifth and Fourteenth Amendments of the US Constitution, which guarantee due process of law.</p>
        
        <h2>Key Components</h2>
        <h3>Right to Life</h3>
        <p>The Supreme Court has interpreted the "right to life" under Article 21 to include not merely the right to exist, but the right to live with human dignity. This encompasses:</p>
        <ul>
          <li>Right to livelihood</li>
          <li>Right to health</li>
          <li>Right to clean environment</li>
          <li>Right to education</li>
          <li>Right to privacy</li>
        </ul>
        
        <h3>Personal Liberty</h3>
        <p>Personal liberty under Article 21 includes various freedoms such as:</p>
        <ul>
          <li>Freedom of movement</li>
          <li>Freedom from arbitrary detention</li>
          <li>Right to fair trial</li>
          <li>Right against solitary confinement</li>
        </ul>
        
        <h2>Landmark Cases</h2>
        <h3>Maneka Gandhi v. Union of India (1978)</h3>
        <p>This landmark case expanded the scope of Article 21 significantly. The Supreme Court held that the procedure established by law must be just, fair, and reasonable.</p>
        
        <h2>Conclusion</h2>
        <p>Article 21 continues to evolve through judicial interpretation, adapting to contemporary challenges while maintaining its core principle of protecting life and liberty.</p>
      `,
    },
  };

  // Get article based on ID, fallback to article 1 if not found
  const article = articlesDatabase[parseInt(id)] || articlesDatabase[1];

  // Get related articles (exclude current article)
  const relatedArticles = Object.values(articlesDatabase)
    .filter((art) => art.id !== parseInt(id))
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <Header />

      {/* Article Header - Enhanced */}
      <section className="navbar-spacing-simple pb-12 bg-gradient-to-br from-gray-900 via-blue-900/20 to-gray-900 text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom pt-20 relative z-10">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button - Enhanced */}
            <button
              onClick={() => navigate("/academy")}
              className="group flex items-center space-x-2 text-yellow-400 hover:text-yellow-300 mb-8 transition-all duration-300 hover:translate-x-[-4px]"
            >
              <i className="fas fa-arrow-left group-hover:animate-pulse"></i>
              <span className="font-medium">Back to Academy</span>
            </button>

            {/* Category Badge - Enhanced */}
            <div className="inline-flex items-center bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-yellow-500/40 backdrop-blur-sm shadow-lg">
              <i className="fas fa-bookmark mr-2"></i>
              {article.category.charAt(0).toUpperCase() +
                article.category.slice(1).replace("-", " ")}{" "}
            </div>

            {/* Title - Enhanced */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 leading-tight tracking-tight">
              {article.title}
            </h1>

            {/* Author & Meta Info - Enhanced */}
            <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-6 sm:gap-8 mb-8">
              <div className="flex items-center space-x-4 bg-white/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl flex-shrink-0">
                  <i className="fas fa-user-tie text-white text-lg"></i>
                </div>
                <div className="min-w-0">
                  <div className="font-bold text-white text-lg">
                    {article.author}
                  </div>
                  <div className="text-sm text-gray-300 line-clamp-1">
                    {article.authorBio}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-6 text-sm text-gray-300">
                <span className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <i className="fas fa-calendar-alt mr-2 text-yellow-400"></i>
                  {new Date(article.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                <span className="flex items-center bg-white/5 backdrop-blur-sm px-4 py-2 rounded-xl border border-white/10">
                  <i className="fas fa-clock mr-2 text-yellow-400"></i>
                  {article.readTime}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Hero Image - Enhanced */}
      <section className="py-8 sm:py-12 bg-gradient-to-b from-gray-800 to-gray-900">
        <div className="container-custom">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative h-64 sm:h-80 md:h-96 lg:h-[32rem] bg-gradient-to-br from-blue-900 via-gray-800 to-gray-900 rounded-3xl flex items-center justify-center border-2 border-yellow-500/20 shadow-2xl overflow-hidden group">
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500/10 via-orange-500/10 to-yellow-500/10 animate-pulse"></div>
              
              {/* Icon and text */}
              <div className="relative text-center text-yellow-400 px-6 z-10">
                <div className="relative inline-block">
                  <i className="fas fa-balance-scale text-6xl sm:text-7xl md:text-8xl lg:text-9xl mb-6 drop-shadow-2xl group-hover:scale-110 transition-transform duration-500"></i>
                  <div className="absolute inset-0 bg-yellow-500/20 blur-3xl animate-pulse"></div>
                </div>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-white line-clamp-2 mb-3 drop-shadow-lg">
                  {article.title}
                </p>
                <div className="inline-flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full border border-white/20">
                  <i className="fas fa-image mr-2 text-sm"></i>
                  <span className="text-xs sm:text-sm opacity-90">Featured Article</span>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-4 left-4 w-20 h-20 bg-yellow-500/10 rounded-full blur-xl"></div>
              <div className="absolute bottom-4 right-4 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Article Content - Enhanced */}
      <section className="py-8 sm:py-12 lg:py-16 bg-gradient-to-b from-gray-900 to-gray-800">
        <div className="container-custom">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12">
              {/* Main Content */}
              <div className="lg:col-span-8">
                <article className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 shadow-2xl border border-gray-100">
                  {/* Reading Progress Bar */}
                  <div className="sticky top-0 -mt-6 sm:-mt-8 lg:-mt-12 -mx-6 sm:-mx-8 lg:-mx-12 mb-8 h-1 bg-gray-100 rounded-t-3xl overflow-hidden z-50">
                    <div className="h-full bg-gradient-to-r from-yellow-500 to-orange-500 w-0 transition-all duration-300" id="reading-progress"></div>
                  </div>

                  <div
                    className="prose prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none 
                    prose-headings:text-gray-900 prose-headings:font-bold prose-headings:tracking-tight
                    prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b-2 prose-h2:border-yellow-500/20
                    prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-4 prose-h3:text-gray-800
                    prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                    prose-li:text-gray-700 prose-li:leading-relaxed prose-li:my-2
                    prose-strong:text-gray-900 prose-strong:font-semibold
                    prose-a:text-yellow-600 prose-a:no-underline hover:prose-a:text-yellow-700 hover:prose-a:underline
                    prose-ul:my-6 prose-ol:my-6
                    prose-blockquote:border-l-4 prose-blockquote:border-yellow-500 prose-blockquote:bg-yellow-50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:italic
                    prose-code:text-yellow-700 prose-code:bg-yellow-50 prose-code:px-2 prose-code:py-1 prose-code:rounded
                    prose-table:border-collapse prose-table:w-full
                    prose-th:bg-gray-100 prose-th:p-3 prose-th:text-left prose-th:font-semibold
                    prose-td:border prose-td:border-gray-200 prose-td:p-3"
                    dangerouslySetInnerHTML={{ __html: article.content }}
                  />
                </article>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row gap-4">
                  <button className="flex-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105">
                    <i className="fas fa-calendar-check mr-2"></i>
                    Book a Consultation
                  </button>
                  <button className="flex-1 bg-white text-gray-900 font-semibold px-8 py-4 rounded-xl border-2 border-gray-200 hover:border-yellow-500 hover:shadow-lg transition-all duration-300">
                    <i className="fas fa-download mr-2"></i>
                    Download PDF
                  </button>
                </div>

                {/* Share Section - Enhanced */}
                <div className="mt-8 bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 shadow-lg border border-gray-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 mb-1">
                        Share this article
                      </h3>
                      <p className="text-sm text-gray-600">
                        Help others learn about {article.category.replace("-", " ")}
                      </p>
                    </div>
                    <i className="fas fa-share-alt text-3xl text-yellow-500"></i>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    <button className="flex items-center justify-center space-x-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 hover:scale-105 shadow-md">
                      <i className="fab fa-facebook-f"></i>
                      <span className="text-sm font-medium">Facebook</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-blue-400 text-white px-4 py-3 rounded-xl hover:bg-blue-500 transition-all duration-300 hover:scale-105 shadow-md">
                      <i className="fab fa-twitter"></i>
                      <span className="text-sm font-medium">Twitter</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-blue-700 text-white px-4 py-3 rounded-xl hover:bg-blue-800 transition-all duration-300 hover:scale-105 shadow-md">
                      <i className="fab fa-linkedin-in"></i>
                      <span className="text-sm font-medium">LinkedIn</span>
                    </button>
                    <button className="flex items-center justify-center space-x-2 bg-green-500 text-white px-4 py-3 rounded-xl hover:bg-green-600 transition-all duration-300 hover:scale-105 shadow-md">
                      <i className="fab fa-whatsapp"></i>
                      <span className="text-sm font-medium">WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Sidebar - Enhanced */}
              <div className="lg:col-span-4 order-first lg:order-last">
                <div className="lg:sticky lg:top-24 space-y-6">
                  {/* Quick Actions Card */}
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-3xl p-6 shadow-2xl text-white">
                    <div className="flex items-center mb-4">
                      <i className="fas fa-rocket text-3xl mr-3"></i>
                      <h3 className="text-xl font-bold">Need Legal Help?</h3>
                    </div>
                    <p className="text-white/90 text-sm mb-6 leading-relaxed">
                      Get expert guidance from our experienced legal professionals
                    </p>
                    <button 
                      onClick={() => navigate("/search-lawyers")}
                      className="w-full bg-white text-gray-900 font-semibold px-6 py-3 rounded-xl hover:bg-gray-100 transition-all duration-300 hover:scale-105 shadow-lg"
                    >
                      <i className="fas fa-phone-alt mr-2"></i>
                      Contact Expert
                    </button>
                  </div>

                  {/* Author Info - Enhanced */}
                  <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                    <div className="text-center">
                      <div className="relative inline-block mb-4">
                        <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mx-auto shadow-xl rotate-3 hover:rotate-0 transition-transform duration-300">
                          <i className="fas fa-user-tie text-white text-2xl"></i>
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white flex items-center justify-center">
                          <i className="fas fa-check text-white text-xs"></i>
                        </div>
                      </div>
                      <h4 className="font-bold text-gray-900 mb-1 text-lg">
                        {article.author}
                      </h4>
                      <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                        {article.authorBio}
                      </p>
                      <div className="flex items-center justify-center gap-2 mb-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <i className="fas fa-star text-yellow-500 mr-1"></i>
                          4.9 Rating
                        </span>
                        <span>•</span>
                        <span>500+ Articles</span>
                      </div>
                      <button className="w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white font-semibold px-6 py-3 rounded-xl hover:shadow-lg transition-all duration-300 hover:scale-105">
                        <i className="fas fa-user-circle mr-2"></i>
                        View Profile
                      </button>
                    </div>
                  </div>

                  {/* Table of Contents - Enhanced */}
                  {/* <div className="bg-white rounded-3xl p-6 shadow-xl border border-gray-100">
                    <div className="flex items-center mb-5">
                      <i className="fas fa-list-ul text-yellow-500 text-lg mr-3"></i>
                      <h3 className="text-lg font-bold text-gray-900">
                        In This Article
                      </h3>
                    </div>
                    <nav className="space-y-1">
                      {["Introduction", "Key Benefits", "Process", "Requirements", "Timeline & Costs", "Conclusion"].map((item, index) => (
                        <a
                          key={index}
                          href={`#${item.toLowerCase().replace(/ /g, '-')}`}
                          className="group flex items-center text-gray-600 hover:text-yellow-600 transition-all duration-300 py-2 px-3 rounded-lg hover:bg-yellow-50"
                        >
                          <span className="w-6 h-6 rounded-full bg-gray-100 group-hover:bg-yellow-500 group-hover:text-white flex items-center justify-center text-xs font-medium mr-3 transition-all duration-300">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{item}</span>
                          <i className="fas fa-chevron-right ml-auto text-xs opacity-0 group-hover:opacity-100 transition-opacity"></i>
                        </a>
                      ))}
                    </nav>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Related Articles - Enhanced */}
      <section className="py-16 sm:py-20 bg-gradient-to-br from-gray-800 via-blue-900/10 to-gray-800 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center bg-yellow-500/20 text-yellow-400 px-4 py-2 rounded-full text-sm font-semibold mb-4 border border-yellow-500/40">
                <i className="fas fa-bookmark mr-2"></i>
                Keep Reading
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Related <span className="text-yellow-400">Articles</span>
              </h2>
              <p className="text-gray-300 text-lg max-w-2xl mx-auto">
                Continue your learning journey with these hand-picked articles
              </p>
            </div>

            {/* Articles Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {relatedArticles.map((relatedArticle, index) => (
                <div
                  key={relatedArticle.id}
                  onClick={() => navigate(`/articles/${relatedArticle.id}`)}
                  className="group bg-white rounded-3xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.3)] transition-all duration-500 cursor-pointer overflow-hidden transform hover:-translate-y-2 border border-gray-100"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {/* Header with gradient */}
                  <div className="h-2 bg-gradient-to-r from-yellow-500 via-orange-500 to-yellow-500"></div>
                  
                  <div className="p-6">
                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-4">
                      <span className="inline-flex items-center bg-gradient-to-r from-yellow-100 to-orange-100 text-yellow-700 px-3 py-1 rounded-full text-xs font-semibold border border-yellow-200">
                        <i className="fas fa-tag mr-1 text-[10px]"></i>
                        {relatedArticle.category.replace("-", " ")}
                      </span>
                      <span className="text-xs text-gray-500 flex items-center">
                        <i className="fas fa-clock mr-1"></i>
                        {relatedArticle.readTime}
                      </span>
                    </div>

                    {/* Icon */}
                    <div className="w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg">
                      <i className="fas fa-file-alt text-white text-xl"></i>
                    </div>

                    {/* Title */}
                    <h3 className="font-bold text-gray-900 mb-3 group-hover:text-yellow-600 transition-colors text-lg leading-tight line-clamp-2 min-h-[3.5rem]">
                      {relatedArticle.title}
                    </h3>

                    {/* Excerpt */}
                    <p className="text-sm text-gray-600 mb-4 line-clamp-2 leading-relaxed">
                      {relatedArticle.excerpt}
                    </p>

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-xs text-gray-500 font-medium">
                        By {relatedArticle.author.split(" ")[1]}
                      </span>
                      <div className="flex items-center text-yellow-600 font-semibold text-sm group-hover:translate-x-2 transition-transform duration-300">
                        Read Article
                        <i className="fas fa-arrow-right ml-2 text-xs"></i>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View All Button */}
            <div className="text-center mt-12">
              <button
                onClick={() => navigate("/academy")}
                className="inline-flex items-center bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold px-8 py-4 rounded-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
              >
                <i className="fas fa-th-large mr-2"></i>
                View All Articles
                <i className="fas fa-arrow-right ml-2"></i>
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ArticleDetail;
