import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

// ============================================
// BOILERPLATE CONFIG - Change these values
// ============================================
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Tempo";
const COMPANY_NAME = "Your Company Name"; // Change this
const CONTACT_EMAIL = "privacy@example.com"; // Change this
const EFFECTIVE_DATE = "January 1, 2026"; // Change this
const JURISDICTION = "State of Delaware, United States"; // Change this

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: `Privacy Policy for ${APP_NAME}. Learn how we collect, use, and protect your personal information.`,
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="mx-auto max-w-3xl px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-footnote text-foreground/60 hover:text-foreground transition-colors"
          >
            <IconArrowLeft className="size-4" />
            Back to home
          </Link>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-3xl px-6 py-12 lg:py-16">
        <div className="mb-12">
          <h1 className="font-large-title font-bold tracking-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 font-body text-foreground/60">
            Last updated: {EFFECTIVE_DATE}
          </p>
        </div>

        <div className="prose prose-neutral dark:prose-invert max-w-none">
          <div className="space-y-8 font-body text-foreground/80 leading-relaxed">
            {/* Introduction */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                1. Introduction
              </h2>
              <p>
                {COMPANY_NAME} ("Company," "we," "us," or "our") respects your
                privacy and is committed to protecting your personal data. This
                Privacy Policy explains how we collect, use, disclose, and
                safeguard your information when you use the {APP_NAME} mobile
                application (the "App").
              </p>
              <p className="mt-4">
                Please read this Privacy Policy carefully. By using the App, you
                consent to the data practices described in this policy.
              </p>
            </section>

            {/* Information We Collect */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                2. Information We Collect
              </h2>

              <h3 className="font-callout font-semibold text-foreground mt-6 mb-3">
                2.1 Information You Provide
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Account Information:</strong> Name, email address,
                  password, and profile information when you create an account
                </li>
                <li>
                  <strong>User Content:</strong> Any content you create, upload,
                  or share through the App
                </li>
                <li>
                  <strong>Communications:</strong> Information you provide when
                  contacting our support team
                </li>
                <li>
                  <strong>Payment Information:</strong> If applicable, payment
                  details processed by our secure payment providers
                </li>
              </ul>

              <h3 className="font-callout font-semibold text-foreground mt-6 mb-3">
                2.2 Information Collected Automatically
              </h3>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Device Information:</strong> Device type, operating
                  system, unique device identifiers
                </li>
                <li>
                  <strong>Usage Data:</strong> App features used, time and
                  duration of usage, interactions with the App
                </li>
                <li>
                  <strong>Log Data:</strong> IP address, browser type, pages
                  viewed, and crash reports
                </li>
                <li>
                  <strong>Location Data:</strong> With your consent, approximate
                  location based on IP address
                </li>
              </ul>
            </section>

            {/* How We Use Your Information */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                3. How We Use Your Information
              </h2>
              <p>We use the information we collect to:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Provide, maintain, and improve the App</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Detect, investigate, and prevent fraudulent transactions</li>
                <li>Personalize and improve your experience</li>
                <li>Send promotional communications (with your consent)</li>
              </ul>
            </section>

            {/* Information Sharing */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                4. Information Sharing
              </h2>
              <p>We may share your information in the following situations:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong>Service Providers:</strong> With third-party vendors
                  who perform services on our behalf (hosting, analytics,
                  payment processing)
                </li>
                <li>
                  <strong>Legal Requirements:</strong> When required by law or to
                  respond to legal process
                </li>
                <li>
                  <strong>Protection of Rights:</strong> To protect our rights,
                  privacy, safety, or property
                </li>
                <li>
                  <strong>Business Transfers:</strong> In connection with a
                  merger, acquisition, or sale of assets
                </li>
                <li>
                  <strong>With Your Consent:</strong> When you have given us
                  permission to share your information
                </li>
              </ul>
            </section>

            {/* Data Security */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                5. Data Security
              </h2>
              <p>
                We implement appropriate technical and organizational measures to
                protect your personal data against unauthorized access,
                alteration, disclosure, or destruction. These measures include:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments and audits</li>
                <li>Access controls and authentication measures</li>
                <li>Employee training on data protection</li>
              </ul>
              <p className="mt-4">
                However, no method of transmission over the Internet is 100%
                secure. While we strive to protect your data, we cannot guarantee
                absolute security.
              </p>
            </section>

            {/* Data Retention */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                6. Data Retention
              </h2>
              <p>
                We retain your personal data only for as long as necessary to
                fulfill the purposes for which it was collected, including to
                satisfy legal, accounting, or reporting requirements.
              </p>
              <p className="mt-4">
                When you delete your account, we will delete or anonymize your
                personal data within 30 days, unless retention is required by law.
              </p>
            </section>

            {/* Your Rights */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                7. Your Rights
              </h2>
              <p>
                Depending on your location, you may have the following rights
                regarding your personal data:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>
                  <strong>Access:</strong> Request a copy of your personal data
                </li>
                <li>
                  <strong>Correction:</strong> Request correction of inaccurate
                  data
                </li>
                <li>
                  <strong>Deletion:</strong> Request deletion of your personal
                  data
                </li>
                <li>
                  <strong>Portability:</strong> Request transfer of your data to
                  another service
                </li>
                <li>
                  <strong>Objection:</strong> Object to processing of your
                  personal data
                </li>
                <li>
                  <strong>Restriction:</strong> Request restriction of processing
                </li>
              </ul>
              <p className="mt-4">
                To exercise these rights, please contact us at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>

            {/* Children's Privacy */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                8. Children's Privacy
              </h2>
              <p>
                The App is not intended for children under 13 years of age. We do
                not knowingly collect personal data from children under 13. If we
                learn we have collected personal data from a child under 13, we
                will delete that information promptly.
              </p>
            </section>

            {/* International Transfers */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                9. International Data Transfers
              </h2>
              <p>
                Your information may be transferred to and processed in countries
                other than your country of residence. These countries may have
                different data protection laws. We ensure appropriate safeguards
                are in place to protect your information in accordance with this
                Privacy Policy.
              </p>
            </section>

            {/* Third-Party Services */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                10. Third-Party Services
              </h2>
              <p>
                The App may contain links to third-party websites or services
                that are not operated by us. We are not responsible for the
                privacy practices of these third parties. We encourage you to
                review the privacy policies of any third-party services you
                access.
              </p>
            </section>

            {/* Changes to This Policy */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                11. Changes to This Privacy Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time. We will
                notify you of any changes by posting the new Privacy Policy on
                this page and updating the "Last updated" date. You are advised
                to review this Privacy Policy periodically.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about this Privacy Policy or our data
                practices, please contact us:
              </p>
              <div className="mt-4 p-4 rounded-lg bg-foreground/5 border border-border">
                <p className="font-callout font-medium">{COMPANY_NAME}</p>
                <p className="mt-2">
                  Email:{" "}
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                  >
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
            </section>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/terms"
            className="font-footnote text-foreground/60 hover:text-foreground transition-colors"
          >
            &larr; Terms of Service
          </Link>
          <Link
            href="/"
            className="font-footnote text-foreground/60 hover:text-foreground transition-colors"
          >
            Back to {APP_NAME} &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
