import React from 'react';
import Header from "../components/landing/Header";
import Footer from "../components/landing/Footer";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
  <div className="container-custom py-12 px-4 sm:px-6 lg:px-8 my-24">
        <div className="max-w-5xl mx-auto bg-white shadow-md rounded-lg p-8 lg:p-12">
          <h1 className="text-4xl font-serif font-bold text-gray-900 mb-4 text-center">Privacy Policy</h1>
          <div className="w-24 h-1 mx-auto mb-8 bg-primary-600"></div>
          
          <div className="prose prose-lg max-w-none font-sans text-gray-700 space-y-6">
            {/* Introduction */}
            <section>
              <p className="text-lg leading-relaxed mb-4">
                This Privacy Policy describes how Kanoonwise LLP ("we", "our", or "us") collects, uses, and shares your personal information when you use our website kanoonwise.com ("the Platform").
              </p>
              <p className="leading-relaxed mb-4">
                Please read this policy carefully to understand our views and practices regarding your personal data and how we will treat it.
              </p>
              <p className="leading-relaxed mb-4">
                By accessing or using our services, you agree to the collection and use of information in accordance with this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access the site.
              </p>
            </section>

            {/* Scope */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">SCOPE OF THE PRIVACY POLICY</h2>
              <p className="leading-relaxed mb-4">
                This Privacy Policy applies to all personal information processed by kanoonwise.com across the globe, in compliance with global privacy laws including, but not limited to:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li>General Data Protection Regulation (GDPR) for users in the European Union</li>
                <li>California Consumer Privacy Act (CCPA) for users in California, USA</li>
                <li>Personal Information Protection and Electronic Documents Act (PIPEDA) for users in Canada</li>
                <li>Privacy Act 1988 for users in Australia</li>
                <li>Lei Geral de Proteção de Dados (LGPD) for users in Brazil</li>
                <li>Protection of Personal Information Act (POPIA) for users in South Africa</li>
                <li>Data Protection Act 2018 for users in the United Kingdom</li>
                <li>The Indian Information Technology Act, 2000 and rules for users in India</li>
                <li>The Personal Data Protection Act (PDPA) for users in Singapore and Malaysia</li>
                <li>Personal Information Protection and Electronic Documents Act (PIPEDA) in Canada</li>
                <li>Other relevant national, federal, state, and local laws as applicable</li>
              </ol>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">INFORMATION WE COLLECT</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">a) Personal Data</h3>
              <p className="leading-relaxed mb-4">
                We may collect and process the following types of personal data about you:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Identity Data:</strong> Name, username or similar identifier, marital status, title, date of birth, and gender.</li>
                <li><strong>Contact Data:</strong> Billing address, delivery address, email address, and telephone numbers.</li>
                <li><strong>Financial Data:</strong> Bank account and payment card details.</li>
                <li><strong>Transaction Data:</strong> Details about payments to and from you and other details of products and services you have purchased from us.</li>
                <li><strong>Technical Data:</strong> Internet protocol (IP) address, your login data, browser type and version, time zone setting and location, browser plug-in types and versions, operating system and platform, and other technology on the devices you use to access this website.</li>
                <li><strong>Profile Data:</strong> Your username and password, purchases or orders made by you, your interests, preferences, feedback, and survey responses.</li>
                <li><strong>Usage Data:</strong> Information about how you use our website, products, and services.</li>
                <li><strong>Marketing and Communications Data:</strong> Your preferences in receiving marketing from us and your communication preferences.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">b) Sensitive Personal Data</h3>
              <p className="leading-relaxed mb-4">
                In some cases, we may collect sensitive personal data, such as racial or ethnic origin, political opinions, religious beliefs, or health information, but only when absolutely necessary and in accordance with applicable laws.
              </p>
            </section>

            {/* How We Collect Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">HOW WE COLLECT INFORMATION</h2>
              <p className="leading-relaxed mb-4">
                We collect data using the following methods:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Direct Interactions:</strong> You may give us your Identity, Contact, and Financial Data by filling in forms or by corresponding with us by post, phone, email, or otherwise.</li>
                <li><strong>Automated Technologies or Interactions:</strong> As you interact with our website, we may automatically collect Technical Data about your equipment, browsing actions, and patterns.</li>
                <li><strong>Third Parties or Publicly Available Sources:</strong> We may receive personal data about you from various third parties and public sources.</li>
              </ol>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">HOW WE USE YOUR INFORMATION</h2>
              <p className="leading-relaxed mb-4">
                We will only use your personal data when the law allows us to. Most commonly, we will use your personal data in the following circumstances:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li>To manage and provide our services</li>
                <li>To manage our relationship with you</li>
                <li>To administer and protect our business and this website</li>
                <li>To deliver relevant website content and advertisements to you</li>
                <li>To use data analytics to improve our website, products/services, marketing, customer relationships, and experiences</li>
                <li>To make suggestions and recommendations to you about goods or services that may be of interest to you</li>
              </ol>
            </section>

            {/* Legal Basis */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">LEGAL BASIS FOR PROCESSING PERSONAL DATA</h2>
              <p className="leading-relaxed mb-4">
                We process your personal data on the following legal bases:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose.</li>
                <li><strong>Contract:</strong> Where processing is necessary for the performance of a contract with you.</li>
                <li><strong>Legal Obligation:</strong> Where processing is necessary for compliance with a legal obligation.</li>
                <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate interests or the legitimate interests of a third party.</li>
              </ol>
            </section>

            {/* Sharing Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">SHARING YOUR INFORMATION</h2>
              <p className="leading-relaxed mb-4">
                We may share your data with the following parties:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Service Providers:</strong> Third parties that provide IT and system administration services.</li>
                <li><strong>Professional Advisers:</strong> Including lawyers, bankers, auditors, and insurers.</li>
                <li><strong>Regulatory Authorities:</strong> As required by law or regulation.</li>
                <li><strong>Business Partners:</strong> To offer certain products, services, or promotions.</li>
              </ol>
              <p className="leading-relaxed mb-4">
                We require all third parties to respect the security of your personal data and to treat it in accordance with the law. We do not allow our third-party service providers to use your personal data for their own purposes and only permit them to process your personal data for specified purposes and in accordance with our instructions.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">INTERNATIONAL TRANSFERS</h2>
              <p className="leading-relaxed mb-4">
                Your personal data may be transferred to, and processed in, countries other than the country in which you are resident. These countries may have data protection laws that are different from the laws of your country. We ensure that your personal data is protected by requiring all our group companies to follow the same rules when processing your personal data.
              </p>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">DATA SECURITY</h2>
              <p className="leading-relaxed mb-4">
                We have put in place appropriate security measures to prevent your personal data from being accidentally lost, used, accessed, altered, or disclosed in an unauthorized way. In addition, we limit access to your personal data to those employees, agents, contractors, and other third parties who have a business need to know.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">DATA RETENTION</h2>
              <p className="leading-relaxed mb-4">
                We will only retain your personal data for as long as necessary to fulfill the purposes we collected it for, including for the purposes of satisfying any legal, accounting, or reporting requirements.
              </p>
            </section>

            {/* Indian Law Compliance */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">LAW OF THE LAND: INDIA</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">a) Data Protection Officer (DPO)</h3>
              <p className="leading-relaxed mb-4">
                In compliance with the Indian Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, we have appointed a Data Protection Officer. For any queries related to data protection, please contact us.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">b) Compliance with the Information Technology Act, 2000</h3>
              <p className="leading-relaxed mb-4">
                In compliance with the Information Technology Act, 2000, and its rules, we:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Implement Reasonable Security Practices:</strong> We have implemented security measures in line with ISO/IEC 27001 and other recognized standards to protect your personal data.</li>
                <li><strong>Disclose Information to Government Authorities:</strong> We may be required to disclose personal data to government authorities or as otherwise required by law for compliance with legal obligations.</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">c) Biometric and Aadhar Data Handling</h3>
              <p className="leading-relaxed mb-4">
                If applicable, we handle biometric and Aadhar-related data as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Aadhar Data Protection:</strong> We adhere to the Aadhar Act, 2016, and its regulations, ensuring that Aadhar-related information is securely stored and processed only with appropriate consent.</li>
                <li><strong>Biometric Data:</strong> Biometric data is collected only for necessary purposes, with explicit consent, and protected under stringent security measures.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">d) Cookies and Tracking Technologies</h3>
              <p className="leading-relaxed mb-4">
                We use cookies and similar tracking technologies to collect and use personal data about you, including to serve interest-based advertising. For more information about the types of cookies we use, why, and how you can control cookies, please refer to our Cookie Policy.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">e) Data Breach Notification</h3>
              <p className="leading-relaxed mb-4">
                In the event of a data breach involving your personal data, we will notify you and the relevant authorities in compliance with applicable legal requirements, including prompt notification procedures as outlined under the IT Act and other applicable laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">f) Employee and Contractor Data Privacy</h3>
              <p className="leading-relaxed mb-4">
                We also ensure data protection for our employees and contractors:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Internal Data Security:</strong> We maintain policies and practices that protect the personal data of our employees and contractors, including adherence to confidentiality obligations and privacy training.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">g) Third-Party Data Sharing and Transfer</h3>
              <p className="leading-relaxed mb-4">
                We engage third-party service providers to perform functions on our behalf and may share your data with them:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Vendor Agreements:</strong> All third-party service providers are required to adhere to privacy and data protection standards equivalent to ours.</li>
                <li><strong>Cross-Border Data Transfers:</strong> We ensure that international data transfers comply with applicable data protection laws and that adequate safeguards, such as standard contractual clauses, are in place.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">h) Sensitive Personal Data and Information</h3>
              <p className="leading-relaxed mb-4">
                Under the Information Technology Act, 2000, and the Rules thereunder, sensitive personal data or information (SPDI) includes:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li>Passwords</li>
                <li>Financial information such as bank account or credit card details</li>
                <li>Physical, physiological, and mental health conditions</li>
                <li>Sexual orientation</li>
                <li>Medical records and history</li>
                <li>Biometric information</li>
                <li>Any detail relating to the above categories as provided to us for providing service</li>
              </ul>
              <p className="leading-relaxed mb-4">
                We will handle your SPDI with the highest level of security and will only collect and process it with your explicit consent.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">i) Data Retention and Deletion</h3>
              <p className="leading-relaxed mb-4">
                In accordance with the IT Act and data protection principles, we will retain your personal data only for as long as necessary to fulfill the purposes outlined in this Privacy Policy and in compliance with applicable laws. Upon request, we will take reasonable steps to ensure that your personal data is deleted or anonymized once it is no longer needed.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">j) Consent for Processing Personal Data</h3>
              <p className="leading-relaxed mb-4">
                We seek your explicit consent before processing your personal data, particularly sensitive personal data, and will provide clear information about the purposes for which your data will be used. You have the right to withdraw your consent at any time, and we will ensure that your data is no longer processed following such withdrawal.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">k) Data Localization</h3>
              <p className="leading-relaxed mb-4">
                In compliance with the draft Personal Data Protection Bill, 2019 (if applicable), we may ensure that a copy of your personal data is stored on servers located within India. We will inform you if any data is transferred outside of India and ensure that appropriate safeguards are in place.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">l) Grievance Redressal Mechanism</h3>
              <p className="leading-relaxed mb-4">
                In accordance with the IT Act, we have established a grievance redressal mechanism to address any concerns or complaints related to the processing of personal data. You may raise any grievance with us through the contact details provided above. We will acknowledge receipt of your complaint and take necessary actions to address it in a timely manner.
              </p>
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <p className="font-semibold">Grievance Officer:</p>
                <p><strong>Name:</strong> Sanowar Khan</p>
                <p><strong>Email:</strong> <a href="mailto:grievance@kanoonwise.com" className="text-primary-600 hover:text-primary-700">grievance@kanoonwise.com</a></p>
              </div>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">m) Compliance with State-Specific Regulations</h3>
              <p className="leading-relaxed mb-4">
                We adhere to any additional data protection regulations or guidelines that may be enacted by individual states within India. This includes compliance with any specific requirements set forth by state laws or regulatory authorities relevant to data protection and privacy.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">n) Compliance with the Personal Data Protection Bill, 2019 (PDPB)</h3>
              <p className="leading-relaxed mb-4">
                In anticipation of the Personal Data Protection Bill, 2019, we adhere to its principles as follows:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Data Localization:</strong> We ensure that your personal data is stored on servers located within India and may only transfer data outside India with adequate safeguards in place.</li>
                <li><strong>Consent Management:</strong> We obtain explicit consent for the processing of personal data and provide you with the ability to withdraw consent at any time.</li>
                <li><strong>Data Protection Rights:</strong> You have rights to access, correction, and deletion of your personal data, as well as the right to data portability and to object to processing.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">o) Adherence to the Right to Information Act, 2005 (RTI)</h3>
              <p className="leading-relaxed mb-4">
                We respect the principles of transparency under the Right to Information Act, 2005, and will handle requests for information in accordance with legal requirements. However, personal data that falls under the purview of privacy will be protected and only disclosed if required by law.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">p) National Digital Health Blueprint (NDHB)</h3>
              <p className="leading-relaxed mb-4">
                For users engaging with our digital health services, we adhere to the National Digital Health Blueprint guidelines:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Data Security:</strong> We implement stringent security measures to protect personal health information.</li>
                <li><strong>Consent:</strong> We do not collect any data which would qualify as health data whatsoever. Despite whenever the same is needed and required in furtherance of the services that we intend to provide in future, any update in this regard shall be explicitly informed as a separate update to the users and would seek explicit consent for collecting and processing digital health data.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">q) Compliance with Telecom Regulatory Authority of India (TRAI) Regulations</h3>
              <p className="leading-relaxed mb-4">
                In accordance with TRAI regulations:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Data Handling:</strong> We ensure that any personal data handled in connection with telecom services is managed securely and in compliance with TRAI guidelines.</li>
                <li><strong>User Privacy:</strong> We respect user privacy in communications and data transactions and implement appropriate measures to safeguard this data.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">r) Compliance with the Consumer Protection Act, 2019</h3>
              <p className="leading-relaxed mb-4">
                Under the Consumer Protection Act, 2019:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Consumer Data Protection:</strong> We protect consumer data used in transactions and interactions and ensure that such data is used in a manner that upholds consumer rights.</li>
                <li><strong>Privacy Notices:</strong> We provide clear privacy notices detailing how consumer data is collected, used, and protected.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">s) Adherence to Data Protection Guidelines for Social Media Intermediaries</h3>
              <p className="leading-relaxed mb-4">
                For social media data:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Data Handling:</strong> We follow the guidelines issued by the Ministry of Electronics and Information Technology (MeitY) regarding the handling of user data on social media platforms.</li>
                <li><strong>User Control:</strong> We provide users with control over their data and ensure that social media interactions are managed in accordance with privacy standards.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">t) Compliance with Sectoral Regulations and Frameworks</h3>
              <p className="leading-relaxed mb-4">
                We adhere to sector-specific data protection regulations:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Financial Sector (RBI Guidelines):</strong> We follow guidelines set by the Reserve Bank of India (RBI) for handling financial data, ensuring robust protection and security.</li>
                <li><strong>Securities Sector (SEBI Regulations):</strong> We comply with regulations from the Securities and Exchange Board of India (SEBI) for managing financial market data.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">u) Implementation of Data Privacy and Security Frameworks</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>CERT-IN Guidelines:</strong> We align with the best practices and frameworks provided by the Indian Computer Emergency Response Team (CERT-IN) to ensure the security and protection of your personal data against cyber threats.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">v) Automated Decision-Making and Profiling</h3>
              <p className="leading-relaxed mb-4">
                We may use automated decision-making processes to enhance our services, subject to applicable laws:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Profiling:</strong> Automated profiling may be used to provide personalized services or offers, but it will not produce legal effects concerning you without human intervention.</li>
                <li><strong>User Rights:</strong> You have the right to request human intervention, express your viewpoint, and contest decisions based solely on automated processing.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">w) Direct Marketing Communications</h3>
              <p className="leading-relaxed mb-4">
                We may use your personal data to contact you with newsletters, marketing, or promotional materials that may be of interest to you, in accordance with applicable laws.
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Opt-Out:</strong> You can opt out of receiving marketing communications from us by following the unsubscribe instructions in those messages or by contacting us directly.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">x) Use of Aggregated Data</h3>
              <p className="leading-relaxed mb-4">
                We may use anonymized and aggregated data for purposes such as statistical analysis and business improvement. This data will not identify any individual and is not considered personal data under applicable laws.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">y) Data Purpose Limitation</h3>
              <p className="leading-relaxed mb-4">
                We adhere to the principles of data minimization and purpose limitation by:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Collecting only necessary data:</strong> We only collect data that is necessary for the specified purposes outlined in this policy.</li>
                <li><strong>Limiting use and retention:</strong> We use and retain data only as necessary to fulfill those purposes or as required by law.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">z) Handling User Requests and Complaints</h3>
              <p className="leading-relaxed mb-4">
                We are committed to addressing user requests and complaints regarding personal data:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Response Timeframe:</strong> We aim to respond to all requests and complaints within 30 days.</li>
                <li><strong>Appeal Process:</strong> If you are unsatisfied with our response, you can appeal to our Data Protection Officer or relevant regulatory authorities.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">aa) Compliance with the E-Commerce Rules</h3>
              <p className="leading-relaxed mb-4">
                As per the Consumer Protection (E-Commerce) Rules, 2020, we ensure:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Transparency in Information:</strong> We provide accurate product descriptions, terms of sale, and privacy information to our users.</li>
                <li><strong>Redressal Mechanism:</strong> We have a robust customer grievance redressal mechanism to resolve any issues or disputes efficiently.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">bb) Vendor and Partner Privacy Assurance</h3>
              <p className="leading-relaxed mb-4">
                We require our vendors, partners, and contractors to adhere to privacy and data protection standards:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Vendor Agreements:</strong> We include data protection clauses in our vendor agreements to ensure they maintain data confidentiality and integrity.</li>
                <li><strong>Vendor Audits:</strong> We conduct periodic audits of our vendors and partners to ensure compliance with our data protection policies.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">cc) Compliance with Sector-Specific Guidelines</h3>
              <p className="leading-relaxed mb-4">
                We adhere to any additional data protection guidelines specific to the sectors we operate in, including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Healthcare Data Compliance:</strong> We comply with health sector regulations for handling personal health data.</li>
                <li><strong>Financial Data Compliance:</strong> We follow financial sector guidelines for processing and securing financial data.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">dd) Additional Considerations</h3>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Legal Review:</strong> Regular legal reviews are conducted to ensure the privacy policy is updated in line with any new legislative changes or interpretations.</li>
                <li><strong>Transparency and Accessibility:</strong> We ensure the privacy policy is easily accessible to users and written in clear, understandable language.</li>
                <li><strong>Training and Awareness:</strong> We provide regular training for employees handling personal data to ensure awareness and adherence to privacy policies and practices.</li>
                <li><strong>Documentation and Record Keeping:</strong> We maintain comprehensive records of data processing activities to demonstrate compliance with legal obligations.</li>
              </ul>
            </section>

            {/* USA Privacy Laws */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">PRIVACY AND DATA PROTECTION LAWS - USA</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">California Consumer Privacy Act (CCPA)</h3>
              <p className="leading-relaxed mb-4">
                Under the CCPA, California residents have specific rights regarding their personal information:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Right to Know:</strong> You have the right to request that we disclose what personal information we collect, use, disclose, and sell.</li>
                <li><strong>Right to Delete:</strong> You have the right to request the deletion of your personal information that we collect or maintain.</li>
                <li><strong>Right to Opt-Out:</strong> You have the right to opt-out of the sale of your personal information. We do not sell personal information; however, if this changes, we will provide a mechanism for opting out.</li>
                <li><strong>Non-Discrimination:</strong> We will not discriminate against you for exercising your CCPA rights.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Children's Online Privacy Protection Act (COPPA)</h3>
              <p className="leading-relaxed mb-4">
                In compliance with COPPA, we do not knowingly collect personal information from children under 13 without verifiable parental consent. If we learn that we have collected personal information from a child under 13 without parental consent, we will delete such information promptly.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Health Insurance Portability and Accountability Act (HIPAA)</h3>
              <p className="leading-relaxed mb-4">
                We in no case access or collect health-related data for any service we deliver till the date the instant policy was last updated. For any health-related data we process in furtherance of any legal service or compliance in future, we shall comply with HIPAA regulations to ensure the confidentiality, integrity, and security of personal health information (PHI):
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>PHI Handling:</strong> We shall implement administrative, physical, and technical safeguards to protect PHI.</li>
                <li><strong>Breach Notification:</strong> We shall notify affected individuals and the Department of Health and Human Services (HHS) of any breaches of unsecured PHI.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Gramm-Leach-Bliley Act (GLBA)</h3>
              <p className="leading-relaxed mb-4">
                For financial data, we comply with the GLBA, which requires:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Information Security Program:</strong> We have implemented a comprehensive information security program to protect nonpublic personal information (NPI).</li>
                <li><strong>Opt-Out Rights:</strong> Consumers can opt out of certain disclosures of NPI to nonaffiliated third parties.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Electronic Communications Privacy Act (ECPA)</h3>
              <p className="leading-relaxed mb-4">
                We comply with the ECPA by ensuring the privacy of electronic communications:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Interception and Access:</strong> We do not intentionally intercept or access electronic communications without consent unless permitted by law.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Federal Trade Commission Act (FTC ACT)</h3>
              <p className="leading-relaxed mb-4">
                We comply with the FTC Act by ensuring that our privacy practices are transparent and not deceptive or unfair:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Transparency:</strong> We provide clear and concise privacy notices about our data collection and use practices.</li>
                <li><strong>Security Practices:</strong> We implement reasonable security measures to protect personal data.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">California Online Privacy Protection Act (CalOPPA)</h3>
              <p className="leading-relaxed mb-4">
                In compliance with CalOPPA:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Do Not Track Signals:</strong> We do not respond to Do Not Track (DNT) signals. We adhere to the standards set forth in this policy regardless of DNT signals.</li>
                <li><strong>Visible Privacy Policy Link:</strong> We provide a conspicuous link to our privacy policy on our homepage.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">Illinois Biometric Information Privacy Act (BIPA)</h3>
              <p className="leading-relaxed mb-4">
                If applicable, we comply with BIPA regarding biometric data:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Informed Consent:</strong> We obtain explicit consent before collecting or using biometric data.</li>
                <li><strong>Data Retention:</strong> We retain biometric data only as long as necessary and use it solely for the purposes disclosed.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">State-Specific Rights and Notices</h3>
              <p className="leading-relaxed mb-4">
                Residents of certain states may have additional rights and notices related to their personal data, which we will honor as required by law. Please contact us for more information specific to your state.
              </p>
            </section>

            {/* EU GDPR */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">GENERAL DATA PROTECTION REGULATION - EUROPEAN UNION</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">a) Information Purpose</h3>
              <p className="leading-relaxed mb-4">
                We use your personal data for the following purposes:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Performance of Contract:</strong> To process and deliver your order and manage payments, fees, and charges.</li>
                <li><strong>Legal Obligations:</strong> To comply with legal obligations such as tax laws and anti-money laundering regulations.</li>
                <li><strong>Consent:</strong> To send marketing communications and to conduct customer satisfaction surveys.</li>
                <li><strong>Legitimate Interests:</strong> To manage our relationship with you, improve our services, and conduct business operations.</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">b) Information Processing</h3>
              <p className="leading-relaxed mb-4">
                Under GDPR, we rely on the following legal bases to process your personal data:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li><strong>Consent:</strong> You have given clear consent for us to process your personal data for a specific purpose.</li>
                <li><strong>Contract:</strong> Processing is necessary for a contract we have with you, or because you have asked us to take specific steps before entering into a contract.</li>
                <li><strong>Legal Obligation:</strong> Processing is necessary for compliance with a legal obligation to which we are subject.</li>
                <li><strong>Legitimate Interests:</strong> Processing is necessary for our legitimate interests (or those of a third party) provided that these are not overridden by your interests or fundamental rights and freedoms.</li>
              </ol>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">c) Disclosure of Your Information</h3>
              <p className="leading-relaxed mb-4">
                We may share your personal data with the following categories of third parties:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Service Providers:</strong> Companies that provide IT and system administration services.</li>
                <li><strong>Professional Advisers:</strong> Lawyers, bankers, auditors, and insurers who provide consultancy, banking, legal, insurance, and accounting services.</li>
                <li><strong>Regulatory Authorities:</strong> To comply with legal obligations or for the establishment, exercise, or defense of legal claims.</li>
                <li><strong>Business Partners:</strong> For the performance of any contract we enter into with them or you.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">d) Out-Data Transfers</h3>
              <p className="leading-relaxed mb-4">
                We may transfer your personal data outside the European Economic Area (EEA) or your home country. When we do so, we ensure a similar degree of protection is afforded to it by ensuring at least one of the following safeguards is implemented:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Adequacy Decision:</strong> We may transfer your personal data to countries that have been deemed to provide an adequate level of protection for personal data by the European Commission.</li>
                <li><strong>Standard Contractual Clauses:</strong> We may use specific contracts approved by the European Commission which give personal data the same protection it has in Europe.</li>
                <li><strong>Binding Corporate Rules:</strong> We may transfer data within our group of companies under binding corporate rules approved by the European Data Protection Board.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">e) Your Data Protection Rights</h3>
              <p className="leading-relaxed mb-4">
                Under GDPR and other applicable laws, you have rights regarding your personal data, including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-4 ml-4">
                <li><strong>Right to Access:</strong> You have the right to request access to the personal data we hold about you.</li>
                <li><strong>Right to Rectification:</strong> You have the right to request correction of any inaccurate or incomplete data we hold about you.</li>
                <li><strong>Right to Erasure:</strong> You have the right to request the deletion of your personal data where there is no good reason for us to continue processing it.</li>
                <li><strong>Right to Object:</strong> You have the right to object to the processing of your personal data where we are relying on legitimate interests.</li>
                <li><strong>Right to Restriction:</strong> You have the right to request the restriction of processing of your personal data.</li>
                <li><strong>Right to Data Portability:</strong> You have the right to request the transfer of your personal data to you or a third party.</li>
                <li><strong>Right to Withdraw Consent:</strong> If you have given consent to the processing of your personal data, you have the right to withdraw your consent at any time.</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">f) Cookies and Tracking Technologies</h3>
              <p className="leading-relaxed mb-4">
                Our website uses cookies and similar technologies to improve your experience by providing personalized content and ads, analyzing our traffic, and understanding where our visitors are coming from. You can set your browser to refuse all or some browser cookies, or to alert you when websites set or access cookies.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">g) Transparency and User Control</h3>
              <p className="leading-relaxed mb-4">
                We ensure transparency by providing clear, concise, and easily accessible privacy notices and consent mechanisms. Users are empowered to manage their data preferences through account settings and consent dashboards.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">h) Privacy by Design and Default</h3>
              <p className="leading-relaxed mb-4">
                We integrate privacy considerations into the design and development of our products and services. By default, we minimize data collection and processing to the extent necessary for each specific purpose.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">i) Vendor and Partner Data Protection</h3>
              <p className="leading-relaxed mb-4">
                We require our vendors and partners to adhere to strict data protection standards and conduct regular audits to ensure compliance. Data processing agreements are in place to govern the handling of personal data by third parties.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">j) Incident Response and Breach Notification</h3>
              <p className="leading-relaxed mb-4">
                We maintain a robust incident response plan to address data breaches and security incidents promptly. In the event of a breach involving personal data, we will notify affected individuals and regulatory authorities in accordance with legal requirements.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">k) Accountability and Governance</h3>
              <p className="leading-relaxed mb-4">
                We have established a governance framework to ensure accountability and oversight of our data protection practices. This includes regular audits, risk assessments, and the appointment of a Data Protection Officer (DPO) and Chief Information Officer, where required.
              </p>
            </section>

            {/* Your Legal Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">YOUR LEGAL RIGHTS</h2>
              <p className="leading-relaxed mb-4">
                Under certain circumstances, you have rights under data protection laws in relation to your personal data, including the right to:
              </p>
              <ol className="list-decimal list-inside space-y-2 mb-4 ml-4">
                <li>Request access to your personal data</li>
                <li>Request correction of your personal data</li>
                <li>Request erasure of your personal data</li>
                <li>Object to processing of your personal data</li>
                <li>Request restriction of processing your personal data</li>
                <li>Request transfer of your personal data</li>
                <li>Withdraw consent</li>
              </ol>
              <p className="leading-relaxed mb-4">
                If you wish to exercise any of the rights set out above, please contact us at <a href="mailto:info@kanoonwise.com" className="text-primary-600 hover:text-primary-700">info@kanoonwise.com</a>
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">CHILDREN'S PRIVACY</h2>
              <p className="leading-relaxed mb-4">
                Our services are not intended for use by children under the age of 13, and we do not knowingly collect personal data from children under 13. If we become aware that we have collected personal data from children without parental consent, we will take steps to delete such data.
              </p>
            </section>

            {/* Changes to Policy */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">CHANGES TO OUR PRIVACY POLICY</h2>
              <p className="leading-relaxed mb-4">
                We may update this Privacy Policy from time to time in response to changing legal, technical, or business developments. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
              </p>
            </section>

            {/* Commitment Statement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">COMMITMENT TO PRIVACY AND DATA PROTECTION</h2>
              <p className="leading-relaxed mb-4">
                At Kanoonwise, we are dedicated to safeguarding the privacy and personal data of all our users. This Privacy Policy is designed to provide you with a comprehensive understanding of how we handle your information, reflecting our commitment to transparency, security, and compliance with global privacy standards. We recognize that the landscape of data protection is constantly evolving, and we strive to adapt our practices to meet or exceed legal and ethical obligations.
              </p>
            </section>

            {/* Continuous Improvement */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">CONTINUOUS IMPROVEMENT AND ADAPTATION</h2>
              <p className="leading-relaxed mb-4">
                We are committed to continuous improvement in our data protection practices. This includes regular reviews and updates to our policies and procedures to ensure they remain relevant and effective in protecting your personal data. We actively monitor changes in privacy laws and regulations across the world to ensure compliance and to incorporate industry best practices into our operations.
              </p>
            </section>

            {/* Your Role and Rights */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">YOUR ROLE AND RIGHTS</h2>
              <p className="leading-relaxed mb-4">
                We encourage you to familiarize yourself with your privacy rights and to utilize them fully. As a user, you have the right to access, correct, and manage your personal data as outlined in this policy. Your trust is paramount, and we aim to empower you with control over your information while providing a secure and seamless experience.
              </p>
            </section>

            {/* Contact Information */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4 border-b-2 border-primary-200 pb-2">CONTACT AND FEEDBACK</h2>
              <p className="leading-relaxed mb-4">
                We value your feedback and are committed to addressing any questions or concerns you may have regarding our privacy practices. If you wish to exercise your rights or require further clarification on any aspect of this policy, please do not hesitate to contact us. Our Data Protection Officer, Chief Information Officer, and support team are available to assist you with any inquiries.
              </p>
              <div className="bg-primary-50 p-6 rounded-lg mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact Information</h3>
                <p className="mb-2"><strong>Email:</strong> <a href="mailto:info@kanoonwise.com" className="text-primary-600 hover:text-primary-700">info@kanoonwise.com</a></p>
                <p className="mb-2"><strong>Grievance Officer:</strong> Sanowar Khan</p>
                <p><strong>Grievance Email:</strong> <a href="mailto:grievance@kanoonwise.com" className="text-primary-600 hover:text-primary-700">grievance@kanoonwise.com</a></p>
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

export default PrivacyPolicy;