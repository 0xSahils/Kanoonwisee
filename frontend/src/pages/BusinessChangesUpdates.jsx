import React from "react";

const BusinessChangesUpdates = () => {

  const handleGetQuote = () => {
    // Redirect to WhatsApp with service details
    const message = encodeURIComponent(
      "Hi! I'm interested in getting a custom quote for Business Changes & Updates services. Could you please provide me with more details?"
    );
    window.open(`https://wa.me/919876543210?text=${message}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Business is Evolving. We'll Keep it Compliant.
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-4xl mx-auto">
              As your business grows and changes, your company's legal structure
              must be updated to reflect it. We handle all event-based filings
              for your Private Limited Company or LLP, ensuring every change is
              seamlessly and compliantly registered with the ROC.
            </p>
            <button
              onClick={handleGetQuote}
              className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Get a Custom Quote for Your Change
            </button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Managing Corporate Changes with Expert Precision
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              "Event-based compliance" refers to the mandatory filings required
              whenever a significant change occurs within your company or LLP.
              These are separate from your routine annual filings. Failing to
              report these events to the Registrar of Companies (ROC) within the
              specified time can lead to significant penalties and legal
              complications. Our expert team ensures every change is documented
              and filed correctly.
            </p>
          </div>
        </div>
      </section>

      {/* Services for Private Limited Companies */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Changes in a Private Limited Company
            </h2>
            <p className="text-lg text-gray-600">
              We provide end-to-end support for the most common changes in a Pvt
              Ltd Company.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Add or Remove a Director
              </h3>
              <p className="text-gray-600">
                We manage the entire process, including drafting resolutions,
                obtaining consent, and filing DIR-12.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Change of Registered Office
              </h3>
              <p className="text-gray-600">
                Whether you're moving within the same city or to a new state, we
                handle all necessary resolutions and filings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Increase in Authorized Capital
              </h3>
              <p className="text-gray-600">
                We manage the process of increasing your company's share
                capital, including drafting resolutions and filing SH-7.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Change in Company Name
              </h3>
              <p className="text-gray-600">
                We handle the name availability check (RUN), drafting of
                resolutions, and filing for name change approval.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Closure of Company (Strike-Off)
              </h3>
              <p className="text-gray-600">
                We assist with the voluntary closure of your private limited
                company through the fast-track exit scheme.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Services for LLPs */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Changes in a Limited Liability Partnership (LLP)
            </h2>
            <p className="text-lg text-gray-600">
              We ensure your LLP's structure remains up-to-date with all
              mandatory filings.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Add or Remove a Designated Partner
              </h3>
              <p className="text-gray-600">
                We manage the drafting of consents, resolutions, and the filing
                of Form 4 to update the partner details.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Change of Registered Office
              </h3>
              <p className="text-gray-600">
                We handle the necessary documentation and filing of Form 15 to
                officially update your LLP's registered address.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Change in LLP Agreement
              </h3>
              <p className="text-gray-600">
                For any changes to capital contribution, profit sharing, or
                business activities, we draft the new agreement and file Form 3.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Change of LLP Name
              </h3>
              <p className="text-gray-600">
                We manage the name reservation process and the filing of Form 5
                for the official change of your LLP's name.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Closure of LLP
              </h3>
              <p className="text-gray-600">
                We assist with the process of striking off the name of your LLP
                from the register when it ceases to operate.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Simple 3-Step Process for Any Business Change
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                1
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Consultation & Quote
              </h3>
              <p className="text-gray-600">
                You tell us about the change you need to make. Our experts will
                assess the requirement and provide you with a clear, fixed-fee
                custom quote and a list of necessary documents.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                2
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Documentation & Drafting
              </h3>
              <p className="text-gray-600">
                Our team drafts all the necessary legal documents, including
                board resolutions, consent letters, and affidavits, and shares
                them with you for digital signature.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                3
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">
                Filing & Confirmation
              </h3>
              <p className="text-gray-600">
                We file the correct forms with the ROC/MCA on your behalf and
                monitor the application until it is approved. You receive the
                official government challans and confirmation documents.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How do I get a price quote for a service?
              </h3>
              <p className="text-gray-600">
                Simply click on the "Get My Custom Quote" button on this page
                and provide us with the details of the change you need. Our
                expert team will review your requirement and send you a
                transparent, fixed-fee quote within a few business hours.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                How quickly do these changes need to be filed?
              </h3>
              <p className="text-gray-600">
                Most changes, like the appointment of a director, must be
                reported to the ROC within 30 days of the event. Our team
                ensures these deadlines are always met to avoid penalties.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Are government fees included in your quote?
              </h3>
              <p className="text-gray-600">
                No, our quote will clearly state our professional fee. Any
                applicable government stamp duty or ROC filing fees will be
                charged separately at actuals for complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Ready to Make a Change?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Let our experts handle the legal formalities so you can focus on
            your business's next chapter.
          </p>
          <button
            onClick={handleGetQuote}
            className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Get My Custom Quote Now
          </button>
        </div>
      </section>
    </div>
  );
};

export default BusinessChangesUpdates;
