import { Metadata } from "next";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

// ============================================
// BOILERPLATE CONFIG - Change these values
// ============================================
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Tempo";
const COMPANY_NAME = "Your Company Name"; // Change this
const CONTACT_EMAIL = "legal@example.com"; // Change this
const EFFECTIVE_DATE = "January 1, 2026"; // Change this
const JURISDICTION = "State of Delaware, United States"; // Change this

export const metadata: Metadata = {
  title: "Terms of Service",
  description: `Terms of Service for ${APP_NAME}. Read our terms and conditions for using our mobile application and services.`,
};

export default function TermsPage() {
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
            Terms of Service
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
                Welcome to {APP_NAME}. These Terms of Service ("Terms") govern your
                access to and use of the {APP_NAME} mobile application and related
                services (collectively, the "Service") provided by {COMPANY_NAME}
                ("Company," "we," "us," or "our").
              </p>
              <p className="mt-4">
                By downloading, installing, or using our Service, you agree to be
                bound by these Terms. If you do not agree to these Terms, do not
                use the Service.
              </p>
            </section>

            {/* Eligibility */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                2. Eligibility
              </h2>
              <p>
                You must be at least 13 years old to use the Service. If you are
                under 18, you represent that you have your parent or guardian's
                permission to use the Service. Please have them read these Terms
                with you.
              </p>
            </section>

            {/* Account Registration */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                3. Account Registration
              </h2>
              <p>
                To access certain features of the Service, you may need to create
                an account. When you create an account, you agree to:
              </p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Provide accurate, current, and complete information</li>
                <li>Maintain and promptly update your account information</li>
                <li>Maintain the security of your password and account</li>
                <li>Accept responsibility for all activities under your account</li>
                <li>Notify us immediately of any unauthorized use</li>
              </ul>
            </section>

            {/* Acceptable Use */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                4. Acceptable Use
              </h2>
              <p>You agree not to:</p>
              <ul className="mt-4 list-disc pl-6 space-y-2">
                <li>Use the Service for any unlawful purpose</li>
                <li>Violate any laws in your jurisdiction</li>
                <li>Infringe upon the rights of others</li>
                <li>Transmit harmful code, viruses, or malware</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with other users' enjoyment of the Service</li>
                <li>Engage in any activity that disrupts the Service</li>
                <li>Scrape, crawl, or spider any part of the Service</li>
              </ul>
            </section>

            {/* Intellectual Property */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                5. Intellectual Property
              </h2>
              <p>
                The Service and its original content, features, and functionality
                are owned by {COMPANY_NAME} and are protected by international
                copyright, trademark, patent, trade secret, and other intellectual
                property laws.
              </p>
              <p className="mt-4">
                You may not copy, modify, distribute, sell, or lease any part of
                our Service without our prior written consent.
              </p>
            </section>

            {/* User Content */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                6. User Content
              </h2>
              <p>
                You retain ownership of any content you submit to the Service
                ("User Content"). By submitting User Content, you grant us a
                worldwide, non-exclusive, royalty-free license to use, reproduce,
                modify, and display such content in connection with the Service.
              </p>
              <p className="mt-4">
                You represent that you own or have the necessary rights to your
                User Content and that it does not violate any third party's rights.
              </p>
            </section>

            {/* Termination */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                7. Termination
              </h2>
              <p>
                We may terminate or suspend your account and access to the Service
                immediately, without prior notice, for any reason, including
                breach of these Terms.
              </p>
              <p className="mt-4">
                Upon termination, your right to use the Service will immediately
                cease. All provisions of these Terms which should survive
                termination shall survive.
              </p>
            </section>

            {/* Disclaimers */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                8. Disclaimers
              </h2>
              <p>
                THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT
                WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. WE DO NOT WARRANT THAT
                THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR COMPLETELY
                SECURE.
              </p>
            </section>

            {/* Limitation of Liability */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                9. Limitation of Liability
              </h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY LAW, {COMPANY_NAME.toUpperCase()}{" "}
                SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING LOSS OF PROFITS,
                DATA, OR OTHER INTANGIBLE LOSSES.
              </p>
            </section>

            {/* Governing Law */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                10. Governing Law
              </h2>
              <p>
                These Terms shall be governed by and construed in accordance with
                the laws of {JURISDICTION}, without regard to its conflict of law
                provisions.
              </p>
            </section>

            {/* Changes to Terms */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                11. Changes to Terms
              </h2>
              <p>
                We reserve the right to modify these Terms at any time. We will
                notify you of any changes by posting the new Terms on this page
                and updating the "Last updated" date.
              </p>
              <p className="mt-4">
                Your continued use of the Service after any changes constitutes
                acceptance of the new Terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="font-title2 font-semibold text-foreground mb-4">
                12. Contact Us
              </h2>
              <p>
                If you have any questions about these Terms, please contact us at:{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-foreground underline underline-offset-4 hover:text-foreground/80"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </section>
          </div>
        </div>

        {/* Footer navigation */}
        <div className="mt-16 pt-8 border-t border-border flex items-center justify-between">
          <Link
            href="/"
            className="font-footnote text-foreground/60 hover:text-foreground transition-colors"
          >
            &larr; Back to {APP_NAME}
          </Link>
          <Link
            href="/privacy"
            className="font-footnote text-foreground/60 hover:text-foreground transition-colors"
          >
            Privacy Policy &rarr;
          </Link>
        </div>
      </main>
    </div>
  );
}
