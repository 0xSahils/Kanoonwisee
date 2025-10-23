import React from 'react';
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container-custom py-12 px-4 sm:px-6 lg:px-8 my-24">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 lg:p-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 text-center">Terms of Service</h1>
          <div className="w-24 h-1 mx-auto mb-8 bg-primary-600"></div>
          
          <div className="prose prose-lg max-w-none font-sans text-gray-700 space-y-6">
            
            {/* Section 1: Preamble */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">1. PREAMBLE, SCOPE, AND BINDING ACCEPTANCE</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.1. Introduction and Scope of Agreement</h3>
              <p className="leading-relaxed mb-4">
                These Terms of Service ("Terms") constitute a legally binding electronic contract under the Information Technology Act, 2000, between you, the user ("You," "Your," or "User"), and Kanoonwise Technologies, LLP (hereinafter referred to as "Kanoonwise," "We," "Us," or "Our"). This document, together with our separately posted Privacy Policy and Disclaimer, and any other policies referenced herein (collectively, the "Agreement"), governs your access to and use of the kanoonwise.com website, its sub-domains, mobile applications, and all related software, content, and services (collectively, "the Platform"). This Agreement supersedes any and all prior oral or written agreements or understandings between you and Kanoonwise.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.2. Unconditional Acceptance</h3>
              <p className="leading-relaxed mb-4">
                Your access to and use of the Platform is expressly conditioned upon your complete and unconditional acceptance of this Agreement. You acknowledge that you have read, understood, and agree to be bound by these Terms. You may signify your acceptance by any of the following actions:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) by clicking "I Agree" or any similar button or checkbox during the registration process or at any other point on the Platform;</li>
                <li>(b) by registering for an account on the Platform; or</li>
                <li>(c) by accessing, browsing, or using any part of the Platform, whether as a registered user or a casual visitor.</li>
              </ul>
              <p className="leading-relaxed mb-4">
                If you do not agree with any part of these Terms, you are expressly prohibited from accessing or using the Platform and must cease all use immediately.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">1.3. Right to Amend</h3>
              <p className="leading-relaxed mb-4">
                Kanoonwise reserves the right, at its sole discretion, to modify, amend, or replace these Terms at any time. We will provide notice of any material changes by posting the updated Terms on the Platform and updating the "Last Updated" date. It is your responsibility to review these Terms periodically for changes. Your continued use of the Platform after the effective date of such changes constitutes your binding acceptance of the amended Terms.
              </p>
            </section>

            {/* Section 2: Definitions */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">2. DEFINITIONS</h2>
              <p className="leading-relaxed mb-4">
                For the purposes of this Agreement, the following terms shall have the meanings ascribed to them below:
              </p>
              <ul className="list-disc list-inside space-y-3 mb-4 ml-4">
                <li>
                  <strong>2.1. "Platform"</strong> shall mean and include the kanoonwise.com website, its sub-domains, mobile applications, and all related software, databases, content, and services owned and operated by Kanoonwise.
                </li>
                <li>
                  <strong>2.2. "Kanoonwise Content"</strong> shall mean all content and materials on the Platform, with the specific exclusion of User Content and Advocate Content. This includes, but is not limited to, the Platform's "look and feel," user interface, text, graphics, logos, images, audio clips, video clips, software, source code, trademarks, service marks, and the arrangement and compilation thereof. All Kanoonwise Content is the exclusive intellectual property of Kanoonwise.
                </li>
                <li>
                  <strong>2.3. "User"</strong> shall mean any person who accesses, browses, or uses the Platform for any purpose, including casual visitors and registered clients seeking legal information or services.
                </li>
                <li>
                  <strong>2.4. "User Content"</strong> shall mean any and all information, data, and content that a User submits, posts, or transmits to the Platform. This includes, but is not limited to, reviews, ratings, comments, questions posted in any public forum, and information submitted through inquiry forms. The User is solely and entirely responsible for their User Content and any legal consequences of posting it.
                </li>
                <li>
                  <strong>2.5. "Advocate"</strong> shall mean a third-party, independent legal professional, enrolled with a Bar Council in India, who has completed the Platform's verification process and has created a professional profile to be listed on the Platform.
                </li>
                <li>
                  <strong>2.6. "Advocate Content"</strong> shall mean any and all information, data, and content that an Advocate submits, posts, or transmits to the Platform. This includes, but is not limited to, information in their professional profile, biographical details, qualifications, areas of specialization, articles submitted to the "Legal Insights" section, and any answers or information provided in a public forum. The Advocate is solely responsible for the accuracy, completeness, and professional compliance of all their Advocate Content.
                </li>
                <li>
                  <strong>2.7. "Services"</strong> shall refer exclusively to the technology services provided by the Platform itself. These services include, but are not limited to, facilitating connections between Users and Advocates, providing practice management software tools for Advocates, offering access to the Platform's database of professionals, and providing the technological functionality for the fulfillment of Packaged Services. For the avoidance of doubt, the "Services" provided by Kanoonwise do not include the provision of legal advice, legal representation, or any act constituting the "practice of law," which are services provided exclusively by independent Advocates.
                </li>
              </ul>
            </section>

            {/* Section 3: Nature of Platform */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">3. NATURE OF THE PLATFORM & SCOPE OF SERVICES</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.1. General Acknowledgment of Role</h3>
              <p className="leading-relaxed mb-4">
                You, the User, expressly acknowledge, understand, and agree that Kanoonwise is not a law firm or a legal services provider. The Platform is a neutral technology venue designed to facilitate connections and provide informational resources. You agree that your use of the Platform does not create any form of attorney-client relationship between you and Kanoonwise.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.2. Kanoonwise as a Neutral Technology Venue & Intermediary</h3>
              <p className="leading-relaxed mb-4">
                Kanoonwise is solely a technology platform and qualifies as an "intermediary" under the Information Technology Act, 2000. Our role is limited to that of a neutral conduit.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>3.2.1. Not a Referral Service:</strong> Kanoonwise is not a lawyer referral service. We do not endorse, recommend, or channel work to any specific Advocate.</li>
                <li><strong>3.2.2. Objective Search Functionality:</strong> Any search results, rankings, or filtering on the Platform are generated based on objective, computer-generated algorithms using the data provided by the Advocates (e.g., years of experience, specialization, location). They do not represent a qualitative judgment or endorsement by Kanoonwise.</li>
                <li><strong>3.2.3. Arm's Length Relationship:</strong> We are not an agent for any User or Advocate. The Platform facilitates connections, but all subsequent interactions, agreements, and representations are conducted at arm's length directly between the User and the Advocate.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.3. Scope of Permissible Services</h3>
              <p className="leading-relaxed mb-4">
                The services provided by Kanoonwise are strictly limited to:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Providing the technology for Advocates to create and maintain professional profiles.</li>
                <li>(b) Providing search and discovery tools for Users to find and connect with Advocates.</li>
                <li>(c) Offering standardized, procedural, and para-legal support products ("Packaged Services").</li>
                <li>(d) Publishing general legal information for educational purposes through the "Legal Insights" and "Kanoonwise Academy" sections.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.4. The "Kanoonwise Verified™" Process - Limitations & Disclaimer</h3>
              <p className="leading-relaxed mb-4">
                Our verification process is a "Point-in-Time Credential Check" and should not be construed as a continuous endorsement or guarantee.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>3.4.1. What We Verify:</strong> The verification process at the time of an Advocate's onboarding may include checking their Bar Council enrollment number against publicly available records.</li>
                <li><strong>3.4.2. What We DO NOT Guarantee:</strong> We do not and cannot provide a continuous guarantee of an Advocate's good standing, competence, insurance status, or the accuracy of all information they provide in their profile. The "Verified Expert" tag signifies only that the initial check was performed at the time of onboarding.</li>
                <li><strong>3.4.3. User's Responsibility:</strong> The ultimate responsibility for vetting and selecting a suitable Advocate rests solely with the User.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">3.5. Kanoonwise as a Publisher of Third-Party Content</h3>
              <p className="leading-relaxed mb-4">
                As an intermediary, Kanoonwise is a publisher of content provided by third parties (User Content and Advocate Content), not the author of it.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>3.5.1. No Editorial Control over Advice:</strong> We do not have editorial control over, and are not responsible for, the substance of any legal advice communicated between a User and an Advocate.</li>
                <li><strong>3.5.2. No Liability for Third-Party Content:</strong> We do not vet every piece of Advocate Content or User Content for accuracy or completeness and shall not be held liable for any information or opinions expressed therein. We claim "safe harbor" protection as an intermediary under the Information Technology Act, 2000, with respect to all third-party content.</li>
              </ul>
            </section>

            {/* Section 4: Disclaimers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">4. DISCLAIMERS REGARDING LEGAL SERVICES & ATTORNEY-CLIENT RELATIONSHIP</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1. NO ATTORNEY-CLIENT RELATIONSHIP OR PRIVILEGE WITH KANOONWISE</h3>
              <p className="leading-relaxed mb-4">
                You expressly acknowledge, understand, and agree that your use of the Platform does not create an attorney-client relationship, fiduciary duty, or any other form of confidential or privileged relationship between you and Kanoonwise. Kanoonwise is not your advocate. Any information you provide to Kanoonwise directly (not through a direct, privileged communication with an Advocate) is not protected by attorney-client privilege.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2. Advocates are Independent Third-Party Professionals</h3>
              <p className="leading-relaxed mb-4">
                You acknowledge that all Advocates on the Platform are independent third-party professionals. They are not employees, agents, partners, or joint venturers of Kanoonwise. Kanoonwise does not exercise any control or direction over the professional judgment, methods, or advice of any Advocate. Each Advocate is solely responsible for the professional services they provide.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3. COMPREHENSIVE DISCLAIMER OF LIABILITY FOR ADVOCATE SERVICES</h3>
              <p className="leading-relaxed mb-4">
                You agree that Kanoonwise shall not be held liable, under any circumstances, for any and all claims, damages, losses, or liabilities arising from the legal services provided by an independent Advocate connected through the Platform. This disclaimer includes, but is not limited to, any claims of:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Professional negligence, malpractice, or misconduct;</li>
                <li>(b) Fraud, misrepresentation, or unethical conduct;</li>
                <li>(c) Breach of contract or failure to perform services;</li>
                <li>(d) The accuracy, completeness, or timeliness of the advice provided;</li>
                <li>(e) Any other act or omission by the Advocate in their professional capacity.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.4. User's Sole Responsibility for Selection and Engagement</h3>
              <p className="leading-relaxed mb-4">
                The Platform may provide tools and information to help you select an Advocate, but the final selection is your sole responsibility. You are responsible for evaluating the qualifications of, and entering into a direct engagement with, an Advocate. You agree that you engage with any Advocate at your own risk.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.5. DISPUTES BETWEEN USERS AND ADVOCATES</h3>
              <p className="leading-relaxed mb-4">
                Kanoonwise has no obligation, and will not, under any circumstances, be a party to or be required to mediate or resolve any disputes that may arise between a User and an Advocate. Such disputes include, but are not limited to, disagreements over:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Fee arrangements and payments;</li>
                <li>(b) The quality, scope, or timeliness of the services rendered;</li>
                <li>(c) Communication and responsiveness;</li>
                <li>(d) The outcome or result of any legal matter.</li>
              </ul>
              <p className="leading-relaxed mb-4">
                You agree to resolve any such disputes directly with the Advocate, and you hereby release Kanoonwise from any and all claims, demands, and damages arising out of such disputes.
              </p>
            </section>

            {/* Section 5: User Accounts */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">5. USER ACCOUNTS, RESPONSIBILITIES, AND CONTENT</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.1. Account Registration and Security</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>5.1.1. Eligibility:</strong> To register for an account, you must be a human being of at least 18 years of age with the legal capacity to enter into a binding contract. Accounts registered by "bots" or other automated methods are not permitted.</li>
                <li><strong>5.1.2. Accuracy of Information:</strong> You agree to provide true, accurate, current, and complete information about yourself as prompted by the Platform's registration form. You further agree to maintain and promptly update this information to keep it true, accurate, current, and complete.</li>
                <li><strong>5.1.3. Account Security:</strong> You are solely responsible for maintaining the confidentiality of your account password and for all activities that occur under your account. You agree to immediately notify Kanoonwise of any unauthorized use of your password or account or any other breach of security.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.2. User Conduct and Prohibited Activities</h3>
              <p className="leading-relaxed mb-4">
                As a condition of your use of the Platform, you agree not to use it for any purpose that is unlawful or prohibited by these Terms. The following is a non-exhaustive list of prohibited activities:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>5.2.1. Illegal or Harmful Conduct:</strong> Transmitting any content that is unlawful, harassing, defamatory, abusive, threatening, obscene, or otherwise objectionable.</li>
                <li><strong>5.2.2. Fraudulent or Deceptive Conduct:</strong> Impersonating any person or entity, or falsely stating or otherwise misrepresenting your affiliation with a person or entity; or engaging in any form of phishing.</li>
                <li><strong>5.2.3. Infringement of Rights:</strong> Violating the intellectual property rights (copyright, trademark, patent), privacy rights, or any other proprietary rights of any party.</li>
                <li><strong>5.2.4. Platform Integrity Violations:</strong>
                  <ul className="list-disc list-inside space-y-1 ml-6 mt-2">
                    <li>(a) Engaging in data scraping, data mining, or any other form of automated data extraction.</li>
                    <li>(b) Transmitting any viruses, worms, defects, Trojan horses, or any items of a destructive nature.</li>
                    <li>(c) Attempting to reverse-engineer, decompile, or otherwise attempt to discover the source code of the Platform.</li>
                    <li>(d) Interfering with the proper working of the Platform or attempting to bypass any security measures.</li>
                  </ul>
                </li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">5.3. User-Generated Content</h3>
              <p className="leading-relaxed mb-4">
                You are solely responsible for any content you post or submit to the Platform ("User Content").
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>5.3.1. License Grant to Kanoonwise:</strong> By submitting User Content, you grant Kanoonwise a perpetual, irrevocable, worldwide, non-exclusive, royalty-free, and sub-licensable license to use, copy, modify, distribute, publish, and process the content in any and all media without any further consent, notice, and/or compensation to you or others.</li>
                <li><strong>5.3.2. Your Responsibility:</strong> You represent and warrant that you own or have the necessary rights to the User Content you post and that its posting does not violate the privacy rights, publicity rights, copyrights, or any other rights of any person.</li>
                <li><strong>5.3.3. Moderation and Removal:</strong> Kanoonwise has the right, but not the obligation, to monitor, edit, or remove any User Content that, in our sole discretion, violates these Terms or is otherwise deemed objectionable. We are not responsible for any failure or delay in removing such content.</li>
              </ul>
            </section>

            {/* Section 6: Disclaimers of Warranty */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">6. DISCLAIMERS OF WARRANTY & LIMITATION OF LIABILITY</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1. "AS IS" and "AS AVAILABLE" Disclaimer</h3>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
                <p className="leading-relaxed font-semibold">
                  THE PLATFORM AND ALL KANOONWISE CONTENT ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS, WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMISSIBLE BY LAW, KANOONWISE, ITS AFFILIATES, AND ITS LICENSORS DISCLAIM ALL WARRANTIES, EXPRESS OR IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT. KANOONWISE DOES NOT WARRANT THAT THE PLATFORM WILL BE UNINTERRUPTED, SECURE, OR ERROR-FREE, THAT DEFECTS WILL BE CORRECTED, OR THAT THE PLATFORM IS FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2. Disclaimer of Indirect and Consequential Damages</h3>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
                <p className="leading-relaxed mb-4 font-semibold">
                  IN NO EVENT SHALL KANOONWISE, ITS AFFILIATES, DIRECTORS, EMPLOYEES, OR AGENTS BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, EXEMPLARY, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>(a) ANY LOSS OF PROFITS, REVENUES, OR BUSINESS OPPORTUNITIES, WHETHER INCURRED DIRECTLY OR INDIRECTLY;</li>
                  <li>(b) ANY LOSS OF DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES;</li>
                  <li>(c) ANY DAMAGES ARISING FROM YOUR ACCESS TO, USE OF, OR INABILITY TO ACCESS OR USE THE PLATFORM;</li>
                  <li>(d) ANY DAMAGES ARISING FROM ANY CONDUCT OR CONTENT OF ANY THIRD PARTY ON THE PLATFORM, INCLUDING DEFAMATORY, OFFENSIVE, OR ILLEGAL CONDUCT OF OTHER USERS OR ADVOCATES; OR</li>
                  <li>(e) ANY DAMAGES ARISING FROM UNAUTHORIZED ACCESS, USE, OR ALTERATION OF YOUR CONTENT OR INFORMATION.</li>
                </ul>
                <p className="leading-relaxed mt-4 font-semibold">
                  THIS LIMITATION SHALL APPLY REGARDLESS OF THE LEGAL THEORY ASSERTED, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), OR OTHERWISE, AND EVEN IF KANOONWISE HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.3. Monetary Cap on Aggregate Liability</h3>
              <div className="bg-yellow-50 p-4 rounded-lg mb-4 border-l-4 border-yellow-500">
                <p className="leading-relaxed mb-4 font-semibold">
                  NOTWITHSTANDING ANYTHING TO THE CONTRARY CONTAINED HEREIN, IN NO EVENT SHALL THE TOTAL AGGREGATE LIABILITY OF KANOONWISE AND ITS AFFILIATES FOR ANY AND ALL CLAIMS, LOSSES, OR DAMAGES ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR YOUR USE OF THE PLATFORM EXCEED THE LESSER OF:
                </p>
                <ul className="list-disc list-inside space-y-2 ml-4">
                  <li>(a) THE TOTAL AMOUNT OF FEES, IF ANY, PAID BY YOU TO KANOONWISE DURING THE THREE (3) MONTH PERIOD IMMEDIATELY PRECEDING THE EVENT GIVING RISE TO THE CLAIM; OR</li>
                  <li>(b) ONE THOUSAND INDIAN RUPEES (INR 1,000).</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.4. Basis of the Bargain</h3>
              <p className="leading-relaxed mb-4">
                YOU ACKNOWLEDGE AND AGREE THAT THE DISCLAIMERS OF WARRANTY AND THE LIMITATIONS OF LIABILITY SET FORTH IN THESE TERMS REFLECT A REASONABLE AND FAIR ALLOCATION OF RISK BETWEEN YOU AND KANOONWISE AND FORM AN ESSENTIAL BASIS OF THE BARGAIN BETWEEN THE PARTIES. YOU ACKNOWLEDGE THAT KANOONWISE WOULD NOT BE ABLE TO PROVIDE THE PLATFORM TO YOU ON AN ECONOMICALLY FEASIBLE BASIS WITHOUT THESE LIMITATIONS.
              </p>
            </section>

            {/* Section 7: Indemnification */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">7. INDEMNIFICATION</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.1. Agreement to Indemnify</h3>
              <p className="leading-relaxed mb-4">
                You agree to indemnify, defend, and hold harmless Kanoonwise and its affiliates, officers, directors, employees, agents, and licensors from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys' fees and court costs) that such parties may incur.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.2. Scope of Indemnification</h3>
              <p className="leading-relaxed mb-4">
                This indemnification obligation arises from, or is in any way connected with, the following:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Your access to or use of the Platform and its Services;</li>
                <li>(b) Any User Content or Advocate Content you submit, post, or transmit through the Platform, including any claims that such content infringes upon or violates the intellectual property, privacy, or other rights of a third party;</li>
                <li>(c) Your violation or material breach of any term of this Agreement;</li>
                <li>(d) Your violation of any applicable law, rule, or regulation;</li>
                <li>(e) Your engagement with, or any dispute arising between you and, another User or Advocate;</li>
                <li>(f) In the case of an Advocate, any claim of professional malpractice, negligence, misconduct, or any other claim arising from the legal services you provide to a User.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">7.3. Defense Procedure</h3>
              <p className="leading-relaxed mb-4">
                Kanoonwise reserves the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate fully with our defense of these claims. You agree not to settle any matter in which we are named as a defendant without the prior written consent of Kanoonwise. You will be responsible for the payment of all attorneys' fees and costs incurred by Kanoonwise in connection with the defense of any such claim.
              </p>
            </section>

            {/* Section 8: Governing Law */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">8. GOVERNING LAW & DISPUTE RESOLUTION</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.1. Governing Law</h3>
              <p className="leading-relaxed mb-4">
                This Agreement, and any dispute or claim arising out of or in connection with it, shall be governed by and construed in accordance with the laws of the Republic of India, without regard to its conflict of law principles.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.2. Informal Dispute Resolution</h3>
              <p className="leading-relaxed mb-4">
                As a first step, the parties agree to make a good-faith effort to resolve any dispute arising under this Agreement through informal negotiations. The party raising the dispute shall provide written notice to the other party. Within thirty (30) days of such notice, the parties shall meet and attempt to resolve the dispute. If the dispute is not resolved within this period, either party may initiate binding arbitration as set forth below.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.3. Mandatory Binding Arbitration</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>8.3.1. Scope:</strong> Any and all disputes, claims, or controversies arising out of or relating to this Agreement, including the determination of the scope or applicability of this agreement to arbitrate, shall be determined by mandatory and binding arbitration.</li>
                <li><strong>8.3.2. Procedure and Rules:</strong> The arbitration shall be conducted in accordance with the Arbitration and Conciliation Act, 1996, and administered by a sole arbitrator. The parties may agree to conduct the arbitration under the rules of a recognized institution such as the Delhi International Arbitration Centre (DIAC).</li>
                <li><strong>8.3.3. Arbitrator:</strong> The dispute shall be resolved by a sole arbitrator mutually appointed by the parties. If the parties cannot agree on an arbitrator within thirty (30) days of the commencement of arbitration, the arbitrator shall be appointed in accordance with the Arbitration and Conciliation Act, 1996.</li>
                <li><strong>8.3.4. Seat and Language:</strong> The seat, or legal place, of the arbitration shall be New Delhi, India. The language of the arbitral proceedings shall be English.</li>
                <li><strong>8.3.5. Binding Award:</strong> The award rendered by the arbitrator shall be final, binding, and conclusive on both parties, and a judgment thereon may be entered in any court of competent jurisdiction.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.4. Exclusive Jurisdiction for Enforcement</h3>
              <p className="leading-relaxed mb-4">
                You agree that the courts in New Delhi, India, shall have exclusive jurisdiction for the purpose of any interim relief in aid of arbitration or for the enforcement of any arbitral award.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">8.5. Waiver of Class Action and Jury Trial</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>8.5.1. Class Action Waiver:</strong> TO THE FULLEST EXTENT PERMITTED BY LAW, YOU AND KANOONWISE AGREE THAT ALL CLAIMS AGAINST THE OTHER CAN ONLY BE BROUGHT IN YOUR OR ITS INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS ACTION, COLLECTIVE ACTION, OR REPRESENTATIVE PROCEEDING.</li>
                <li><strong>8.5.2. Waiver of Jury Trial:</strong> Each party hereby knowingly, voluntarily, and intentionally waives any right it may have to a trial by jury in respect of any litigation (including but not limited to any claims, counterclaims, cross-claims, or third-party claims) arising out of, under or in connection with this Agreement.</li>
              </ul>
            </section>

            {/* Section 9: Grievance Redressal */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">9. GRIEVANCE REDRESSAL MECHANISM</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.1. Legal Compliance</h3>
              <p className="leading-relaxed mb-4">
                In accordance with the Information Technology Act, 2000, and the rules made thereunder, specifically the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, Kanoonwise has appointed a Grievance Officer to address any complaints or grievances from users of the Platform.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.2. Grievance Officer Details</h3>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="mb-2"><strong>Name:</strong> Sanowar Khan</p>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:grievance@kanoonwise.com" className="text-primary-600 hover:text-primary-700">grievance@kanoonwise.com</a></p>
                <p><strong>Address:</strong> F-155/3 Thokar-6 Saheenbagh, Jasala, Delhi 110025</p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.3. Procedure for Filing a Grievance</h3>
              <p className="leading-relaxed mb-4">
                If you have any complaint or grievance concerning the Platform, its content, another user's conduct, or an alleged breach of these Terms or the law, you must submit your complaint in writing to the Grievance Officer via email. Your email must include:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Your full name, physical address, email address, and contact number.</li>
                <li>(b) A clear and detailed description of your specific grievance.</li>
                <li>(c) Any relevant URLs, screenshots, or other documents that support your grievance.</li>
                <li>(d) A statement that you believe the information in your complaint is accurate and that you are making the complaint in good faith.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">9.4. Acknowledgment and Resolution</h3>
              <p className="leading-relaxed mb-4">
                The Grievance Officer shall acknowledge the receipt of your complaint within twenty-four (24) hours of its receipt. We will endeavor to resolve the grievance and provide a response within a period of fifteen (15) days from the date of its receipt.
              </p>
            </section>

            {/* Section 10: E-Stamping */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">10. E-STAMPING & DOCUMENT FACILITATION SERVICES</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.1. Role of Kanoonwise as a Technology Intermediary</h3>
              <p className="leading-relaxed mb-4">
                You expressly acknowledge and agree that Kanoonwise is a technology platform acting solely as a neutral intermediary and facilitator. Our service connects you with independent, government-authorized vendors ("Vendors") for the purpose of procuring e-stamp papers and related document services.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) <strong>Not a Government Agent:</strong> Kanoonwise is not a government body, an agent of any government body, or an authorized stamp vendor itself. We do not issue or sell e-stamp papers directly.</li>
                <li>(b) <strong>Not a Party to Sale:</strong> The actual sale of the e-stamp paper is a transaction between you and the Vendor. Kanoonwise is not a party to this sale and has no control over the Vendor's operations.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.2. User's Sole Responsibility for Accuracy and Legality</h3>
              <p className="leading-relaxed mb-4">
                The legal and financial responsibility for the information provided rests entirely with you, the User.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) <strong>Accuracy of Information:</strong> You are solely responsible for providing true, accurate, and complete information for the generation of the e-stamp paper, including party names, addresses, consideration amounts, and other required details. Any errors or legal deficiencies in the final document resulting from incorrect user-provided information are your sole responsibility.</li>
                <li>(b) <strong>No Legal Advice:</strong> This service does not constitute legal or financial advice. Kanoonwise does not provide any guidance on the required stamp duty value, the type of stamp paper needed, or the legal requirements of your specific transaction. It is your sole responsibility to consult with a qualified advocate to determine these requirements before placing an order.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.3. Fees, Charges, and Strictly Non-Refundable Policy</h3>
              <p className="leading-relaxed mb-4">
                The total amount payable is comprised of the stamp paper value and our service charge.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) <strong>Platform Service Charge:</strong> For each order, Kanoonwise charges a non-refundable Platform Service Charge (also referred to as a "Convenience Fee"). This fee is for the use of our technology, order processing, and facilitation services with the Vendor.</li>
                <li>(b) <strong>Strictly Non-Refundable:</strong> Once an order is placed, the Platform Service Charge is immediately non-refundable, as our processing costs are incurred instantly. The value of the stamp duty is also non-refundable once the e-stamp paper has been generated by the Vendor with the details you have provided.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.4. Delivery Timelines & Disclaimer of Guarantee</h3>
              <p className="leading-relaxed mb-4">
                We offer different service levels with target delivery times, which are objectives, not guarantees.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) <strong>Service Level Objectives:</strong> Our targets are one (1) business day for Standard Delivery and three (3) hours for Express Delivery (during standard business hours).</li>
                <li>(b) <strong>No Guarantee:</strong> You acknowledge that these timelines are service targets and not legally binding guarantees. Delays may occur due to factors beyond our reasonable control, including but not limited to, government server downtime, Vendor processing backlogs, or technical failures. Kanoonwise shall not be held liable for any damages or losses arising from such delays.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">10.5. Limitation of Liability</h3>
              <p className="leading-relaxed mb-4">
                Kanoonwise's liability is strictly limited to the facilitation service. We shall not be held liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>(a) Any errors, omissions, negligence, or misconduct on the part of the third-party Vendor.</li>
                <li>(b) The legal validity, admissibility in court, or enforceability of any document upon which the procured e-stamp paper is affixed or used.</li>
                <li>(c) Any direct or indirect damages resulting from the use or inability to use the procured e-stamp paper.</li>
                <li>(d) Any issues arising from the delivery or handling of physical stamp papers where applicable.</li>
              </ul>
            </section>

            {/* Section 11: Intellectual Property */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">11. INTELLECTUAL PROPERTY RIGHTS</h2>
              <p className="leading-relaxed mb-4">
                All content and materials available on the Platform, with the specific exclusion of User Content and Advocate Content, constitute "Kanoonwise Content." This includes, but is not limited to, the Kanoonwise name, logo, trademarks, the Platform's "look and feel," user interface, text, graphics, software, and source code. All Kanoonwise Content is the exclusive intellectual property of Kanoonwise Technologies and its licensors and is protected by copyright, trademark, and other intellectual property laws. You agree not to copy, reproduce, modify, distribute, or create derivative works from any Kanoonwise Content without our express prior written consent.
              </p>
            </section>

            {/* Section 12: Termination */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">12. TERMINATION</h2>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>12.1. Termination by User:</strong> You may terminate this Agreement at any time by ceasing all use of the Platform and deleting your account.</li>
                <li><strong>12.2. Termination by Kanoonwise:</strong> We reserve the right, at our sole discretion, to suspend or terminate your account and access to the Platform, without prior notice and for any reason, including but not limited to, a breach of these Terms.</li>
                <li><strong>12.3. Effect of Termination:</strong> Upon termination, all licenses and rights granted to you under these Terms will immediately cease. Provisions of these Terms that by their nature should survive termination shall survive, including, without limitation, ownership provisions, warranty disclaimers, indemnity, and limitations of liability.</li>
              </ul>
            </section>

            {/* Section 13: Assignment */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">13. ASSIGNMENT</h2>
              <p className="leading-relaxed mb-4">
                You may not assign or transfer your rights or obligations under this Agreement without the prior written consent of Kanoonwise. Kanoonwise may assign or transfer its rights and obligations under this Agreement, without restriction, to any affiliate or in connection with a merger, acquisition, or sale of all or substantially all of its assets.
              </p>
            </section>

            {/* Section 14: Entire Agreement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">14. ENTIRE AGREEMENT & NO WAIVER</h2>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>14.1. Entire Agreement:</strong> This Agreement, together with our Privacy Policy and Disclaimer, constitutes the entire agreement between you and Kanoonwise with respect to your use of the Platform and supersedes all prior or contemporaneous communications and proposals, whether electronic, oral, or written.</li>
                <li><strong>14.2. No Waiver:</strong> The failure of Kanoonwise to enforce any right or provision of these Terms will not be deemed a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by Kanoonwise.</li>
              </ul>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">CONTACT INFORMATION</h2>
              <div className="bg-primary-50 p-6 rounded-lg mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">For Questions or Concerns</h3>
                <p className="mb-2"><strong>General Inquiries:</strong> <a href="mailto:info@kanoonwise.com" className="text-primary-600 hover:text-primary-700">info@kanoonwise.com</a></p>
                <p className="mb-2"><strong>Grievance Officer:</strong> Sanowar Khan</p>
                <p className="mb-2"><strong>Grievance Email:</strong> <a href="mailto:grievance@kanoonwise.com" className="text-primary-600 hover:text-primary-700">grievance@kanoonwise.com</a></p>
                <p><strong>Address:</strong> F-155/3 Thokar-6 Saheenbagh, Jasala, Delhi 110025</p>
              </div>
            </section>

            {/* Last Updated */}
            <div className="mt-12 pt-6 border-t border-gray-300">
              <p className="text-sm text-gray-600 text-center">
                Last Updated: October 23, 2025
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsOfService;